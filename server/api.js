var Twitter = require('twitter');
require('dotenv').load();

module.exports = function(router){
	
	/* creating Twitter object conatining all required enviroment variables */
	/*var twitter = new Twitter({
	  consumer_key: process.env.CONSUMER_KEY,
	  consumer_secret: process.env.CONSUMER_SECRET,
	  access_token_key: process.env.ACCESS_TOKEN_KEY,
	  access_token_secret: process.env.ACCESS_TOKEN_SECRET
	});*/

	var twitter = new Twitter({
	  consumer_key: 'BRtUOpFKgTJwLGs9OyfIDPzro',
	  consumer_secret: 'rD7PzcJse1Gzu0aUkTE0w2xgplZr0EebQXRNnXuXuSBBJHWm0o',
	  access_token_key: '984527088093822976-VPvF0FO0NTGM41V4oll3UOLwdWYF8K0',
	  access_token_secret: 'zVmRdXqpEPs89SqWqtpblVM9kQtcEf8PRokC8FKpTRvm2'
	});

	var screenName = ''; 
	var tweetsData = [];

	// Middleware use to get data from twitter
	router.use("/tweets", function(req, res, next){

		var screenName = req.query.screen_name;
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
			res.json({success: false, message: 'no screen name provided'});
		}
	})

	// takes data from middleware and sends the data to the the client side
	router.get("/tweets", function(req, res) {
		res.json({success : true, data : tweetsData});	
	});

	return router;
}
