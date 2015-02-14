'use strict';

app.controller('gridCtrl', function($scope, $rootScope, $window, $timeout, $q, $location, $routeParams, Items, Categories, Grids,GridService, GridCache, Settings) {

//	Whenever a page with a grid is initialised, we start here. 
//	I have a rootscope variable set in app.js that determines whether we are on the
//	PDP page or on the search page, and init accordingly.

	this.init = function(){
		$scope.items = []; // These are the items that go on the page
		$scope.infiniteThrottle = true; // To disable the infinite fn firing before items have loaded
		$scope.timelineAll = false; //If we have a 'All Other Items' timeline header
		$scope.storesarray = [];
		$scope.useAnyItems = false; // Active when we are searching/ filtering, and there an no more filtered items left.
		$scope.otherHeader = false; // Active when the header indicating a move to other items has been set.
		$scope.collectEmail = "joe@bloggs.com";
		$scope.collectPhone = "07711235813";
		$scope.maxStars = ['star','star1','star2','star3','star4']; // helper just so we can use ng-repeat to show stars
		$scope.searchActive = false;

//	Toggle beta / prototype settings
		$scope.beta = {};
		$scope.beta.quickview = 'grid';
		$scope.gridCtrlSettings = Settings.returnSettings();
		$scope.changeHome($scope.gridCtrlSettings.home, true);
		$scope.$watch(function () {
			return $scope.gridCtrlSettings.home;
		},                       
		function(newVal, oldVal) {
		    if(newVal !== oldVal){
		    	$scope.changeHome(newVal);
		    }
		}, true);

		$scope.changeTimelineMarkers($scope.gridCtrlSettings.timelineMarker, true);
		$scope.$watch(function () {
			return $scope.gridCtrlSettings.timelineMarker;
		},                       
		function(newVal, oldVal) {
		    if(newVal !== oldVal){
		    	$scope.changeTimelineMarkers(newVal);
		    }
		}, true);

//	This is related to the grid layout. Is it regular, thumbnail view, or list view.
		if($rootScope.ctrl === 'pdpCtrl'){
			$scope.viewType = 'pdp';
		}
		else{
			$scope.viewType = GridCache.returnViewType();
		}

//	The search input section needs to be centered by setting a width (see search.html)
//  The base is for the 'label', the size is a minimum, and grows according to the size of input
//	The lookingFor directive adjusts this size.
		var windowWidth = $window.innerWidth;	
		$scope.searchAreaBase = GridService.returnSearchAreaBase(windowWidth);
		$scope.searchAreaSize = GridService.returnSearchAreaSize(windowWidth);

//	Get any existing filters
//	If we are entering the search page from the pdp page, or back button, we should have cached the state
//  the page was previously in. Filters are essential in restoring this.
		$scope.filters = GridCache.returnFilters();
		$scope.safeFilters = GridCache.returnSafeFilters();
		$scope.clickedFilters = GridCache.returnClickedFilters();

// srLimit is the limit applied to our search results ng-repeat. As the user scrolls, this grows
// It is cached, so we need to see if there is a cached value on init.
		$scope.srLimit = GridCache.returnSrLimit();

// If we have delivery/collection options selected previously, we need to restore these on init.
// showTimeline and currentTimePeriod are discussed later.
		$scope.deliveryOptions = GridCache.returnDeliveryOptions();
		if($scope.deliveryOptions[0].showType !== 'unknown'){
			$scope.searchFocus = 'location';
			$scope.showTimeline = true;
			$scope.currentTimePeriod = -1;
		}

//	Determine if we are on the search/home page, or pdp page.
// 	This is set in the rootscope from app.js
		if($rootScope.ctrl === 'searchCtrl'){
			this.initSearch();
		}
		else if($rootScope.ctrl === 'pdpCtrl'){
			this.initPDP();
		}

//	A value that determines how many tile columns we have
// 	It is used to determine how frequently quickviews need to be placed in the grid
// (eg, after every view)
		$scope.numberOfCols = GridService.returnNumberOfColumns($scope.viewType, $rootScope.ctrl); 
	}


//  * * * * * * * * * * * * * * * * * * * *
//
//  Specific initialisation for if we are on
//  a search/ home page
//
//  * * * * * * * * * * * * * * * * * * * *

	this.initSearch = function(){		
		Items.getAllProducts().then(function(){
// Do we have a search term from the url? E.g. /rings should search for rings
			if($routeParams.searchTerm){
				var searchTerm = decodeURI($routeParams.searchTerm);
				$scope.searchTerm = searchTerm;
	// Adjust the size of the search area input
				$timeout(function(){
					$scope.searchAreaSize = $('.searchAreaLookingPseudoInput').width() + 24;
				})
	// Perform the search init to prepare filters/ items etc
				var settings = {
					'textSearch': true,
					'searchText': $scope.searchTerm,
					'fromInit': true,
					'routeParam': true,
				}
				$scope.searchRouter(settings);
			}
// Do we have a search term previously entered? If so we will need to load that state
			else if(GridCache.returnLookingFor()){
				$scope.searchTerm = GridCache.returnLookingFor();
	// Adjust the size of the search area input
				$timeout(function(){
					$scope.searchAreaSize = $('.searchAreaLookingPseudoInput').width() + 24;
				})
	// If there was a QV open, we want to flag that so it can be opened after the items have loaded
				$scope.quickviewItem = GridCache.returnQuickviewItem();

	// Perform the search init to prepare filters/ items etc
				var settings = {
					'textSearch': true,
					'searchText': $scope.searchTerm,
					'fromInit': true,
				}
				$scope.searchRouter(settings);
			}
// Even if we don't have a search term, we might have filters from a previous state.
			else if($scope.safeFilters.length > 0){
				var settings = {
					'fromInit': true,
					'initFilters': true
				}
				$scope.searchRouter(settings);
			}
// If there is no evidence we should be in a search view, we tell the search router to load a home page.
			else{
				$scope.showWelcome();
				$scope.searchRouter({'home': true});
			}		
		})
	}


	$scope.showWelcome = function(){
		$scope.showWelcome = true;
	}

//  * * * * * * * * * * * * * * * * * * * *
//
//  Specific initialisation for if we are on
//  the pdp page. There is a grid used here
//  in the related items section
//
//  * * * * * * * * * * * * * * * * * * * *

	this.initPDP = function(){
		Items.getAllProducts().then(function(){
	// We need to find the PDP item from our list of items
			$scope.item = Items.getItem($routeParams.productId);
	// The pdpgrid flag will load the right items for the PDP
			var settings = {
				'pdpgrid': true
			}
			$scope.searchRouter(settings);
		})
	}



/****************************************************************************
*
*
*

		S E A R C H   R O U T E R
		Any time we load a grid, we come through here.
		This is the main hub of the grid pages, and is more
		intricate than I would like, but accounts for quite 
		a few differing scenarios
*
*
*
*
*****************************************************************************/

	$scope.searchRouter = function(settings){
// noResults is a flag to determine if there were no results for the search term/ filters.
		$scope.noResults = false;
// exactMatch refers to items that very closely match the search term entered (>= 4 words matched with the item title)
		$scope.exactMatch = [];

// If we have the home flag, we go to the home router function and abort this one.
		if(settings.home){
			$scope.homeRouter();
			return false;
		}
		else{
			$scope.searchActive = true;
		}

	// From search input typing
		if(settings.textSearch){
			if(settings.searchText){
				if(!settings.fromInit || settings.routeParam){
					$scope.prepareFilters(settings.searchText , true);
				}
				$scope.newSearch(settings);
			}
			else{
				$scope.homeRouter();
				return false;
			}	
		}

	// From a see more click or init with filters
		if(settings.seeMoreClick || settings.initFilters){
			if(!settings.fromInit){
				$scope.prepareFilters(settings.seeMoreClick, false, true);
			}
			$scope.newSearch(settings);
		}

	// From a pdp grid
		if(settings.pdpgrid){
			var seeMore = $scope.item.seeMore;
			var seeMoreLength = seeMore.length;
			var safeArray = [];
			for(var j=0; j<seeMoreLength; j++){
				var reset = false;
				if(j===0){
					var reset = true;
				}
				$scope.prepareFilters(seeMore[j], reset);
			}
			$scope.newSearch(settings);
		}

		$scope.infiniteThrottle = false;
		$scope.setCache(settings);

	// If we have clicked on a see more tag in a quickview (that opens in the grid), we need to close the quickview
	// and scroll to the top of the page
		if(settings.fromQV){
			$scope.closeAllQuickviews();
			$('html, body').animate({
			    scrollTop: 200
			}, 300);
		}
	}

//  * * * * * * * * * * * * * * * * * * * *
//
//  Set cache so that we can repopulate past searches
//  if we leave the search page and return to it. Uses the GridCache.js service
//
//  * * * * * * * * * * * * * * * * * * * *

	$scope.setCache = function(settings){
		if($rootScope.ctrl === 'searchCtrl'){
			GridCache.setLookingFor($scope.searchTerm);
			GridCache.setFilters($scope.filters);
			GridCache.setSafeFilters($scope.safeFilters);
			GridCache.setClickedFilters($scope.clickedFilters);
		}
	}

	$scope.newSearch = function(settings, fromNoResults){
	// We need extra items if we don't have enough filtered results for display. 
	// E.g if we need to show results 20-25 but only have 19 results
		$scope.extraItems = [];
		$scope.srExtraLimit = 0;

		if(!settings.fromInit){ //if we are from an init call, we will have a cached value here
			$scope.srLimit = 15; // we limit the number of results shown at first, showing more as we scroll.
		}

	// Determine whether to use filters. We don't use filters if filters had previously returned 0 results
	// and the fromNoResults parameter is flagged.
		if(fromNoResults){
			var filters = [];
		}
		else{
			var filters = $scope.safeFilters;
			$scope.closeAllQuickviews(); // just in case any are open
		}

	//
	//	FUNCTIONS TO RETRIEVE RESULTS
	//

	// Get the items from the service - the service controls most of the logic here,
	// and returns an array of products and promos, organised, together. It also determines
	// if there is an exact match, which is checked below
		if(settings.pdpgrid){
			$scope.srLimit = $scope.numberOfCols * 3;
			$scope.searchResults = Items.getFilteredItems(filters, $scope.item.id);
		}
		else{
			// We add the search term so that we can determine if we have an exact match
			// in on of our products (this check is performed in the service)
			var searchTerm = null;
			if($scope.searchTerm){
				var searchTerm = $scope.searchTerm;
			}
			$scope.searchResults = Items.getFilteredItems(filters, null, searchTerm);
		}

	//
	//	FUNCTIONS TO ANALYSE RESULTS
	//

	// Check whether we have an exact match from the service
		if(Items.getExactMatch()){
			$scope.exactMatch = Items.getExactMatch();
		}
	// Check whether we have no results or not.
		if($scope.searchResults.length === 0 && !fromNoResults){
			$scope.noResults = true;
			if(!$scope.exactMatch){
				$scope.newSearch(settings, true)
			}	
		}

	// Adjust the layout for list item view. Potentially should do this somewhere else, but it works.
		if($scope.viewType === 'list'){
			$timeout(function(){
				$scope.adjustListHeight();
			})
		}

	// If we come from another page (eg pdp) and there was a QV open, we need to re-open it
		if(settings.fromInit && $scope.quickviewItem){
			$timeout(function(){
				$scope.openQuickview($scope.quickviewItem, true)
			},200)
		}

	// Do we need to get overflow items
		$scope.checkForTooFewItems();	
	}

//
// This checks to see if we need extra items below our search results
//
	$scope.checkForTooFewItems = function(){
		if($scope.srLimit >= $scope.searchResults.length && $scope.extraItems.length <= 0){
			$scope.extraItems = Items.getExtraItems($scope.safeFilters);	
		}

		if($scope.srExtraLimit < 15){
			$scope.srExtraLimit = 15;
		}	

		$timeout(function(){
			$scope.infiniteThrottle = false;
		},500)
	}

//
// This gets promos and large promos for the home grid, and searchresult items to go below
// the home headers - eg 'Bestsellers'
//
	$scope.homeRouter = function(homeOption){
		$scope.searchResults = [];
		$scope.searchActive = false;
		$scope.infiniteThrottle = true;
		$scope.promos = Items.getPromos();
		$scope.largePromos = Items.getLargePromos();
		
		if($scope.home2){
			$scope.srLimit = 5;
			var homeOption = homeOption || 'bestSeller';
			$scope.searchResults = Items.getHomeSearchItems(homeOption);
		}
	}

// When you click on the home headers we need to change the search results array
// to fit which header was clicked, eg. bestseller, clearance etc.
// The service does this, and some headers just show random itesm at the moment,
// due to the data not really being set up for it.
	$scope.homeHeaderClick = function(homeOption){
		$scope.home2Filter = homeOption;

		if($scope.home2){
			$scope.srLimit = 5;
			var homeOption = homeOption || 'bestSeller';
			$scope.searchResults = Items.getHomeSearchItems(homeOption);
		}
	}

/**********************************************************************
*
*
*
*

	
						G E N E R A L    U I


*
*
*
*
**********************************************************************/

$scope.changeViewType = function(viewType){
	$scope.viewType = viewType;
	$scope.numberOfCols = GridService.returnNumberOfColumns($scope.viewType, $rootScope.ctrl);
	if(viewType === 'thumbnails'){
		$scope.srLimit = 60;
		GridCache.setSrLimit($scope.srLimit);
	}

	if(viewType === 'list'){
		$timeout(function(){
			$scope.adjustListHeight();
		})
	}
	
	GridCache.setViewType(viewType);
}

$scope.createListView = function(){
	$scope.items = [];
	var settings = {
		'blocks': 1,
		'currentBlockCount': -1,
		'forceReset': true,
	}
	$scope.searchRouter(settings);
}

$scope.homeHeaderClickOld = function(homeFilter){
	$scope.home2Filter = homeFilter;

	var settings = {
		'blocks': 1,
		'currentBlockCount': -1,
		'forceReset': true
	}

	$scope.home2Header = 0;
	$scope.searchRouter(settings);
}

//
// This was a function to change the home version we are using.
// It is likely now redundant (as of end of Nov 14.) I will leave it though in case
// anyone wants to salvage toggling different home page versions.
//
$scope.changeHome = function(val, blockSearch){
	$scope.home1 = false;
	$scope.home2 = false;
	$scope.home2Header = 0;
	$scope.home2Filter = 'bestSeller';
	$scope.home3 = false;
	$scope.home3Header = 0;

	if(val === 1){
		$scope.home1 = true;
	}
	else if(val === 2){
		$scope.home2 = true;

	}
	else if (val === 3){
		$scope.home3 = true;
	}

	if(blockSearch){
		return;
	}

	var blocks = 1;
	if($scope.home3){
		var blocks = 3;
	}

	var settings = {
		'blocks': blocks,
		'currentBlockCount': -1,
		'forceReset': true
	}

	$scope.searchRouter(settings);
}

$scope.changeTimelineMarkers = function(val, blockSearch){
	$scope.beta.timeline = val;
}

$scope.changeDeliveryOption = function(option, arrayNumber){
	var arrayNumber = arrayNumber || 0;

	$scope.deliveryOptions[arrayNumber].showType = option;
	$scope.searchFocus = 'location';

	GridCache.setDeliveryOptions($scope.deliveryOptions);
	$scope.setMultipleDeliveryOptions();
}

$scope.getSubnavCenterMargin = function(){
	if($('.subnavCenter').length > 0){
		var marginLeft = -$('.subnavCenter').width() / 2
	}
	else{
		var marginLeft = -70;
	}
	
	return marginLeft;
}

$scope.adjustListHeight = function(){
	var windowWidth = $window.innerWidth;
	var padding = 48;
	if(windowWidth < 640){
		var padding = 24;
	}
	$scope.listHeight = $('.listItemRowInner').first().height() + padding;
	var listWidth = $('.listItem').first().width();
	var imageWidth = (18 / 100) * listWidth;
	$scope.listImageHeight = imageWidth - 24;
}

$scope.goToHomePage = function(){
	GridCache.setLookingFor(null);
	GridCache.setFilters([]);
	GridCache.setSafeFilters([]);
	GridCache.setClickedFilters([]);
	$location.path('/');
}


/****************************************************************************
*
*
*
*

	
		F I L T E R I N G

		This is where an array of filters is created, based on user
		search terms of clicked filters (see more tags). It is also where
		we organise filtered item and promo arrays based on these.


*
*
*
*
*****************************************************************************/

//  * * * * * * * * * * * * * * * * * * * *
//
//  Define some words that are removed from user search terms
//
//  * * * * * * * * * * * * * * * * * * * *
$scope.filterBlacklist = [
	"a", "the", "some", "1", "2", "3","4","5","6","7","8","9","10","11","12","13","14","15","50","100"
]
// These are where we try to intercept spelling mistakes. Using two arrays just so we can use indexOf rather than 
// looping through an object.
$scope.filterSpellingMistakes = [
	"jewellry", "jewelry", "jewlry", "jewellary"
]
$scope.filterSpellingCorrections = [
	"jewellery", "jewellery", "jewellery", "jewellery",
]

//  * * * * * * * * * * * * * * * * * * * *
//
//  Click on a 'See More Like This' tag
//
//  * * * * * * * * * * * * * * * * * * * *

$scope.seeMoreLikeClick = function(filter){
	$scope.prepareFilters(filter);
}


//	* * * * * * * * * * * * * * * * * * * *
//
//	Creates an array of filter terms. safeFilters is the same, but without spaces or capital letters
//
//	* * * * * * * * * * * * * * * * * * * *

$scope.prepareFilters = function(filter, reset, clicked){
// If we are coming from the search text input, we need to clear exisiting filters - it is a new search
	if(reset){
		$scope.filters = [];
		$scope.safeFilters = [];
	}
// Remove any words that are in the filter blacklist
	var okFilters = [];
	if(filter){
		var filterArray = filter.split('\ ');
		var length = filterArray.length;
		for(var i=0; i<length; i++){
			var filterToCheck = filterArray[i].toLowerCase();
			var isNotBlacklist = false;
			if(_.indexOf($scope.filterBlacklist,  filterToCheck) === -1){
				var isNotBlacklist = true;
			}
			// Now we need to check for spelling mistakes as well...
			var spellingIndex = _.indexOf($scope.filterSpellingMistakes,  filterToCheck);
			if(spellingIndex !== -1){
				var filterToCheck = $scope.filterSpellingCorrections[spellingIndex];
			}

			if(isNotBlacklist){
				okFilters.push(filterToCheck)
			}
		}
		var filter = okFilters.join('');
		var filterSafe = filter.replace(/\s+/g, '').toLowerCase();

// Check if the filter term is already in our filter, if not add it, if so, remove it.
		var index = _.indexOf($scope.safeFilters,  filterSafe);
		if(index === -1 && filterSafe){
			$scope.filters.push(filter);
			$scope.safeFilters.push(filterSafe);
		}
		else{
			$scope.filters.splice(index,1);
			$scope.safeFilters.splice(index,1);
		}
//	Decide whether to add to our clicked filters array
		if(clicked){
			$scope.addToClickedFilters(filterSafe)
		}
	}
}

$scope.addToClickedFilters = function(filterSafe){
	var index = _.indexOf($scope.clickedFilters,  filterSafe);
	if(index === -1 && filterSafe){
		$scope.clickedFilters.push(filterSafe);
	}
	else{
		$scope.clickedFilters.splice(index,1);
	}
}

/****************************************************************************
*
*
*
	
		T I M E L I N E  /  D E L I V E R Y  &   C O L L E C T I O N

		We need to re-order the grid when a new delivery option or collection
		option is added/ selected.

		Delivery text is tracked via the delivery directive, and opens a 
		dropdown of [faked] addresses. Clicking on these activates 
		$scope.deliveryLocationClick

*
*
*
*
*****************************************************************************/

//	* * * * * * * * * * * * * * * * * * * *
//
//	When a user selects a new address froma  delivery dropdown,
// 	run a new search or items so we can order by availability
//
//	* * * * * * * * * * * * * * * * * * * *

$scope.deliveryLocationClick = function(houseNumber, arrayNumber){
	var arrayNumber = arrayNumber || 0;
	$scope.deliveryOptions[arrayNumber].deliveryText = houseNumber+' Example Boulevard';
	$scope.deliveryOptions[arrayNumber].deliveryChosen = true;
	GridCache.setDeliveryOptions($scope.deliveryOptions);
	//$scope.searchResults = $scope.shuffle($scope.searchResults);
	$scope.searchResults = Items.shuffleItems();
	$scope.showTimeline = true;
}

//*	 * * * * * * * * * * * * * * * * * * * *
//
//	Clicking on the x after we have a selected delivery address 
//	This removes that option, unless its the only one, in which
//	case it effectively just resets it to a neutral state
//
//	* * * * * * * * * * * * * * * * * * * */

$scope.deleteDeliveryOption = function(arrayNumber){
	var arrayNumber = arrayNumber || 0;

	if(arrayNumber){
		$scope.deliveryOptions.splice(arrayNumber,1)
	}
	else{
		if($scope.deliveryOptions[1] && $scope.deliveryOptions[1].show){
			$scope.deliveryOptions.shift()
		}
		else{
			// XYZ - we might want to restore the order of
			// search results here
			$scope.deliveryOptions[0].showType = 'unknown';
			$scope.deliveryOptions[0].collection = '';
			$scope.deliveryOptions[0].collectionValid = '';
			$scope.deliveryOptions[0].deliveryText = '';
			$scope.deliveryOptions[0].showMap = false;
			$scope.deliveryOptions[0].loadingMap = false;
			$scope.deliveryOptions[0].storesArray = [];
			$scope.deliveryOptions[0].googleLat = null;
			$scope.deliveryOptions[0].googleLong = null;
			$scope.deliveryOptions[0].mapData = null;

			$scope.showTimeline = false;
		}
	}
	GridCache.setDeliveryOptions($scope.deliveryOptions);
	$scope.setMultipleDeliveryOptions();
}


//*	 * * * * * * * * * * * * * * * * * * * *
//
//	This is to toggle what icons get shown in 
//	the timeline markers
//
//	* * * * * * * * * * * * * * * * * * * */

$scope.setMultipleDeliveryOptions = function(){
	var length = $scope.deliveryOptions.length;
	var hasDelivery = false;
	var hasCollection = false;
	for(var i = 0; i<length; i++){
		if($scope.deliveryOptions[i].showType === 'delivery'){
			var hasDelivery = true;
		}
		else if($scope.deliveryOptions[i].showType === 'collection'){
			var hasCollection = true;
		}
	}
	$timeout(function(){
		if(hasDelivery && hasCollection){
			$scope.multipleDeliveryOptions = 'both';
		}
		else if(hasDelivery){
			$scope.multipleDeliveryOptions = 'delivery';
		}
		else if(hasCollection){
			$scope.multipleDeliveryOptions = 'collection';
		}
		$scope.$apply()
	})
}

//*	 * * * * * * * * * * * * * * * * * * * *
//
//	This is to update the colletion locations chosen 
//	It is activated by the user selecting an option 
//	from the map
//
//	* * * * * * * * * * * * * * * * * * * */
$scope.updateCollectionLocations = function(data){
	var arrayNumber = data.arrayNumber || 0;

	$scope.deliveryOptions[arrayNumber].collection = data.location;
	$scope.deliveryOptions[arrayNumber].collectionValid = true;
	
	GridCache.setDeliveryOptions($scope.deliveryOptions);

	$scope.setMultipleDeliveryOptions();

	//$scope.searchResults = $scope.shuffle($scope.searchResults);
	$scope.searchResults = Items.shuffleItems();

	$scope.showTimeline = true;
}


$scope.getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Define time periods we wish to use
$scope.timePeriods = ["1 hour","4 hours",	'1 day',	'2 days','4 days','1 week','2 weeks', 'Over 2 weeks'];
$scope.currentTimePeriod = -1;
		
/**********************************************************************
*
*
*
*

	
						Q U I C K V I E W
						&   L I S T V I E W   S T U F F


*
*
*
*
**********************************************************************/


	$scope.openQuickview = function(item,initOpen){
		var id = item.id;
		item.tileActiveSmall = false;

		if($scope.quickviewItem && !initOpen){
			if($scope.quickviewItem.id === id){
// This quick view item is already open
				$scope.closeAllQuickviews();
				return false;
			}
		}

// Find the next QV
		var el = $("#tileInner_"+id);
		var parent = $(el).parent('.sr_tileOuter').parents('.pseudoTile');
		if($(parent).children('.qvn').length > 0){
			var qvn = $(parent).children('.qvn')[0];
		}
		else{
			for(var i=0; i<$scope.numberOfCols; i++){
				if($(parent).next('.pseudoTile')){
					var parent = $(parent).next('.pseudoTile');
					if($(parent).children('.qvn').length > 0){
						var qvn = $(parent).children('.qvn')[0];
						break;
					}
				}
			}
		}
		
		if($(qvn).hasClass('qvnOpen') && $scope.quickviewItem){
			$scope.quickviewItem = item;
		}
		else{
			$scope.closeAllQuickviews();
			$(qvn).addClass('qvnOpen');
			$scope.quickviewItem = item;
			GridCache.setQuickviewItem($scope.quickviewItem);
		}

		$timeout(function(){
			var top = $(qvn).offset().top - 120;

			var length = $scope.timelineScrollArray.length;
			for(var i=0; i<length; i++){
				if(top < $scope.timelineScrollArray[i]){
					var currentArray = i;
					if($scope.deliveryOptions[0].showType === 'delivery'){
						$scope.quickviewItem.availableIn = $scope.timelineScrollArrayMapDelivery[currentArray];
						break;
					}
					else if($scope.deliveryOptions[0].showType === 'collection'){
						$scope.quickviewItem.availableIn = $scope.timelineScrollArrayMap[currentArray];
						break;
					}
					
				}
			}
			$scope.throttleTimelineDisplay = true;

			$('html, body').animate({
			       scrollTop: top
			}, 1000, function() {
    			$scope.throttleTimelineDisplay = false;
  			});
		},700)
		
// Set the best height for the Quick Views
		$timeout(function(){
			if($(window).width() > 640){
				var qvLeftHeight = $(qvn).find('.qvn_left').height();
				var qvImageColHeight = $(qvn).find('.qvn_imageCol').height();
				var qvCenterHeight = $(qvn).find('.qvn_center').height();

				var maximum = _.max([qvLeftHeight,qvImageColHeight,qvCenterHeight]) + 36;
				$(qvn).find('.qvn_left').css('height',maximum+'px');
				$(qvn).find('.qvn_imageCol').css('height',maximum+'px');
				$(qvn).find('.qvn_center').css('height',maximum+'px');
				$(qvn).find('.qvn_center').css('height',maximum+'px');
				$(qvn).find('.qvn_right').children('.qvn_rightActions').css('height',(maximum/2)+'px');	
			}
		},1200)
		
	}

	$scope.closeOpenQuickview = function(){
		$scope.closeAllQuickviews();
	}

	$scope.closeAllQuickviews = function(){
		$('.qvn').each(function( index ) {
			$(this).removeClass('qvnOpen')
		});
		$scope.quickviewItem = null;
		GridCache.setQuickviewItem(null);
	}

	$scope.openQuickviewOverlay = function(overlayType){
		var padding = 36;

		if(overlayType){
			$scope.quickviewItem.openOverlay = overlayType;
		}
		else{
			$scope.quickviewItem.openOverlay = false;
		}
		
		var qvn = $('.qvnOpen');
		var qvLeftHeight = $(qvn).find('.qvn_left').height();
		var qvImageColHeight = $(qvn).find('.qvn_imageCol').height();
		var qvCenterHeight = $(qvn).find('.qvn_center').height();

		if(overlayType){
			$timeout(function(){
				var qv_collection = $(qvn).find('.qvn_overlayInner_collection').height() + padding;
				var qv_confirmed = $(qvn).find('.qvn_overlayInner_confirmed').height() + padding;
				var qv_payment = $(qvn).find('.qvn_overlayInner_payment').height() + padding;
				var maximum = _.max([qv_collection,qv_confirmed,qv_payment]) + padding;
				$(qvn).css('height',maximum+'px');
				var top = $(qvn).offset().top - 120;
				$('html, body').animate({
				       scrollTop: top
				}, 50);
			},200)

		}
		else{
			var maximum = _.max([qvLeftHeight,qvImageColHeight,qvCenterHeight]) + padding;
			$(qvn).css('height','auto');
			$(qvn).find('.qvn_left').css('height',maximum+'px');
			if($(window).width() > 640){
				$(qvn).find('.qvn_imageCol').css('height',maximum+'px');
			}
			$(qvn).find('.qvn_center').css('height',maximum+'px');
			$(qvn).find('.qvn_right').children('.qvn_rightActions').css('height',(maximum/2)+'px');	
		}	
	}

/*******************************************
*
*
*
*
	U T I L I T I E S
	Reset all items so that they do not already
	have grid information associated, nor a 
	used flag.
*
*
*
*
*******************************************/	

	 $scope.shuffle = function(array) {
		var currentIndex = array.length, temporaryValue, randomIndex ;
		while (0 !== currentIndex) {
		  randomIndex = Math.floor(Math.random() * currentIndex);
		  currentIndex -= 1;
		  temporaryValue = array[currentIndex];
		  array[currentIndex] = array[randomIndex];
		  array[randomIndex] = temporaryValue;
		}
		return array;
	}

/**********************************************************************
*
*
*
*
*
*
*

	
						 E X P A N D


*
*
*
*
*
*
*
**********************************************************************/
// This is from an ng-mouseenter on the tiles.
// It should only apply to product items on the search/home pages
// The beta version allows two types of expansion, a large QV expansion, and a smaller one from
// which the grid QV can be opened.
// On mobile/tablet (in our case, we just represent this with smaller screen sizes), we need to 
// click to activate these hover states, so use openPDP as opposed to the following function.
	$scope.tileMouseEnter = function(item){
		if($rootScope.ctrl === 'pdpCtrl' || item.type === 'promo' || item.type === 'specialLarge' || $rootScope.settings.expand === 'none'){
			return false;
		}
		else if($rootScope.settings.expand === 'fixed'){
			$scope.tileMouseEnterFixed(item);
			return false;
		}
	// If the expansion shows a quick view tile
		if($rootScope.settings.expand === 'big'){
			if($window.innerWidth > 1024){ // If smaller screen, activate by click
				if($rootScope.scrolling){
					var time = 1000;
				}
				else{
					var time = 300;
				}

				if($scope.expandHoverTimeout){
					$timeout.cancel($scope.expandHoverTimeout)
				}

				if(!item.tileActive){
					$scope.expandHoverTimeout = $timeout(function(){
						$scope.expandTileLarge(item);
					},time);
				}	
			}
		}
	// If just a smaller expansion (based on whichever beta setting we have set)
		else{
			if($window.innerWidth > 1024){
				$scope.expandTileSmall(item);
			}
		}
	}


// This opens the expanded quickview, and allows us to cancel it on body click if on mobile/tablet
	$scope.expandTileLarge = function(item){
		item.tileActive = true;
		item.tileActiveSmall = false;
		// depending which expanded screen we have, we may need to adjust the height of the container with this function
		$scope.changeQVExpand(item, null, true);

		if($(window).width() <= 1024){
			$timeout(function(){
				$('#body').parent().bind('click', function(e) { 
					$(this).unbind('click');
					$scope.bodyCloseTileLarge(item);
				});
			},100)	
		}
	}

// This is the expansion function for when the beta setting is for small expansions.
// As we the above, if on mobile/tablet we can close this exapnsion with a body click
	$scope.expandTileSmall = function(item){
		var el = $("#tileInner_"+item.id);
		var initialHeight = $(el).height() + 18;
		$(el).parent('.sr_tileOuter').css('height',initialHeight+'px');

		item.tileActive = false;
		item.tileActiveSmall = true;

		if($(window).width() <= 1024){
			$timeout(function(){
				$('#body').parent().bind('click', function(e) { 
					$(this).unbind('click');
					$scope.bodyCloseTileSmall(item);
				});
			},100)	
		}
	}

	$scope.bodyCloseTileLarge = function(item){
		item.tileActive = false;
		$('#body').parent().unbind('click');
		$scope.$apply();
	}

	

	$scope.bodyCloseTileSmall = function(item){
		item.tileActiveSmall = false;
		var el = $("#tileInner_"+item.id);
		$(el).parent('.sr_tileOuter').css('height','auto');
		$('#body').parent().unbind('click');
		$scope.$apply();
	}

// This is from an ng-mouseleave on a tile
// that is expanded in the small way
//
	$scope.tileMouseLeaveSmall = function(item){
		if($scope.expandHoverFixedTimeout){
			$timeout.cancel($scope.expandHoverFixedTimeout)
		}

		if($rootScope.settings.expand === 'none'){
			return false;
		}
		if(item.tileActiveSmall && $(window).width() > 1024){
			item.tileActiveSmall = false;
			var el = $("#tileInner_"+item.id);
			$(el).parent('.sr_tileOuter').css('height','auto');
			$('#body').parent().unbind('click');
		}
	}


	$scope.tileMouseLeave = function(item){
		if($rootScope.settings.expand === 'none'){
			return false;
		}
		if(item.tileActive){
			if($(window).width() <= 1024){
				return;
			}
			if($scope.expandHoverTimeout){
				$timeout.cancel($scope.expandHoverTimeout)
			}

			if(item){
				item.tileActive = false;
			}

			$scope.closeAllTiles();
		}	
	}




	$scope.closeAllTiles = function(){
		var length = $scope.searchResults.length;
		for(var i=0; i<length; i++){
			$scope.searchResults[i].tileActive = false;
			$scope.searchResults[i].tileActiveSmall = false;
		}
	}

	$scope.changeItemCollection = function(item, collectionType){
		var el = $("#tileInner_"+item.id);
		if(!item.collection){
			$(el).css('height', ($(el).height() + 40 )+'px')
		}

		var collectionType = collectionType || null;
		item.collection = collectionType;
	}

	$scope.qvExpandOptions = ['collectionActive', 'payActive', 'confirmActive'];

	$scope.changeQVExpand = function(item,collectionType,init){
		if(!init){
			var length = $scope.qvExpandOptions.length;
			for(var i=0; i<length; i++){
				if($scope.qvExpandOptions[i] === collectionType){
					item[collectionType] = true;
				}
				else{
					item[$scope.qvExpandOptions[i]] = false;
				}
			}
		}	

		if($rootScope.settings.expand === 'fixed'){
			var height = $('.sr_tileOuterContainer').find('.sr_qvOverlay').height();
			var existingHeight = $('.sr_tileOuterContainer').find('.sr_qvOverlayOuter').height();
			if(height > existingHeight){
				$('.sr_tileOuterContainer').css('height',height+'px')
			}
		}
		else{
			console.log('******')
			var el = $("#tileInner_"+item.id);
			var height = $(el).find('.sr_qvOverlay').height();
			var existingHeight = $('.sr_qvOverlayOuter').height();
			if(height > existingHeight){
				$('.sr_qvOverlayOuter').css('height',height+'px')
			}
		}	
	}



	$scope.openPDP = function(item, forceOpen, isID, $event){
		if($rootScope.settings.expand === 'none'){
			if($rootScope.ctrl === 'pdpCtrl'){
				if(!isID){
					item.tileActive = false;
					var productId = item.id;
					item.collection = null;
				}
				else{
					var productId = item;
				}		
				$scope.closeAllTiles();
				$scope.infiniteThrottle = true; 

				$location.path('/pdp/'+productId);
			}
			else{
				if(forceOpen){
					$scope.openPDPClick(item);
				}
				else{
					$scope.openQuickview(item);
				}	
			}
		}
		else{
			if($rootScope.ctrl === 'pdpCtrl'){
				if(!isID){
					item.tileActive = false;
					var productId = item.id;
					item.collection = null;
				}
				else{
					var productId = item;
				}		
				//$scope.unexpandTiles();
				$scope.closeAllTiles();
				$scope.infiniteThrottle = true; 

				$location.path('/pdp/'+productId);
			}
			else{
				if($window.innerWidth > 1024 || forceOpen){
					if(!isID){
						item.tileActive = false;
						var productId = item.id;
						item.collection = null;
					}
					else{
						var productId = item;
					}		
					//$scope.unexpandTiles();
					$scope.closeAllTiles();
					$scope.infiniteThrottle = true; 

					$location.path('/pdp/'+productId);
				}
				else{
					//no quickview on mobile
					if(item.tileActive || item.tileActiveSmall || $window.innerWidth < 640){
						$scope.closeAllTiles()
						$location.path('/pdp/'+item.id);
					}
					else{
						$scope.closeAllTiles()
						if(!isID){
							if($rootScope.settings.expand === 'big'){
								$scope.expandTileLarge(item);
							}
							else{
								$scope.expandTileSmall(item);
							}
						}
					}	
				}
			}
		}	
	}

	$scope.openPDPClick = function(item){
		item.tileActive = false;
		item.tileActiveSmall = false;
		var productId = item.id;
		item.collection = null;

		$scope.closeAllTiles();
		$scope.infiniteThrottle = true; 
		$location.path('/pdp/'+item.id);
	}

	// On the smaller tile hover, image pips are revealed. These control
	// the associated functions.
	$scope.pipsHover = function(item,index){
		if(!item.pips[index]){
			item.pips[index] = 'hover'
		}
	}

	$scope.pipsLeave = function(item,index){
		if(item.pips[index] === 'hover'){
			item.pips[index] = false
		}
	}

	$scope.pipsClick = function(item,index){
		if(item.pips[index] !== 'active'){
			item.pips = [];
			item.pips[index] = 'active';
			item.activeImage = index;
		}
	}


	$scope.tileMouseEnterFixed = function(item){
		if($scope.expandHoverFixedTimeout){
			$timeout.cancel($scope.expandHoverFixedTimeout)
		}

		$scope.expandHoverFixedTimeout = $timeout(function(){
			$scope.fixedTileItem = item;
			$('.sr_tileOuterContainer').show();
			$scope.changeQVExpand(item, null, true);
			var originalEl = $("#tileInner_"+item.id);
			var originalOverlay = $(originalEl).find('.sr_qvOverlayOuter');
			$(originalOverlay).show();
			var overlayLeft = $(originalOverlay).offset().left;
			var overlayTop = $(originalOverlay).offset().top - $(document).scrollTop();
			var height = $('.sr_tileOuterContainer').height() + 50;
			$(originalOverlay).hide();

			if($('.stickyNavs').hasClass('stickyNavsStuck') && overlayTop < 100){
				var overlayTop = 110;
			}
			else if((overlayTop + height) > $(window).height()){
				var bottom = overlayTop + height;
				var diff = bottom - $(window).height();
				var overlayTop = overlayTop - diff - 10;
			}
			$('.sr_tileOuterContainer').css('top', overlayTop+'px');
	 		$('.sr_tileOuterContainer').css('left', overlayLeft+'px');
	 		$('.sr_tileOuterContainer').css('opacity',1);
		},500);	

	}

	$scope.tileMouseLeaveFixed = function(){
		if($scope.expandHoverFixedTimeout){
			$timeout.cancel($scope.expandHoverFixedTimeout)
		}
		$scope.fixedTileItem = null;
		$scope.tileFixedEntered = false;
		$('.sr_tileOuterContainer').hide();
		$('.sr_tileOuterContainer').css('opacity',0);
	}

	$scope.tileFixedMouseEnter = function(){
		$scope.tileFixedEntered = true;
	}
	$scope.tileFixedMouseLeave = function(){
		$scope.tileFixedEntered = false;
	}


/**********************************************************************
*
*
*
*
*
*
*

	
						G O O G L E   M A P S


*
*
*
*
*
*
*
**********************************************************************/

$scope.mapType = function(arrayNumber){
	$scope.deliveryOptions[arrayNumber].loadingMap = true;
//
//	Timeout Throttle
//
	if($scope.searchTimeout){
		$timeout.cancel($scope.searchTimeout);
	}

	$scope.searchTimeout = $timeout(function(){
		if($scope.deliveryOptions[arrayNumber].collection.length > 2){
			$scope.showMapFn(arrayNumber);
		}
		else{
			$scope.closeMap();
		}
	}, 500)
}

$scope.getUserLocation = function(arrayNumber){
	$scope.resizeMapContainer(arrayNumber)
	$scope.deliveryOptions[arrayNumber].showMap = true;
	$scope.extendSearchAreaForMap(arrayNumber);
	// EXTEND SEARCH AREA HEIGHT
	$scope.deliveryOptions[arrayNumber].loadingMap = true;
	$scope.deliveryOptions[arrayNumber].collection = "Current Location";
	$scope.$apply();

	if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(function(position){
	    	$scope.loadGoogleMap(arrayNumber, null, position);
	    });
	} 
	else {
	    console.log("Geolocation is not supported by this browser.");
	}
}

$scope.showMapFn = function(arrayNumber, dontSearch, fromList){
	var collectionText = $scope.deliveryOptions[arrayNumber].collection;
// Do we show the map?
	$scope.resizeMapContainer(arrayNumber)
	$scope.deliveryOptions[arrayNumber].showMap = true;
	$scope.extendSearchAreaForMap(arrayNumber);
	// EXTEND SEARCH AREA HEIGHT
	if(!fromList){
		$('#body').parent().bind('click', function(e) { 
			$scope.bodyCloseMap(e);	
		});
	}
	else{
		$timeout(function(){
			$('#body').parent().bind('click', function(e) { 
				$scope.bodyCloseMap(e);	
			});
		},1000)
	}
	
// Go on to load the map content
	if(!dontSearch){
		console.log('load search map');
		console.log($scope.deliveryOptions[arrayNumber]);
		$scope.loadGoogleMap(arrayNumber, collectionText);
	}

	var offset = $('#searchAreaLocation_'+arrayNumber).offset().top - 0;
	$('html, body').animate({
	       scrollTop: offset
	}, 300)
}

$scope.resizeMapContainer = function(arrayNumber){
	var width = $('#searchAreaLocation_'+arrayNumber).width();
	var windowWidth = $window.innerWidth;
	$scope.deliveryOptions[arrayNumber].leftRightMap  = -(windowWidth - width) / 2;
}
$scope.extendSearchAreaForMap = function(arrayNumber){
	$scope.currentSearchAreaHeight = $('.searchArea').height() + 30;
	// console.log($scope.currentSearchAreaHeight);
	// $timeout(function(){
	// 	var mapHeight = $('#map-canvas-'+arrayNumber).height();
	// 	console.log(mapHeight);
	// },1000)
}

$scope.loadGoogleMap = function(arrayNumber, collectionText, position){
	if(position){
		var startCenter = { lat: position.coords.latitude, lng: position.coords.longitude};
		$scope.deliveryOptions[arrayNumber].googleLong = position.coords.longitude;
		$scope.deliveryOptions[arrayNumber].googleLat = position.coords.latitude;
	}
	else{
		var startCenter = { lat: 51.49636, lng: -0.14308};
	}

	var mapOptions = {
	    zoom: 12,
	    disableDefaultUI: true,
	    zoomControl: true,
	    center: startCenter,
	     scrollwheel: false
	};

	if(!$scope.deliveryOptions[arrayNumber].mapData || position){
		$scope.deliveryOptions[arrayNumber].mapData = new google.maps.Map(document.getElementById('map-canvas-'+arrayNumber), mapOptions);
		google.maps.event.trigger($scope.deliveryOptions[arrayNumber].mapData, 'resize') 
	}	

// Find the place the user has just searched for
	if(collectionText){
		var service = new google.maps.places.PlacesService($scope.deliveryOptions[arrayNumber].mapData);
		var obj = {
			query: collectionText+' UK'
		}

		service.textSearch(obj, function(data){
			if(data[0]){
				$scope.deliveryOptions[arrayNumber].googleLong = data[0].geometry.location.B;
				$scope.deliveryOptions[arrayNumber].googleLat = data[0].geometry.location.k;
				$scope.deliveryOptions[arrayNumber].mapData.setCenter(data[0].geometry.location);
				$scope.placeGoogleMarker(arrayNumber);
				$scope.newArgosLocationSearch(arrayNumber, collectionText);
			}
			else{
				$scope.deliveryOptions[arrayNumber].mapError = "Error with Google Search";
				$scope.deliveryOptions[arrayNumber].loadingMap = false;
			}
		});
	}
	else{
		$scope.placeGoogleMarker(arrayNumber);
		$scope.newArgosLocationSearch(arrayNumber, null, position);
	}
	
}

$scope.placeGoogleMarker = function(arrayNumber){
//
// Do we use retina icon or not?
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

	var latLong = new google.maps.LatLng($scope.deliveryOptions[arrayNumber].googleLat, $scope.deliveryOptions[arrayNumber].googleLong);

	var marker = new google.maps.Marker({
	    position: latLong,
	    map: $scope.deliveryOptions[arrayNumber].mapData,
	    icon: image,
	});
	$scope.deliveryOptions[arrayNumber].mapData.setCenter(latLong);
	google.maps.event.trigger($scope.deliveryOptions[arrayNumber].mapData, 'resize') 
}



$scope.newArgosLocationSearch = function(arrayNumber, collectionText, position){
	var api = 'uahnefurfpckn2qary4q6b7j';
	if(collectionText){
		var encoded = encodeURI(collectionText);
		var url = "http://api.homeretailgroup.com/location/argos/store?origin="+encoded+"&apiKey="+api+"&closeMatches=true";
	}
	else{
		var url = "http://api.homeretailgroup.com/location/argos/store?origin="+position.coords.latitude+","+position.coords.longitude+"&apiKey="+api+"&closeMatches=true"
	}
	
	
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
				var distance = $scope.util_getDistanceFromLatLonInKm($scope.deliveryOptions[arrayNumber].googleLat, $scope.deliveryOptions[arrayNumber].googleLong, latitude, longitude)
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
				$scope.processStoreResults(data, arrayNumber);
			}).fail(function() {
				console.log('FAILURE 1: '+arrayNumber)
				$scope.deliveryOptions[arrayNumber].mapError = "Error with Argos API Search";
				$scope.deliveryOptions[arrayNumber].loadingMap = false;
				$scope.$apply();
			})
		}
		else{
			$scope.processStoreResults(data, arrayNumber);
		}	
	}).fail(function() {
		console.log('FAILURE 2: '+arrayNumber)
		$scope.deliveryOptions[arrayNumber].mapError = "Error with Argos API Search";
		$scope.deliveryOptions[arrayNumber].loadingMap = false;
		$scope.$apply();
	})
}

