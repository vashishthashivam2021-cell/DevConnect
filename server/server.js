const express = require("express");
const app = express();
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("../client"));

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  res.sendFile(path.join(__dirname, "../client/feed.html"));
});

app.post("/register", (req, res) => {
   const { username, password } = req.body;
   console.log(req.body);
   res.sendFile(path.join(__dirname, "../client/feed.html"));
});

app.post("/AddPost",(req,res)=>{
    res.sendFile(path.join(__dirname,"../client/AddPost.html"))
})

app.post("/Thoughts",(req,res)=>{
    res.sendFile(path.join(__dirname,"../client/Thoughts.html"))
})
app.listen(8080, () => {
  console.log("server is running at port 8080");
});

// const mongoose = require("mongoose");
// require("dotenv").config();
// const PORT = process.env.PORT || 5000;
// mongoose.connect(process.env.MONGO_URI, {
//   serverSelectionTimeoutMS: 30000
// })
// .then(() => {
//     console.log("MongoDB Connected Successfully");
// })
// .catch((err) => {
//     console.log("MongoDB Connection Error:", err);
// });
