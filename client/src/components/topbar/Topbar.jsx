import React from 'react';
import "./topbar.css";
import { 
    Search,
    // Person,
    // Chat,
    // Notifications
     } from '@mui/icons-material';
import {Link} from "react-router-dom";
import { useContext } from 'react';
import {AuthContext} from '../../context/AuthContext';

export default function Topbar() {
    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const logout = () => {
        window.localStorage.clear();
        window.location.reload();
    }
    return (
        <div className="topbarContainer">
           
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className="logo" >Mrghdev</span>
                </Link>
            </div>

            {/* __________ Search bar____display:none______ */}
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className="searchIcon" />
                    <input
                        placeholder="Search for friend"
                        className="searchInput"
                    />
                </div>
            </div>
             {/* __________ Search bar___display:none_______ */}

            <div className="topbarRight">
                <div className="topbarLinks" >
                <Link to="/" style={{textDecoration:"none", color:"white", display: "flex"}}>
                    <span className="topbarLink">Homepage</span>
                </Link>

                    <span className="topbarLink" onClick={logout}>Logout</span>
                </div>

                {/* <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat />
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div> */}
                <Link to={`/profile/${user.username}`} style={{display: "flex", textDecoration:"none", alignItems: "center"}}>
                    <span className="topbarUsername">{user.username}</span>
                     <img src={user.profilePicture ? user.profilePicture : PF + "person/noAvatar.png"} alt="" className="topbarImg" />
                </Link>
            </div>
        </div>
    );
}