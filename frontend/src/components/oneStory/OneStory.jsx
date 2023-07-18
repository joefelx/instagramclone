import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./oneStory.css";

function OneStory({ story }) {
  const [user, setUser] = useState({});
  const [pic, setPic] = useState("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("/user?userId=" + story.userId);
      setUser(res.data);
      setPic(user.profilePicture);
    };
    fetchUser();
  }, [story, user]);

  return (
    <Link to={"/story/" + story._id} style={{textDecoration: "none", color: "black"}}>
      <div className="storyFriend">
        <div className="storyProfileImgDiv">
          <img className="storyProfileImg" src={pic && PF + pic} />
        </div>
        <span className="storyUsername" >{user.username}</span>
      </div>
    </Link>
  );
}

export default OneStory;
