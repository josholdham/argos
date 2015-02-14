'use strict';

app.controller('searchCtrl', function($scope, $rootScope, $window, $timeout, $q, $location, $routeParams, Items, Categories, Grids, GridService, GridCache) {

/*************************************************

				
				NON UTILITY FUNCTIONS


**************************************************/

	$scope.init = function(){
		$scope.showLoader = false;
		$scope.searchFocus = 'looking';
		//Items.testStock();
	}

	// $scope.changeDeliveryOrCollection = function(option){
	// 	$scope.deliveryOrCollection = GridCache.setDeliveryOrCollection(option);
	// }


	$scope.toggleFilterMenu = function(item){
		var initialStatus = item.filterMenu;
		var length = $scope.items.length;
		for(var i =0; i<length; i++){
			var innerLength = $scope.items[i].items.length;
			for(var j=0; j<innerLength; j++){
				$scope.items[i].items[j].filterMenu = false;
			}
		}

		if(!initialStatus){
			item.filterMenu = true;
		}
	}

	$scope.searchIconClick = function(){
		$('html, body').animate({
	        scrollTop: 0
	    }, 500);
	}

	// $scope.mobileMenuOpenToggle = function(){
	// 	if($scope.mobileMenuOpen){
	// 		$scope.mobileMenuOpen = null;
	// 	}
	// 	else{
	// 		$scope.mobileMenuOpen = 'initial';
	// 	}
	// }

	// $scope.toggleMobileCategory = function(category){
	// 	var open = category.open;
	// 	var length = $rootScope.categories[1][1].length;
	// 	for(var i=0; i<length; i++){
	// 		$rootScope.categories[1][1][i].open = false;
	// 	}

	// 	if(!open){
	// 		category.open = true;
	// 	}		
	// }
	// $scope.categoryClickMobile = function(title){
	// 	$scope.mobileMenuOpen = null;
	// 	var title = encodeURI(title);
	// 	$location.path('/search/'+title);
	// }



})


