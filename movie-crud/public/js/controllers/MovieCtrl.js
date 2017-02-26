movieApp.controller('MoviesController', function($scope,$rootScope,$location, $http, AdminCRUDService) {

   var dataRefresh = function () {
             var promise =  AdminCRUDService.getData('movi');
                            promise.then(function(data){
                            $scope.movieList = data;
              })
    };

    dataRefresh();

    $scope.bookMovie = function(movie){
    	$rootScope.bookedMovie = movie;
    	$location.path('/booking');
    }

    $scope.filterMovies = function(){
       $scope.movieList.length=0;
       if($scope.genre == 'All'){
        var promise =  AdminCRUDService.getData('movi');
             promise.then(function(data){
                 $scope.movieList = data;
           })
       }
       else{
            var promise =  AdminCRUDService.getData('movi');
                            promise.then(function(movies){
                                for(var movie of movies){
                                    var genresSpaceRemoved = movie.moviGenre.replace(/ /g,'')
                                    var genres = genresSpaceRemoved.split(',');
                                    for(var genre of genres){
                                        if(genre == $scope.genre){
                                            $scope.movieList.push(movie);
                                        }
                                    }
                                }
                            });
            }
        
    }

});