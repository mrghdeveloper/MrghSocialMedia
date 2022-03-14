import React from 'react';
import "./bookmarkPosts.css";
import Post from "../../components/post/Post";
import axios from "axios";
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function BookmarkPosts() {
    const { user } = useContext(AuthContext);
    const [bookmarkedPostIds, setBookmarkedPostIds] = useState([]);
    const [posts, setPosts] = useState([]);

    //fetch bookmarks
    useEffect(() => {
        const fetchBookmarkedPostsInfo = async () => {
            try {
                const res = await axios.get("/posts/bookmarks/" + user._id);
                setBookmarkedPostIds(res.data.bookmarkedPostIds);
                setPosts(res.data.bookmarkedPosts)
            } catch (err) {
                console.log(err);
            }
        }
        fetchBookmarkedPostsInfo();
    }, [user._id]);


    return (
        <div className="bookmarkContainer">
            {posts.map((p) => (
                <Post key={p._id} post={p} bookmarks={bookmarkedPostIds} />
            ))}
        </div>
    )
}
