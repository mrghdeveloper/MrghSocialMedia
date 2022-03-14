import React from 'react';
import "./sidebar.css";
import {
  RssFeed,
  Search,
  // Chat,
  Bookmark,
} from '@mui/icons-material';
import { useContext, useEffect, useState } from "react";
import OtherUsers from "../otherUsers/OtherUsers";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


export default function Sidebar() {
  const { user: currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  const search = (users) => {
    return users.filter(user => user.username.toLowerCase().includes(query) || user.fullName.toLowerCase().includes(query))
  }

  useEffect(() => {
    const fechUsers = async () => {
      const res = await axios.get('/users/allUsers');
      setUsers(res.data);
    }
    fechUsers();
  }, []);



  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Link to="/" style={{ textDecoration: "none", color: "black", display: "flex" }}>
              <RssFeed className="sidebarIcon" />
            </Link>
            <Link to="/" style={{ textDecoration: "none", color: "black", display: "flex" }}>
              <span className="sidebarListItemText">Feed</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link to={"/bookmarks/" + currentUser._id} style={{ textDecoration: "none", color: "black", display: "flex" }}>
              <Bookmark className="sidebarIcon" />
            </Link>
            <Link to={"/bookmarks/" + currentUser._id}  style={{ textDecoration: "none", color: "black", display: "flex" }}>
              <span className="sidebarListItemText">Bookmarks</span>
            </Link>
          </li>
          {/* <li className="sidebarListItem">
          <Chat className="sidebarIcon" />
          <span className="sidebarListItemText">Chats</span>
        </li> */}
        </ul>
        <hr className="sidebarHr" />
        <h4 className="sidebarTitle">Other Users</h4>
          <div className="searchbarSidbar">
            <Search className="searchIconSidbar" />
            <input
               placeholder="Search for friend"
               className="searchInputSidbar"
               onChange={(e)=> setQuery(e.target.value)}
             />
          </div>
        <ul className="sidebarFriendList">
          {(search(users) ? search(users) : users).map((u) => (
            <OtherUsers key={u._id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  )
}
