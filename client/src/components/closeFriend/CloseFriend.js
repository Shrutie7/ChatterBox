import React, { useContext } from "react";
import cf from "./CloseFriend.module.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import noavatar from "../closeFriend/noAvatar.png";
import { Add, Remove } from "@material-ui/icons";
import Toastify from "../commonmodules/Toastify";
import { ToastContainer, toast } from "react-toastify";
function CloseFriend() {
  const { user } = useContext(AuthContext);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [usersList, setusersList] = useState([]);
  const initialized = useRef(false);
  const [Friends, setFriends] = useState([]);
  const [Friendsid, setFriendsid] = useState([]);
  const getUsersList = async () => {
    const res = await axios.get("/users/all/" + user.username);
    console.log(res);
    setusersList([...res.data]);
  };
  const [followflag, setfollowflag] = useState(false);

  console.log(currentUser?.followings);
  const isGetFollowed = (userz) => {
    if (userz?._id) {
      // console.log(currentUser.followings.includes(userz?._id))
      return currentUser?.followings.includes(userz?._id);
    }
  };

  const [followClick, setFollowclick] = useState(true);
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      getUsersList();
    }
  }, []);
  const getFriends = async () => {
    if (user?._id) {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        console.log(friendList.data);
        let fdata = [...friendList.data];
        let arr = [];
        fdata?.forEach((fr) => {
          arr.push(fr._id);
        });
        setFriendsid([...arr])
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {

    getFriends();
  }, [user]);
  const handlefollow = async (userz) => {
    let flag = false;
    // if (userz?._id) {
    //   flag =  currentUser.followings.includes(userz?._id);
    // }
    // setFollowclick(flag);
    flag = Friendsid.includes(userz?._id)
    getFriends();

    try {
      if (flag) {
        await axios.put(`/users/${userz?._id}/unfollow`, {
          userId: currentUser?._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user?._id });
        getFriends()
        setfollowflag(false);
        toast("🦄"+ userz?.username + " is unfollowed!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          })
      
      } else {
        await axios.put(`/users/${userz?._id}/follow`, {
          userId: currentUser?._id,
        });

        dispatch({ type: "FOLLOW", payload: user?._id });
        getFriends()
        setfollowflag(true);
        toast("🦄"+ userz?.username + " is followed!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          })
     
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
            <button className={cf.btn} onClick={() => {handlefollow(userz);setFollowclick(true)}}>
              {" "}
              {/* {isGetFollowed(userz) ? "UnFollow" : "Follow"}
              {isGetFollowed(userz) ? <Remove /> : <Add />} */}

              {
                Friendsid.includes(userz?._id) ?"Unfollow":"Follow"
              }
            </button>
          </div>
        </li>
      ))}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className={cf.toastposition}
      />
    </div>
  );
}

export default CloseFriend;
