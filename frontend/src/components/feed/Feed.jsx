import React from "react";
import Post from "../post/Post";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import axios from "axios";

function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/post/profile/" + username)
        : await axios.get("/post/timeline/" + user._id);

      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user]);

  return (
    <div className="feedContainer">
      {posts.map((p) => {
        return <Post key={p._id} post={p} />;
      })}
    </div>
  );
}

export default Feed;
