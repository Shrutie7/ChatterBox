import React, { useState, useEffect, useContext } from "react";
import po from "./Post.module.css";
import { MoreVert } from "@material-ui/icons";
import { Delete, Save, PinDropTwoTone, Archive, Edit } from "@material-ui/icons";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Modal, Overlay, Popover, Tooltip } from "react-bootstrap";


function Post({ post,userdata }) {
  // console.log(post)
  // const user = Users.filter((d)=>d.id===1)
  // console.log(user[0].username)
  let overlaydata = {
    MoreVertData: [
      {
        actionName: "Pin Post",
        actionIcon: "pin",
        actionId: 1,
      },
      { actionName: "Save Post", actionIcon: "save", actionId: 2 },
      { actionName: "Move to archive", actionIcon: "archive", actionId: 3 },
      { actionName: "Edit Post", actionIcon: "edit", actionId: 4 },
      { actionName: "Move to Recycle bin", actionIcon: "delete", actionId: 5 },
    ],
    MoreVertDataother:[
      {
        actionName: "Pin Post",
        actionIcon: "pin",
        actionId: 1,
      },
      { actionName: "Save Post", actionIcon: "save", actionId: 2 },

   
    ]

  };

  const { user: currentUser } = useContext(AuthContext);
  let [like, setLike] = useState(post.likes.length);
  let [isLiked, setIsLiked] = useState(false);
  const [userz, setUserz] = useState({});
  let [showovr, setshowovr] = useState(false);
  let [tooltipdata, settooltipdata] = useState([]);
  let [htmlTag, sethtmlTag] = useState();

  useEffect(() => {
    // check if likes array includes userid or not bcoz like becomes 2 but in network shows post disliked
    // setisLiked to true if it includes currentUser._id
    setIsLiked(post.likes.includes(currentUser?._id));
  }, [currentUser?._id, post.likes]);

  // const fetchUser = async () => {
  //   const res = await axios.get(`/users?userId=${post.userId}`);
  //   setUserz(res.data);
  // };

  // useEffect(() => {
  //   fetchUser();
  // }, [post.userId]);


const getpostusername = () =>{
  let str = "";

  if(post.userId === currentUser?._id)
  {
    str = currentUser?.username
  }

  else{
    userdata.forEach((ele)=>{
      console.log(ele)
      if(ele?._id === post.userId)
      {
        str = ele?.username
      }
    })
  }

  return str;

}
  const likehandler = () => {
    try {
      const res = axios.put("/posts/" + post._id + "/like", {
        userId: currentUser?._id,
      });
    } catch (error) {}
    if (isLiked) {
      like = like - 1;
    } else {
      like = like + 1;
    }
    setLike(like);

    setIsLiked(!isLiked);
  };



  function handlemouseovrly(name) {
    let doc = document.getElementById(name);
    sethtmlTag(doc);
    setshowovr(!showovr);
  }

  const geticon = (d) => {
    let icontype = "";
    if (d?.actionIcon === "delete") {
      icontype = <Delete />;
    }
    if (d?.actionIcon === "pin") {
      icontype = <PinDropTwoTone />;
    }
    if (d?.actionIcon === "save") {
      icontype = <Save />;
    }
    if (d?.actionIcon === "archive") {
      icontype = <Archive />;
    }
    if (d?.actionIcon === "edit") {
      icontype = <Edit />;
    }
    return icontype;
  };

  const handleaction = async(ele)=>{
    if(ele?.actionId === 5){
      // console.log(currentUser?._id)
      try {
       let res =  axios.delete("/posts/" + post.userId, { userId: currentUser?._id });
      //  console.log(res)
      } catch (error) {
        console.log(error);
      }

    }

  }

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className={po.post}>
    
    {/* {console.log(currentUser)} */}
      <div className={po.postWrapper}>
        <div className={po.postTop}>
          <div className={po.postTopLeft}>
            <Link to={`profile/${userz?.username}`}>
              <img
                src={
                  userz?.profilePicture
                    ? PF + userz?.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
                className={po.postProfileImg}
              />
            </Link>
            <span className={po.postUsername}>{getpostusername()}</span>
            <span className={po.postDate}>{format(post.createdAt)}</span>
          </div>
          <div className={po.postTopRight}>
            <MoreVert
              onClick={() => handlemouseovrly(post?._id)}
              id={post?._id}
              className={po.MoreVert}
            ></MoreVert>
            
          </div>
        </div>
        <div className={po.postCenter}>
          <span className={po.postText}>{post?.desc}</span>
          <img src={PF + post.img} alt="" className={po.postImg} />
        </div>
        <div className={po.postBottom}>
          <div className={po.postBottomLeft}>
            <img
              className={po.likeIcon}
              src={`${PF}like.png`}
              onClick={likehandler}
              alt=""
            />
            <img
              className={po.likeIcon}
              src={`${PF}heart.png`}
              onClick={likehandler}
              alt=""
            />

            <span className={po.postLikeCounter}>{like} people like it</span>
          </div>
          <div className={po.postBottomRight}>
            <span className={po.postCommentText}>{post.comment} comments</span>
          </div>
        </div>
      </div>
      {showovr && (
        <Overlay target={htmlTag} show={showovr} placement={"left"} rootClose={true}>
          {(props) => {
            return (
              <Popover {...props}>
                <div className={po.overlaybtnscss}>
                
                  {post.userId === currentUser?._id? overlaydata.MoreVertData.map((ele) => {
                    return(
                      <div className={po.overlayitems} onClick={()=>handleaction(ele)}>
                      <div>{geticon(ele)}</div>
                      <div>{ele?.actionName}</div>
                    </div>
                    )
            
                  }):overlaydata.MoreVertDataother.map((ele) => {
                    return(
                      <div className={po.overlayitems}>
                      <div>{geticon(ele)}</div>
                      <div>{ele?.actionName}</div>
                    </div>
                    )
            
                  })}
                </div>
              </Popover>
            );
          }}
        </Overlay>
      )}



    </div>
  );
}

export default Post;
