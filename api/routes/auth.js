const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
// to not expose passwords anywhere and keep it protected

// Register
router.post("/register", async (req, res) => {
  // for error handling use try catch and go and check in postman with the request you will be able to register user and check in mongodb cluster u will find new registered user

  try {
    /*...Generate new Password... */
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash actual password
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // use hashedPassword in place of req.body.password in newUser

    /*...Create new user... */
    // User is model and write properties inside it
    // here we wont write here directly we will write inside postman in body hence send as req.body.username etc
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      desc:req.body.desc,
      city:req.body.city,
      from:req.body.from,
      relationship:req.body.relationship
     
      


    });

    // checking if email already exists dont allow user to register
    const useremail = await User.findOne({
      email: req.body.email,
    });
    useremail && res.status(403).json("user already exists with same email Id");

    /*...Save new user and return response... */
    // to save the user i.e writing into the database
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
});

// login
// in postman pass in email and password and try to find user in the database
router.post("/login", async (req, res) => {
  try {
    // use findOne bcoz there will be only one inside collection with same email
    const user = await User.findOne({
      email: req.body.email,
    });

    // if there is no user like that which is send in request in postman send error
    if(!user){
     return res.status(404).json({message:"user not found with given email id"});
    }

    // checking password also
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if(!validPassword){
      return res.status(400).json({message:"user not found with given password"});
    }


    // if both password and email matches to what is send in request in postman then send user back from the db hence user found
    return res.status(200).json(user);
  } catch (error) {
    console.log(error)
  //  return res.status(500).json({message:error});
  }
});

module.exports = router;
