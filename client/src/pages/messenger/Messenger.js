import React from "react";
import Topbar from "../../components/Topbar/Topbar";
import ms from "./Messenger.module.css";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/ChatOnline/ChatOnline";

function Messenger() {
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
            <Conversation/>
            <Conversation/>
            <Conversation/>
            <Conversation/>
            <Conversation/>
            <Conversation/>
            <Conversation/>
          </div>
        </div>
        <div className={ms.chatBox}>
          <div className={ms.chatBoxWrapper}>
          <div className={ms.chatBoxTop}>
            <Message/>
            <Message/>
            <Message own ={true}/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
          </div>
          <div className={ms.chatBoxBottom}>
          <textarea placeholder="Type a message" className={ms.chatMessageInput}/>
            <button className={ms.chatSubmitButton}>Send</button>
          </div>

        
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