$scope.daysArray = ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

$scope.processStoreResults = function(data, arrayNumber){
	$scope.deliveryOptions[arrayNumber].storesArray = [];
	$scope.deliveryOptions[arrayNumber].loadingMap = false; 
	$scope.deliveryOptions[arrayNumber].mapError = null;
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
		
		var distance = $scope.util_getDistanceFromLatLonInKm(latitude,longitude,$scope.deliveryOptions[arrayNumber].googleLat,$scope.deliveryOptions[arrayNumber].googleLong);

		var obj = {
			'name': name,
			'latitude': latitude,
			'longitude': longitude,
			'distance': distance,
			'from': from,
			'to': to
		}
		$scope.deliveryOptions[arrayNumber].storesArray.push(obj);
	})
	google.maps.event.trigger($scope.deliveryOptions[arrayNumber].mapData, 'resize') 

//
// Add each store to the map
//
	if($scope.deliveryOptions[arrayNumber].storesArray.length > 0){
		var length = $scope.deliveryOptions[arrayNumber].storesArray.length;
		for(var i = 0; i<length; i++){
			$scope.createStoreMarker($scope.deliveryOptions[arrayNumber].storesArray[i], arrayNumber, i);
		}
		google.maps.event.trigger($scope.deliveryOptions[arrayNumber].mapData, 'resize')
	}
}

