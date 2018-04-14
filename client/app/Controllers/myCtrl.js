angular.module('controllerModule', ['InstagramServiceModule'])
.controller('mainController', function($scope,  $rootScope, $location, instaServiceFact, $window) {
	
	var app = this;

	app.redirectUrl = 'http://localhost:8000/insta';
	app.screenName = '';
	app.twitterLocalStorage = $window.localStorage.getItem('twitter');
	app.instaLocalStorage = $window.localStorage.getItem('insta');

	app.twitterData = (typeof app.twitterLocalStorage == "string" ? JSON.parse(app.twitterLocalStorage) : app.twitterLocalStorage) || [];
	app.users = (typeof app.instaLocalStorage == "string" ? JSON.parse(app.instaLocalStorage) : app.instaLocalStorage) || [];

	console.log(app.twitterLocalStorage);
	console.log(app.instaLocalStorage);
	console.log(typeof app.twitterLocalStorage);
	console.log(typeof app.twitterLocalStorage == "string");

	app.hasScreenName = function() {
		
		var screenName = instaServiceFact.getScreenName();
		if(screenName=='' || screenName==null || screenName==undefined) {
			return false;
		} else {
			return true;
		}
	}

	app.getTwitterData = function() {
			
		var screenVar = app.screenName || instaServiceFact.getScreenName();
		instaServiceFact.getTweets(screenVar).then(function(data) {
			app.success = data.data.success;
			if(app.success == true) {
				app.twitterData = data.data.data;
				if(app.twitterData == []) {
					alert('no data');
					return;
				}
				app.screenName = screenVar;
				instaServiceFact.setScreenName(app.screenName);
				$window.localStorage.setItem('twitter', JSON.stringify(app.twitterData));
				$location.url('/twitter');
			} else {
				instaServiceFact.setScreenName();
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
				$window.localStorage.setItem('insta', JSON.stringify(app.users));
				console.log(app.users);		
			});
			

		}
	});

	

})

.directive('modalDirective', function() {
	return {
		restrict : 'E',
		templateUrl : './app/views/modal.html'
	}
})

