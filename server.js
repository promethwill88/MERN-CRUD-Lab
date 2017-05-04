'use strict'

//import dependencies
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    Comment = require('./model/comments');

//create instances
var app = express(),
    router = express.Router();

// set port to env or 3000
var port = process.env.API_PORT || 3001;

//db config
//ADD YOUR INFO HERE!
mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds131621.mlab.com:31621/mern-comment-box');

//config API to use bodyParser and look for JSON in req.body
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

//Prevent CORS errors
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //Remove caching
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//set route path and init API
router.get('/', function(req,res) {
  res.json({message: 'API Initialized!'});
});

// delete all comments
router.route('/nuke').get(function(req,res){
  Comment.remove(function(err,succ){
  res.json(succ);
  });
});

//add /comments route to our /api router here

//use router config when we call /API
app.use('/api', router);

//start server
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
