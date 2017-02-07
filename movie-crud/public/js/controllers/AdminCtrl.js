angular.module('adminCtrl', []).controller('AdminController', function($scope, $http) {

    $scope.tagline = 'Add your movies here!';

    $scope.booking = 'booking';

    var refresh = function() {
        $http.get('/movie/getMovie').success(function(response) {
            console.log('READ IS SUCCESSFUL');
            $scope.moviList = response;
            $scope.movi = "";
        });
    };

    refresh();

    $scope.addMovie = function(movi) {
        $http.get(`http://www.omdbapi.com/?t=${movi.moviTitle}&plot=short&r=json`).success(function(response) {
            //console.log(response);
            var movieObj = {};
            for (var key in response) {
                if (key == 'Title' || key == 'Language' || key == 'Poster' || key == 'Genre' || key == 'Director' || key == 'Actors') {
                    movieObj[key] = response[key];

                }
            }
           
            //$http.defaults.headers.post["Content-Type"] = "application/json";

            $http({
                    method: 'POST',
                    url: '/movie/addMovie',
                    headers: {'Content-Type': 'application/json'},    
                    data: movieObj
                })
                .then(function(response) {
                    console.log(response);
                    console.log("CREATE IS SUCCESSFUL");
                    refresh();
                });


            // var serviceName = 'movi'
            // $http.post('/movie/addMovie', movieObj).success(function(response) {
            //     console.log(response);
            //     console.log("CREATE IS SUCCESSFUL");
            //     refresh();
            // });

        });
        console.log($scope.contact);

    };

    $scope.removeMovie = function(movie) {
        //console.log(id);
        $http.delete('/movie/deleteMovie/' + movie._id).success(function(response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
    };

    $scope.editMovie = function(movie) {
        console.log(movie);
        $http.get('/movie/getMovie/' + movie._id).success(function(response) {
            $scope.movi = response[0];
        });
    };

    $scope.updateMovie = function() {
        console.log("REACHED UPDATE");
        console.log($scope.movi._id);
        $http.put('/movie/updateMovie/' + $scope.movi._id, $scope.movi).success(function(response) {
            console.log(response);
            refresh();
        })
    }


    //  ---- THEATER CRUD FUNCTIONS ----- //


    var refresh = function() {
        $http.get('/theater/getTheater').success(function(response) {
            console.log('READ THEATERS IS SUCCESSFUL');
            $scope.theaterList = response;
           $scope.theater = "";
        });
    };
   
   refresh();

    $scope.addTheater = function(theater) {
             //console.log(response);
            var theaterdb = {
                theaterName:theater.theaterName,
                city:theater.city,
                seats:theater.seats
            };
           
            //$http.defaults.headers.post["Content-Type"] = "application/json";

            $http({
                    method: 'POST',
                    url: '/theater/addTheater',
                    headers: {'Content-Type': 'application/json'},    
                    data: theaterdb
                })
                .then(function(response) {
                    console.log(response);
                    console.log("CREATE IS SUCCESSFUL");
                    refresh();
                });
                refresh()    
       
    };
 

    $scope.removeTheater = function(theater) {
        
        $http.delete('/theater/deleteTheater/' + theater._id).success(function(response) {
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
    };

    $scope.editTheater = function(theater) {
        console.log(theater);
        $http.get('/theater/getTheater/' + theater._id).success(function(response) {
            $scope.theater = response[0];
            console.log("edit success")
        });
    };

    $scope.updateTheater = function(theater) {
        console.log("REACHED UPDATE");
            $http.put('/theater/updateTheater/' + $scope.theater._id, $scope.theater).success(function(response) {
            console.log(response);
            refresh();
        })
    }


    //  ---- CITY CRUD FUNCTIONS ----- //

    var refresh = function() {
        $http.get('/city/getCity').success(function(response) {
            console.log('READ CITY IS SUCCESSFUL');
            $scope.cityrList = response;
           $scope.theater = "";
        });
    };
   
   refresh();

    $scope.addCity = function(city) {
             //console.log(response);
            var citydb = {
                cityName:city.cityName,
                
            };
           
            //$http.defaults.headers.post["Content-Type"] = "application/json";

            $http({
                    method: 'POST',
                    url: '/city/addCity',
                    headers: {'Content-Type': 'application/json'},    
                    data: theaterdb
                })
                .then(function(response) {
                    console.log(response);
                    console.log("CREATE IS SUCCESSFUL");
                    refresh();
                });
                refresh()    
       
    };
 

    $scope.removeTheater = function(city) {
        
        $http.delete('/city/deleteCity/' + city._id).success(function(response) {
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
    };

    $scope.editTheater = function(city) {
        
        $http.get('/city/getCity/' + city._id).success(function(response) {
            $scope.city = response[0];
            console.log("edit success")
        });
    };

    $scope.updateTheater = function(city) {
        console.log("REACHED UPDATE");
            $http.put('/city/updateCity/' + $scope.city._id, $scope.city).success(function(response) {
            console.log(response);
            refresh();
        })
    }







});