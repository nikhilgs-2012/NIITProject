angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/booking', {
			templateUrl: 'views/booking.html',
			controller: 'BookingController'
		})
		.when('/confirm', {
			templateUrl: 'views/confirm.html',
			controller: 'ConfirmController'
		})

		.when('/movies', {
        templateUrl: 'views/movies.html',
        controller: 'MoviesController'
    	})

		.when('/admin',{
  			templateUrl:'views/admin.html',
  			controller:'AdminController'
  		});

	$locationProvider.html5Mode(true);

}]);