import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import { useState } from "react";
import { useParams } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Profile() {
  const [user, setUser] = useState({});
  const [post, setPost] = useState([]);
  const [flr, setFlr] = useState({});
  const [flwg, setFlwg] = useState({});
  const [followed, setFollowed] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const username = useParams().username;
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [currentuser, setCurrentuser] = useState({})


  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("/user?username=" + username);
      setUser(res.data);
      setCurrentuser(currentUser);
      setFlwg(user.followings);
      setFlr(user.followers);
    };

    fetchUser();
  }, [user, currentUser]);

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user._id));
  }, [currentUser, user]);


  useEffect(() => {
    const fetchPost = async () => {
      const posts = await axios.get("/post/profile/" + username);
      setPost(posts.data);
    };
    fetchPost();
  }, [user, currentUser]);

  const followUser = async () => {
    try {
      if (followed) {
        await axios.put("/user/" + user._id + "/unfollow", {
          userId: currentuser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put("/user/" + user._id + "/follow", {
          userId: currentuser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };

  Object.size = function (obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };
  var followersCount = Object.size(flr);
  var followingsCount = Object.size(flwg);

  return (
    <div className="profilePage">
      <Topbar />
      <div className="profileContainer">
        <div className="profileUser">
          <div className="profileImage">
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "/noAvatar.png"
              }
            />
          </div>
          <div className="profileInfo">
            <div className="profileUsernameDiv">
              <span className="profileUsername">{user.username}</span>
              {currentuser.username === user.username ? (
                <Link to={"/edit/profile/" + currentuser.username}>
                  <button className="profileEditButton">Edit Profile</button>
                </Link>
              ) : (
                <button className="profileEditButton" onClick={followUser} style={{background: "#0095f6", color: "white"}}>
                  {followed ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>
            <div className="profileUserCounts">
              <div className="profileUserCount">
                <span className="profileUserCountNumber">{post.length}</span>
                <span className="profileUserCountName">posts</span>
              </div>
              <div className="profileUserCount">
                <span className="profileUserCountNumber">{followersCount}</span>
                <span className="profileUserCountName">followers</span>
              </div>
              <div className="profileUserCount">
                <span className="profileUserCountNumber">
                  {followingsCount}
                </span>
                <span className="profileUserCountName">following</span>
              </div>
            </div>
            <div className="profileUserDesc">
              <span className="profileFullName">{user.fullname}</span>
              <span className="profileUserBio">{user.desc}</span>
            </div>
          </div>
        </div>
        <div className="profileUserPosts">
          {post.map((p) => (
            <div className="profileUserPost">
              <img className="profileUserPostImage" src={PF + p.img} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
