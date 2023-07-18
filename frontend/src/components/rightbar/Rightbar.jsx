import "./rightbar.css";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Friends from "../friends/Friends";
import { Link } from "react-router-dom";

function Rightbar() {
  const { user: currentUser } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const friendslst = [];
  const [profile, setProfile] = useState("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendsList = await axios.get("/user/all");
        friendsList.data.map((friend) => {
          if (friend.username !== currentUser.username) {
            friendslst.push(friend);
          }
        });
        setFriends(friendslst);
      } catch (err) {}
    };
    getFriends();

    setProfile(currentUser.profilePicture);
  }, [currentUser, currentUser.profilePicture]);

  return (
    <div className="rightBarContainer">
      <div className="rightBarUserProfile">
        <div className="rightBarUserProfileImage">
          <Link to={"/profile/" + currentUser.username}>
            <img src={profile ? PF + profile : PF + "/noAvatar.png"} />
          </Link>
        </div>
        <div className="rightBarUserName">
          <span>{currentUser.username}</span>
        </div>
      </div>
      <div className="rightBarFriendHeading">
        <span>Suggestions for you</span>
      </div>
      <div className="rightBarUserFriends">
        {friends.map((friend) => (
          <Friends key={friend._id} friend={friend} />
        ))}
      </div>
    </div>
  );
}

export default Rightbar;
