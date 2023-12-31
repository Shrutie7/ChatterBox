// const io = require("socket.io")(8900, {
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });

// let users = [];

// const addUser = (userId, socketId) => {
//   // dont add same users i.e same userid in users array only add unique userId

//   !users.some((user) => user.userId === userId) &&
//     users.push({ userId, socketId });
// };

// const removeUser = (socketId)=>{


//     // remove users with same socketid
//     users = users.filter((user) => user?.socketId !== socketId)

// }

// io.on("connection", (socket) => {
//     // WHEN CONNECT
//   console.log("a user connected.");
//   // to send something to only 1 user
//   // after every connection take userId and socketId from user.hence send from client

//   socket?.on("addUser", (userId) => {
//     addUser(userId, socket.id);
//     // after adding send all users in users array to every client bcoz we can take online users and we can filter them and we can find online friends
//     io.emit("getUsers", users);
//   });

// const getUser = (userId)=>{
//     return users.find((user)=>user.userId === userId)
// }


// // SEND MSG FROM CLIENT to a specific user AND GET MESSAGE

// socket.on("sendmessage",({senderId,receiverId,text})=>{
//     // find specific user to send the message 

//     const user = getUser(receiverId);
//     io.to(user.socketId).emit("getMessage",{senderId,text,})

// })




// //   to remove users on diconnection and remove thta user fron users array 
// socket.on("disconnect", ()=>{
//     // WHEN DISCONNECT
//     console.log("a user disconnected")

//     removeUser(socket?.id);
//     // to see users again 
//     io.emit("getUsers", users);
// })
// });



const io = require("socket.io")(8900, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  
  let users = [];
  
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };
  
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };
  
  io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.");
  
    //take userId and socketId from user
    socket.on("addUser", (userId) => {
      addUser(userId, socket?.id);
      io.emit("getUsers", users);
    });
  
    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);
      console.log(user)
      io.to(user?.socketId).emit("getMessage", {
        senderId,
        text
      });
    });
  
    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });