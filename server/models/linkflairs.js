// LinkFlair Document Schema
const mongoose = require("mongoose");

const linkFlairSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
});

const LinkFlairModel = mongoose.model("LinkFlair", linkFlairSchema);

module.exports = LinkFlairModel;
