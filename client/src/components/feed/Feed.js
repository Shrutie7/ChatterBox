import Post from "../post/Post";
import Share from "../share/Share";
import fd from "./Feed.module.css";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const[reload,setreload]=useState(false)

  const fetchPosts = async () => {
    const res = username
      ? await axios.get("/posts/profile/" + username)
      : await axios.get("/posts/timeline/"+user?._id);
   
// sort posts on basis of date they are posted... closest date will come first p2-p1 
      setPosts(res.data.sort((post1,post2)=>{
        return new Date(post2.createdAt)-new Date(post1.createdAt)
      }))
  };

  useEffect(() => {
    fetchPosts();

   
  }, [username,user?._id,reload]);


  
  return (
    <div className={fd.feed}>
      <div className={fd.feedWrapper}>
        {(username===user?.username)|| !username ? <Share setreload={setreload}></Share>:<></>}
        {posts.map((d) => (
          <Post key={d._id} post={d} />
        ))}
       
      </div>
    </div>
  );
}

export default Feed;
