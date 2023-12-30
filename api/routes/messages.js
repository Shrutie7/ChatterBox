const router = require("express").Router();
const Message = require("../models/Message");

//add

router.post("/",async(req,res)=>{
    // in body request is conversationId,sender,text 
    
        // take everything inside body and put inside new message
        const newMessage = new Message(req.body)
    try {
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)

        
    } catch (error) {
        res.status(500).json(error)
    }
})





//get - fetch messages from a conversation

router.get('/:conversationId',async(req,res)=>{
// fetch messages which has conversationId as send in req 
    try {
        const messages = await Message.find({
            conversationId:req.params.conversationId
        })
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json(error)
        
    }

})



module.exports = router;