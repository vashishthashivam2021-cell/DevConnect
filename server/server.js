const express = require("express")
const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("DevConnect API is running")
});

const PORT = 5000;

app.listen(PORT,(req,res)=>{
    console.log("server running on port",PORT);
})