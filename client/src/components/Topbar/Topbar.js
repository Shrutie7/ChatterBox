import tp from "./topbar.module.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { logoutCall } from "../../ApiCalls";
import axios from "axios";

function Topbar() {
  const { user, dispatch } = useContext(AuthContext);

  console.log(user)
  const nav = useNavigate();
  const [inp, setinp] = useState();
  const [togglebtn,settogglebtn]=useState("HomePage")
  const [navpath,setnavpath] = useState("/");
  const [usersList,setusersList] = useState("/");

  const handletoggle = ()=>{
    if(togglebtn==="HomePage") {
    settogglebtn("Timeline");
    nav(`/profile/${user?.username}`)
  }
  else{
    settogglebtn("HomePage");
    nav("/")
  }
}
  const getUsersList = async () => {
    const res = await axios.get("/users/all/" + inp);
    console.log(res);
    setusersList([...res.data])
  };


  useEffect(()=>{
    getUsersList();
  },[])
  const [filteredrest, setfilteredrest] = useState([]);

  const searchfun = ()=>{
    let filt = usersList.filter(
      (res) =>
        JSON.stringify(res)
          .toLowerCase()
          .includes(inp.toLowerCase())

      // res.info.name.toLowerCase().includes(ressearch.toLowerCase())
    );

console.log(filt)
    setfilteredrest([...filt]);
  }




  const handleClick = () => {
    logoutCall(dispatch);
    nav("/login");
  };

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className={tp.topbarContainer}>
      <div className={tp.topbarLeft}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className={tp.logo}>ShruSocial</span>
        </Link>
      </div>
      <div className={tp.topbarCenter}>
        <div className={tp.searchbar}>
          <Search className={tp.searchIcon} onClick={()=>searchfun()} />
          <input
            placeholder="Search for friends,posts,or any videos"
            value={inp}
            onChange={(e) => setinp(e.target.value)}
            className={tp.searchinput}
          />
        </div>
      </div>
      <div className={tp.topbarRight}>
        <div className={tp.topbarLinks}>
          {/* <Link to={togglebtn === "HomePage"? navpath : `/profile/${user?.username}` } style={{ textDecoration: "none" }}> */}
            <span className={tp.topbarLink} onClick={()=>handletoggle()}>{togglebtn==="HomePage"?"HomePage":"Timeline"}</span>
          {/* </Link> */}
          {/* <Link
            to={`/profile/${user?.username}`}
            style={{ textDecoration: "none" }}
          >
            <span className={tp.topbarLink}>Timeline</span>
          </Link> */}
        </div>
        <div className={tp.topbarIcons}>
          <div className={tp.topbarIconItem}>
            <Person />
            <span className={tp.topbarIconBadge}>1</span>
          </div>
          <div className={tp.topbarIconItem}>
            <Chat />
            <span className={tp.topbarIconBadge}>2</span>
          </div>
          <div className={tp.topbarIconItem}>
            <Notifications />
            <span className={tp.topbarIconBadge}>1</span>
          </div>
        </div>
        <Link to={`/profile/${user?.username}`}>
          <img
            src={
              user?.profilePicture
                ? PF + user?.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className={tp.topbarImg}
          />
        </Link>
        <span className={tp.topbarLink} onClick={handleClick}>
          Sign out
        </span>
      </div>
    </div>
  );
}

export default Topbar;
