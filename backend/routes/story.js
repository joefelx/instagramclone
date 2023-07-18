const router = require("express").Router();
const Story = require("../models/Story");
const User = require("../models/User");

// create new story
router.post("/", async (req, res) => {
  const newStory = new Story(req.body);
  try {
    const savedStory = await newStory.save();
    res.status(200).json(savedStory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// edit story
router.put("/:id", async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (req.body.userId === story.userId) {
      await story.updateOne({ $set: req.body });
      res.status(200).json("Story has been successfully updated!");
    } else {
      res.status(403).json("You can only edit your story!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete story
router.delete("/:id", async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (req.body.userId === story.userId) {
      await story.deleteOne();
      res.status(200).json("Story has been successfully deleted!");
    } else {
      res.status(403).json("You can only delete your story!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a story
router.get("/:id", async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    res.status(200).json(story);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get friend story
router.get("/friends/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userStory = await Story.find({ userId: currentUser._id });

    const friendStory = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Story.find({ userId: friendId });
      })
    );

    res.status(200).json(userStory.concat(...friendStory));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
