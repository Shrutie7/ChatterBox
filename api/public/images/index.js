const express = require("express");
// import express and create our application
const app = express()
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv")
const multer = require("multer")
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
// when we go in browser in localhost:8800/public/images where rest api is hosted we cant reach there hence use path 
const path = require("path")
// to use dotenv
dotenv.config();

// make mongodb connection
// 1st param will be secret url! and in 3rd param pass as arror func which takes then catch or async await coz mongoose.prototype.connect() no longer accepts a callback
// mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser:true,useUnifiedTopology: true});

 mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("connected to mongodb");

}).catch((err)=>{
    console.log(err);
})

// if you use images path in url dont make any request go to directory 
app.use("/images",express.static(path.join(__dirname,"public/images")))
// middleware
app.use(express.json()); //body parser when we make post request its going to parser it 
app.use(helmet());
app.use(morgan("common"));




const storage =multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images");
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
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
app.use("/api/users" , userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts",postRoute)


// means our app is listening on port 8800 here our server code is running
app.listen(8800,()=>{
    console.log("Backend Server is runnin here!")
})
