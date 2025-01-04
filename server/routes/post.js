const express = require("express");
const Post = require("../models/posts");
const LinkFlair = require("../models/linkflairs");
const Community = require("../models/communities");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (e) {
    res
      .status(400)
      .json({ message: "Error: fetching posts", error: e.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { post, community } = req.body;

    console.log("Request body:", req.body);

    let flair = post.linkFlairID
      ? await LinkFlair.findById(post.linkFlairID)
      : null;
    console.log("flair", flair);
    const newPost = new Post({
      title: post.title,
      content: post.content,
      linkFlairID: flair ? flair._id : null,
      postedBy: post.postedBy,
      postedDate: post.postedDate,
      commentIDs: [],
      views: post.views,
    });

    await newPost.save();
    
    const parentCommunity = await Community.findById(community);
    parentCommunity.postIDs.push(newPost._id);

    await parentCommunity.save();

    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (e) {
    res
      .status(400)
      .json({ message: "Error: adding new post", error: e.message });
  }
});

module.exports = router;
