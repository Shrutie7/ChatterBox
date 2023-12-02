import React from "react";
import sb from "./Sidebar.module.css";
import {
  RssFeed,
  Event,
  School,
  ChatSharp,
  WorkOutline,
  HelpOutline,
  Group,
  Bookmark,
  PlayCircleFilledOutlined,
} from "@material-ui/icons";
import { Users } from "../../data/dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
function Sidebar() {
  return (
    <div className={sb.sidebar}>
      <div className={sb.sidebarWrapper}>
        <ul className={sb.sidebarList}>
          <li className={sb.sidebarListItem}>
            <RssFeed className={sb.sidebarIcon} />
            <span className={sb.sidebarListItemText}>Feed</span>
          </li>
          <li className={sb.sidebarListItem}>
            <ChatSharp className={sb.sidebarIcon} />
            <span className={sb.sidebarListItemText}>Chats</span>
          </li>
          <li className={sb.sidebarListItem}>
            <PlayCircleFilledOutlined className={sb.sidebarIcon} />
            <span className={sb.sidebarListItemText}>Videos</span>
          </li>
          <li className={sb.sidebarListItem}>
            <Group className={sb.sidebarIcon} />
            <span className={sb.sidebarListItemText}>Groups</span>
          </li>
          <li className={sb.sidebarListItem}>
            <Bookmark className={sb.sidebarIcon} />
            <span className={sb.sidebarListItemText}>Bookmarks</span>
          </li>
          <li className={sb.sidebarListItem}>
            <HelpOutline className={sb.sidebarIcon} />
            <span className={sb.sidebarListItemText}>Questions</span>
          </li>
          <li className={sb.sidebarListItem}>
            <WorkOutline className={sb.sidebarIcon} />
            <span className={sb.sidebarListItemText}>Jobs</span>
          </li>
          <li className={sb.sidebarListItem}>
            <Event className={sb.sidebarIcon} />
            <span className={sb.sidebarListItemText}>Events</span>
          </li>
          <li className={sb.sidebarListItem}>
            <School className={sb.sidebarIcon} />
            <span className={sb.sidebarListItemText}>Courses</span>
          </li>
        </ul>
        <button className={sb.sidebarButton}>Show more</button>
        <hr className={sb.sidebarHr} />
        <ul className={sb.sidebarFriendList}>
          {Users.map((u)=>(
            <CloseFriend key={u.id} user={u}>
            </CloseFriend>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
