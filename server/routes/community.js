const express = require("express");
const Community = require("../models/communities");
const Post = require("../models/posts");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const communities = await Community.find();
    res.status(200).json(communities);
  } catch (e) {
    res
      .status(400)
      .json({ message: "Error: fetching communities", error: e.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const community = await Community.findOne({ _id: id });
    let data = await Post.find({ _id: { $in: community.postIDs } });
    res.status(200).json(data);
  } catch (e) {
    res.status(400).json({ message: "Error: Failed to find community posts" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { community } = req.body;

    const newCommunity = new Community({
      name: community.name,
      description: community.description,
      postIDs: [],
      startDate: community.startDate,
      members: community.members,
    });

    await newCommunity.save();

    res.status(201).json({
      message: "Community created successfully",
      community: newCommunity,
    });
  } catch (e) {
    res
      .status(400)
      .json({ message: "Error: creating communities", error: e.message });
  }
});

module.exports = router;