$scope.createStoreMarker = function(store, arrayNumber, i){
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
	var contentString = "\
		<div class='mapInfoContent'>\
		<div class='mapInfoTitle'>"+store.name+"</div> \
		<div class='mapInfoOpening'>"+store.from+" - "+store.to+"</div>\
		<div class='mapInfoSelect' ng-click='tester()'>Select</div>\
		</div>\
	";

	var infoWindow = new google.maps.InfoWindow({
		content: contentString
	});

	var marker = new google.maps.Marker({
	    position: latLong,
	    map: $scope.deliveryOptions[arrayNumber].mapData,
	    icon: image,
	    data: {'name': store.name, 'info': infoWindow}
	});

	google.maps.event.addListener(marker, 'click', function() {
		var data = marker.data;
		data.info.open($scope.deliveryOptions[arrayNumber].mapData, marker);
	});

	if(!i){
		marker.data.info.open($scope.deliveryOptions[arrayNumber].mapData, marker);
	}
	

	google.maps.event.addListener(infoWindow, 'domready', function() {
		$(".mapInfoSelect").bind("click", function(e) {
			$scope.addStoreToSelected(store.name, arrayNumber)
		});
	});
}

$scope.addStoreToSelected = function(data, arrayNumber){
	console.log(data, arrayNumber);
	$scope.closeMap(arrayNumber);
	var obj = {
		'location': data,
		'arrayNumber': arrayNumber
	}
	$scope.updateCollectionLocations(obj);
	$scope.$apply();
}

