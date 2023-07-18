import axios from "axios";
import React, { useState } from "react";

function Comments({ comment }) {
  const [user, setUser] = useState({});
  const fetchUser = async () => {
    const res = await axios.get("/user?userId=" + comment.userId);
    setUser(res.data);
  };
  fetchUser();
  return (
    <div>
      <div className="postBottomComments">
        <span className="postCommentUser">{user.username}</span>
        <span className="postComment">{comment.comment}</span>
      </div>
    </div>
  );
}

export default Comments;
