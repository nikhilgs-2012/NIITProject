angular.module('ShowCtrl', []).controller('ShowtimeController', function($scope,$http) {

	$scope.tagline = 'Show detals add here!';

    var loadtheater = function() {
        $http.get('/theater/getTheater').success(function(response) {
            console.log('READ Show time THEATERS IS SUCCESSFUL');
            $scope.theaterList = response;
           $scope.theater = "";
        });
    };
   
   loadtheater();

	var refresh = function() {
        $http.get('/showTime/getShowTime').success(function(response) {
            console.log('READ Show time IS SUCCESSFUL');
           $scope.showtimeList = response;
           $scope.show = "";
        });
    };
   
   refresh();

    $scope.addShowTime = function(show) {
             //console.log(response);
            var showtimedb = {
            	theaterName:show.theaterName,
                showtime:show.showtime
            };
           
           // $http.defaults.headers.post["Content-Type"] = "application/json";

            $http({
                    method: 'POST',
                    url: '/showTime/addShowTime',
                    headers: {'Content-Type': 'application/json'},    
                    data: showtimedb
                })
                .then(function(response) {
                    console.log(response);
                    console.log("CREATE IS SUCCESSFUL");
                    refresh();
                });
                refresh()    
    };
 

    $scope.removeShowTime = function(show) {
                        
        $http.delete('/showTime/deleteShowTime/'+ show._id).success(function(response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
    };

    $scope.editShowTime = function(show) {
    	 
         $http.get('/showTime/getShowTime/' + show._id).success(function(response) {
            console.log(response[0]);
            $scope.show = response[0];
            console.log("edit success")
        });
    };

    $scope.updateShowTime = function(show) {
        console.log("REACHED UPDATE");
        console.log($scope.show._id);
        $http.put('/showTime/updateShowTime/' + $scope.show._id, $scope.show).success(function(response) {
            console.log(response);
            refresh();
        })
    }
   
 });