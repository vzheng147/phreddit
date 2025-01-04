const express = require("express");
const Comment = require("../models/comments");
const Post = require("../models/posts");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (e) {
    res
      .status(400)
      .json({ message: "Error: fetching comments", error: e.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { comment, root } = req.body;

    const newComment = new Comment({
      content: comment.content,
      commentIDs: [],
      commentedBy: comment.commentedBy,
      commentedDate: comment.commentedDate,
    });

    await newComment.save();

    let parent = await Post.findById(root);

    if (!parent) {
      parent = await Comment.findById(root);
    }

    parent.commentIDs.unshift(newComment._id);
    await parent.save();

    res.status(201).json({
      message: "Comment created successfully",
      comment: newComment,
    });
  } catch (e) {
    res
      .status(400)
      .json({ message: "Error: making new comment", error: e.message });
  }
});

module.exports = router;
