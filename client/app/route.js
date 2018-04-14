var app = angular.module('appRoutes', ['ngRoute', 'instagramServiceModule'])
.config(function($routeProvider, $locationProvider){
	$routeProvider
	.when('/', {
		/*templateUrl : './home.html'*/
	})
	.when('/insta', {
		templateUrl : '/app/views/insta.html'
	})
	.when('/twitter', {
		templateUrl : '/app/views/twitter.html'
	})
	.otherwise({
		redirectTo : "/"
	})

	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});
});
