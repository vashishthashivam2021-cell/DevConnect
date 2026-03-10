const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

username:String,
password:String,
fullname:String,
profilePhoto:{
type:String,
default:"default.png"
}

});

module.exports = mongoose.model("User",userSchema);