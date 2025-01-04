const express = require("express");
const LinkFlair = require("../models/linkflairs");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const linkflairs = await LinkFlair.find();
    res.status(200).json(linkflairs);
  } catch (e) {
    res
      .status(400)
      .json({ message: "Error: featching linkflairs", error: e.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { linkFlair } = req.body;
    const result = await LinkFlair.findOne({ content: linkFlair });

    if (result) {
      // case if the linkflair already exist
      res.status(409).json({
        message: "The linkfalir has already exist",
      });
    } else {
      const newLinkFlair = new LinkFlair({ content: linkFlair });
      await newLinkFlair.save();
      res
        .status(201)
        .json({ message: "Link flair created successfully", newLinkFlair });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
