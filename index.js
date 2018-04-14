/* require files */ 
var express = require('express');
var app = express();
var path = require('path');
var Twitter = require('twitter');
var bodyParser = require('body-parser');
var request=require('request')
require('dotenv').load();

/* declare a constant PORT */
const PORT = process.env.PORT || 8000;


//middleware
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

/* creating Twitter object conatining all required enviroment variables */
var twitter = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

var screenName = ''; 
var tweetsData = [];

app.use("/tweets", function(req, res, next){

	console.log('screenName' + req.query.screen_name);
	var screenName = req.query.screen_name;
	console.log('screenName2' + screenName);
	if(screenName!='' && screenName != undefined) {
		var params = {screen_name: screenName};

		twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
		  if (!error) {
			tweetsData = tweets;
			next();
		  }
		  else {
		  	res.json({success: false, message: 'no tweets for user'});
		  }
		});
	}
	else {
		res.json({success: false, message: 'no screenname provided'});
	}
})

app.get("/tweets", function(req, res) {
	res.json({success : true, data : tweetsData});
	
	
});


 /* Let the app use all the files under client folder */
app.use(express.static(__dirname + '/client'));


/* Redirect if any route to index.html */
app.get("*", function(req, res) {
	res.sendFile(path.join(__dirname + '/client/app/index.html'));
});


/* Listem to port provided by environemnt variables or run at port 8000 */
app.listen(PORT, function(){
	console.log('running server');
})