import React from 'react';
import "./post.css";
import { BookmarkBorder, Bookmark } from '@mui/icons-material';
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { format } from 'timeago.js';
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import Comments from "../comments/Comments";





export default function Post({ post , bookmarks}) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({}); // this user is post owner 
  const { user: currentUser, dispatch } = useContext(AuthContext); // user is already in use so I change it to currentUser
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(bookmarks.includes(post._id));
  const [postEvent, setPostEvent] = useState("");
  const [followingsList, setFollowingsList] = useState([]);

  // bookmark Handler
  const bookmarkHandler = async () => {
    try {
     await axios.put("/posts/" + post._id + "/bookmark", { userId: currentUser._id });
    } catch (err) {
      console.log(err);
    }
    setIsBookmarked(!isBookmarked);
  }

  // Like 
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);


  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) { }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

    // get currentUser's followingsList

    useEffect(() => {
      const fetchFollowins = async () => {
        try {
          const res = await axios.get(`/users/followings/${currentUser._id}`);
          setFollowingsList(res.data)
        } catch (err) {
          console.log(err);
        }
      }
      fetchFollowins();
    },[currentUser._id])

  //Follow/Unfollow/Delete handler

    useEffect(() => {
      if(post.userId === currentUser._id) {
        setPostEvent("deletePost")
      } else if(!followingsList.includes(post.userId)) {
        setPostEvent("follow")
      } else {
        setPostEvent("unfollow")
      }
    },[post.userId, followingsList, post._id, currentUser._id]);


    const postEventHandler = async() => {
      try{
        switch(postEvent){
          case "deletePost":
            await axios.delete("/posts/" + post._id, {data: { userId: currentUser._id }});
            window.location.reload();
            break;
          case "follow":
            await axios.put(`/users/${post.userId}/follow`, { userId: currentUser._id });
            dispatch({ type: "FOLLOW", payload: post.userId });
            window.location.reload();
            break;
          case "unfollow":   
            await axios.put(`/users/${post.userId}/unfollow`, { userId: currentUser._id });
            dispatch({ type: "UNFOLLOW", payload: post.userId });
            window.location.reload();
            break;
          default:
            window.location.reload();
        }    
      } catch (err) {}
    }

  // Fech User
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`} >
              <img
                className="postProfileImg"
                src={user.profilePicture ? user.profilePicture : PF + "person/noAvatar.png"}
                alt=""
              />
            </Link>
            <Link to={`/profile/${user.username}`} style={{ textDecoration: "none", color: "black" }}>
              <span className="postUsername">
                {user.username}
              </span>
            </Link>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
              { 
                (postEvent === "deletePost") ? 
                  <button  className="postEventbtn" onClick={postEventHandler} >Delete</button>
                :(postEvent === "follow") ?
                  <button  className="postEventbtn" onClick={postEventHandler} >Follow</button> : <button className="postEventbtn" onClick={postEventHandler} >Unfollow</button>
              }      
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={PF + "/heart.png"} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            {isBookmarked ? <Bookmark onClick={bookmarkHandler} /> : <BookmarkBorder onClick={bookmarkHandler} />}
          </div>
        </div>
        <Comments post={post} currentUser={currentUser} />

      </div>
    </div>
  );
}

