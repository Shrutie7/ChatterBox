import React from 'react'
import on from "./Online.module.css"

function Online({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div>
    <li className={on.rightbarFriend}>
            <div className={on.rightbarProfileImgContainer}>
              <img
                alt=""
                src={PF+user.profilePicture}
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