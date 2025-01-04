// initializeDB.js - Will add initial application data to MongoDB database
// Run this script to test your schema
// Start the mongoDB service as a background process before running the script
// Pass URL of your mongoDB instance as first argument
// (e.g., mongodb://127.0.0.1:27017/fake_so)

const mongoose = require("mongoose");
const CommunityModel = require("./models/communities");
const PostModel = require("./models/posts");
const CommentModel = require("./models/comments");
const LinkFlairModel = require("./models/linkflairs");

let userArgs = process.argv.slice(2);

if (!userArgs[0].startsWith("mongodb")) {
  console.log(
    "ERROR: You need to specify a valid mongodb URL as the first argument"
  );
  return;
}

let mongoDB = userArgs[0];
mongoose.connect(mongoDB);
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

function createLinkFlair(linkFlairObj) {
  let newLinkFlairDoc = new LinkFlairModel({
    content: linkFlairObj.content,
  });
  return newLinkFlairDoc.save();
}

function createComment(commentObj) {
  let newCommentDoc = new CommentModel({
    content: commentObj.content,
    commentedBy: commentObj.commentedBy,
    commentedDate: commentObj.commentedDate,
    commentIDs: commentObj.commentIDs,
  });
  return newCommentDoc.save();
}

function createPost(postObj) {
  let newPostDoc = new PostModel({
    title: postObj.title,
    content: postObj.content,
    postedBy: postObj.postedBy,
    postedDate: postObj.postedDate,
    views: postObj.views,
    linkFlairID: postObj.linkFlairID,
    commentIDs: postObj.commentIDs,
  });
  return newPostDoc.save();
}

function createCommunity(communityObj) {
  let newCommunityDoc = new CommunityModel({
    name: communityObj.name,
    description: communityObj.description,
    postIDs: communityObj.postIDs,
    startDate: communityObj.startDate,
    members: communityObj.members,
  });
  return newCommunityDoc.save();
}

async function initializeDB() {
  // link flair objects
  const linkFlair1 = {
    // link flair 1
    linkFlairID: "lf1",
    content: "The jerkstore called...",
  };
  const linkFlair2 = {
    //link flair 2
    linkFlairID: "lf2",
    content: "Literal Saint",
  };
  const linkFlair3 = {
    //link flair 3
    linkFlairID: "lf3",
    content: "They walk among us",
  };
  const linkFlair4 = {
    //link flair 4
    linkFlairID: "lf4",
    content: "Worse than Hitler",
  };
  let linkFlairRef1 = await createLinkFlair(linkFlair1);
  let linkFlairRef2 = await createLinkFlair(linkFlair2);
  let linkFlairRef3 = await createLinkFlair(linkFlair3);
  let linkFlairRef4 = await createLinkFlair(linkFlair4);

  // comment objects
  const comment7 = {
    // comment 7
    commentID: "comment7",
    content: "Generic poster slogan #42",
    commentIDs: [],
    commentedBy: "bigfeet",
    commentedDate: new Date("September 10, 2024 09:43:00"),
  };
  let commentRef7 = await createComment(comment7);

  const comment6 = {
    // comment 6
    commentID: "comment6",
    content: "I want to believe.",
    commentIDs: [commentRef7],
    commentedBy: "outtheretruth47",
    commentedDate: new Date("September 10, 2024 07:18:00"),
  };
  let commentRef6 = await createComment(comment6);

  const comment5 = {
    // comment 5
    commentID: "comment5",
    content:
      "The same thing happened to me. I guest this channel does still show real history.",
    commentIDs: [],
    commentedBy: "bigfeet",
    commentedDate: new Date("September 09, 2024 017:03:00"),
  };
  let commentRef5 = await createComment(comment5);

  const comment4 = {
    // comment 4
    commentID: "comment4",
    content: "The truth is out there.",
    commentIDs: [commentRef6],
    commentedBy: "astyanax",
    commentedDate: new Date("September 10, 2024 6:41:00"),
  };
  let commentRef4 = await createComment(comment4);

  const comment3 = {
    // comment 3
    commentID: "comment3",
    content: "My brother in Christ, are you ok? Also, YTJ.",
    commentIDs: [],
    commentedBy: "rollo",
    commentedDate: new Date("August 23, 2024 09:31:00"),
  };
  let commentRef3 = await createComment(comment3);

  const comment2 = {
    // comment 2
    commentID: "comment2",
    content:
      "Obvious rage bait, but if not, then you are absolutely the jerk in this situation. Please delete your Tron vehicle and leave is in peace.  YTJ.",
    commentIDs: [],
    commentedBy: "astyanax",
    commentedDate: new Date("August 23, 2024 10:57:00"),
  };
  let commentRef2 = await createComment(comment2);

  const comment1 = {
    // comment 1
    commentID: "comment1",
    content:
      "There is no higher calling than the protection of Tesla products.  God bless you sir and God bless Elon Musk. Oh, NTJ.",
    commentIDs: [commentRef3],
    commentedBy: "shemp",
    commentedDate: new Date("August 23, 2024 08:22:00"),
  };
  let commentRef1 = await createComment(comment1);

  // post objects
  const post1 = {
    // post 1
    postID: "p1",
    title:
      "AITJ: I parked my cybertruck in the handicapped spot to protect it from bitter, jealous losers.",
    content:
      "Recently I went to the store in my brand new Tesla cybertruck. I know there are lots of haters out there, so I wanted to make sure my truck was protected. So I parked it so it overlapped with two of those extra-wide handicapped spots.  When I came out of the store with my beef jerky some Karen in a wheelchair was screaming at me.  So tell me prhreddit, was I the jerk?",
    linkFlairID: linkFlairRef1,
    postedBy: "trucknutz69",
    postedDate: new Date("August 23, 2024 01:19:00"),
    commentIDs: [commentRef1, commentRef2],
    views: 14,
  };
  const post2 = {
    // post 2
    postID: "p2",
    title: "Remember when this was a HISTORY channel?",
    content:
      'Does anyone else remember when they used to show actual historical content on this channel and not just an endless stream of alien encounters, conspiracy theories, and cryptozoology? I do.\n\nBut, I am pretty sure I was abducted last night just as described in that show from last week, "Finding the Alien Within".  Just thought I\'d let you all know.',
    linkFlairID: linkFlairRef3,
    postedBy: "MarcoArelius",
    postedDate: new Date("September 9, 2024 14:24:00"),
    commentIDs: [commentRef4, commentRef5],
    views: 1023,
  };
  let postRef1 = await createPost(post1);
  let postRef2 = await createPost(post2);

  // community objects
  const community1 = {
    // community object 1
    communityID: "community1",
    name: "Am I the Jerk?",
    description: "A practical application of the principles of justice.",
    postIDs: [postRef1],
    startDate: new Date("August 10, 2014 04:18:00"),
    members: ["rollo", "shemp", "catlady13", "astyanax", "trucknutz69"],
    memberCount: 4,
  };
  const community2 = {
    // community object 2
    communityID: "community2",
    name: "The History Channel",
    description: "A fantastical reimagining of our past and present.",
    postIDs: [postRef2],
    startDate: new Date("May 4, 2017 08:32:00"),
    members: ["MarcoArelius", "astyanax", "outtheretruth47", "bigfeet"],
    memberCount: 4,
  };
  let communityRef1 = await createCommunity(community1);
  let communityRef2 = await createCommunity(community2);

  if (db) {
    db.close();
  }
  console.log("done");
}

initializeDB().catch((err) => {
  console.log("ERROR: " + err);
  console.trace();
  if (db) {
    db.close();
  }
});

console.log("processing...");
