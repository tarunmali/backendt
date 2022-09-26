const express=require('express');
const app=express();
var cors = require('cors')
const mongoose= require('mongoose');
const connectDB=require('./DB/connection');



app.use(express.json());
app.use(cors())


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.json({extended:false}));

const middleware=(req,res, next )=>{
    console.log('Hello my Middleware');
    next();
}



app.use('/Api/signup', require('./Api/signup'));
app.use('/Api/signin', require('./Api/signin'));
app.use('/Api/addGuardian', require('./Api/addGuardian'));


connectDB();
const Port= process.env.PORT || 3001;

app.listen(Port, () => {
    console.log(`Server running on port ${Port}`);
  });




  app.get('/signin', (req, res) => {
    res.send("sign in");
});


app.get('/signup', (req, res) => {
    res.send("signup");
});

app.get('/addGuardian', (req, res) => {
    res.send("Add Guardian");
});


