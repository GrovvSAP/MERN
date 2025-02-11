const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const User = require ('./models/User');
const app = express();

// Explicitly allow CORS for your frontend
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
app.use(express.json());
const MONGO_URI = "mongodb+srv://yanividov:Gi1DA1dfMMqqXCLg@cluster0.k9owp.mongodb.net/comments?retryWrites=true&w=majority&authSource=admin";

mongoose.set('strictQuery', false); // Required for new MongoDB versions

mongoose.connect(MONGO_URI)
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => console.error("❌ MongoDB connection error:", err));

app.post('/register',async (req,res)=>{
    const {username,password} = req.body;
    const userDoc = await User.create({username,password});
    res.json(userDoc);


    res.json({requestData:{username,password}});
});

app.listen(4000);