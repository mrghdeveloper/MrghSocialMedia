import axios from 'axios';
import React, { useState, useRef, useEffect} from 'react';
import "./comments.css";
import Comment from "../comment/Comment";

export default function Comments({ currentUser, post }) {
    const [comments, setComments] = useState([])

    // post a comment

    const newInpute = useRef();
    const submitHandler = async (e) => {
        e.preventDefault();
        const newComment = newInpute.current.value;
        const {userId, profilePicture, username, ...others} = currentUser;
        try {
            axios.put("/posts/" + post._id + "/comments", { newComment, userId, profilePicture, username });
            window.location.reload();
        } catch (err) { }
    };

    // fetch all comments

    useEffect(() => {
        const fechComments = async () => {
            try{
               const res = await axios.get("/posts/" + post._id + "/comments");
               setComments(res.data);
            }catch(err){}
        };
        fechComments();
    },[post._id])



    return (
        <div className="comments">
            <div className="commentsWrapper">
                <form className="commentsTop" onSubmit={submitHandler}>

                    <input
                        placeholder={"Add a comment as " + currentUser.username + "..."}
                        className="CommentInpute"
                        ref={newInpute}
                    />
                    <button className="postbtn" type="submit">Post</button>

                </form>
                <div className="commentsDown">
                    <ul className="commentsList">
                        {comments.map((c, index) => (
                            <Comment key={index} comment={c} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
