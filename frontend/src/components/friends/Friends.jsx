import { Link } from "react-router-dom";
import "./friends.css"

function Friends({friend}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div>
            <div className="rightBarUserFriend">
            <div className="rightBarUserFriendProfileImage">
              <Link to={"/profile/"+friend.username} style={{width: "100%", height: "100%", objectFit: "contain"}}>
              <img
                src={
                  friend.profilePicture
                    ? PF + friend.profilePicture
                    : PF + "/noAvatar.png"
                }
              />
              </Link>
              
            </div>
            <div className="rightBarFriendUserName">
            <Link to={"/profile/"+friend.username} style={{textDecoration: "none", color: "#000"}}>
              <span>{friend.username}</span>
            </Link>
            </div>
            
          </div>
          
        </div>
    )
}

export default Friends
