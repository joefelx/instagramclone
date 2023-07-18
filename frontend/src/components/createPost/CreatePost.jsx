import axios from "axios";
import { useState } from "react";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./createPost.css";

function CreatePost({ show }) {
  const captions = useRef();
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: captions.current.value,
    };

    if (file) {
      const data = new FormData();
      const filename = file.name;
      data.append("file", file);
      data.append("name", filename);
      newPost.img = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.post("/post", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      className="createPostContainer"
      style={show ? { display: "flex" } : { display: "none" }}
      onSubmit={submitHandler}
    >
      <div className="createPost">
        <div className="createPostHeading">
          <span>Create New Post</span>
        </div>
        <div className="createPostInputText">
          <input type="text" placeholder="Write a Caption" ref={captions} />
        </div>
        <div className="createPostInputImage">
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className="createPostButton">
          <button type="submit" className="post">
            Post
          </button>
        </div>
      </div>
    </form>
  );
}

export default CreatePost;
