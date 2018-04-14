angular.module('instagramServiceModule',[])
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

	// Set Instagram Data to local storage
	instaServiceFactory.setInstaData = function(instaData) {
		if (instaData){
			$window.localStorage.setItem('insta', JSON.stringify(instaData));
		} else {
			$window.localStorage.removeItem('insta');
		}

	}

	// Get Instagram Data from local storage
	instaServiceFactory.getInstaData = function() {
		return $window.localStorage.getItem('insta');
	}

	

	return instaServiceFactory;
})
