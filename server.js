const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");

require('dotenv').config();
const app = express();

// ✅ Apply CORS middleware BEFORE routes

app.use(cors({
  origin: [
    "https://insta-sigma-seven.vercel.app",
    "http://localhost:3000",
    "https://insta-ac4c61tjo-vardhanchittaluri1122s-projects.vercel.app"
  ],
  credentials: true
}));



app.use(cookieParser());
app.use(express.json());
const Userapi = require('./Routes/Userapi');
const newpostapi = require('./Routes/NewPost');
const logincheck = require('./Routes/Logincheck');
const followers=require("./Routes/Followers");
const message=require("./Routes/Message");
app.use("/api/registra", Userapi);
app.use("/api/post", newpostapi);
app.use("/api/check", logincheck);
app.use("/public/followers", followers);
app.use("/api/message",message);
mongoose.connect(process.env.MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB error:", err));

app.get('/', (req, res) => {
  res.send("Server is running on port");
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Server is running on :4000');
});

