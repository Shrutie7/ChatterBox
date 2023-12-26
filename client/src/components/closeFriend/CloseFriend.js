import React, { useContext } from "react";
import cf from "./CloseFriend.module.css";
import { useState, useEffect ,useRef} from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import noavatar from "../closeFriend/noAvatar.png";
function CloseFriend() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [usersList, setusersList] = useState([]);
  const initialized = useRef(false);
  const getUsersList = async () => {
    const res = await axios.get("/users/all/" + user.username);
    console.log(res);
    setusersList([...res.data]);
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
    getUsersList();
    }
  }, []);

  return (
    <div>
   
   <div className={cf.header}>Find Users to follow</div>

      {usersList?.map((user) => (
        <li className={cf.sidebarFriend}>
        <div className={cf.sidebarFriend1}>
        <img
            className={cf.sidebarFriendImg}
            src={user.profilePicture ? PF + user.profilePicture: noavatar}
            alt=""
          />
          <div className={cf.sidebarFriendName}>{user.username}</div>
        </div>
          <div className={cf.btncon}>
          <button className={cf.btn}>Follow</button>
          </div>
    
        </li>
      ))}

      {/* </li> */}
    </div>
  );
}

export default CloseFriend;
