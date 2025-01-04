// Community Document Schema
const mongoose = require("mongoose");

const communitySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  postIDs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  startDate: {
    type: Date,
    required: true,
  },
  members: {
    type: [String],
    required: true,
  },
});

communitySchema.virtual("memberCount").get(function () {
  return this.members.length;
});

communitySchema.set("toObject", { virtuals: true });
communitySchema.set("toJSON", { virtuals: true });

const CommunityModel = mongoose.model("Community", communitySchema);

module.exports = CommunityModel;
