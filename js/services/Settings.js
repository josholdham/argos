'use strict';

/* Services */

angular.module('app.services.settings', []).value('version', '0.1')
.factory('Settings', function($q, $http, $location, $rootScope) {

	var settings = {
		'categoryView' : 'header', // or grid/header
		'expand' : 'none', // standard or big or none or fixed
		'home' : 2, // or big
		'timelineMarker': 'stickyMarkersCircle2', //stickyMarkersCircle2 or stickyMarkers2
		'expandedDesign': 'new', //new or old
		'design': 1, // 1 or 2. 2 toggles ng-class on .searchArea or #grid
		'textExpands': true
	}
	
	return{
		returnSettings: function(){
			return settings;
		},
		updateHomeSetting: function(homeSetting){
			settings.home = homeSetting;
		},
		updateTimelineMarkerSetting: function(timelineMarker){
			settings.timelineMarker = timelineMarker;
		}
	}
});