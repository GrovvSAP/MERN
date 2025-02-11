const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const User = require ('./models/User');
const bcrypt = require ('bcryptjs');
const app = express();


const salt = bcrypt.genSaltSync(10);


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
    try{
    const userDoc = await User.create({
        username,
        password:bcrypt.hashSync(password,salt),
    });
    res.json(userDoc);
    }catch(e){
        res.status(400).json(e);
    }
   // res.json({requestData:{username,password}});

});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });

    if (!userDoc) {
        return res.status(400).json({ message: "User not found" });
    }

    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (!passOk) {
        return res.status(400).json({ message: "Incorrect password" });
    }

    res.json({ message: "Login successful" });
});

app.listen(4000);