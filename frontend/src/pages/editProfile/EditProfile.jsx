import { useRef } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./editProfile.css";
import axios from "axios";
import { Redirect } from "react-router-dom";

function EditProfile() {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const username = useRef();
  const fullname = useRef();
  const desc = useRef();

  const handleClick = async (e) => {
    e.preventDefault();

    const editUser = {
      userId: user._id,
      username: username.current.value,
      fullname: fullname.current.value,
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      const fileName = file.name;
      data.append("file", file);
      data.append("name", fileName);
      editUser.profilePicture = fileName;

      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      await axios.put("/user/" + user._id, editUser);
      <Redirect path={"/profile" + user.username}></Redirect>;
    } catch (err) {}
  };

  return (
    <div className="content">
      <div className="editProfileContainer">
        <div className="editProfileUser">
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "noAvatar.png"
            }
            className="editProfileUserPic"
          />
          <span className="editProfileUsername">{user.username}</span>
        </div>
        <div className="editProfilePicUpload">
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className="editProfilePictureDiv">
          <img src="" />
        </div>
        <form className="editProfileInputs" onSubmit={handleClick}>
          <div className="editProfileInput">
            <div className="editProfileInputName">
              <span className="editProfileName" id="one">
                Name
              </span>
              <span className="editProfileName " id="two">
                Username
              </span>
              <span className="editProfileName " id="three">
                Bio
              </span>
            </div>
            <div className="editProfileInputField">
              <input type="text" ref={fullname} placeholder={user.fullname}/>
              <input type="text" ref={username} placeholder={user.username} />
              <input type="text" ref={desc} placeholder={user.desc} />
            </div>
          </div>

          <button type="submit" className="editProfileSubmit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
