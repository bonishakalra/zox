/* require files */ 
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var request=require('request');
var router = express.Router();
var appRoutes = require('./server/api')(router);

/* declare a constant PORT */
const PORT = process.env.PORT || 8000;


/* Middlewares */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()); // parse application/json
app.use(appRoutes);
app.use(express.static(__dirname + '/client')); // Let the app use all the files under client folder


/* Redirect if any route to index.html */
app.get("*", function(req, res) {
	res.sendFile(path.join(__dirname + '/client/app/index.html'));
});



/* Listem to port provided by environemnt variables or run at port 8000 */
app.listen(PORT, function(){
	console.log('running server');
})