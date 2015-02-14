'use strict';

app.controller('orderCtrl', function($scope, $location) {
	
	$scope.showPayment = false;

	$scope.searchIconClick = function(){
		$location.path('/')
	}

})