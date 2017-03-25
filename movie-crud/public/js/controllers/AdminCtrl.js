// example with services

movieApp.controller('AdminController', function($scope, $http, $filter, AdminCRUDService) {

$scope.tagline = 'Book your movies here!';

var collections = ['city', 'thtr', 'stim', 'movi', 'asmv', 'asst'];

var dataRefresh = function (collections) {
        collections.forEach(function(collection){
                                var promise =  AdminCRUDService.getData(collection);
                                    promise.then(function(data){
                                        $scope[`${collection}List`] = data;
                                        $scope[collection] = "";
                                    })
                             });
    };

dataRefresh(collections);

$scope.addData = function(model){ 
    var serviceName = (Object.keys(model)[0]).substring(0,4);   
    var promise =  AdminCRUDService.addData(model, serviceName);
    promise.then(function(data){
        dataRefresh([serviceName]);
    })

}

$scope.deleteData= function(model){
    var serviceName = (Object.keys(model)[1]).substring(0,4);
    var promise =  AdminCRUDService.deleteData(model, serviceName);
    promise.then(function(data){
      dataRefresh([serviceName]);
    })
}

$scope.editData = function(model){
    var serviceName = (Object.keys(model)[1]).substring(0,4);
    var promise =  AdminCRUDService.editData(model, serviceName);
    promise.then(function(data){
        $scope[serviceName] = data[0];
    })
}

$scope.updateData = function(model){
    var serviceName = (Object.keys(model)[1]).substring(0,4);
    var promise =  AdminCRUDService.updateData(model, serviceName);
    promise.then(function(data){
        dataRefresh([serviceName]);
    })
}
    // movie insert
    $scope.insertMovie=function(movi){
                        $http.get(`http://www.omdbapi.com/?t=${movi.moviTitle}&plot=short&r=json`).success(function (response) {
                            //console.log(response);
                            var movieObj={};
                            for(var key in response){
                                if(key=='Title' || key== 'Language' || key== 'Poster' || key== 'Genre' || key== 'Director' || key== 'Actors'){
                                    movieObj[key] = response[key];
                                     
                                }
                            }
                      
                            var serviceName = 'movi';  
                            var promise =  AdminCRUDService.addData(movieObj, serviceName);
                            promise.then(function(data){
                                dataRefresh([serviceName]);
                            })
                        });

}

// load theatres based on city

    $scope.loadTheatres = function(){
       $scope.cityTheatres = [];
       for(var theatre of $scope.thtrList){
            if(theatre.city == $scope.asmv.asmvCity){
                $scope.cityTheatres.push(theatre)
            }
       }

    }

 //constructAssignMovieModel
    $scope.addAssignMovie = function(model){
       // var fromDate =  $filter('date')(model.asmvFromDate, 'shortDate');
       // var toDate = $filter('date')(model.asmvToDate, 'shortDate');

       var fromDate = moment(model.asmvFromDate).format('l');
       var toDate = moment(model.asmvToDate).format('l');

        model.asmvFromDate = fromDate;
        model.asmvToDate = toDate;
        $scope.addData(model);
    }   

});