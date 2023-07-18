const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// create post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// edit post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (req.body.userId === post.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Your post has been successfully updated");
    } else {
      res.status(403).json("You can only edit your post.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("Your post has been successfully deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// get post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// like/dislike post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("You liked this post");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("You disliked this post");
    }
  } catch (err) {
    console.log(err);
  }
});

// timeline post
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });

    const friendsPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );

    res.status(200).json(userPosts.concat(...friendsPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

// get user's post and profile
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    return res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id/comment", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await post.updateOne({
      $push: {
        comments: {
          userId: req.body.userId,
          comment: req.body.comment,
        },
      },
    });

    res.status(200).json("Commented on the post");
  } catch (err) {
    console.log(err);
  }
});

// router.get("/:id/comment", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     const comments = await post.comments;
//     res.status(200).json(post.comments);
//   } catch (err) {
//     console.log(err);
//   }
// });

module.exports = router;
