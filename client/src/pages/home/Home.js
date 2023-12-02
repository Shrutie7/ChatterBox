import Topbar from "../../components/Topbar/Topbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"
import home from "./Home.module.css";
import {useEffect} from 'react'
function Home() {
  useEffect(()=>{
    console.log("hii")
  },[])
  return (
    <>
    <Topbar></Topbar>
    <div className={home.homeContainer}>
    <Sidebar></Sidebar>
    <Feed></Feed>
    <Rightbar></Rightbar>
    </div>

    </>
  )
}

export default Home