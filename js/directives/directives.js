'use strict';



app.directive('stopeventpropagation', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.bind('click', function (e) {
                e.stopPropagation();
            });
        }
    };
});

//
// Clicking on scrolltotop elements will.... scroll to the top of the page
//
app.directive('scrolltotop', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.bind('click', function (e) {
                $('html, body').animate({
                       scrollTop: 0
                }, 300);
            });
        }
    };
});

// Performs the attribute's value when enter is pressed. 
// Obviously, this is used on input fields.
app.directive('ngEnter', function() {
	return function(scope, element, attrs) {
		element.bind("keydown keypress", function(event) {
			if(event.which === 13) {
				scope.$apply(function(){
					scope.$eval(attrs.ngEnter, {'event': event});
				});

				event.preventDefault();
			}
		});
	};
});


/*****************************************************




			T I M E L I N E   M A R K E R S




*****************************************************/

app.directive('timelineMarkers', function() {
	return {
		restrict: 'A',
		templateUrl: 'templates/timelineMarkers.html',
	}
});


/*****************************************************




				G R I D       R E F A C T O R




*****************************************************/

app.directive('navigationSticky', function($window, $location, $timeout) {
	return {
		restrict: 'A',
		templateUrl: 'templates/navigationSticky.html',
		link: function(scope, element, attrs) {
			
		}
	}
})





//
// ..for search page
//
app.directive('lookingFor', function($timeout,GridCache,GridService) {
	return function(scope, element, attrs) {

		scope.search = function(){
			scope.searchLoading = true;
			if(scope.lookingForTimeout){
				$timeout.cancel(scope.lookingForTimeout);
			}

			$timeout(function(){
				if(scope.searchTerm.length > 3 ){
					scope.searchAreaSize = $('.searchAreaLookingPseudoInput').width() + 24;
				}
				else{
					scope.searchAreaSize = GridService.returnSearchAreaSize()
				}
			},100)

			scope.lookingForTimeout = $timeout(function(){
				scope.searchLoading = false;

				var searchTerm = scope.searchTerm || null;
				var settings = {
					'textSearch': true,
					'searchText': searchTerm
				}
				scope.searchRouter(settings);
				scope.$apply();
			}, 500)

			if(scope.searchTerm.length > 3 ){
				scope.searchAreaSize = $('.searchAreaLookingPseudoInput').width() + 24;
			}
			else{
				scope.searchAreaSize = GridService.returnSearchAreaSize()
			}
		}


		element.bind("keyup", function(event) {
			scope.search()
		})
	};
});

//
//
// I don't *think* this is still used as of 28/11/14
app.directive('ngLookingForEnter', function($location, GridCache) {
	return function(scope, element, attrs) {
		element.bind("keyup", function(event) {
			var searchTerm = encodeURI(scope.lookingFor);
			if(event.which === 13){
				$location.path('/search/'+searchTerm);
				scope.$apply();
			}
		});
	};
});

//
// Used on the looking for input...
//
app.directive('focus', function() {
	return function(scope, element, attrs) {
		element.bind("focus", function(event) {
			scope.searchFocus = attrs.focus;
			if(attrs.focus === 'looking'){
				scope.lookingFocussed = true;
			}
			scope.$apply();
		})

		element.bind("blur", function(event) {
			if(attrs.focus === 'looking' && !scope.searchTerm){
				scope.lookingFocussed = false;
			}
			scope.$apply();
		})
	}
})

// Used on the delivery input on search.html
// Essentially this just opens the dropdown with default values.
// In theory this would look up an address based on user postcode/input
app.directive('delivery', function($timeout, $document) {
	return {
		scope: {
			deliveryevent: '&',
			arraynumber: '='
		},
		link: function(scope, element, attrs) {
			var openElement = null;
			element.bind("keyup", function(event) {

				if($(this).val().length > 0){
					if(!element.parents('.dropdown').hasClass('open')){
						element.parents('.dropdown').addClass('open');
						openElement = element;

						var closeMenu = function (event) {
						    if (event) {
						      event.preventDefault();
						      event.stopPropagation();
						    }
						    $document.unbind('click', closeMenu);
						    element.parents('.dropdown').removeClass('open');
						    closeMenu = angular.noop;
						    openElement = null;
						};

						$document.bind('click', function(){
							closeMenu();
						});
					}	
				}
				else{
					closeMenu();
				}

				scope.$apply();

			})
		}
	}
})


