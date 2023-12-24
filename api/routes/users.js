const router = require("express").Router();
const User = require("../models/User");
const { ObjectId } = require('mongodb');
var mongoose = require('mongoose');

const bcrypt = require("bcrypt");
// update user
// passin id allow us to choose any user id's
router.put("/:id", async (req, res) => {
  // if userid in database (userId you need to pass in req also)doesnt match with id passed in url or isadmin check then throw error
  // id is param hence pass as req.params.id
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    // if user is trying to update password then generate salt and hash password
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
      } catch (error) {
        return res.status(500).json(error);
      }
    }

    // update user by findandUpdate and set to req.body its going to automatically set all inputs inside the body
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      return res.status(200).json("Account has been updated");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("you can update only your account");
  }
});

// delete user
router.delete("/:id", async (req, res) => {
  // if userid in database doesnt match with id passed in url or is admin check then throw error
  // id is param hence pass as req.params.id
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    // use find to findByIdAndDelete user based on userId(req.params.id or req.body.userId)
    try {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json("Account has been deleted");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("you can delete only your account");
  }
});
// get a user

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get users list
router.get("/all/:username", async (req, res) => {

  try{
    let users = await User.find();
    let userMap = users.map((user) => {return user._doc});
    // res.send(userMap);
    res.status(200).json([...userMap]); 
  }
  catch (err) {
    res.status(500).json(err);
  }


});
// router.get("/usersList", async (req, res)=> {
//   try{
//     var userMap = {}
//  userMap = await User.find({}, function(err, users) {
//     console.log(users)
//     users.forEach(function(user) {
//       userMap[mongoose.Types.ObjectId(user._id)] = user;
//     });

//     res.status(200).json({...userMap});  
//   });
// }
// catch(err){
//   console.log(err)
//   res.status(500).json(err);
// }

// })


// router.get("/", async (req, res) => {
//   const userId = req.query.userId;
//   const username = req.query.username;
//   try {
//     // if we pass in url userId it will call 1st one if we pass in url username it will call 2nd and assign to user

//     const user = userId
//       ? await User.findById(userId)
//       : await User.findOne({ username: username });
//     // if user is found on basis of id in database return back the user
//     // but this will return user with all the properties to not send some properties back
//     // user._doc is document which carries all object now while we get user by id there will be no password/updatedAt

//     const { password, updatedAt, ...other } = user._doc;
//     return res.status(200).json(other);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// });

// get all friends

router.get("/friends/:userId",async(req,res)=>{
  try {
    // find user which have the id passed in url
    const user = await User.findById(req.params.userId);
    // take all friends of this user
    // using promise bcoz we will do map on followings array
    // by this we move all users into friends array with all properties of user
    const friends = await Promise.all(
      user.followings.map((friendId)=>{
        return User.findById(friendId)
      })

    )
    let friendsList = [];
    // for each friend push only id,username,profilepicture properties inside friendsList array

    friends.map((friend)=>{
      // destructuring for only those properties that we want to put in friends array/friendsList
      const{_id,username,profilePicture}= friend;
      friendsList.push({_id,username,profilePicture})
    })
res.status(200).json(friendsList)
    
  } catch (error) {
    res.status(500).json(error)
  }

})

// follow a user
router.put("/:id/follow", async (req, res) => {
  // in url in userId send user who want to follow user in req.params.id hence followers of req.params.id(user) will increase and following of req.body.userId will increase
  // hence user in body is trying to follow user in id of url
  // check if userid in req and passed in url is same or not bcoz if not same then only allow to follow bcoz user user cannot follow himself

  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      // if user which we are trying to follow already includes currentUser as a follower then dont follow him again throw error
      //   if user does not have currentUser in its follower list then push it in user follower list and also for currentUser push user in following list

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user " + `${user.username}` + " is followed");
      } else {
        res.status(403).json("You already follow this user");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You cannot follow yourself");
  }
});

// unfollow a user

router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      //   here user.followers array need to include req.body.userId in it so that he can unfollow him and pull from follwers array of user and pull from following array of currentUser

      if (user.followers.includes(req.body.userId)) {
        // instead of push into array pull from it since we are unfollowing
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user " + `${user.username}` + " is unfollowed");
      } else {
        res.status(403).json("You dont follow this user");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You cannot unfollow yourself");
  }
});

module.exports = router;
