'use strict';

/* Services */

angular.module('app.services.gridservice', []).value('version', '0.1')
.factory('GridService', function($q, $http, $location, $rootScope, $window) {

	var gridCols = 5;
	var gridPadding = 24;
	var ratio = 1.4;
	var tileGutter = 18;
	var searchAreaBase = 246;
	var searchAreaSize = 204;
	
	return {
		returnGridCols: function(windowWidth, viewType){
			if(viewType === 'pdp'){
				if(windowWidth > 1024){
					gridCols = 3	
				}
				else{
					gridCols = 2;
				}
			}
			else{
				if(windowWidth > 980){
					if(viewType === 'bigger'){
						gridCols = 10;
					}
					else{
						gridCols = 5;
					}
				}
				else if(windowWidth > 640){
					gridCols = 3;
				}
				else{
					gridCols = 2;
				}
			}

			return gridCols;
		},
		returnGridPadding: function(windowWidth){
			if(windowWidth > 640){
				gridPadding = 24;
			}
			else{
				gridPadding = 6;
			}
			
			return gridPadding;
		},
		returnTileGutter: function(){
			var windowWidth = $window.innerWidth;
			if($rootScope.ctrl === 'searchCtrl'){
				if(windowWidth > 640){
					tileGutter = 18;
				}
				else{
					tileGutter = 6;
				}
			}
			else{
				if(windowWidth > 768){
					tileGutter = 18;
				}
				else{
					tileGutter = 6;
				}
			}
			
			return tileGutter;
		},
		returnUnit: function(){
			if($rootScope.ctrl === 'searchCtrl'){
				var size = $('.grid').width() > 1400 ? 1400: $('.grid').width()
				var unit = Math.floor((size + gridPadding) / gridCols);
			}
			else{
				if($(window).width() > 768){
					var size = $(window).width() / 2 - 48;
					var unit = Math.floor((size + gridPadding) / gridCols);
				}
				else if($(window).width() > 640){
					var size = $(window).width() > 1400 ? 1400: $(window).width() - 48;
					var unit = Math.floor((size + gridPadding) / gridCols);
				}
				else{
					var size = $(window).width() > 1400 ? 1400: $(window).width() - 12;
					var unit = Math.floor((size + gridPadding) / gridCols);
				}
			}
			return unit;
		},
		returnRatio: function(windowWidth){
			if(windowWidth > 1024){
				ratio = 1.1;
			}
			else if(windowWidth > 768){
				ratio = 1.1;
			}
			else if(windowWidth > 640){
				ratio = 1.1;
			}
			else{
				ratio = 1.1;
			}

			return ratio;
		},
		returnSearchAreaBase: function(windowWidth){
			if(windowWidth > 640){
				searchAreaBase = 246;
			}
			else{
				searchAreaBase = 183;
			}
			return searchAreaBase;
		},
		returnSearchAreaSize: function(windowWidth){
			if(windowWidth > 640){
				searchAreaSize = 204;
			}
			else{
				searchAreaSize = 120;
			}
			return searchAreaSize;
		},
		returnNumberOfColumns: function(viewType, page){
			var windowWidth = $(window).width();
			var numberOfColumns = 5;
			if(page === 'searchCtrl'){
				if(viewType === 'regular'){
					if(windowWidth > 980){
						var numberOfColumns = 5;
					}
					else if(windowWidth > 640){
						var numberOfColumns = 3;
					}
					else {
						var numberOfColumns = 2;
					}
				}
				else if(viewType === 'thumbnails'){
					if(windowWidth > 980){
						var numberOfColumns = 10;
					}
					else if(windowWidth > 640){
						var numberOfColumns = 5;
					}
					else {
						var numberOfColumns = 3;
					}
				}
			}
			else if(page === 'pdpCtrl'){
				if(windowWidth > 980){
					var numberOfColumns = 3;
				}
				else if(windowWidth > 640){
					var numberOfColumns = 2;
				}
				else {
					var numberOfColumns = 2;
				}
			}
			return numberOfColumns;
		}
	}
})