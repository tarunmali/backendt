
const express=require('express');
const app=express();
var cors = require('cors')
// const mongoose= require('mongoose');
const connectDB=require('./DB/connection');
const MongoClient = require('mongodb').MongoClient;


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
app.use('/Api/viewGuardian', require('./Api/viewGuardian'));
app.use('/Api/editcustomtext', require('./Api/editcustomtext'));
app.use('/Api/sendsos', require('./Api/sendsos'));

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

app.get('/viewGuardian', (req, res) => {
    res.send("View Guardian");
});

app.get('/editcustomtext', (req, res) => {
    res.send("Edit custom text");
});

app.get('/sendsos', (req, res) => {
    res.send("Send sos message");
});





// const uri = "mongodb+srv://usernameakam:passwordakam@cluster0.xth6dmv.mongodb.net/one?retryWrites=true&w=majority";
// const client = new MongoClient(uri);
// const simulateAsyncPause = () =>
//   new Promise(resolve => {
//     setTimeout(() => resolve(), 1000);
//   });
// let changeStream;
// async function run() {
//   try {
//     const database = client.db("one");
//     const collection = database.collection("Messages");
//     // open a Change Stream on the "haikus" collection
//     changeStream = collection.watch();
//     // set up a listener when change events are emitted
//     changeStream.on("change", next => {
//       // process any change event
//       console.log("received a change to the collection: \t", next);
//     });
//     await simulateAsyncPause();
//     // await collection.insertOne({
//     //   title: "Record of a Shriveled Datum",
//     //   content: "No bytes, no problem. Just insert a document, in MongoDB",
//     // });
//     await simulateAsyncPause();
//     await changeStream.close();
    
//     // console.log("closed the change stream");
//   } finally {
//     await client.close();
//   }
// }



