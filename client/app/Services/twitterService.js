angular.module('twitterServiceModule',[])
.factory('twitterServiceFact', function($http, $window, $location) {
	var twitterServiceFactory = {};

	// Get Tweets of the user for the provide screen name
	twitterServiceFactory.getTweets = function(screenName) {
		return $http({
			    url		: '/tweets', 
			    method	: "GET",
			    params	: {
			    	screen_name	: screenName
			    }
			 });
	}

	// Set Screen Name to local storage
	twitterServiceFactory.setScreenName = function(screenName) {
		if (screenName){
			$window.localStorage.setItem('screen-name', screenName);
		} else {
			$window.localStorage.removeItem('screen-name');
		}

	}

	// Get Screen Name from Local Storage
	twitterServiceFactory.getScreenName = function() {
		return $window.localStorage.getItem('screen-name');
	}

	// Set Twitter Data to local storage
	twitterServiceFactory.setTwitterData = function(twitterData) {
		if (twitterData){
			$window.localStorage.setItem('twitter', JSON.stringify(twitterData));
			$location.url('/twitter');
		} else {
			$window.localStorage.removeItem('twitter');
		}

	}

	// Get Twitter Data from local Storage
	twitterServiceFactory.getTwitterData = function() {
		return $window.localStorage.getItem('twitter');
	}

	return twitterServiceFactory;
});

