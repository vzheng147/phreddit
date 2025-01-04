// Post Document Schema
const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  linkFlairID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LinkFlair",
  },
  postedBy: {
    type: String,
    required: true,
  },
  postedDate: {
    type: Date,
    required: true,
  },
  commentIDs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  views: {
    type: Number,
    required: true,
  },
});

const PostModel = mongoose.model("Post", postSchema);

module.exports = PostModel;
