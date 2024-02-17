const express = require("express");
// import express and create our application
const app = express()
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv")
const multer = require("multer");
const cors = require("cors");
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const conversationRoute = require("./routes/conversations")
const messageRoute = require("./routes/messages")
const path = require("path")
// to use dotenv
dotenv.config();

app.use(cors(
    {
        origin: ['https://chatter-box-apis.vercel.app'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials:true

    }
))



// make mongodb connection
// 1st param will be secret url! and in 3rd param pass as arror func which takes then catch or async await coz mongoose.prototype.connect() no longer accepts a callback
mongoose.connect(encodeURI('mongodb+srv://mongo:Eastside07%40@cluster0.xel3a66.mongodb.net/?retryWrites=true&w=majority'), {useNewUrlParser:true,useUnifiedTopology: true});

//  mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
//     console.log("connected to mongodb");

// }).catch((err)=>{
//     console.log(err);
// })

app.use("/images",express.static(path.join(__dirname,"public/images")))


// middleware
app.use(express.json()); //body parser when we make post request its going to parser it 
app.use(helmet());
app.use(morgan("common"));




const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images");
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name);
    }
})
const upload = multer({storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    try {
        return res.status(200).json("File uploaded successfully")
        
    } catch (error) {
        console.log(error)
    }
})
// whenever we go to that address its gonna run this router
app.use("/api/users" , userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts",postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages",messageRoute);


// means our app is listening on port 8800 here our server code is running
app.listen(process.env.PORT || 8800,()=>{
    console.log("Backend Server is runnin here!")
})
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    console.error(err);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
