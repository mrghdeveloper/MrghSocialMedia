import React from 'react'
import "./otherUsers.css";
import {Link} from "react-router-dom"

const PF = process.env.REACT_APP_PUBLIC_FOLDER;

export default function OtherUsers({user}) {
  

  return (
    <li className="sidebarFriend">
    <Link  to={`/profile/${user.username}`}>
      <img className="sidebarFriendImg" src={user.profilePicture ? user.profilePicture : PF+"person/noAvatar.png"} alt="" />
    </Link>
    <Link to={`/profile/${user.username}`}  style={{ textDecoration: "none", color: "black" }}>
      <span className="sidebarFriendName" >{user.username}</span>
      </Link>
    </li>
  );
}