angular.module('controllerModule', ['instagramServiceModule'])
.controller('mainController', function($rootScope, $location, instaServiceFact, twitterServiceFact) {
	
	var app = this;

	app.redirectUrl = 'http://localhost:8000/insta';
	app.screenName = '';

	// Get twitter and Insta data from Local Storage
	app.twitterLocalStorage = twitterServiceFact.getTwitterData();
	app.instaLocalStorage = instaServiceFact.getInstaData();
	app.twitterData = (typeof app.twitterLocalStorage == "string" ? JSON.parse(app.twitterLocalStorage) : app.twitterLocalStorage) || [];
	app.users = (typeof app.instaLocalStorage == "string" ? JSON.parse(app.instaLocalStorage) : app.instaLocalStorage) || [];

	// Check if user has Screen Name for Twitter
	app.hasScreenName = function() {
		
		var screenName = twitterServiceFact.getScreenName();
		if(screenName=='' || screenName==null || screenName==undefined) {
			return false;
		} else {
			return true;
		}
	}

	// Get User's Twitter Data from server
	app.getTwitterData = function() {
		
		// screenVar can be obtained from the user input or local Storage	
		var screenVar = app.screenName || twitterServiceFact.getScreenName();

		twitterServiceFact.getTweets(screenVar).then(function(data) {
			app.success = data.data.success;
			console.log(app.success);
			if(app.success == true) {
				app.twitterData = data.data.data;
				if(app.twitterData == []) {
					alert('no data');
					return;
				}
				app.screenName = screenVar;
				twitterServiceFact.setScreenName(app.screenName);
				twitterServiceFact.setTwitterData(app.twitterData);
			} else {
				alert('No user for this screen Name. Please enter again');
				app.screenName = '';
				twitterServiceFact.setScreenName();
			}		
		});
		
		
	}

	$rootScope.$on('$locationChangeSuccess', function($event, next, current) { 

		if(current.indexOf('access_token')!==-1) {
			
			// Get access token from the url
			var accessToken = current.split('access_token=')[1];

			// Get user information from access Token received above
			instaServiceFact.getUserData(accessToken).then(function(data){
				app.users = data.data.data;
				instaServiceFact.setInstaData(app.users);		
			});
			

		}
	});

	

})
// directive returns modal for entering screen name
.directive('modalDirective', function() {
	
	return {
		restrict : 'E',
		templateUrl : './app/views/modal.html',
	}
		
})

