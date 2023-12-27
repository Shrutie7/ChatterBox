import React, { useState } from "react";
import sf from "./Searchfriends.module.css";
import { Link, useNavigate } from "react-router-dom";
const Searchfriends = ({ filteredrest}) => {

  const [flagopen,setflagopen] = useState(true)
  const nav = useNavigate();
  const handleuserroute = (ele)=>{
    if(ele.username){
      // <Link to={"/profile/" + ele.username}></Link>
      nav("/profile/"+ele.username);
      setflagopen(false)
    }
  }
  return (
    <div className={sf.main}>
      {flagopen?filteredrest.length > 0 ? (
        filteredrest?.map((ele) => {
          return <div className={sf.usercontainer}
          onClick={()=>{handleuserroute(ele)}}>{ele.username}</div>;
        })
      ) : (
        <div className={sf.usercontainer}>No users found</div>
      ):(<></>)}
    </div>
  );
};

export default Searchfriends;
