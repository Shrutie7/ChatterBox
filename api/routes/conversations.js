const router = require("express").Router();
const Conversation = require("../models/Conversation");


//new conversation

router.post("/",async(req, res) => {
    // create new conversation object using conversation model to send request to api like this we store in array in members pass in user ids in sender id and reciever id
    // {
//     "senderId":"frdcxs32443",
//     "recieverId":"frdcxs32443",
// }

const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
    
})





//get conversation of a user using userid

router.get('/:userId',async(req, res) => {


    try {
// check if params userId is included in members array or not 
        const conversation = await Conversation.find({
            members:{
                $in:[req.params.userId]
            }
        });

        res.status(200).json({conversation})

        
    } catch (error) {
         res.status(500).json(err);
    }

})




module.exports = router;