$scope.bodyCloseMap = function(e){
	console.log('Body Close Map');
	if(!$(e.target).hasClass('collectionInput') && !$(e.target).hasClass('extraCollection') ){
		$scope.closeMap();
		$scope.$apply();
	}
}
$scope.closeMap = function(){
	$('#body').parent().unbind('click');
	var length = $scope.deliveryOptions.length;
	for(var i=0; i < length; i++){
		$scope.deliveryOptions[i].showList = false;
		$scope.deliveryOptions[i].showMap = false;
		$scope.deliveryOptions[i].loadingMap = false;
	}
	//$scope.$apply();
}

$scope.toggleMapView = function(arrayNumber, list){
	if(list){
		$scope.closeMap();
		$scope.deliveryOptions[arrayNumber].showList = true;
	}
	else{
		$('#body').parent().unbind('click');
		$scope.deliveryOptions[arrayNumber].showList = false;
		$scope.deliveryOptions[arrayNumber].showMap = true;

		$scope.showMapFn(arrayNumber, false, true)
		$scope.$apply();
	}
	
}
$scope.collectionInputFocus = function(arrayNumber){
	if($scope.deliveryOptions[arrayNumber].collection && $scope.deliveryOptions[arrayNumber].collection.length > 2){
		$scope.showMapFn(arrayNumber, true);
	}
	else{
		$scope.closeMap();
	}
}



