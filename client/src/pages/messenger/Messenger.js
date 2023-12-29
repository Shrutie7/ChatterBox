import React from "react";
import Topbar from "../../components/Topbar/Topbar";
import ms from "./Messenger.module.css";
import Conversation from "../../components/conversation/Conversation";

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
            box
          </div>
        </div>
        <div className={ms.chatOnline}>
        <div className={ms.chatOnlineWrapper}>online</div>
        </div>
      </div>
    </>
  );
}

export default Messenger;
