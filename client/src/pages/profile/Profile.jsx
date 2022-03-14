import React from 'react'
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import {useParams} from "react-router";
import EditProfile from '../../components/editProfile/EditProfile';
import { AuthContext } from '../../context/AuthContext';

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const username = useParams().username;
    const [edit, setEdit] = useState(false);
    const { user: currentUser} = useContext(AuthContext);

    useEffect(() => {
      const fetchUser = async () => {
        const res = await axios.get(`/users?username=${username}`);
        setUser(res.data);
      };
      fetchUser();
    }, [username]);

    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src={user.coverPicture ? user.coverPicture : PF +"person/noCover.jpeg"}
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={user.profilePicture ? user.profilePicture : PF +"person/noAvatar.png"}
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.fullName ? user.fullName : user.username}</h4>
                            <span className="profileInfoDesc">{user.username}</span>
                            { (username === currentUser.username) && <button className="editProfileBtn" onClick={()=>{setEdit(!edit)}}>Edit Profile</button>}
                        </div>
                    </div>

                    {(username === currentUser.username) && edit && <EditProfile user = {user}/>}

                    <div className="profileRightBottom">
                        <Feed username={username}/>
                        <Rightbar user = {user} />
                    </div>
                </div>
            </div>
        </>
    );
}