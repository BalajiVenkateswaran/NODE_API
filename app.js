const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongodb = require('mongodb');


const userRoutes = require('./api/routes/users');
const MongoClient = require('mongodb').MongoClient;



// const uri = "mongodb+srv://balaji:balaji99@@ollservice-rqs4a.mongodb.net/admin";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect((err,client) => {
//     if(err) throw err;
//     const db = client.db('ollservice');
// });
var mongodbUri ='mongodb://balaji0551c:balaji99@ds127015.mlab.com:27015/oll';
mongoose.connect(mongodbUri, {useNewUrlParser: true});

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req,res,next )=>{
    console.log(req);
    res.header("Access-Control-Allow-Origin", "*");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
      }
      next();
});

app.use('/', userRoutes);

app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
});

module.exports = app;
