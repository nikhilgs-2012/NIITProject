movieApp.controller('ConfirmController', function($scope, $http, $filter,$rootScope, AdminCRUDService) {

$scope.theatreDetails = $rootScope.theatreDetails;
  		$scope.splitId = $rootScope.splitId;
  		$scope.totalSeats = "";
  		$scope.ticketPrice = $rootScope.ticketPrice;
  		$scope.seatsAvailable = false;
  		$scope.lessSeats = false;
  		$scope.houseFull = false;
  		$scope.showTotalAmount = false;

  		var bookedDetailsModel = {};
  			bookedDetailsModel.bktcCity = $rootScope.city;
			bookedDetailsModel.bktcTheatreName = $scope.splitId[0];
			bookedDetailsModel.bktcShowTime = $scope.splitId[1];
  		
  	  var bookedDate="";

      var collectBookingInformation = function(){
	        for(let thrtDet of $scope.theatreDetails){
	        	if(thrtDet.theatre == $scope.splitId[0]){
		         var a = moment(thrtDet.fromDate, 'MM/DD/YYYY');
		         var b = moment(thrtDet.toDate, 'MM/DD/YYYY');
		         let differenceDays = b.diff(a, 'days');
		         
		         $scope.dates = [];
		         $scope.dates.push(a.format('l'));
		         for(let i =1; i<=differenceDays; i++){
		         	var tempDate = moment(a).add(i, 'days').format('MM/DD/YYYY');
		         	$scope.dates.push(tempDate);
		         }
		        }
	          } 

	          
		   		
		   		
	      }

	   collectBookingInformation();

	   $scope.noteDate = function ($event) {
	   	$scope.lessSeats = false;
	   	$scope.houseFull = false;
	   	$scope.showTotalAmount = true;
	   	$scope.bookedSuccessfully = false;

	   	bookedDetailsModel.bktcDate =  $event.target.id;
	    let promise = AdminCRUDService.getData('avtc');
	   			promise.then(function(datas){
	   			  if(datas.length > 0){	
	   				for(let data of datas){
	   					if(data.avtcCity == bookedDetailsModel.bktcCity &&
						   data.avtcTheatreName == bookedDetailsModel.bktcTheatreName &&
						   data.avtcShowTime == bookedDetailsModel.bktcShowTime &&
						   data.avtcDate == bookedDetailsModel.bktcDate){
						   	if(data.avtcAvailableTickets == 0){
						   		$scope.houseFull = true;
						   		$scope.seatsAvailable = false;
						   		break;
						   	}else{
						   		bookedDetailsModel.bktcAvailableTickets = data.avtcAvailableTickets;
	   							$scope.totalSeats = bookedDetailsModel.bktcAvailableTickets;
	   							$scope.seatsAvailable = true;
	   							break;
						   	}
	   					}
	   					else{
			   			  	bookedDetailsModel.bktcAvailableTickets = $rootScope.totalSeats;
			   			  	$scope.totalSeats = bookedDetailsModel.bktcAvailableTickets;
			   			  	$scope.seatsAvailable = true;
			   			  }
	   				}
	   			  } 
	   			  else{
	   			  	bookedDetailsModel.bktcAvailableTickets = $rootScope.totalSeats;
	   			  	$scope.totalSeats = bookedDetailsModel.bktcAvailableTickets;
	   			  	$scope.seatsAvailable = true;
	   			  }
	   			})
	   }

	   $scope.confirmTickets = function(){
	   		bookedDetailsModel.bktcAvailableTickets -= $scope.requiredTickets;
	   		if(bookedDetailsModel.bktcAvailableTickets <0){
	   			$scope.lessSeats = true;
	   			$scope.requiredTickets = 0;
	   		}
	   		else{
	   		 bookedDetailsModel.bktcBookedTickets = $scope.requiredTickets;
	   		 bookedDetailsModel.bktcBookingId = randomIntFromInterval(100000, 900000);
	   		 bookedDetailsModel.bktcBookedAmount = $scope.ticketPrice * $scope.requiredTickets;
	   		 bookedDetailsModel.bktcMovieName = $rootScope.movieName;

	   		 let P1 = new Promise(function(resolve, reject){
	   		 	var promise = AdminCRUDService.addData(bookedDetailsModel, 'bktc');
	   		 		promise.then(function(bookingDatas){
	   		 			resolve(bookingDatas);
	   		 		})
	   		 });

	   		 let P2 = P1.then(function(bookingDatas){
	   		 	let promise = AdminCRUDService.getData('avtc');
	   			promise.then(function(datas){
	   			  if(datas.length > 0){	
	   			  	let added = false;
	   				for(let data of datas){
	   					if(added == true)
	   						break;
	   					if(data.avtcCity == bookedDetailsModel.bktcCity &&
						   data.avtcTheatreName == bookedDetailsModel.bktcTheatreName &&
						   data.avtcShowTime == bookedDetailsModel.bktcShowTime &&
						   data.avtcDate == bookedDetailsModel.bktcDate){
						   added = true;
						   	data.avtcAvailableTickets = bookedDetailsModel.bktcAvailableTickets;
						    let promise =  AdminCRUDService.updateData(data, 'avtc');
							    promise.then(function(response){
							    	$http.get(`/bktc/getBktc/${bookedDetailsModel.bktcBookingId}`).success(function (response) {
						            	$scope.bookedId = response[0].bktcBookingId;
								    	$scope.bookedSuccessfully = true;
								    	$scope.seatsAvailable = false;
								    	$scope.showTotalAmount = false;
								    	$scope.requiredTickets = "";
								    });
							    });
	   					}
	   					else{
	   						added = true;
	   						var promiseBktc =  AdminCRUDService.addData(bookedDetailsModel, 'avtc');
						    	promiseBktc.then(function(availableSeatDatas){
						    		$http.get(`/bktc/getBktc/${bookedDetailsModel.bktcBookingId}`).success(function (response) {
					            	$scope.bookedId = response[0].bktcBookingId;
							    	$scope.bookedSuccessfully = true;
							    	$scope.seatsAvailable = false;
							    	$scope.showTotalAmount = false;
							    	$scope.requiredTickets = "";
				        	        });
				        	    })
	   					    }
	   					
	   				}
	   			   }
	   			   else{
	   						var promiseBktc =  AdminCRUDService.addData(bookedDetailsModel, 'avtc');
						    	promiseBktc.then(function(availableSeatDatas){
						    		$http.get(`/bktc/getBktc/${bookedDetailsModel.bktcBookingId}`).success(function (response) {
					            	$scope.bookedId = response[0].bktcBookingId;
							    	$scope.bookedSuccessfully = true;
							    	$scope.seatsAvailable = false;
							    	$scope.showTotalAmount = false;
							    	$scope.requiredTickets = "";
				        	        });
				        	    })
	   					    }
	   			  });
	   		 })


	   		}
	   		 
	   		

		    function randomIntFromInterval(min,max)
				{
				    return Math.floor(Math.random()*(max-min+1)+min);
				}

        	
	   }


})