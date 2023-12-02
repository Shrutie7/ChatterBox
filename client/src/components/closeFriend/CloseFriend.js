import React from 'react'
import cf from "./CloseFriend.module.css"
function CloseFriend({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div>
    <li className={cf.sidebarFriend}>
            <img
              className={cf.sidebarFriendImg}
              src={PF+user.profilePicture}
              alt=""
            />
            <span className={cf.sidebarFriendName}>{user.username}</span>
          </li>
    
    </div>
  )
}

export default CloseFriend