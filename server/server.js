require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const User = require("./models/user");
const Post = require("./models/post");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");

connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post("/addpost", upload.single("image"), async (req, res) => {
  const { username, text } = req.body;
  const newPost = new Post({
    username: username,
    text: text,
    image: req.file ? req.file.filename : null,
  });
  await newPost.save();
  res.redirect("/feed.html");
});

app.get("/posts", async (req, res) => {
  const posts = await Post.find().sort({ date: -1 });
  res.json(posts);
});

app.post("/like/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.likes = post.likes + 1;
  await post.save();
  res.json({ likes: post.likes });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const matched = await User.findOne({ username });

  if (!matched) {
    return res.send("you have to registered first");
  }

  const isMatch = await bcrypt.compare(password, matched.password);
  if (!isMatch) {
    return res.send("incorrect password");
  }

  res.send("success");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.send("Fields cannot be empty");
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.send("Username already exists");
  }

  const hashed = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashed });
  await newUser.save();

  res.send("success");
});

app.listen(process.env.PORT, () => {
  console.log("Server running");
});