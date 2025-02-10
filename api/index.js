const express = require('express')
const cors = require('cors')
const app = express();

// Explicitly allow CORS for your frontend
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
app.use(express.json());

app.post('/register',(req,res)=>{
    const {username,password} = req.body;


    res.json({requestData:{username,password}});
});

app.listen(4000);