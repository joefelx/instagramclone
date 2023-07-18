import "./home.css";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar";
import Story from "../../components/story/Story";
import CreatePost from "../../components/createPost/CreatePost";
import { useState } from "react";

function Home() {
  return (
    <div>
        <Topbar />
      <div className="homeContainer">
        <div className="leftbarContainer">
        <Story/>
        <Feed />
        </div>
        <div className="rightbarContainer">
        <Rightbar/>
        </div>
      </div>
    </div>
  );
}

export default Home;
