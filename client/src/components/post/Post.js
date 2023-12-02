import React, { useState,useEffect, useContext } from "react";
import po from "./Post.module.css";
import { MoreVert } from "@material-ui/icons";
import { Delete } from "@material-ui/icons";
import axios from "axios"
import {format} from "timeago.js"
import {Link} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";


function Post({post}) {
  // console.log(post)
  // const user = Users.filter((d)=>d.id===1)
  // console.log(user[0].username)


const {user:currentUser}=useContext(AuthContext)
  let[like,setLike]=useState(post.likes.length);
  let[isLiked,setIsLiked]=useState(false);
  const[user,setUser]=useState({});


  useEffect(()=>{
    // check if likes array includes userid or not bcoz like becomes 2 but in network shows post disliked
// setisLiked to true if it includes currentUser._id
    setIsLiked(post.likes.includes(currentUser?._id)) 
  },[currentUser?._id,post.likes])
  const fetchUser=async()=>{

    const res = await axios.get(`/users?userId=${post.userId}`);
   setUser(res.data)

  }

  useEffect(()=>{
    fetchUser()
  },[post.userId])

  const likehandler=()=>{

    try {
      const res = axios.put("/posts/"+ post._id + "/like",{userId:currentUser?._id})
      
    } catch (error) {
      
    }
   if(isLiked)
   {
    like=like-1;

   }
   else{
    like=like+1;
   }
   setLike(like)

   setIsLiked(!isLiked)
  }

  const handledelete=()=>{
  
    try {
        axios.delete("/posts/" + post._id,{userId:currentUser?._id});
    } catch (error) {
      console.log(error)
    }

  }



const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className={po.post}>
      <div className={po.postWrapper}>
        <div className={po.postTop}>
          <div className={po.postTopLeft}>
          <Link to ={`profile/${user?.username}`}>
            <img
              src={user?.profilePicture ? PF + user?.profilePicture : PF+"person/noAvatar.png"}
              alt=""
              className={po.postProfileImg}
            />
            </Link>
            <span className={po.postUsername}>{user?.username}</span>
            <span className={po.postDate}>{format(post.createdAt)}</span>
          </div>
          <div className={po.postTopRight}>
            <MoreVert></MoreVert>
            <Delete onClick={handledelete}></Delete>
          </div>
        </div>
        <div className={po.postCenter}>
          <span className={po.postText}>{post?.desc}</span>
          <img src={PF+post.img} alt="" className={po.postImg} />
        </div>
        <div className={po.postBottom}>
          <div className={po.postBottomLeft}>
            <img className={po.likeIcon} src={`${PF}like.png`} onClick={likehandler} alt="" />
            <img className={po.likeIcon} src={`${PF}heart.png`} onClick={likehandler} alt="" />

            <span className={po.postLikeCounter} >{like} people like it</span>
          </div>
          <div className={po.postBottomRight}>
          <span className={po.postCommentText}>{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
