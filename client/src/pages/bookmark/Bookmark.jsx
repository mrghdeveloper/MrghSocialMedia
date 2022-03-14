import React from 'react';
import "./bookmark.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import BookmarkPosts from "../../components/bookmarkPosts/BookmarkPosts"
import Rightbar from "../../components/rightbar/Rightbar";;

export default function Bookmark() {

  return (
    <>
    <Topbar />
    <div className="container">
      <Sidebar />
      <BookmarkPosts />
      <Rightbar/>
    </div>
  </>
  )
}
