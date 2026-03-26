const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    username: String,
    text: String,
    image: String,
    likes: {
      type: [String],
      default: []
    },
    comments: {
      type: [
        {
          username: String,
          comment: String
        }
      ],
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);