import Post from "../post/Post";
import Share from "../share/Share";
import fd from "./Feed.module.css";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import LoadingPopup from "../commonmodules/Loading";
import { AuthContext } from "../../context/AuthContext";
import Toastify from "../commonmodules/Toastify";
function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const[reload,setreload]=useState(false)
  let [loading, setLoading] = useState(false);
  const fetchPosts = async () => {
    setLoading(true)
    const res = username
      ? await axios.get("/posts/profile/" + username)
      : await axios.get("/posts/timeline/"+user?._id);
   
// sort posts on basis of date they are posted... closest date will come first p2-p1 
      setPosts(res.data.sort((post1,post2)=>{
        return new Date(post2.createdAt)-new Date(post1.createdAt)
      }))
      setLoading(false)
  };

  useEffect(() => {
    fetchPosts();

   
  }, [username,user?._id,reload]);

  const [usersList, setusersList] = useState([]);

  const getUsersList = async () => {
    const res = await axios.get("/users/all/" + user?.username);
    console.log(res);
    setusersList([...res.data]);
  };
useEffect(()=>{
  getUsersList()
},[user?._id])
  
  return (
    <div className={fd.feed}>
      <div className={fd.feedWrapper}>
        {(username===user?.username)|| !username ? <Share setreload={setreload}></Share>:<></>}
        {/* {console.log(posts)} */}
        {posts.map((d) => (
          <Post key={d._id} post={d} userdata={usersList}/>
        ))}
       
      </div>

      {loading && (
        <LoadingPopup state={loading} message="Loading... Please Wait" />
      )}

    </div>
  );
}

export default Feed;
