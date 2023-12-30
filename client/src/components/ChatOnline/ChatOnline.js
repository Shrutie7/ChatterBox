import React from "react";
import co from "./ChatOnline.module.css";

const ChatOnline = () => {
  return (
    <div className={co.chatOnline}>
      <div className={co.chatOnlineFriend}>
        <div className={co.chatOnlineImgContainer}>
          <img className={co.chatOnlineImg} src='https://img.freepik.com/free-photo/beautiful-girl-stands-park_8353-5084.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703203200&semt=ais' alt="" />
          <div className={co.chatOnlineBadge}></div>
        </div>
        <span className={co.ChatOnlineName}> 
John Doe
        </span>
      </div>
    </div>
  );
};

export default ChatOnline;
