import React from 'react';
import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import axios from "axios";
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Feed({username}) {
  const [posts, setPosts] = useState([]);
  const {user} = useContext(AuthContext);
  const [bookmarkedPostsInfo, BookmarkedPostsInfo] = useState({});

  

  //fetch posts
  useEffect(() =>{
    const fetchPosts = async () =>{
      const res = username ? await axios.get("/posts/profile/" + username) : await axios.get("posts/timeline/" + user._id);
      const sortedPosts = res.data.sort((p1, p2) => {return new Date(p2.createdAt) - new Date(p1.createdAt);} );
      setPosts(sortedPosts);
    };
    fetchPosts();
  },[username, user._id]);

  //fetch bookmarks
  useEffect(() => { 
    const fetchBookmarkedPostsInfo = async () => {
      try {
        const res = await axios.get("/posts/bookmarks/"+user._id);
        BookmarkedPostsInfo(res.data);
      }catch(err) {
        console.log(err);
      }
    }
    fetchBookmarkedPostsInfo();
  },[username, user._id]);



  return (
    <div className="feed">
        <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
      {posts.map((p) => (
          <Post key={p._id} post={p} bookmarks={bookmarkedPostsInfo.bookmarkedPostIds}/>
      ))}
      </div>
    </div>
  );
}
