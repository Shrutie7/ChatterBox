import React, { useContext, useEffect, useState } from "react";
import rb from "./Rightbar.module.css";
import { Users } from "../../data/dummyData";
import Online from "../online/Online";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

function Rightbar({ user }) {
  console.log(user);
  

  const { user: currentUser, dispatch } = useContext(AuthContext);
  // on basis of profile props create inneromponents and send home/profile page as required
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  // const [followClick, setFollowclick] = useState(currentUser?.followings.includes(user?._id));
  // const getFriends = async () => {
  //   try {
  //     const friendsList = await axios.get("/users/friends/" + user?._id);
  //     setFriends(friendsList.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getFriends();
  // }, [user]);

  const isGetFollowed = async()=>{
    if(user?._id){
    return await currentUser.followings.includes(user?._id)
    }
  }
 const [followClick, setFollowclick] = useState(isGetFollowed);

 const getFriends = async () => {
  if (currentUser?._id) {
    try {
      const friendList = await axios.get("/users/friends/" + currentUser._id);
      console.log(friendList.data);
      let fdata = [...friendList.data];
      let arr = [];
      fdata?.forEach((fr) => {
        arr.push(fr._id);
      });
      setFriends(friendList.data);
    } catch (err) {
      console.log(err);
    }
  }
};
useEffect(() => {

  getFriends();
}, []);


  const followHandler = async () => {
    // setFollowclick(!followClick)
    console.log("hhhhhh")
    try {
      if (followClick) {
        await axios.put(`/users/${user?._id}/unfollow`, {
          userId: currentUser?._id,
        });
        dispatch({type:"UNFOLLOW",payload:user?._id})
        
      } else {
         await axios.put(`/users/${user?._id}/follow`, {
          userId: currentUser?._id,
        });
        dispatch({type:"FOLLOW",payload:user?._id})
      }

      setFollowclick(!followClick);
    } catch (error) {
      console.log(error);
    }
  };

  const HomeRightBar = () => {
    return (
      <>
        <div className={rb.birthdayContainer}>
          <img src="assets/gift.png" alt="" className={rb.birthdayImg} />
          <span className={rb.birthdayText}>
            <b>Ishaan</b> and <b>3 others friends</b> have birthday today.
          </span>
        </div>
        <img className={rb.rightbarAd} src="assets/ad.png" alt="" />
        <h4 className={rb.rightbarTitle}>Online Friends</h4>
        <ul className={rb.rightbarFriendList}>
          {Users.map((u) => (
            <Online key={u.id} user={u}></Online>
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
      {console.log(user,currentUser)}
        {user.username !== currentUser?.username ? (
          <button className={rb.rightbarFollowButton} onClick={followHandler}>
           
           
           
            {!followClick ? "Follow" : "Unfollow"}
            {!followClick ? <Add /> : <Remove />}
          </button>
        ) : (
          <></>
        )}
        <h4 className={rb.rightbarTitle}>User Information</h4>
        <div className={rb.rightbarInfo}>
          <div className={rb.rightbarInfoItem}>
            <span className={rb.rightbarInfoKey}>City:</span>
            <span className={rb.rightbarInfoValue}>{user.city}</span>
          </div>
          <div className={rb.rightbarInfoItem}>
            <span className={rb.rightbarInfoKey}>From:</span>
            <span className={rb.rightbarInfoValue}>{user.from}</span>
          </div>
          <div className={rb.rightbarInfoItem}>
            <span className={rb.rightbarInfoKey}>Relationship:</span>
            <span className={rb.rightbarInfoValue}>
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : ""}
            </span>
          </div>
        </div>

        <h4 className={rb.rightbarTitle}>User Friends</h4>
        <div className={rb.rightbarFollowings}>
        {console.log(friends)}
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className={rb.rightbarFollowing}>
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className={rb.rightbarFollowingImg}
                />
                <span className={rb.rightbarFollowingName}>
                  {friend.username}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className={rb.rightbar}>
      <div className={rb.rightbarWrapper}>
        {user ? <ProfileRightbar /> : <HomeRightBar />}
      </div>
    </div>
  );
}

export default Rightbar;
