'use strict';

app.controller('pdpCtrl', function($scope, $rootScope, $routeParams, $location, $window, $timeout, $q, Items, GridCache, GridService) {
	if($routeParams.productId){
		$scope.infiniteThrottle = true; 
	}
	
	$scope.xRightPos = 0;
	$scope.reviewsPos = 0;
	$scope.reviewsMargin = 0;
	$scope.showMap = null;
	$scope.sections = ['overview','features','richMedia','reviews','related'];
	$scope.activeSection = 'overview'
	$scope.itemQuantity = 1;

	$('html, body').animate({
        scrollTop: 0
    }, 0);

	$scope.init = function(){
		$scope.deliveryOptions = GridCache.returnDeliveryOptions();
	}

	$scope.changeRightPos = function(section){
		var minus = 50;
		$window = angular.element(window);
		if($(window).width() <= 768){
			var minus = 84;
		}
		$('html, body').animate({
	        scrollTop: $("#"+section).offset().top - minus
	    }, 700);
	}

	$scope.reviewsScroll = function(direction){
		if($(window).width() > 768){
			$scope.xWidth = $(window).width() / 2;
		}
		else{
			$scope.xWidth = $(window).width();
		}

		if(direction === 'plus'){
			var newTotal = $scope.reviewsPos + 1;
			if(newTotal < 3){
				$scope.reviewsPos = newTotal;
			}
		}
		else{
			var newTotal = $scope.reviewsPos - 1;
			if(newTotal > -1){
				$scope.reviewsPos = newTotal;
			}
		}
		$scope.reviewsMargin = ($scope.reviewsPos * ($scope.xWidth) * -1);
	}


	$scope.pdpResize = function(throttleResize){
		$window = angular.element(window);
		if($(window).width() > 768){
			$scope.imageContainerAdjust = 0;
			if($('.xLeftInner').first().height()){
				var xLeftInner = $('.xLeftInner').first().height();
			}
			else{
				var xLeftInner = 600;
			}
			
			$scope.xPageHeight = $(window).height() - 50;
			$scope.xLeftPadding = ($scope.xPageHeight - xLeftInner) /2;
			if($scope.xLeftPadding < 24){
				$scope.xLeftPadding = 24;
			}
			else if($scope.xLeftPadding > 48){
				$scope.xLeftPadding = 48;
			}
			$scope.xHeight = $(window).height() - 50;
			$scope.xWidth = $(window).width() / 2;
			$scope.xReviewsHeight = $scope.xHeight;

//
//	Right Hand Image stuff
//
			$scope.imageSize = .8 * $scope.xWidth;
			if($scope.imageSize > $scope.xPageHeight - 184){
				$scope.imageSize = $scope.xPageHeight - 184;
				$scope.xImageTop = (($scope.xPageHeight - $scope.imageSize) /2) - 48;
				$scope.xImageLeft = ($scope.xWidth - $scope.imageSize) / 2;
			}
			else{
				$scope.xImageTop = (($scope.xPageHeight - $scope.imageSize) /2) - 30;
				$scope.xImageLeft = ($scope.xWidth - $scope.imageSize) / 2;
			}
//
//	Features Stuff
//
			var featuresHeight = $('#features').height();
			if($scope.xHeight > featuresHeight){
				var diff = $scope.xHeight - featuresHeight;
				var featuresPadding = diff / 2;
				if(featuresPadding < 24){
					var featuresPadding = 24;
				}
				$scope.featuresPadding = featuresPadding;
			}
//
//	Reviews
//
			var reviewsHeight = $('.xReviewBlock').first().height();
			$scope.xReviewsHeight = reviewsHeight + 96;
			if($scope.xHeight > reviewsHeight){
				var diff = $scope.xHeight - reviewsHeight;
				var padding = diff / 2;
				if(padding < 24){
					var padding = 24;
				}
				$scope.reviewsPadding = padding;
			}
			$scope.reviewsPadding = 48;


//
//	Related
//
			var relatedHeight = $('.sr_container').height() + 100;
			if($scope.xHeight > relatedHeight){
				var diff = $scope.xHeight - relatedHeight;
				var padding = diff / 2;
				if(padding < 24){
					var padding = 24;
				}
				$scope.relatedPadding = padding;
			}
			if(!$('.sr_container').height()){
				$scope.relatedPadding = 24;
			}

			$scope.imageContainer = $scope.xHeight;

			
			$scope.oneCol = false; 
			$timeout(function(){
				if(!throttleResize){
					$scope.pdpResize(true);
				}
				
			},750)
		}
		else{
			$scope.oneCol = true;
			$scope.xHeight = ($(window).height() / 2) + 120;
			$scope.xPageHeight = $(window).height() - 50;
			$scope.xWidth = $(window).width();
			$scope.xReviewsHeight = $scope.xHeight;
			$scope.relatedPadding = 24;
			$scope.imageContainerAdjust = 108;

			$scope.xImageTop = 24;
			$scope.imageSize =  ($(window).height() / 2) > ($(window).width() - 36) ? $(window).width() - 36 : ($(window).height() / 2);
			var containerAdjust = 0;
			if($(window).width() > 640){
				var containerAdjust = 74;
			}
			$scope.imageContainer = $scope.imageSize + containerAdjust;

			var reviewsHeight = $('.xReviewBlock').first().height();
			if($scope.xHeight > reviewsHeight){
				var diff = $scope.xHeight - reviewsHeight;
				var padding = diff / 2;
				if(padding < 24){
					var padding = 24;
				}
				$scope.reviewsPadding = padding;
				$scope.xReviewsHeight = reviewsHeight;
			}

			if($('.xReviewBlock').first().height()){
				$scope.xReviewsHeight = $('.xReviewBlock').first().height() + 96;
			}

			$timeout(function(){
				if(!throttleResize){
					$scope.pdpResize(true);
				}
				
			},750)
		}
	}

	$scope.addToBasketInit = function(items){
		var length = items.length;
		for(var i=0; i<length; i++){
			$rootScope.addToBasket(items[i]);
		}
		$scope.showMap = false;

		$rootScope.basketOpen = true;
	}

	$scope.goToCheckout = function(){
		$location.path('/order')
	}

	$scope.searchIconClick = function(){
		$location.path('/')
	}

//
//
//		S H O W   M A P 
//
//
	
	$scope.getUserLocationPDP = function(arrayNumber){
		if (navigator.geolocation) {
			$scope.xMapLoading = true;
			$scope.showMap = 'storeSearch';
			$scope.xMapCollection = 'Current Location';
		    navigator.geolocation.getCurrentPosition(function(position){
		    	$scope.loadGoogleMapPDP(position);
		    });
		} 
		else {
		    console.log("Geolocation is not supported by this browser.");
		}
	}


	$scope.showMapPDP = function(forceOptions){
		var latLong = new google.maps.LatLng(51.49636, -0.14308);

		var mapOptions = {
		    zoom: 12,
		    disableDefaultUI: true,
		    zoomControl: true,
		    center: latLong,
		    zoomControlOptions: {
	            position: google.maps.ControlPosition.LEFT_BOTTOM
	        }
		};

		$scope.map = new google.maps.Map(document.getElementById('mapcontainerpdp'), mapOptions);

		var deliveryOptions = GridCache.returnDeliveryOptions();
		if(deliveryOptions[0].showType === 'unknown' || forceOptions){
			
			$scope.xMapCollection = null;
			$scope.deliveryInputEntered = false;
			$scope.showMap = 'deliveryOrCollection';
			//$scope.showMap = 'storeSearch';
		}
		else{
			$scope.addToBasketInit([$scope.item])
		}
	}


	$scope.findLocalStore = function(){
		$scope.showMap = 'storeSearch';
		$scope.loadGoogleMapPDP();
	}

	$scope.loadGoogleMapPDP = function(position){
	// Find the place the user has just searched for
		if($scope.xMapCollection && !position){
			var service = new google.maps.places.PlacesService($scope.map);
			var obj = {
				query: $scope.xMapCollection+' UK'
			}

			service.textSearch(obj, function(data){
				if(data[0]){
					$scope.map.setCenter(data[0].geometry.location);
					$scope.googleLat = data[0].geometry.location.k;
					$scope.googleLong = data[0].geometry.location.B;
					$scope.placeGoogleMarkerPDP(data[0].geometry.location);
					$scope.newArgosLocationSearchPDP($scope.xMapCollection);
				}
				else{
					// $scope.deliveryOptions[arrayNumber].mapError = "Error with Google Search";
					// $scope.deliveryOptions[arrayNumber].loadingMap = false;
					$scope.xMapLoading = false;
				}
			});
		}
		else{
			var latLong = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			$scope.placeGoogleMarkerPDP(latLong);
			$scope.newArgosLocationSearchPDP(null, position);
			// $scope.placeGoogleMarker(arrayNumber);
			// $scope.newArgosLocationSearch(arrayNumber, null, position);
		}
		
	}

	$scope.placeGoogleMarkerPDP = function(location){
	//
	// Do we use a retina icon or not?
	//
		if(window.devicePixelRatio > 1.5){
			var image = {
				url : 'img/marker.png',
				size : new google.maps.Size(61, 91),
				scaledSize: new google.maps.Size(30, 45),
				origin: new google.maps.Point(0,0),
				anchor: new google.maps.Point(16, 37)
			}
		}
		else{
			var image = {
			    url: 'img/markerMd.png',
			    size: new google.maps.Size(30, 45),
			}
		}


		var marker = new google.maps.Marker({
		    position: location,
		    map: $scope.map,
		    icon: image,
		});
	}



	$scope.newArgosLocationSearchPDP = function(collectionText, position){
		var api = 'uahnefurfpckn2qary4q6b7j';
		if(collectionText){
			var encoded = encodeURI(collectionText);
			var url = "http://api.homeretailgroup.com/location/argos/store?origin="+encoded+"&apiKey="+api+"&closeMatches=true";
		}
		else{
			var url = "http://api.homeretailgroup.com/location/argos/store?origin="+position.coords.latitude+","+position.coords.longitude+"&apiKey="+api+"&closeMatches=true"
		}
		
		$scope.storesArray = [];
		$.get( url, function( data ) {
	//
	// The Argos API returns a list of stores, or a list of suggested locations. If locations are returned,
	// then we need to find the most relevant (closest) location, and do another API call
	//
			if($(data).find( "Location" ).find("Locality").length > 0){
				var contenders = [];
				$(data).find( "Location" ).find("Locality").each(function (index) {
					var latitude = $(this).find('Position').find('GeoLocation').attr('latitude');
					var longitude = $(this).find('Position').find('GeoLocation').attr('longitude');

					var distance = $scope.util_getDistanceFromLatLonInKm($scope.googleLat, $scope.googleLong, latitude, longitude);

					var obj = {
						'lat': latitude,
						'long': longitude,
						'distance': distance,
					}
					contenders.push(obj);
				})

				var contenders = _.sortBy(contenders, function(item){ return item.distance; });

				var urlNew = "http://api.homeretailgroup.com/location/argos/store?origin="+contenders[0].lat+","+contenders[0].long+"&apiKey="+api+"&closeMatches=true"

				$.get( urlNew, function( data ) {
					$scope.processStoreResultsPDP(data);
				}).fail(function() {
					console.log('map loading false 1')
					$scope.xMapLoading = false;
					// $scope.deliveryOptions[arrayNumber].mapError = "Error with Argos API Search";
					// $scope.deliveryOptions[arrayNumber].loadingMap = false;
				})
			}
			else{
				$scope.processStoreResultsPDP(data);
			}	
		}).fail(function() {
			console.log('map loading false 2')
			$scope.xMapLoading = false;
			$scope.$apply();
			// $scope.deliveryOptions[arrayNumber].mapError = "Error with Argos API Search";
			// $scope.deliveryOptions[arrayNumber].loadingMap = false;
		})
	}

	$scope.daysArray = ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

	$scope.processStoreResultsPDP = function(data){
		$scope.xMapLoading = false;
		// console.log('processStoreResultsPDP');
		// $scope.deliveryOptions[arrayNumber].loadingMap = false; 
		// $scope.deliveryOptions[arrayNumber].mapError = null;
		$scope.$apply();

		var dayInt = new Date().getDay();
		var day = $scope.daysArray[dayInt];

		$(data).find( "Store" ).each(function (index) {
			var name = $(this).find('Name').text();
			var latitude = $(this).find('Position').find('GeoLocation').attr('latitude');
			var longitude = $(this).find('Position').find('GeoLocation').attr('longitude');
			var from = null;
			var to = null;

			$(this).find('OpeningHours').find('Opening').each(function(){
				if($(this).attr('day') === day){
					from = $(this).attr('from');
					to = $(this).attr('to');
				}
			});
			
			var distance = $scope.util_getDistanceFromLatLonInKm(latitude,longitude,$scope.googleLat,$scope.googleLong);
			var obj = {
				'name': name,
				'latitude': latitude,
				'longitude': longitude,
				'distance': distance,
				'from': from,
				'to': to
			}
			$scope.storesArray.push(obj);
		})

	//
	// Add each store to the map
	//
		if($scope.storesArray.length > 0){
			var length = $scope.storesArray.length;
			for(var i = 0; i<length; i++){
				$scope.createStoreMarkerPDP($scope.storesArray[i], i);
			}
		}
	}

	$scope.createStoreMarkerPDP = function(store, i){
	//
	// Do we use retina icon or not?
	//
		if(window.devicePixelRatio > 1.5){
			var image = {
				url : 'img/store_icn.png',
				size : new google.maps.Size(92, 57),
				scaledSize: new google.maps.Size(46, 29),
				origin: new google.maps.Point(0,0),
				anchor: new google.maps.Point(16, 37)
			}
		}
		else{
			var image = {
			    url: 'img/store_icn_sml.png',
			    size: new google.maps.Size(46, 29),
			}
		}

		var latLong = new google.maps.LatLng(store.latitude, store.longitude);

		var randomNumber = Math.random();
		var chosenValue = randomNumber < 0.75 ? true : false;
		//console.log(chosenValue);
		if(chosenValue){
			var hours = Math.floor(randomNumber * 10);
			if(hours <= 1){
				var hours = 1;
				var hoursText = 'hour';
			}
			else{
				var hoursText = 'hours';
			}
			var contentString = "\
				<div class='mapInfoContent mapInfoContentPDP'>\
				<div class='mapInfoTitle'>"+store.name+"</div> \
				<div class='mapInfoOpening'>"+store.from+" - "+store.to+"</div>\
				<hr />\
				<div class='mapInfoInStock'>In Stock</div>\
				<div class='mapInfoAvailability'>Available to collect in "+hours+" "+hoursText+"</div>\
				<div class='mapInfoSelect' ng-click='tester()'>Select</div>\
				</div>\
			";
		}
		else{
			var contentString = "\
				<div class='mapInfoContent mapInfoContentPDP'>\
				<div class='mapInfoTitle'>"+store.name+"</div> \
				<div class='mapInfoOpening'>"+store.from+" - "+store.to+"</div>\
				<hr />\
				<div class='mapInfoOutOfStock'>Out of Stock</div>\
				<div class='mapInfoAvailability'>Available to collect in 2 hours</div>\
				<div class='mapInfoSelect' ng-click='tester()'>Select</div>\
				</div>\
			";
		}
		
		var infoWindow = new google.maps.InfoWindow({
			content: contentString
		});

		//console.log(store);

		var marker = new google.maps.Marker({
		    position: latLong,
		    map: $scope.map,
		    icon: image,
		    data: {'name': store.name, 'info': infoWindow}
		});

		google.maps.event.addListener(marker, 'click', function() {
			var data = marker.data;
			data.info.open($scope.map, marker);
		});

		if(!i){
			marker.data.info.open($scope.map, marker);
		}

		google.maps.event.addListener(infoWindow, 'domready', function() {
			$(".mapInfoSelect").bind("click", function(e) {
				$scope.addStoreToSelectedPDP()
			});
		});
	}

	$scope.addStoreToSelectedPDP = function(data){
		$scope.showMap = null;
		$scope.addToBasketInit([$scope.item]);
		$scope.$apply();
	}



	$scope.util_getDistanceFromLatLonInKm = function(lat1,lon1,lat2,lon2){
		var R = 6371; // Radius of the earth in km
		var dLat = $scope.util_deg2rad(lat2-lat1);  // deg2rad below
		var dLon = $scope.util_deg2rad(lon2-lon1); 
		var a = 
		Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos($scope.util_deg2rad(lat1)) * Math.cos($scope.util_deg2rad(lat2)) * 
		Math.sin(dLon/2) * Math.sin(dLon/2); 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c; // Distance in km
		var m = (d * 0.621371192);
		var m = $scope.util_preciseRound(m,2)
		return m;
	}

	$scope.util_deg2rad = function(deg) {
		return deg * (Math.PI/180)
	}

	$scope.util_preciseRound = function(num, decimals){
	    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
	}

//
//	INIT
//
	$scope.pdpResize();
	$scope.init();

})