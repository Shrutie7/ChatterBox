import React, { useContext, useEffect, useState, useRef } from "react";
import Topbar from "../../components/Topbar/Topbar";
import ms from "./Messenger.module.css";
import Conversation from "../../components/conversation/Conversation";
import { CircularProgress } from "@material-ui/core";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/ChatOnline/ChatOnline";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";

function Messenger() {
  // whenevr we add a new message we need to scroll so to automatically scroll to see new message that we send we use ref
  const scrollRef = useRef();

  const socket = useRef();
  const [conversations, setconversations] = useState([]);
  const [currentChat, setcurrentChat] = useState(null);
  const [messages, setmessages] = useState([]);
  const [newMessage, setnewMessage] = useState("");
  const [arrivalMessage, setarrivalMessage] = useState(null);
  const [flagc, setflagc] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useContext(AuthContext);


  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setarrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setmessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setconversations(res.data.conversation);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setmessages([...res.data]);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
    setflagc(true);
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });
   
    try {
      const res = await axios.post("/messages", message);
      setmessages([...messages, res.data]);
      setnewMessage("");
      setflagc(false)
    } catch (err) {
      console.log(err);
    }
    setflagc(false)
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


















  // useEffect(() => {
  //   socket.current = io("ws://localhost:8900");
  //   socket?.current?.on("getMessage", (data) => {
  //     setarrivalMessage({
  //       sender: data.senderId,
  //       text: data.text,
  //       createdAt: Date.now(),
  //     });
  //   });
  // }, []);

  // if there is any change in arrival message we will update the messages
  // useEffect(()=>{

  //   // check if members include sender or not if it does than update message for that user only keep previous messages in place 

  //   arrivalMessage && currentChat?.members?.includes(arrivalMessage?.sender)&&
  //   setmessages((prev)=>[...prev,arrivalMessage])
  // },[arrivalMessage,currentChat])

  // useEffect(() => {
  //   // SEND TO SOCKET SERVER USE socket.emit

  //   socket.current?.emit("addUser", user?._id);
  //   socket.current?.on("getUsers", (users) => {
  //     console.log(users);
  //   });
  // }, [user]);

  // // useEffect(()=>{
  // //   // to take anything from server use socket.on
  // //   socket?.on("welcome",message=>{
  // //     console.log(message)
  // //   })

  // //   },[socket])

  // // whenevr we refresh page we will get all conversations of currentuser

  // const getconversations = async () => {
  //   try {
  //     const res = await axios.get("/conversations/" + user._id);
  //     setconversations(res.data.conversation);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getconversations();
  // }, [user?._id]);

  // const getmessages = async () => {
  //   try {
  //     const res = await axios.get("/messages/" + currentChat?._id);
  //     setmessages(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   // whenevr currentChat changes call this getmessages api
  //   getmessages();
  // }, [currentChat]);

  console.log(messages);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const message = {
  //     sender: user?._id,
  //     text: newMessage,
  //     conversationId: currentChat?._id,
  //   };
  //   setflagc(true);

  //   // to find receiverId checkin members array if member is not equal to current Users Id that means its our friend i.e the receiver

  //   const receiverId = currentChat?.members.find(
  //     (member) => member !== user?._id
  //   );
  //   // sending msg
  //   socket.current.emit("sendMessage", {
  //     senderId: user?._id,
  //     receiverId:receiverId,
  //     text: newMessage,
  //   });
  //   try {
  //     const res = await axios.post("/messages", message);
  //     // keep previous messages and add new message
  //     setmessages([...messages, res?.data]);
  //     setnewMessage("");
  //     setflagc(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setflagc(false);
  // };

  // useEffect(() => {
  //   // whenever messages change fire this useEffect
  //   // scrollIntoView will scroll to end of div but it will be very sharp/fastly hence give behaviour as smooth
  //   // scroll to END OF DIV
  //   scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  // messages that are send from other person to come instantly (w/o refreshing page) we use socket.io not ajax bcoz we dont want to make request to server

  // socket.io => whenevr any user connect to our application its gonna connect the socket server and
  // they will have their own socketId and inside socket server there is no db , its not writing any data its just connecting to ur computer using only events
  // means socket server uses TCP/IP connection say user4 wants to send msg to user3
  // user1 will send event "sendMessage" to server as
  // socket.on("sendMessage",{
  //   reciever:3,
  //   text:"hello 3 i m 4"
  // })
  // instantly socket server will send the message to user3
  // io.to(3,{sender:4,text:"hello 3 i m 4"})

  return (
    <>
      <Topbar />
      <div className={ms.messenger}>
        <div className={ms.chatMenu}>
          <div className={ms.chatMenuWrapper}>
            <input
              placeholder="Search for friends"
              className={ms.chatMenuInput}
            />
            {conversations.map((c) => (
              <div onClick={() => setcurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className={ms.chatBox}>
          <div className={ms.chatBoxWrapper}>
            {currentChat ? (
              <>
                <div className={ms.chatBoxTop}>
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m?.sender === user?._id} />
                    </div>
                  ))}
                </div>
                <div className={ms.chatBoxBottom}>
                  <textarea
                    placeholder="Type a message"
                    className={ms.chatMessageInput}
                    onChange={(e) => setnewMessage(e.target.value)}
                    value={newMessage}
                  />
                  <button
                    className={ms.chatSubmitButton}
                    onClick={handleSubmit}
                  >
                    Send
                    {flagc ? (
                      <CircularProgress color="white" size="20px" />
                    ) : (
                      <></>
                    )}
                  </button>
                </div>
              </>
            ) : (
              <span className={ms.noConversationText}>
                Open a conversation to start a chat
              </span>
            )}
          </div>
        </div>
        <div className={ms.chatOnline}>
          <div className={ms.chatOnlineWrapper}>
            <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setcurrentchat={setcurrentChat}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Messenger;
