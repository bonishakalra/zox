angular.module('InstagramServiceModule',[])
.factory('instaServiceFact', function($http, $window) {
	var instaServiceFactory = {};


	// instaServiceFact.getUserData(accessToken) - receives accessToken from controller and returns 5 recent media of the user
	instaServiceFactory.getUserData = function(accessToken) {
		return $http({
			    url		: 'https://api.instagram.com/v1/users/self/media/recent/', 
			    method	: "GET",
			    params	: {
			    	access_token	: accessToken,
			    	count 			: 9
			    }
			 })
	}

	instaServiceFactory.getTweets = function(screenName) {
		return $http({
			    url		: '/tweets', 
			    method	: "GET",
			    params	: {
			    	screen_name	: screenName
			    }
			 });
	}

	instaServiceFactory.setScreenName = function(screenName) {
		if (screenName){
			$window.localStorage.setItem('screen-name', screenName);
		} else {
			$window.localStorage.removeItem('screen-name');
		}

	}

	instaServiceFactory.getScreenName = function() {
		return $window.localStorage.getItem('screen-name');
	}

	return instaServiceFactory;
})