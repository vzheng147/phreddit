// Run this script to launch the server.
// The server should run on localhost port 8000.
// This is where you should start writing server-side code for this application.
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const linkflairsRoutes = require("./routes/linkflair");
const postsRoutes = require("./routes/post");
const communitiesRoutes = require("./routes/community");
const commentsRoutes = require("./routes/comment");

const app = express();

// Use default MongoDB URL and 'phreddit' as the database name
let mongoDB = "mongodb://127.0.0.1:27017/phreddit";

mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    console.log(`connected to database: ${res}`);
  });
let db = mongoose.connection;
db.on(
  "error",
  console.error.bind(console, "Server closed. Database instance disconnected.")
);
db.once("open", () => {
  console.log("Connected to MongoDB database: phreddit");
});

process.on("SIGINT", () => {
  console.log("Server closed. Database instance disconnected.");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/linkflairs", linkflairsRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/communities", communitiesRoutes);
app.use("/api/comments", commentsRoutes);

app.get("/", function (req, res) {
  res.send("Hello Phreddit!");
});

app.listen(8000, () => {
  console.log("Server listening on port 8000...");
});
