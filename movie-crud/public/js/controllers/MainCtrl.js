movieApp.controller('MainController', function($scope, $location,$rootScope, AdminCRUDService) {

 $scope.name='test';


	$scope.horrorMovies = [];
    $scope.thrillerMovies = [];
    $scope.comedyMovies = [];
    $scope.actionMovies = [];
    $scope.dramaMovies = [];
    $scope.familyMovies = [];

	var refresh = function () {
        var promise =  AdminCRUDService.getData('movi');
                                    promise.then(function(movies){
                                        for(var movie of movies){
                                            var genresSpaceRemoved = movie.moviGenre.replace(/ /g,'')
                                            var genres = genresSpaceRemoved.split(',');
                                            for(var genre of genres){
                                                if(genre == 'Comedy'){
                                                    $scope.comedyMovies.push(movie);
                                                }
                                                else if(genre == 'Horror'){
                                                    $scope.horrorMovies.push(movie);
                                                }
                                                else if(genre == 'Thriller'){
                                                    $scope.thrillerMovies.push(movie);
                                                }
                                                else if(genre == 'Action'){
                                                    $scope.actionMovies.push(movie);
                                                }
                                                else if(genre == 'Drama'){
                                                    $scope.dramaMovies.push(movie);
                                                }
                                                else if(genre == 'Family'){
                                                    $scope.familyMovies.push(movie);
                                                }
                                            }
                                        }
                                        
                                    })
    };

    refresh();

    $scope.bookMovie = function(movie){
    	$rootScope.bookedMovie = movie;
    	$location.path('/booking');
    }

});