/*****************************************************




				S I D E B A R




*****************************************************/

//
// Toggles the sidebar
//

app.directive('sidebar', function($window, $location, $rootScope) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			scope.changeSidebar = function(){
				$rootScope.isSidebar = !$rootScope.isSidebar;
			}
		}
	}
})






/*****************************************************




				G R I D       R E F A C T O R




*****************************************************/

app.directive('gridContainer', function($window, $location, $timeout) {
	return {
		restrict: 'A',
		templateUrl: 'templates/grid.html',
		controller: 'gridCtrl',
		link: function(scope, element, attrs, gridCtrl) {
			gridCtrl.init();
		}
	}
})

/*****************************************************




						G R I D




*****************************************************/

app.directive('homeHeaders', function() {
	return {
		restrict: 'A',
		templateUrl: 'templates/homeHeaders.html',
	}
});


app.directive('expandedQuickview', function() {
	return {
		restrict: 'A',
		templateUrl: 'templates/expandedQuickview.html',
	}
});

/*****************************************************




				L I S T   I T E M S




*****************************************************/

app.directive('listItems', function() {
	return {
		restrict: 'A',
		templateUrl: 'templates/listItems.html',
	}
});

app.directive('listItem', function($window, $timeout) {
	return{
		restrict: 'A',
		templateUrl: 'templates/listItem.html',
		link: function(scope, element, attrs) {
			var screens = ['details','reserved','payment']
			scope.listCollect = function(item, newScreen){
				if(!newScreen){
					item.collectionOverlay = false;
					$timeout(function(){
						var height = $(element).find('.listItemRow').height();
						$(element).css('height', height+"px");
					},500)
				}
				else{
					item.collectionOverlay = true;
					var length = screens.length;
					for(var i = 0; i<length; i++){
						item[screens[i]] = false;
					}
					item[newScreen] = true;

					$timeout(function(){
						var height = $(element).find('.qvOverlay').height();
						$(element).css('height', height+"px");
					},500)
				}			
			}	
		}
	}
})

/*****************************************************




				Q U I C K V I E W




*****************************************************/

app.directive('quickview', function() {
	return {
		restrict: 'A',
		templateUrl: 'templates/quickview.html',
	}
});

	

/*****************************************************




					M A P S




*****************************************************/
app.directive('htmlLocation', function($window, $location, $timeout, $compile) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			var arrayNumber = null;

			element.bind('click', function (e) {
				arrayNumber = $(element).data('array-number');
				scope.getUserLocation(arrayNumber);
			})

		}
	}
})


app.directive('mapcanvaspdp', function($window, $location, $timeout, $compile) {
	return {
		restrict: 'A',
		//controller: 'gridCtrl',
		link: function(scope, element, attrs) {
			
		}
	}
})

app.directive('collectionInput', function($window, $location, $timeout, $compile) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {

			element.bind('keyup', function (e) {
				if(scope.locationTimeout){
					$timeout.cancel(scope.locationTimeout)
				}
				var arrayNumber = $(element).data('array-number');
				scope.deliveryOptions[arrayNumber].loadingMap = true;

				scope.locationTimeout = $timeout(function(){
					var arrayNumber = $(element).data('array-number');
				    scope.mapType(arrayNumber);
				    scope.$apply();
				},600)
			});

		}
	}
});


/*****************************************************




						P D P
						Rich media and Navigation




*****************************************************/

app.directive('pdpnav', function($window, $location) {
	return function(scope, element, attrs) {
//
//	CLICK
//	--- Opens the PDP from QV
//
		element.bind("click", function(e) {
			e.stopPropagation();
			e.preventDefault();
			var href = $(element).attr('href');
			var offset = 100;
			if(href==='#overview'){
				var offset = 50;
			}

			var qvOffset = Math.floor($(href).offset().top - offset);

			$('html, body').animate({
			       scrollTop: qvOffset
			}, 600);
		})
	}
})



