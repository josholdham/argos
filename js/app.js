'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('app', [
	'ngRoute',
	'ui.bootstrap',
	'app.services.items',
	'app.services.categories',
	'app.services.grids',
	'app.services.gridcache',
	'app.services.gridservice',
	'app.services.settings',
	'infinite-scroll',
	'once',
	'sticky'
])
app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/search', {templateUrl: 'templates/search.html', controller: 'searchCtrl'});
	//$routeProvider.when('/', {templateUrl: 'templates/splash.html', controller: 'splashCtrl'});
	$routeProvider.when('/search/:searchTerm', {templateUrl: 'templates/search.html', controller: 'searchCtrl'});
	$routeProvider.when('/pdp/:productId', {templateUrl: 'templates/pdp.html', controller: 'pdpCtrl'});
	$routeProvider.when('/order', {templateUrl: 'templates/order.html', controller: 'orderCtrl'});
	$routeProvider.otherwise({redirectTo: '/search'});
}])
app.run(['$rootScope', '$location','$route','$timeout', 'Categories','Settings', function($rootScope, $location, $route, $timeout, Categories, Settings) {

	$rootScope.settings = Settings.returnSettings();
	$rootScope.isSidebar = false;

	$rootScope.protoBasket = null;
	$rootScope.basketOpen = false;

	$rootScope.categories = Categories.returnCategories();
	$rootScope.categoryLevel = 1;
	$rootScope.categoryChild = '1';
	$rootScope.activeParentCategories = [];

	$rootScope.basketItems = [];
	$rootScope.addToBasket = function(item){
		var isItem = _.find($rootScope.basketItems, function(indItem){ return indItem.id === item.id; });
		if(isItem){
			isItem.quantity++
		}
		else{
			item.quantity = 1;
			$rootScope.basketItems.push(item);
		}
		
	}

	$rootScope.scrolling = false;

	$rootScope.updateHomeSetting = function(homeSetting){
		Settings.updateHomeSetting(homeSetting);
		$rootScope.settings = Settings.returnSettings();
	}
	$rootScope.updateTimelineMarkerSetting = function(timelineMarker){
		Settings.updateTimelineMarkerSetting(timelineMarker);
		$rootScope.settings = Settings.returnSettings();
	}

	$rootScope.categoryClick = function(categoryChild, categoryLevel, title){
		if(categoryLevel){
			$rootScope.categoryLevel = categoryLevel
		}
		else{
			$rootScope.categoryLevel = Number($rootScope.categoryLevel)+1;
		}
		$rootScope.categoryChild = categoryChild;

		if($rootScope.categories[$rootScope.categoryLevel] && $rootScope.categories[$rootScope.categoryLevel][$rootScope.categoryChild]){
			$rootScope.activeParentCategories = [];
			$rootScope.getParentCategories(($rootScope.categoryLevel - 1), $rootScope.categoryChild);
		}
		else{
			var title = encodeURI(title);
			$location.path('/search/'+title);
		}
	}

	$rootScope.getParentCategory = function(categoryLevel,categoryChild){
		var searchCategoryLevel = Number(categoryLevel) - 1;
		for(var i in $rootScope.categories[searchCategoryLevel]){
			var length = $rootScope.categories[searchCategoryLevel][i].length;
			for(var j=0; j<length; j++){
				if($rootScope.categories[searchCategoryLevel][i][j].id === categoryChild){
					return $rootScope.categories[searchCategoryLevel][i][j].title
				}
			}
		}
	}

	$rootScope.getParentCategories = function(categoryLevel,categoryChild){
		if(categoryLevel > 0){
			var searchCategoryLevel = Number(categoryLevel);
			var chosenChild = null;

		// For each item in the level we clicked
			for(var i in $rootScope.categories[searchCategoryLevel]){
				_.each($rootScope.categories[searchCategoryLevel][i], function(value, key){
					if(value.id === categoryChild+''){
						chosenChild = i;
						value.parentId = i;
						$rootScope.activeParentCategories.unshift(value);
					}
				})
			}
			var searchCategoryLevel = Number(searchCategoryLevel) - 1;
			
			if(chosenChild){
				$rootScope.getParentCategories(searchCategoryLevel,chosenChild)
			}
			
		}	
	}


	$rootScope.goToOrder = function(){
		$location.path('/order')
	}


	$rootScope.$on("$routeChangeSuccess", function (event, next, current) {
		if(next && next.$$route){
			var ctrl = next.$$route.controller;
			$rootScope.ctrl = ctrl;
		}				
	})

}])









