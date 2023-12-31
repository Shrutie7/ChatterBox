import React, { useEffect, useState } from "react";
import co from "./ChatOnline.module.css";
import axios from "axios";
import noAvatar from "../closeFriend/noAvatar.png"

const ChatOnline = ({ onlineUsers, currentId, setcurrentchat }) => {
  const [friends, setfriends] = useState([]);
  const [onlinefriends, setonlinefriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const getFriends = async () => {
    try {
      const res = await axios.get("/users/friends/" + currentId);
      setfriends([...res.data]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFriends();
  }, [currentId]);

  console.log(friends)

  useEffect(()=>{

    setonlinefriends(friends.filter((friend)=>onlineUsers.includes(friend._id)))
  },[onlineUsers,friends])
  return (
    <div className={co.chatOnline}>
    {
      onlinefriends.map((o)=>(
        <div className={co.chatOnlineFriend}>
        <div className={co.chatOnlineImgContainer}>
          <img
            className={co.chatOnlineImg}
            src={o?.profilePicture ? PF+o.profilePicture :noAvatar}
            alt=""
          />
          <div className={co.chatOnlineBadge}></div>
        </div>
        <span className={co.ChatOnlineName}>{o.username}</span>
      </div>
      ))
    }

    </div>
  );
};

export default ChatOnline;