app.directive('pdpExtras', function($window, $location, $timeout, $compile) {
	return {
		restrict: 'A',
		templateUrl: 'templates/new/pdpRichMedia.html',
		scope: {
			pdpbuttons: '@',
			addtobasket: '&',
		},
		link: function(scope, element, attrs) {
			scope.showExtrasPopup = false;
			scope.xRichModal = false;
			scope.popup = {};

			scope.buttons = [
				{
					'top': '35%',
					'left': '82%',
					'popup': {
						'title': 'BLACK & DECKER LITHIUM ION CORDLESS DRILL DRIVER - 18V',
						'id': 1517262,
						'price': '£59.99',
						"images": ["http://argos.scene7.com/is/image/Argos/1517262_R_Z001A_UC1537134"]
					},
					'type': 'drill'
				},
				{
					'top': '40%',
					'left': '10%',
					'popup': {
						'title': 'Bay Window Curtain Pole Set - Stainless Steel',
						'id': 6237138,
						'price': '£39.99',
						"images": ["http://argos.scene7.com/is/image/Argos/6237138_R_Z001A_UC1274841"]
					},
					'type': 'drill'
				},
				{
					'top': '48%',
					'left': '43%',
					'popup': {
						'title': 'Bosch Protective Spectacles',
						'id': 15172625,
						'price': '£7.99',
						"images": ["/img/pdp/safetygoggles.jpg"]
					},
					'type': 'drill'
				},
				{
					'top': '84%',
					'left': '82%',
					'popup': {
						'title': 'Heart of House Chrissie Rug 170x120cm',
						'id': 1420892,
						'price': '£69.99',
						"images": ["/img/pdp/rug.jpg"]
					},
					'type': 'sofa'
				},
				{
					'top': '48%',
					'left': '43%',
					'popup': {
						'title': 'Heart of House Bracken Embroidered Cushion - Dove Grey',
						'id': 2449607,
						'price': '£11.24',
						"images": ["/img/pdp/cushion.jpg"]
					},
					'type': 'sofa'
				}
			]
			
			scope.buttonClick = function(button){
				if(button){				
					if(scope.xRichModal){
						if(button.active){
							scope.closeRMPopup(button)
						}
						else{
							scope.popup = button.popup;
						}
					}
					else{
						scope.xRichModal = true;
						scope.popup = button.popup;
					}
				}
				else{
					scope.xRichModal = false;
					scope.popup = {};
				}

				//scope.$apply();
			}	
		
			scope.closeRMPopup = function(button){
				if(button){
					button.active = false;
				}
				else{
					var length = scope.buttons.length;
					for (var i = 0; i< length; i++){
						scope.buttons[i].active = false;
					}
				}
				scope.xRichModal = false;
			}

			scope.goToPDP = function(){
				$location.path('/pdp/'+scope.popup.id);
			}

			scope.addClick = function(){
				//scope.addToBasketInit([scope.popup]);
				scope.addtobasket({popup: [scope.popup]});
				scope.closeRMPopup()
			}
		}

	}
})


/*****************************************************




					R E S I Z E




*****************************************************/
app.directive('resize', function($window, $timeout) {
	return function(scope, element, attrs) {
//
//	BIND to the resize event, runs the resizing function in searchCtrl
//
		return angular.element($window).bind('resize', function() {
		      scope.windowResized();
		      scope.$apply();

		 //      if(scope.openItem.resize){ //In other words, if  we are changing grid cols
		 //      		console.log('Open Item to re-open')
		 //      		scope.openItem.resize = false;
			//       if(JSON.stringify(scope.openItem) !== '{}'){
			// 	      	var element = $( ".tile[data-product-id='"+scope.openItem.productId+"']" ).first();
			// 	      	scope.openQuickView(element)
			//       }
			//       scope.$apply();
			// }
		});
	};
});





/*****************************************************




			S T A R S




*****************************************************/

app.directive('srTile', function() {
	return {
		restrict: 'A',
		templateUrl: 'templates/new/srTile.html',
	}
});

app.directive('qvn', function() {
	return {
		restrict: 'A',
		templateUrl: 'templates/new/qvn.html',
	}
});

app.directive('tileFixed', function() {
	return {
		restrict: 'A',
		templateUrl: 'templates/new/tileExpandFixed.html',
	}
});

app.directive('navigationMobile', function() {
	return {
		restrict: 'A',
		templateUrl: 'templates/new/navigationMobile.html',
	}
});

