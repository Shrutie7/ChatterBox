import React, { useEffect, useState } from 'react'
import conv from "./Conversation.module.css"
import axios from "axios";
import noAvatar from "../closeFriend/noAvatar.png"
const Conversation = ({conversation,currentUser}) => {

const [user,setuser]=useState(null);
const PF = process.env.REACT_APP_PUBLIC_FOLDER
// fetch user from userId
const getUser = async(frid)=>{
  try {
    const res =  await axios.get("/users?userId="+frid) ;
    console.log(res)
    setuser(res.data)
  } catch (error) {
    console.log(error)
  }

}

useEffect(()=>{
const friendId = conversation.members.find(m=>m !==currentUser?._id )

getUser(friendId)

},[currentUser,conversation])

  return (
    <div className={conv.conversation}>

      <img className={conv.conversationImg} src={user?.profilePicture ? user?.profilePicture :noAvatar}
       alt=''/>
      <span className={conv.conversationName}>{user?.username}</span>
    </div>
  )
}

export default Conversation