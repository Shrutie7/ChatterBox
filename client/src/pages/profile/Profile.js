import React, { useEffect, useState } from "react";
import pr from "./Profile.module.css";
import Topbar from "../../components/Topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import axios from "axios";
import { useParams } from "react-router";
function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const[user,setUser]=useState({});
  const params = useParams();
  const username = params.username
  console.log(params.username) //gives object with username key and its value in it as we pass in App.js in routing of /profile/:username 

  const fetchUser=async()=>{

    const res = await axios.get(`/users?username=${username}`);
    console.log(res.data)
   setUser(res.data)

  }

  useEffect(()=>{
    fetchUser()
  },[username])
  
  return (
    <>
      <Topbar></Topbar>
      <div className={pr.profile}>
        <Sidebar></Sidebar>
        <div className={pr.profileRight}>
          <div className={pr.profileRightTop}>
            <div className={pr.profileCover}>
              <img
                src={user.coverPicture ? PF + user.coverPicture : PF+"person/noCover.png"}
                alt=""
                className={pr.profileCoverImg}
              />
              <img
                src={user.profilePicture ? PF + user.profilePicture : PF+"person/noAvatar.png"}
                alt=""
                className={pr.profileUserImg}
              />
            </div>

            <div className={pr.profileInfo}>
              <h4 className={pr.profileInfoName}>{user.username}</h4>
              <span className={pr.profileInfoDesc}>{user.desc}</span>
            </div>
          </div>
          <div className={pr.profileRightBottom}>
            <Feed username={username}/>
             
            <Rightbar user={user}></Rightbar>
          </div>
        </div>
      </div>
    </>
  );

}
// profile props indicate whether right bar is in profilepage or homepage

export default Profile;
