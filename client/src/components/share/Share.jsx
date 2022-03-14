import React, { useRef, useState } from 'react';
import "./share.css";
import { PermMedia, Cancel } from '@mui/icons-material';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Link } from "react-router-dom";


export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  //Upload Post Photo
  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {

//____________WITHOUT CLOUDINARY___________
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (err) { }

//____________WITHOUT CLOUDINARY___________
//____________USE CLOUDINARY___________
      // const data = new FormData();
      // data.append("file", file);
      // data.append("upload_preset", "SocialMediaUploads");
      // try {
      //   const uploadRes = await axios.post(
      //     "https://api.cloudinary.com/v1_1/<YOUR ACCOUNT ID>/image/upload",
      //     data
      //   );
      //   const { url } = uploadRes.data;
      //   newPost.img = url;
      // } catch (err) { }

//____________USE CLOUDINARY___________
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) { }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
        <Link to={`/profile/${user.username}`} style={{ display:"flex"}} >
              <img
                className="shareProfileImg"
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
         </Link>
          <input
            placeholder={"What's on your mind, " + user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>

        <hr className="shareHr" />

        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}

        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
