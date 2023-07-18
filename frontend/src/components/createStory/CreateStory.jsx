import axios from "axios";
import { useState } from "react";
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./createStory.css";

function CreateStory() {
  const captions = useRef();
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newStory = {
      userId: user._id,
    };

    if (file) {
      const data = new FormData();
      const filename = file.name;
      data.append("file", file);
      data.append("name", filename);
      newStory.img = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.post("/story", newStory);
      window.location.replace("/")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      className="createPostContainer"
      onSubmit={submitHandler}
    >
      <div className="createPost">
        <div className="createPostHeading">
          <span>Create New Story</span>
        </div>
        <div className="createPostInputImage">
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className="createPostButton">
          <button type="submit" className="post">
            Create Story
          </button>
        </div>
      </div>
    </form>
  );
}

export default CreateStory;
