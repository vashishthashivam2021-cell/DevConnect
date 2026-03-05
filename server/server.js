const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("../client"));
app.post("/login", (req, res) => {
  console.log(req.body);
  res.send("login purpose");
});
app.post("/register", (req, res) => {
  res.send("register purpose");
});
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
