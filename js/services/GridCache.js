'use strict';

/* Services */

angular.module('app.services.gridcache', []).value('version', '0.1')
.factory('GridCache', function($q, $http, $location, $rootScope) {
	var items = [];
	var allItems = [];
	var filteredItems = [];
	var latestBlock = 0;
	var clickedItem = null;
	var onSearch = false;
	var filters = [];
	var safeFilters = [];
	var filtersSafe = [];
	var clickedFilters = [];

	var lookingFor = null;
	var deliveryOrCollection = 'collection';
	var lookingForDetail = false;
	var selectedCollectionLocations = [];
	var isExtraCollection = false;

	var deliveryText = null;
	var deliveryOption = null;
	var deliveryOptions = [{'show': true, 'showType': 'unknown'}];

	var viewType = 'regular';

	var srLimit = 15;

	var quickviewItem = null;


	return {
		// returnGridItems: function(){
		// 	return items;
		// },
		// setGridItems: function(ctrlItems){
		// 	items = ctrlItems;
		// },
		// returnAllItems: function(){
		// 	return allItems;
		// },
		// setAllItems: function(ctrlAllItems){
		// 	allItems = ctrlAllItems;
		// },
		// setLatestBlock: function(block){
		// 	latestBlock = block;
		// 	return latestBlock
		// },
		// returnLatestBlock: function(){
		// 	return latestBlock
		// },
		// setClickedItem: function(ctrlClickedItem){
		// 	clickedItem = ctrlClickedItem;
		// },	
		// returnClickedItem: function(){
		// 	return clickedItem;
		// },
		// setOnSearch: function(ctrlOnSearch){
		// 	onSearch = ctrlOnSearch;
		// 	return onSearch;
		// },
		// returnOnSearch: function(){
		// 	return onSearch;
		// },
		// setSearchTerms: function(ctrlFilters){
		// 	filters = ctrlFilters
		// },
		// setSearchTermsSafe: function(ctrlFiltersSafe){
		// 	filtersSafe = ctrlFiltersSafe
		// },
		returnLookingFor: function(){
			return lookingFor
		},
		setLookingFor: function(ctrlLookingFor){
			lookingFor = ctrlLookingFor
		},
		// returnDeliveryOrCollection: function(){
		// 	return deliveryOrCollection
		// },
		// setDeliveryOrCollection: function(ctrlDeliveryOrCollection){
		// 	deliveryOrCollection = ctrlDeliveryOrCollection;
		// 	return deliveryOrCollection;
		// },
		// returnLookingForDetail: function(){
		// 	return lookingForDetail
		// },
		// setLookingForDetail: function(ctrlLookingForDetail){
		// 	lookingForDetail = ctrlLookingForDetail;
		// 	return lookingForDetail
		// },
		// returnSelectedCollectionLocations: function(){
		// 	return selectedCollectionLocations;
		// },
		// setSelectedCollectionLocations: function(ctrlSelectedCollectionLocations){
		// 	selectedCollectionLocations = ctrlSelectedCollectionLocations
		// },
		// returnIsExtraCollection: function(){
		// 	return isExtraCollection
		// },
		// setIsExtraCollection: function(ctrlIsExtraCollection){
		// 	isExtraCollection = ctrlIsExtraCollection;
		// 	return isExtraCollection;
		// },
		// setDeliveryText: function(ctrlDeliveryText){
		// 	deliveryText = ctrlDeliveryText
		// },
		// returnDeliveryText: function(){
		// 	return deliveryText
		// },
		// setDeliveryOption: function(option){
		// 	deliveryOption = option;
		// },
		// returnDeliveryOption: function(){
		// 	return deliveryOption;
		// },
		setDeliveryOptions: function(deliveryOptionsCtrl){
			deliveryOptions = deliveryOptionsCtrl;
		},
		returnDeliveryOptions: function(){
			return deliveryOptions;
		},
		setViewType: function(viewTypeCtrl){
			viewType = viewTypeCtrl
		},
		returnViewType: function(){
			return viewType
		},
		setSrLimit: function(srLimitCtrl){
			srLimit = srLimitCtrl;
		},
		returnSrLimit: function(){
			return srLimit;
		},
		setQuickviewItem: function(quickviewItemCtrl){
			var quickviewItemCtrl = quickviewItemCtrl || null;
			quickviewItem = quickviewItemCtrl;
		},
		returnQuickviewItem: function(){
			return quickviewItem;
		},
		setFilters: function(filtersCtrl){
			filters = filtersCtrl;
		},
		returnFilters: function(){
			return filters
		},
		setSafeFilters: function(safeFiltersCtrl){
			safeFilters = safeFiltersCtrl;
		},
		returnSafeFilters: function(){
			return safeFilters
		},
		setClickedFilters: function(ctrlClickedFilters){
			clickedFilters = ctrlClickedFilters;
		},
		returnClickedFilters: function(){
			return clickedFilters;
		}
	}		
})