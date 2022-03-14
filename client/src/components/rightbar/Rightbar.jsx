import React from 'react'
import "./rightbar.css";
import OtherUsers from "../otherUsers/OtherUsers"
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Add, Remove } from '@mui/icons-material';

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [userFriends, setUserFriends] = useState([]);
  const [currentUserFriends, setCurrentUserFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);


  //get user's friends
  useEffect(() => {
    const getFriends = async () => {
      try {
        const userFriendsList = await axios.get(`/users/friends/${user._id}`);
        setUserFriends(userFriendsList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

   //get currentUser's friends
  useEffect(() => {
    const getFriends = async () => {
      try {
        const currentUserFriendsList = await axios.get(`/users/friends/${currentUser._id}`);
        setCurrentUserFriends(currentUserFriendsList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [currentUser]);

  // get currentUser's followingslist 

  useEffect(() => {
    const fetchFollowins = async () => {
      try {
        const res = await axios.get(`/users/followings/${currentUser._id}`);
        const followingsList = res.data
        setFollowed(followingsList.includes(user?._id));
      } catch (err) {
        console.log(err);
      }
    }
    fetchFollowins();
  })

  //follow/unfollow handler

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
      window.location.reload();
    } catch (err) {
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle"> Following</h4>
        <ul className="rightbarFriendList">
          {currentUserFriends.map((u, index) => (
            <OtherUsers key={index} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}

        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "-"}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {userFriends.map((friend) => (
            <Link
              key={friend._id}
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none",color: "black", marginRight:"20px", textAlign: "center", display: "flex", justifyContent: "center"}}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}

        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}