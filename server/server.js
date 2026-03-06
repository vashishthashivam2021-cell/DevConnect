require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const User = require("./models/user");

const connectDB = require("./config/db");

connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));

app.get("/index",(req,res)=>{
  console.log("index.html is our home page");
})
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
 const matched= await User.findOne({username});

 if(!matched){
  return res.send("you have to registered first")
 }

 else if(matched.password!==password){
return res.send("incorrect password")
 }
 else {
res.sendFile(path.join(__dirname, "../client/feed.html"));
 } 
});


app.post("/register", async (req,res)=>{

  const {username,password} = req.body;

  const existingUser = await User.findOne({username});

  if(existingUser){
     return res.send("Username already exists");
  }

  const newUser = new User({username,password});
  await newUser.save();

  res.send("success");

});


// app.post("/register", (req, res) => {
//    const { username, password } = req.body;
//    console.log(req.body);
//    res.sendFile(path.join(__dirname, "../client/feed.html"));
// });

app.post("/AddPost",(req,res)=>{
    res.sendFile(path.join(__dirname,"../client/AddPost.html"))
})

app.post("/Thoughts",(req,res)=>{
    res.sendFile(path.join(__dirname,"../client/Thoughts.html"))
})




app.listen(process.env.PORT, () => {
  console.log("Server running");
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
