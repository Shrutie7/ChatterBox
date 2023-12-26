import React, { useContext } from "react";
import cf from "./CloseFriend.module.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import noavatar from "../closeFriend/noAvatar.png";
import { Add, Remove } from "@material-ui/icons";
function CloseFriend() {
  const { user } = useContext(AuthContext);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [usersList, setusersList] = useState([]);
  const initialized = useRef(false);
  const getUsersList = async () => {
    const res = await axios.get("/users/all/" + user.username);
    console.log(res);
    setusersList([...res.data]);
  };
  const isGetFollowed = async(userz)=>{
    if(userz?._id){
    return await currentUser.followings.includes(userz?._id)
    }
  }
  const [followClick, setFollowclick] = useState(true);
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      getUsersList();
    }
  }, []);
  const handlefollow = async (userz) => {
    let flag = false;
    if (userz?._id) {
      flag = await currentUser.followings.includes(userz?._id);
    }
    setFollowclick(flag);

    try {
      if (flag) {
        await axios.put(`/users/${userz?._id}/unfollow`, {
          userId: currentUser?._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user?._id });
      } else {
        await axios.put(`/users/${userz?._id}/follow`, {
          userId: currentUser?._id,
        });
        dispatch({ type: "FOLLOW", payload: user?._id });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className={cf.header}>Find Users to follow</div>

      {usersList?.map((userz) => (
        <li className={cf.sidebarFriend}>
          <div className={cf.sidebarFriend1}>
            <img
              className={cf.sidebarFriendImg}
              src={userz.profilePicture ? PF + userz.profilePicture : noavatar}
              alt=""
            />
            <div className={cf.sidebarFriendName}>{userz.username}</div>
          </div>
          <div className={cf.btncon}>
            <button className={cf.btn} onClick={() => handlefollow(userz)}>
              {" "}
              {isGetFollowed(userz) ? "Follow" : "Unfollow"}
              {isGetFollowed(userz) ? <Add /> : <Remove />}
            </button>
          </div>
        </li>
      ))}

      {/* </li> */}
    </div>
  );
}

export default CloseFriend;
