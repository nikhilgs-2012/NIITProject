angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController',
			access: {restricted: false}
		})

		.when('/booking', {
			templateUrl: 'views/booking.html',
			controller: 'BookingController',
			access: {restricted: false}
		})
		.when('/confirm', {
			templateUrl: 'views/confirm.html',
			controller: 'ConfirmController',
			access: {restricted: false}
		})

		.when('/movies', {
        templateUrl: 'views/movies.html',
        controller: 'MoviesController',
        access: {restricted: false}
    	})

		.when('/admin',{
  			templateUrl:'views/admin.html',
  			controller:'AdminController',
  			access:{restricted:true}
  		})
  		.when('/login', {
      		templateUrl: 'partials/login.html',
      		controller: 'loginController',
      		access: {restricted: false}
    	})
    	.when('/logout', {
      		controller: 'logoutController',
      		access: {restricted: true}
    	})
    	.when('/register', {
      		templateUrl: 'partials/register.html',
      		controller: 'registerController',
      		access: {restricted: false}
    	});

	$locationProvider.html5Mode(true);

	movieApp.run(function ($rootScope, $location, $route, AuthService) {
	  $rootScope.$on('$routeChangeStart',
	    function (event, next, current) {
	      AuthService.getUserStatus()
	      .then(function(){
	        if (next.access.restricted && !AuthService.isLoggedIn()){
	          $location.path('/login');
	          $route.reload();
	        }
	      });
	  });
	});

}]);

