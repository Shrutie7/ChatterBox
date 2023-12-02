const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// Create post
router.post("/create", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    // save new created post in database and send it as response
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update post
// params send post.id and in req body of this send post.userId 
router.put("/:id", async (req, res) => {
  try {
    // findById post
    const post = await Post.findById(req.params.id);
    // check owner of the post i.e check if post.userId and userId in req of this is same or not if same then update post
    if (post.userId === req.body.userId) {
      // update post since you already are getting post find by id hence just set to req.body
      await post.updateOne({ $set: req.body });
      res.status(200).json("post updated successfully");
    } else {
      res.status(403).json("Can update only your post ");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
// Delete post
router.delete("/:id", async (req, res) => {
    try {
      // findById post
      const post = await Post.findById(req.params.id);
     
      // check owner of the post i.e check if post.userId and userId in req of this is same or not if same then update post
      if (post.userId === req.body.userId) {
        // update post since you already are getting post find by id hence just set to req.body
        await post.deleteOne();
        res.status(200).json("post deleted successfully");
      } else {
        res.status(403).json("Can delete only your post ");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  });


// Like a post
router.put("/:id/like",async(req,res)=>{
          // findById post
       
    try {
        const post = await Post.findById(req.params.id);

        // check whether the post like array includes the user or not if it does push req.body.userId in likes array
        if (!post.likes.includes(req.body.userId))
        {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("post liked ");
        }
        else{
            // to dislike a post pull from likes array req.body.userId
            // on touching like button it should be again disliked...
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("post disliked");
        }


    } catch (error) {
          res.status(500).json(error);
    }
})
// get a post
router.get("/:id",async(req,res)=>{
try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post)
} catch (error) {
    res.status(500).json(error);
}
})

// get all post of users following (timeline) call all following of this user and then all posts of the followings of this user

// if you are using get and want to send some request then better to use params hence req.params.userId instead of req.body.userId
router.get("/timeline/:userId",async(req,res)=>{


    try {

        // fetch all the post of user following 
        // using promise bcoz we will have multiple posts 
        // find currentuser by id send in req 
        const currentUser = await User.findById(req.params.userId)
        // add all posts of currentUser to postArray 
        // find all post of currentUser bcoz post model has userId in it with currentUser._id 
        const userPosts = await Post.find({userId:currentUser._id})
        // find all post of following
        // use promise.all bcoz we are going to use map here , if we are using any loop use promise.all otherwise it wont fetch all posts if we use await only inside map 


        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId)=>{
                // for each friendId find Post where userId equals friendId
            //    return each post inside the followings array
                return Post.find({userId:friendId})
            }) 
        );
        // concat these 2 arrays 
        // take all posts of friends and concat with current user posts
        res.status(200).json(userPosts.concat(...friendPosts))



    } 
    catch (error) {
        res.status(500).json(error);
    }
});

// get user's all posts
router.get("/profile/:username",async(req,res)=>{


  try {

    const user = await User.findOne({username:req.params.username})
    const posts = await Post.find({userId:user._id})

    res.status(200).json(posts);
     



  } 
  catch (error) {
      res.status(500).json(error);
  }
});



module.exports = router;