$scope.updateFocusEvent = function(data){
	var arrayNumber = data.arrayNumber || 0;
	$scope.deliveryOptions[arrayNumber].collectionValid = false;

	GridCache.setDeliveryOptions($scope.deliveryOptions);
	$scope.setMultipleDeliveryOptions();
}

$scope.additionalLocationClick = function(arrayNumber){
	var arrayNumber = arrayNumber || 0;
	var newArray = arrayNumber + 1;
	$scope.deliveryOptions[newArray] = {};
	$scope.deliveryOptions[newArray].show = true;
	$scope.deliveryOptions[newArray].showType = $scope.deliveryOptions[arrayNumber].showType;

	GridCache.setDeliveryOptions($scope.deliveryOptions);
	$scope.setMultipleDeliveryOptions();
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

/**********************************************************************
*
*
*
*

	
							R E S I Z I N G


*
*
*
*
*
**********************************************************************/
	$scope.windowResized = function(){
		$scope.infiniteThrottle = true;
		$scope.tileMouseLeaveFixed();
		var originalCols = $scope.numberOfCols;
		$scope.numberOfCols = GridService.returnNumberOfColumns($scope.viewType, $rootScope.ctrl); 
		if(originalCols !== $scope.numberOfCols){
			if(!$scope.resizeColChangeActive){
				$scope.resizeColChange();
			}	
			else{
				$scope.infiniteThrottle = false;
			}
		}
		else{
			$scope.infiniteThrottle = false
		}
	}

	$scope.resizeColChange = function(){
		$scope.adjustListHeight();
		$scope.resizeColChangeActive = true;
		$('#body').parent().unbind('click');
		if($scope.quickviewItem){
			var qvOpen = $scope.quickviewItem;
			$scope.closeAllQuickviews();
			$timeout(function(){
				$scope.openQuickview(qvOpen);
				$scope.resizeColChangeActive = false;
				$scope.infiniteThrottle = false;
			},500)
			
		}
	}



	$scope.infinite = function(){
		if($scope.infiniteThrottle || $rootScope.ctrl === 'pdpCtrl'){
			return false;
		}
		$scope.infiniteThrottle = true;

		if($scope.searchResults && $scope.srLimit <= ($scope.searchResults.length - 1)){
			$scope.srLimit = $scope.srLimit + 15;
			GridCache.setSrLimit($scope.srLimit);
		}
		else if($scope.extraItems.length >= 0){
			$scope.srExtraLimit = $scope.srExtraLimit + 15;
		}
		$scope.checkForTooFewItems();
	}

});