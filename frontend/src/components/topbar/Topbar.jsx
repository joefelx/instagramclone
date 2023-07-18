import "./topbar.css";
import { HomeRounded } from "@material-ui/icons";
import {
  SendRounded,
  AddBoxRounded,
  ExploreRounded,
  FavoriteBorderRounded,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import CreatePost from "../createPost/CreatePost";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

function Topbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [show, setShow] = useState(false);
  const [currentUser, setCurrentUser] = useState({})
  const { user } = useContext(AuthContext);
  const handleClicks = () => {
    return show ? setShow(false) : setShow(true);
  };

    useEffect(() => {
      setCurrentUser(user)
    }, [user]);

  return (
    <div className="container">
      <div className="topbarContainer">
        <div className="topbarLeft">
          <div className="topbarLogo">
            <Link to="/" style={{ display: "flex", alignItems: "center" }}>
              <img src={PF + "/instagram-logo.png"} alt="" />
            </Link>
          </div>
        </div>
        <div className="topbarCenter">
          <div className="topbarSearch">
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarIcons">
            <div className="topbarIcon">
              <Link to="/" style={{textDecoration: "none", color: "black"}}>
              <HomeRounded className="icon" />
              </Link>
            </div>
            <div className="topbarIcon">
              <SendRounded className="icon" />
            </div>
            <div className="topbarIcon">
              <AddBoxRounded className="icon" onClick={handleClicks} />
            </div>
            <div className="topbarIcon">
              <ExploreRounded className="icon" />
            </div>
            <div className="topbarIcon">
              <FavoriteBorderRounded className="icon" />
            </div>
            <div className="topbarIcon">
              <Link
                to={"/profile/"+currentUser.username}
                style={{ textDecoration: "none", color: "black" }}
              >
                  <img 
                  className="topbarProfilePicture"
                  src={currentUser.profilePicture
                  ? PF + currentUser.profilePicture
                  : PF + "noAvatar.png"}  />
                
              </Link>
            </div>
          </div>
        </div>
      </div>
      <CreatePost show={show} />
    </div>
  );
}

export default Topbar;
