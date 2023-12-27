import React from 'react'
import on from "./Online.module.css"
import noAvatar from "../closeFriend/noAvatar.png"

function Online({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div>
    <li className={on.rightbarFriend}>
            <div className={on.rightbarProfileImgContainer}>
              <img
                alt=""
                src={user.profilePicture ? PF+user.profilePicture : noAvatar}
                className={on.rightbarProfileImg}
              />
              <span className={on.rightbarOnline}></span>
            </div>
            <span className={on.rightbarUsername}>{user.username}</span>
          </li>
    
    </div>
  )
}

export default Online