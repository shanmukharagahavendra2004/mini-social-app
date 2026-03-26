const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  const post = await Post.create({
    userId: req.user.id,
    username: req.user.username,
    text: req.body.text,
    image: req.file ? req.file.filename : ""
  });
  res.json(post);
};

exports.getFeed = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
};

exports.likePost = async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (!post.likes.includes(req.user.username)) {
    post.likes.push(req.user.username);
  } else {
    post.likes = post.likes.filter(u => u !== req.user.username);
  }
  await post.save();
  res.json(post);
};

exports.commentPost = async (req, res) => {
  const post = await Post.findById(req.params.postId);
  post.comments.push({
    username: req.user.username,
    comment: req.body.comment
  });
  await post.save();
  res.json(post);
};