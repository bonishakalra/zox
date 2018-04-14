angular.module('appRoutes', ['ngRoute'])
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

/*app.run(['$rootScope', 'auth', '$location', function($rootScope,  auth, $location){
	$rootScope.$on('$routeChangeStart', function(event, next, current) {
		if(next.$$route.authenticated == true){
			if(!auth.isLoggedIn) {
				event.preventDefault();
				$location.path("/");
			}
		} 
		else if(!next.$$route.authenticated == false) {
			if(!auth.isLoggedIn) {
				event.preventDefault();
				$location.path("/profile");
			}
		}
	})	
}])*/

