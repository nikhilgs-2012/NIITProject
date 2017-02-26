movieApp.controller('BookingController', function($scope, $rootScope,$location, AdminCRUDService) {


    $scope.movieBooked = $rootScope.bookedMovie;
    $scope.city = "Delhi";
    $rootScope.city = "Delhi";

    var dataRefresh = function() {

        var promise1 = new Promise(function(resolve, reject) {
            var assignedMovies = AdminCRUDService.getData('asmv');
            assignedMovies.then(function(data) {
                $scope.assignedMovieList = data;
                resolve(data);
            });
        });

        var promise2 = promise1.then(function(assignedMovies) {
            var showTimes = AdminCRUDService.getData('asst');
            showTimes.then(function(showTimes) {

                var theatres = [];
                for (let assMov of assignedMovies) {
                    var theatreObj = {};
                    if (assMov.asmvMovie == $scope.movieBooked.moviTitle && assMov.asmvCity == $scope.city) {
                        theatreObj.theatre = assMov.asmvTheatre;
                        theatreObj.fromDate = assMov.asmvFromDate;
                        theatreObj.toDate = assMov.asmvToDate;
                        theatreObj.movie = assMov.asmvMovie;
                        theatres.push(theatreObj);
                    }
                }
                $scope.theatresList = theatres;

                var movieShowTimings = [];
                for (let thrts of theatres) {
                    let showTimeTemp = [];
                    let theatreShowTimes = {};
                    for (let showtimes of showTimes) {
                        if (thrts.theatre == showtimes.asstTheatre) {
                            theatreShowTimes.theatre = showtimes.asstTheatre;
                            theatreShowTimes.fromDate = thrts.fromDate;
                            theatreShowTimes.toDate = thrts.toDate;
                            showTimeTemp.push(showtimes.asstTime);
                        }
                    }
                    theatreShowTimes.showTimings = showTimeTemp;
                    movieShowTimings.push(theatreShowTimes);
                    $rootScope.movieName = thrts.movie;
                }
                $rootScope.theatreDetails = movieShowTimings;


                console.log($rootScope.theatreDetails);
            })
        });
    }

    dataRefresh();

    $scope.handleThisElement = function($event) {
        $rootScope.splitId = $event.target.id.split('-');
        var splitId = $event.target.id.split('-');
        $rootScope.totalSeats = 0;
        var theatres = AdminCRUDService.getData('thtr');
        theatres.then(function(theatres) {
            for (let theatre of theatres) {
                if (theatre.thtrName == splitId[0]) {
                    $rootScope.totalSeats = theatre.totalSeat;
                    $rootScope.ticketPrice = theatre.ticketPrice;
                }
            }
            $location.path('confirm')
        });
    }




});