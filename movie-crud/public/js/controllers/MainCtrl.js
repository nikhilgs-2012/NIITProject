angular.module('MainCtrl', []).controller('MainController', function($scope,$http) {

	$scope.tagline = 'Welcome to movie booking website!';

		$http.get('/movie/getMovie').success(function(response) {
            console.log('MOVIELIST SUCCESSFUL');
            $scope.moviList = response;
            console.log($scope.moviList);
        });
   
});