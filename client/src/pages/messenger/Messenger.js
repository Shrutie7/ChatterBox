import React, { useContext, useEffect, useState } from "react";
import Topbar from "../../components/Topbar/Topbar";
import ms from "./Messenger.module.css";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/ChatOnline/ChatOnline";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

function Messenger() {
  const [conversations, setconversations] = useState([]);
  const [currentChat, setcurrentChat] = useState(null);
  const [messages, setmessages] = useState([]);
  const { user } = useContext(AuthContext);

  // whenevr we refresh page we will get all conversations of currentuser

  const getconversations = async () => {
    try {
      const res = await axios.get("/conversations/" + user._id);
      setconversations(res.data.conversation);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getconversations();
  }, [user?._id]);

  const getmessages = async () => {
    try {
      const res = await axios.get("/messages/" + currentChat?._id);
      setmessages(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // whenevr currentChat changes call this getmessages api 
    getmessages();
  }, [currentChat]);

  console.log(messages)

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
                {messages.map((m)=>(
                  <Message message = {m} own ={m?.sender === user?._id} />
                ))}
            
                  
                </div>
                <div className={ms.chatBoxBottom}>
                  <textarea
                    placeholder="Type a message"
                    className={ms.chatMessageInput}
                  />
                  <button className={ms.chatSubmitButton}>Send</button>
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
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
}

export default Messenger;