app.directive('mobileMenu', function($rootScope, $location) {
	return {
		restrict: 'A',
		templateUrl: 'templates/new/mobileMenu.html',
		link: function($scope, element, attrs){
			$scope.mobileMenuOpenToggle = function(){
				if($scope.mobileMenuOpen){
					$scope.mobileMenuOpen = null;
				}
				else{
					$scope.mobileMenuOpen = 'initial';
				}
			}

			$scope.toggleMobileCategory = function(category){
				var open = category.open;
				var length = $rootScope.categories[1][1].length;
				for(var i=0; i<length; i++){
					$rootScope.categories[1][1][i].open = false;
				}

				if(!open){
					category.open = true;
				}		
			}
			$scope.categoryClickMobile = function(title){
				$scope.mobileMenuOpen = null;
				var title = encodeURI(title);
				$location.path('/search/'+title);
			}
		}
	}
});


/*****************************************************




			S C R O L L I N G




*****************************************************/
app.directive('scroller', ['$timeout','$rootScope', '$window', function($timeout, $rootScope, $window){
	return {
		restrict: 'A',
		link: function($scope, $elem, $attrs){
			$window = angular.element(window);
			var doc = document.documentElement;
			var stickyLine = null;
			var stickyLineTimeline = null;
			var throttledSticky = _.throttle(sticky, 120);
			var throttledCheckInfinite = _.throttle(checkInfinite, 120);
			var scrollTop = null;
//
//	S C R O L L   R O U T E R
//
			function scrollRouter(){
				$scope.tileMouseLeaveFixed();
				$rootScope.scrolling = true;
				if($scope.scrollTimeout){
					$timeout.cancel( $scope.scrollTimeout );
				}
				$scope.scrollTimeout = $timeout(function(){
					$rootScope.scrolling = false;
				},100)


				if($rootScope.ctrl === 'searchCtrl'){
					throttledSticky();
					throttledCheckInfinite()
					timeline();
				}
				else if($rootScope.ctrl === 'pdpCtrl'){
					checkPos();
				}
			}

//
//	S T I C K Y
//
			function sticky(){
				$window = angular.element(window);
				var doc = document.documentElement;
				scrollTop = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
				if(!stickyLine){
					stickyLine = $('#grid').offset().top;
					stickyLineTimeline = $('.sr_container').last().offset().top;
				}

				if($window.width() < 480){
					var top = 50;
				}
				else if($window.width() < 640){
					var top = 60;
				}
				else{
					var top = 0;
				}

				if( scrollTop >= stickyLine ){
					$('.stickyNavs').css('top', top+'px');
					$('.stickyNavs').addClass('stickyNavsStuck');
					$('.stickyNavs').css('position', 'fixed');
				} 
				else {
					$('.stickyNavs').css('top', top+'px');
					$('.stickyNavs').removeClass('stickyNavsStuck');
					$('.stickyNavs').css('position', 'absolute');
					$('.stickyNavs').css('overflow','hidden');
					stickyLine = $('#grid').offset().top;
					stickyLineTimeline = $('.sr_container').last().offset().top;

				}
			}

//
//	I N F I N I T E
//		
			function checkInfinite(){
				scrollTop = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
				var offset = 75;
				var height = $window.height();
				if(height + scrollTop + offset > $(document).height()){
					$scope.infinite();
				}
			}

//
//	S C R O L L S P Y 
//		
			var sections = ['overview','features','richMedia','reviews','related'];
			var sectionsLength = sections.length;

			function checkPos(){
				scrollTop = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
				for(var i=(sectionsLength-1); i>=0; i--){
					var pos = $('#'+sections[i]).offset().top;

					if((scrollTop + 50) >= pos){
						$scope.activeSection = sections[i];
						$scope.$apply();
						break;
					}
				}
			}
//
//	T I M E L I N E
//	
			var stickyLineTimeline = null;	
			$scope.timelineScrollArray = [1000, 2200, 3500, 5000, 7500];
			$scope.timelineScrollArrayMap = ["now","in four hours","in one day","in two days","in four days"];
			$scope.timelineScrollArrayMapDelivery = ["in four hours","in one day","in two days","in four days", 'in one week'];

			var currentArray = 0;

			function timeline(){
				if(!stickyLineTimeline){
					stickyLineTimeline = $('.timelineMarker').first().offset().top;
				}
			//if($rootScope.ctrl === 'searchCtrl'){
				scrollTop = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
				if($scope.beta){
					if($scope.beta.timeline === 'stickyMarkers2' || $scope.beta.timeline === 'stickyMarkers3'){
						var shift = 44;
					}
					else if($scope.beta.timeline === 'stickyMarkersCircle'){
						var shift = 150;
					}
					else if($scope.beta.timeline === 'stickyMarkersCircle2'){
						var shift = 150;
					}
				}
				else{
					var shift = 44;
				}


				
				if($scope.beta.timeline === 'stickyMarkersCircle2' && !$scope.throttleTimelineDisplay){
					$('.timelineMarkerCircle2').first().show();
				}
				else{
					$('.timelineMarker').first().show();
				}

				if($scope.timeout && !$scope.throttleTimelineDisplay){
					$timeout.cancel( $scope.timeout );
				}
				if($scope.timeout2 && !$scope.throttleTimelineDisplay){
					$timeout.cancel( $scope.timeout2 );
				}
				
				if($scope.showTimeline && $scope.exactMatch.length > 0){
					stickyLineTimeline = $('.sr_container').last().offset().top;
				}

				var otherItemsBreak = 500000;
				if($('.sr_otherItemsBreak').length > 0){
					var otherItemsBreak = $('.sr_otherItemsBreak').last().offset().top;
				}
				
				if ( (scrollTop >= (stickyLineTimeline - 100)) && scrollTop < otherItemsBreak){
					if($scope.deliveryOptions && $scope.deliveryOptions[0].showType !== 'unknown'){
						$('.timelineMarker').first().css('opacity',1);
						$('.timelineMarker').css('opacity',1);
						$('.timelineMarker').first().css('position', 'fixed');
					}
				//
				//	Sliding down
				//
					if($scope.beta.timeline !== 'stickyMarkersCircle2'){
						var gridTop = $('#grid').offset().top;
						var bottom = $(window).height();
						var range = bottom - shift - 100;

						var scrollRange = $scope.timelineScrollArray[$scope.timelineScrollArray.length-1] - gridTop + 100;
						var ratio = (scrollTop / scrollRange);
						var newTop = (ratio * range) + 100;
						if(newTop < (bottom-shift)){
							$('.timelineMarker').first().css('top', newTop+'px')
						}
					}

				//
				//	Fading out
				//
					if($scope.beta.timeline === 'stickyMarkers2' || $scope.beta.timeline === 'stickyMarkers3'){
						var time = 1000;
					}
					else if($scope.beta.timeline === 'stickyMarkersCircle'){
						var time = 500;
					}
					else if($scope.beta.timeline === 'stickyMarkersCircle2'){
						var time = 1500;
						//if(!$scope.timeout){
						$scope.timeout = $timeout(function(){
							$('.timelineMarkerCircle2').first().css('opacity',0)
							$scope.timeout2 = $timeout(function(){
								$('.timelineMarkerCircle2').first().hide();
							},500)
						},time)
						//}
					}

					//$scope.timeout = $timeout(function(){
						//$('.timelineMarker').first().css('opacity',0)
					//},time)
				//
				//	Changing the inner text.
				//
					var prevArray = currentArray;
					var length = $scope.timelineScrollArray.length;
					for(var i=0; i<length; i++){
						if(scrollTop < $scope.timelineScrollArray[i]){
							currentArray = i;
							$scope.currentArray = currentArray;
							break;
						}
					}
					
					if(prevArray !== currentArray){
						$('.timelineMarker').children('.timelineMarker2Container').children('.timelineMarker2Inner').css('top', -(currentArray * shift)+'px')
					}
				} 
				else {
					if($scope.beta.timeline !== 'stickyMarkersCircle2'){
						$('.timelineMarker').css('top', '-18px');
						$('.timelineMarker').css('position', 'absolute');
					}
					var gridTop = $('#grid').offset().top;
					if(gridTop > scrollTop || scrollTop > otherItemsBreak){
						$('.timelineMarker').css('opacity',0)
						$('.timelineMarkerCircle2').first().hide();
					}
				}
			}
// Attach our listeners
			var throttled = _.throttle(scrollRouter, 15);
			$window.on('scroll', throttled);
		},
	};
}])
