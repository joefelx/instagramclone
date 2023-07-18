const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Story", storySchema);
