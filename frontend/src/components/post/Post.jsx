import "./post.css";
import {
  FavoriteBorderRounded,
  ChatBubbleOutlineRounded,
  SendRounded,
} from "@material-ui/icons";
import { useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useRef } from "react";
import Comments from "../comments/Comments";

function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const comment = useRef();

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("/user?userId=" + post.userId);
      setUser(res.data);
    };

    fetchUser();
  }, [post.userId]);

  const likehandler = async () => {
    try {
      await axios.put("/post/" + post._id + "/like", {
        userId: currentUser._id,
      });
    } catch (err) {}

    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const commentHandler = async (e) => {
    e.preventDefault();

    const newComment = {
      userId: currentUser._id,
      comment: comment.current.value,
    };
    try {
      await axios.put(`/post/${post._id}/comment`, newComment);
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  const editPost = async (e) => {
    try {
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async (e) => {
    e.preventDefault();
    try {
      if (post.userId === currentUser._id) {
        await axios.delete("/post/" + post._id);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  post.comments.map((comment) => {
    console.log(comment.comment);
  });

  return (
    <div className="postContainer">
      <div className="postTop">
        <div className="postPicUname">
          <div className="postProfile">
            <Link
              to={"/profile/" + user.username}
              style={{
                width: "100%",
                height: "100%",
                margin: "1px solid #e6e6e6",
              }}
            >
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "/noAvatar.png"
                }
                alt=""
              />
            </Link>
          </div>
          <div className="postUser">
            <span>{user.username}</span>
          </div>
        </div>
        {/* {user._id === currentUser._id && (
          <div className="postEdit">
            <MoreHorizRounded
              onClick={setClicked(true)}
              style={{ cursor: "pointer" }}
            />
            <div className="postEditOptions">
              <form onSubmit={editPost}>
                <button className="postEditOption" id="edit" type="submit">
                  Edit Post
                </button>
              </form>
              <form onSubmit={deletePost}>
                <button className="postEditOption" id="delete" type="submit">
                  Delete Post
                </button>
              </form>
            </div>
          </div>
        )} */}
      </div>
      <div className="postCenter">
        {post.img && <img src={PF + post.img} />}
      </div>
      <div className="postBottom">
        <div className="postBottomIcons">
          <div className="postBottomIcon">
            <FavoriteBorderRounded className="icon" onClick={likehandler} />
          </div>
          <div className="postBottomIcon">
            <ChatBubbleOutlineRounded className="icon" />
          </div>
          <div className="postBottomIcon">
            <SendRounded className="icon" />
          </div>
        </div>
        <div className="postBottomLikes">
          <span className="postBottomLikesCount">{like} likes</span>
        </div>
        <div className="postBottomComments">
          <span className="postCommentUser">{user.username}</span>
          <span className="postComment">{post.desc}</span>
        </div>
        {post.comments.map((comment) => {
          return <Comments comment={comment} />;
        })}
        <div className="postBottomCreated">
          <span className="postBottomCreatedTime">
            {format(post.createdAt)}
          </span>
        </div>
      </div>
      <form className="postBottomCommentBox" onSubmit={commentHandler}>
        <input type="text" placeholder="Add a comment..." ref={comment} />
        <button className="postBottomButton" type="submit">
          Post
        </button>
      </form>
    </div>
  );
}

export default Post;
