import axios from "axios";
import "./storyview.css";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Close } from "@material-ui/icons";
import { Link } from "react-router-dom";

function StoryView() {
  const [story, setStory] = useState({});
  const [user, setUser] = useState({});
  const storyId = useParams().storyId;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const fetchStory = async () => {
      const res = await axios.get("/story/" + storyId);
      setStory(res.data);
    };
    fetchStory();
    const fetchUser = async () => {
      setUser(await axios.get("/user?userId=" + story.userId));
    };
    fetchUser();
  }, [storyId, user]);
  return (
    <div className="storyViewContainer">
      <Link to="/">
        <Close style={{ color: "#fff" }} className="closeIcon" />
      </Link>
      <div className="storyView">
        <img src={PF + story.img} />
      </div>
    </div>
  );
}

export default StoryView;
