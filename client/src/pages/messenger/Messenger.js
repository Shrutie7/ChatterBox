import React from "react";
import Topbar from "../../components/Topbar/Topbar";
import ms from "./Messenger.module.css";

function Messenger() {
  return (
    <>
      <Topbar />
      <div className={ms.messenger}>
        <div className={ms.chatMenu}>
          <div className={ms.chatMenuWrapper}>
            menu
          </div>
        </div>
        <div className={ms.chatBox}>
          <div className={ms.chatBoxWrapper}>
            box
          </div>
        </div>
        <div className={ms.chatOnline}></div>
        <div className={ms.chatOnlineWrapper}>online</div>
      </div>
    </>
  );
}

export default Messenger;
