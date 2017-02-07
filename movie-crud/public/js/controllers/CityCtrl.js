angular.module('CityCtrl', []).controller('CityController', function($scope,$http) {

	$scope.tagline = 'City detals add here!';

	var refresh = function() {
        $http.get('/city/getCity').success(function(response) {
            console.log('READ CITY IS SUCCESSFUL');
           $scope.cityList = response;
           $scope.city = "";
        });
    };
   
   refresh();

    $scope.addCity = function(city) {
             //console.log(response);
            var citydb = {
            	cityName:city.cityName
            };
           
           // $http.defaults.headers.post["Content-Type"] = "application/json";

            $http({
                    method: 'POST',
                    url: '/city/addCity',
                    headers: {'Content-Type': 'application/json'},    
                    data: citydb
                })
                .then(function(response) {
                    console.log(response);
                    console.log("CREATE IS SUCCESSFUL");
                    refresh();
                });
                refresh()    
    };
 

    $scope.removeCity = function(city) {
                        
        $http.delete('/city/deleteCity/'+ city._id).success(function(response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
    };

    $scope.editCity = function(city) {
    	 
         $http.get('/city/getCity/' + city._id).success(function(response) {
            console.log(response[0]);
            $scope.city = response[0];
            console.log("edit success")
        });
    };

    $scope.updateCity = function(city) {
        console.log("REACHED UPDATE");
        console.log($scope.city._id);
        $http.put('/city/updateCity/' + $scope.city._id, $scope.city).success(function(response) {
            console.log(response);
            refresh();
        })
    }
   
 });