// Comment Document Schema
const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  commentIDs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  commentedBy: {
    type: String,
    required: true,
  },
  commentedDate: {
    type: Date,
    required: true,
  },
});

const CommentModel = mongoose.model("Comment", commentSchema);

module.exports = CommentModel;
