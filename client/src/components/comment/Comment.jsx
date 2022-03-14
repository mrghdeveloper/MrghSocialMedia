import React from 'react';
import "./comment.css";
import { Link } from "react-router-dom";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

export default function Comment({ comment }) {
    return (
        <li className="commentItem">
            <div className="commentItemLeft">
                <Link to={`/profile/${comment.username}`}>
                    <img className="commentImg" src={comment.profilePicture ? comment.profilePicture : PF + "person/noAvatar.png"} alt="" />
                </Link>
                <Link to={`/profile/${comment.username}`} style={{textDecoration:"none", color: "black"}}>
                    <span className="commentUsername">{comment.username + ":"}</span>
                </Link>
            </div>
            <div className="commentItemRight">
                <span className="commentItemText">{comment.comment} </span>
            </div>
        </li>
    )
}
