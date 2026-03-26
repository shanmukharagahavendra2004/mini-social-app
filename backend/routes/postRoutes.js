const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage });

router.post("/create", upload.single("image"), async (req, res) => {
  const post = new Post({
    username: req.body.username,
    text: req.body.text,
    image: req.file ? req.file.filename : ""
  });
  await post.save();
  res.json(post);
});

router.get("/feed", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

router.put("/like/:id", async (req, res) => {
  const username = req.body.username;
  const post = await Post.findById(req.params.id);
  post.likes.push(username);
  await post.save();
  res.json(post);
});

router.post("/comment/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.comments.push({
    username: req.body.username,
    comment: req.body.comment
  });
  await post.save();
  res.json(post);
});

module.exports = router;