const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// get a single user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    try {
      const user = userId
        ? await User.findById(userId)
        : await User.findOne({ username: username });

      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all user
router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    const usersList = [];

    Promise.all();
    users.forEach(async (user) => {
      const { password, updatedAt, ...other } = user._doc;
      await usersList.push(other);
    });

    res.status(200).json(usersList);
  } catch (err) {}
});

// update user
router.put("/:id", async (req, res) => {
  if (req.params.id === req.body.userId || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        res.status(500).json(err);
      }
    }

    try {
      const user = await User.findByIdAndUpdate(req.body.userId, {
        $set: req.body,
      });
      res.status(200).json("Account successfully updated");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json("You can only update your account");
  }
});

// delete user
router.delete("/:id", async (req, res) => {
  if (req.params.id === req.body.userId || req.body.isAdmin) {
    try {
      const user = await User.findOneAndDelete(req.body.userId);
      res.status(200).json("Account successfully deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json("You can delete only your account");
  }
});

// get friends
router.get("/friends/:userId", async (req, res) => {
  try {
    let friendlist = [];

    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );

    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendlist.push({ _id, username, profilePicture });
    });

    res.status(200).json(friendlist);
  } catch (err) {
    res.status(500).json(err);
  }
});

// follow user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("User has been followed");
      } else {
        res.status(403).json("You are already follow user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't follow yourself.");
  }
});

// unfollow user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("User has been unfollowed");
      } else {
        res.status(403).json("You are already unfollow user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't unfollow yourself.");
  }
});

module.exports = router;
