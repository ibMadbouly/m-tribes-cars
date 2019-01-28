
const express  = require('express') ; // Express to build the server 
const bodyParser = require('body-parser') ; // body parser to parse requests
const routes = require('./routes/api') ; // router module
const mongoose = require('mongoose') ; // Mongo ORM
// to run locally cause we are using different port numbers for client and server
const cors = require('cors'); 

// creating server 
const app  = express();
app.use(cors()); 

// connection
mongoose.connect('mongodb://localhost/carsdata'); // local mongo instance
mongoose.Promise = global.Promise ; 

// check the connection is fine 
mongoose.connection.once('open',()=>{
    console.log("connection ready !!") ; 
}) ; 

// use body parser 
app.use(bodyParser.json()) ; 

// use the routes in router module 
app.use(routes) ; 

// check the server is running 
app.listen(5555 , ()=>{
    console.log("######## SERVER RUNNING #############") ; 
  }) ; 


