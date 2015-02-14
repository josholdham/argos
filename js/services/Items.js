'use strict';

/* Services */

angular.module('app.services.items', []).value('version', '0.1')
.factory('Items', function($q, $http, $location, $rootScope, $timeout) {

	var shuffle = function(array) {
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

	var promoPositions = [4,5,10,19,20,26,32,41,42,48,57]
	var allProducts = [];
	var filteredProducts = [];
	var shuffledProducts = [];
	var filteredItems = [];
	var nonFilteredProducts = [];
	var nonFilteredItems = [];
	var exactMatch = [];

	var homeItems = {};
	var promos = [
		{
			'type': 'promo',
			'colour': 'white',
			'layout': 'image',
			'image': 'img/promo/lego.png',
			'imageSize': 'full',
			'tags': ['general'],
			'home1Detail': 'brand'

		},
		{
			'type': 'promo',
			'colour': 'white',
			'layout': 'image',
			'image': 'img/promo/ipad2.png',
			'imageSize': 'full',
			'tags': ['general']
		},
		{
			'type': 'promo',
			'colour': 'white',
			'layout': 'image',
			'image': 'img/promo/PS4.png',
			'imageSize': 'full',
			'tags': ['general']
		},
		{
			'type': 'promo',
			'colour': 'white',
			'layout': 'image',
			'image': 'img/promo/register.png',
			'imageSize': 'full',
			'tags': ['general', 'drill','jewellery']
		},
		{
			'type': 'promo',
			'colour': 'white',
			'layout': 'image',
			'image': 'img/promo/gifts_her.png',
			'imageSize': 'full',
			'tags': ['general','jewellery','ring','rings']
		},
		{
			'type': 'promo',
			'colour': 'white',
			'layout': 'image',
			'image': 'img/promo/toys.png',
			'imageSize': 'full',
			'tags': ['general'],
			'home1Detail': 'category'
		},
		{
			'type': 'promo',
			'colour': 'white',
			'layout': 'image',
			'image': 'img/promo/express_del.png',
			'imageSize': 'full',
			'tags': ['general','drill','jewellery','sofa','sofas','drills']
		},
		{
			'type': 'promo',
			'colour': 'white',
			'layout': 'image',
			'image': 'img/promo/home.png',
			'imageSize': 'full',
			'tags': ['general']
		},
		{
			'type': 'promo',
			'colour': 'white',
			'layout': 'image',
			'image': 'img/promo/autumn.png',
			'imageSize': 'full',
			'tags': ['general']
		},
		{
			'type': 'promo',
			'colour': 'yellow',
			'layout': 'image',
			'image': 'img/promo/clearance.png',
			'imageSize': 'full',
			'tags': ['general']
		},
		{
			'type': 'promo',
			'colour': 'white',
			'layout': 'image',
			'image': 'img/promo/drill3.png',
			'imageSize': 'full',
			'tags': ['drill','drills','tools']
		},
		{
			'type': 'promo',
			'colour': 'white',
			'layout': 'image',
			'image': 'img/promo/drill4.png',
			'imageSize': 'full',
			'tags': ['drill','drills','tools']
		},
		{
			'type': 'promo',
			'colour': 'white',
			'layout': 'image',
			'image': 'img/promo/jewellery1.png',
			'imageSize': 'full',
			'tags': ['jewellery','ring','watches','watch']
		},
		{
			'type': 'promo',
			'colour': 'white',
			'layout': 'image',
			'image': 'img/promo/jewellery5.png',
			'imageSize': 'full',
			'tags': ['jewellery','ring','watches','watch']
		},
		{
			'type': 'promo',
			'colour': 'white',
			'layout': 'image',
			'image': 'img/promo/sofa3.png',
			'imageSize': 'full',
			'tags': ['sofa','living room','furniture']
		},
		{
			'type': 'promo',
			'colour': 'white',
			'layout': 'image',
			'image': 'img/promo/sofa4.png',
			'imageSize': 'full',
			'tags': ['sofa','living room','furniture']
		},
		{
			'type': 'promo',
			'colour': 'white',
			'layout': 'image',
			'image': 'img/promo/gift_finder.png',
			'imageSize': 'full',
			'tags': ['general']
		},
		{
			'type': 'promo',
			'colour': 'white',
			'layout': 'image',
			'image': 'img/promo/halloween.png',
			'imageSize': 'full',
			'tags': ['general']
		},
		{
			'type': 'promo',
			'colour': 'white',
			'layout': 'image',
			'imageSize': 'full',
			'image': 'img/promo/golf.png',
			'tags': ['sport','golf','leisure']
		},
		{
			'type': 'promo',
			'colour': 'white',
			'layout': 'image',
			'image': 'img/promo/vacuum.png',
			'imageSize': 'full',
			'tags': ['general']
		},
		{
			'type': 'promo',
			'colour': 'white',
			'layout': 'image',
			'image': 'img/promo/deck.png',
			'imageSize': 'full',
			'tags': ['general']
		},
		{
			'type': 'promo',
			'colour': 'white',
			'layout': 'image',
			'image': 'img/promo/toys2.png',
			'imageSize': 'full',
			'tags': ['general']
		},
		{
			'type': 'promo',
			'colour': 'white',
			'layout': 'image',
			'image': 'img/promo/wishlist_app.png',
			'imageSize': 'full',
			'tags': ['general']
		},
		{
			'type': 'promo',
			'colour': 'white',
			'layout': 'image',
			'image': 'img/promo/promo7.png',
			'imageSize': 'full',
			'tags': ['watch','watches']
		},
		{
			'type': 'promo',
			'colour': 'white',
			'layout': 'image',
			'image': 'img/promo/shtl.png',
			'tags': ['general']
		},
		{
			'type': 'promo',
			'colour': 'blue',
			'layout': 'image',
			'image': 'img/promo/washing_promo.png',
			'tags': []
		},
		{
			'type': 'promo',
			'colour': 'white',
			'layout': 'image',
			'image': 'img/promo/recycle.png',
			'tags': ['general']
		},
		{
			'type': 'promo',
			'colour': 'orange',
			'layout': 'image',
			'image': 'img/promo/delivery.png',
			'tags': ['general']
		},
		{
			'type': 'promo',
			'colour': 'white',
			'layout': 'image',
			'imageSize': 'full',
			'image': 'img/promo/uni.png',
			'tags': ['general']
		},
		{
			'type': 'promo',
			'colour': 'blue',
			'layout': 'image',
			'image': 'img/promo/stationary.png',
			'tags': []
		},
		{
			'type': 'promo',
			'colour': 'white',
			'layout': 'image',
			'imageSize': 'full',
			'image': 'img/promo/furndisc.png',
			'tags': ['sofa','sofas','chair','chaise','living room']
		},
		{
			'type': 'promo',
			'colour': 'white',
			'layout': 'image',
			'imageSize': 'full',
			'image': 'img/promo/get_set.png',
			'tags': []
		},
		{
			'type': 'promo',
			'colour': 'white',
			'layout': 'image',
			'imageSize': 'full',
			'image': 'img/promo/smile.png',
			'tags': ['general', 'watches', 'watch','casio']
		},
		{
			'type': 'promo',
			'colour': 'white',
			'layout': 'image',
			'image': 'img/promo/promo2.png',
			'imageSize': 'full',
			'tags': ['watch','watches']
		},
		{
			'type': 'promo',
			'colour': 'white',
			'layout': 'image',
			'imageSize': 'full',
			'image': 'img/promo/the_set.png',
			'tags': ['living room', 'lounge','sofa','sofas','chair','chairs']
		},
		{
			'type': 'promo',
			'colour': 'white',
			'layout': 'image',
			'imageSize': 'full',
			'image': 'img/promo/washing_machine.png',
			'tags': ['washing machine']
		}
	]
	var largePromos = [
		{
			'tags': ['general'],
			'type': 'specialLarge',
			'image': 'img/promo/wow_deals.png',
			'layout': 'image',
		},
		{
			'type': 'specialLarge',
			'image': 'img/largepromo/xmas2.png',
			'layout': 'image',
			'tags': ['general']
		},
		{
			'type': 'specialLarge',
			'image': 'img/largepromo/6.png',
			'layout': 'image',
			'tags': ['chair', 'sofa', 'furniture']
		},
		{
			'type': 'specialLarge',
			'image': 'img/largepromo/1.png',
			'layout': 'image',
			'tags': ['watches', 'watch', 'jewellery']
		},
		{
			'type': 'specialLarge',
			'image': 'img/largepromo/2.png',
			'layout': 'image',
			'tags': ['watches', 'watch', 'jewellery', 'casio']
		},
		{
			'tags': ['general'],
			'type': 'specialLarge',
			'image': 'img/promo/xmas.png',
			'layout': 'image',
		},
		{
			'type': 'specialLarge',
			'image': 'img/largepromo/3.png',
			'layout': 'image',
			'tags': ['drill', 'diy', 'home', 'tools']

		},
		{
			'type': 'specialLarge',
			'image': 'img/largepromo/4.png',
			'layout': 'image',
			'tags': ['sofa', 'living room', 'home', 'furniture']
		},
		{
			'type': 'specialLarge',
			'image': 'img/largepromo/5.png',
			'layout': 'image',
			'tags': ['baby', 'kids', 'event', 'home']
		},
		{
			'type': 'specialLarge',
			'image': 'img/home/sofa.png',
			'layout': 'image',
			'tags': ['sofa', 'living room', 'home', 'furniture', 'heart of house']
		},
		{
			'type': 'specialLarge',
			'image': 'img/home/cot.png',
			'layout': 'image',
			'tags': ['kids', 'baby', 'children', 'home', 'furniture']
		},
		{
			'type': 'specialLarge',
			'image': 'img/home/tablet_promo.png',
			'layout': 'image',
			'tags': ['ipad', 'tablets', 'apple', 'technology', 'tech']
		},
		{
			'type': 'specialLarge',
			'image': 'img/home/back_2_school.png',
			'layout': 'image',
			'tags': ['kids', 'baby', 'children', 'home', 'school', 'stationary']
		},
	];

	var getAllProducts = function(){
		var deferred = $q.defer();

		$http.get('js/services/itemsMin.json').success(function(response) {
	        allProducts = response;
	        deferred.resolve();
		});

		return deferred.promise;
	}

	var isExact = function(searchTerm, item){
		var searchTermSafe = searchTerm.replace(/&/g, '').toLowerCase().split('.').join("").split('\ ');
		var itemSafe = item.title.replace(/&/g, '').toLowerCase().split('.').join("").split('\ ');
		var length = searchTermSafe.length;
		var exactScore = 0;
		for(var k=0; k<length; k++){
			var word = searchTermSafe[k];
			if(itemSafe.indexOf(word) > -1){
				exactScore++;
			}
		}

		var maxScore = itemSafe.length > 4 ? 5 : (itemSafe.length)
		if(exactScore >= maxScore){
			console.log(item.title);
			return true;
		}
		else{
			return false;
		}
	}


	var filterProducts = function(filters, useNonFilters, searchTerm){
		var length = allProducts.length;
		var noResults = true;
		var filtered = [];

	// For all items...
		for(var i=0; i<length; i++){
			allProducts[i].relevance = 0; // Start with relevance of 0
			var item = allProducts[i];
			var seeMore = item.seeMore;
			var seeMoreLength = seeMore.length;
	// For each tag the product has...
			for(var j=0; j<seeMoreLength; j++){
				var seeMoreSafe = seeMore[j].replace(/\s+/g, '').toLowerCase();
				_.each(filters, function(value){
					if(value.indexOf(seeMoreSafe) > -1 || seeMoreSafe.indexOf(value) > -1){
						item.relevance++;
					}
				});
			}
			
			var exact = false;
			if(searchTerm){
				var exact = isExact(searchTerm, item)
			}

	// If the item has relevance to the search filters, add to our filtered array
			if(exact){
				exactMatch.push(item);
			}
			else{
				if(useNonFilters){
					if(item.relevance <= 0){ 
						filtered.push(item);
					}
				}
				else{
					if(item.relevance > 0){ 
						filtered.push(item);
					}
				}
			}	
		}
	// Sort our filtered products by relevance
		if(useNonFilters){
			nonFilteredProducts = filtered;
		}
		else{
			filteredProducts = _.sortBy(filtered, function(item){ return -item.relevance; });
		}
	}



	var filterPromos = function(filters, useNonFilters){
		var length = promos.length
		for(var i=0; i<length; i++){
			promos[i].relevance = 0;

			var item = promos[i];
			var tags = promos[i].tags;
			var tagsLength = promos[i].tags.length;
			for(var j=0; j<tagsLength; j++){
				var seeMoreSafe = promos[i].tags[j].replace(/\s+/g, '').toLowerCase();
				_.each(filters, function(value){
					if(value.indexOf(seeMoreSafe) > -1 || seeMoreSafe.indexOf(value) > -1){
						promos[i].relevance++
					}
				});
			}
		}
		if(useNonFilters){
			promos = _.sortBy(promos, function(item){ return item.relevance; });
		}
		else{
			promos = _.sortBy(promos, function(item){ return -item.relevance; });
		}
	}



	var createFilteredItems = function(pdp, useNonFilters, useShuffled ){
		var items = [];
		var promoCount = 0;
		if(useShuffled){
			var itemsToUse = shuffledProducts;
		}
		else{
			var itemsToUse = filteredProducts;
		}

		var length = itemsToUse.length;
		for(var i=0; i<length; i++){
			if(!pdp){
				if(promoPositions.indexOf(i) > -1){
					items.push(promos[promoCount]);
					promoCount++;
				}
			}
			
			if(pdp && pdp === itemsToUse[i].id){
			}
			else{
				items.push(itemsToUse[i])
			}
		}
		
		filteredItems = items;
	}

	var createNonFilteredItems = function(pdp, useNonFilters ){
		var items = [];
		var promoCount = 0;
		var length = nonFilteredProducts.length;
		for(var i=0; i<length; i++){
			if(!pdp){
				if(promoPositions.indexOf(i) > -1){
					items.push(promos[promoCount]);
					promoCount++;
				}
			}
			
			if(pdp && pdp === nonFilteredProducts[i].id){
			}
			else{
				items.push(nonFilteredProducts[i])
			}
		}
		
		nonFilteredItems = items;
	}


	var filterHomeItems = function(homeOption){
		var items = angular.copy(allProducts);

		if(homeOption === 'bestSeller'){
			var items = _.sortBy(items, function(item){ return item.bestSeller; });
		}
		else if(homeOption === 'new'){
			var items = _.filter(items, function(item){ return item.home1Detail === 'new'; });
		}
		else if(homeOption === 'priceCuts'){
			var items = _.filter(items, function(item){ return item.home1Detail === 'pricecut'; });
		}
		else{
			var items = shuffle(items);
		}

		var limit = items.length >= 20 ? 20 : items.length;
		
		homeItems[homeOption] = items.slice(0,limit);
	}

//
//	EXPOSED FUNCTIONS
//
	return {
		getAllProducts: function(){
			var deferred = $q.defer();

			if(allProducts && allProducts.length > 0){
				deferred.resolve(true);
			}
			else{
				getAllProducts().then(function(){
					deferred.resolve(true);
				})	
			}

			return deferred.promise;
		},
		getFilteredProducts: function(filters){
			filterProducts(filters);
			return filteredProducts;
		},
		getFilteredItems: function(filters, pdp, searchTerm){
			var searchTerm = searchTerm || null;
			//console.log('++++ '+searchTerm);
			exactMatch = [];

			if(filters.length > 0){
				filterProducts(filters,false,searchTerm);
				filterPromos(filters);
				createFilteredItems(pdp);
			}
			else{
				filteredProducts = angular.copy(allProducts);
				promos = shuffle(promos);
				createFilteredItems();
			}
			
			return filteredItems;
		},
		getPromos: function(filters){
			if(filters){
				filterPromos(filters);
			}
			return promos
		},
		getLargePromos: function(filters){
			if(filters){
				filterLargePromos(filters);
			}
			return largePromos
		},
		getHomeSearchItems: function(homeOption){
			if(homeItems[homeOption]){
				return homeItems[homeOption];
			}
			else{
				filterHomeItems(homeOption);
				return homeItems[homeOption];
			}
		},
		getItem: function(productId){
			var item = _.find(allProducts, function(item){ return item.id === productId; });
			return item;
		},
		getExtraItems: function(filters){
			if(filters.length > 0){
				filterProducts(filters, true);
				filterPromos(filters, true);
				createNonFilteredItems(false, true);
			}
			else{
				filteredProducts = angular.copy(allProducts);
				promos = shuffle(promos);
				createNonFilteredItems(false,true);
			}
			return nonFilteredItems;
		},
		getExactMatch: function(){
			return exactMatch;
		},
		shuffleItems: function(){
			shuffledProducts = shuffle(filteredProducts);
			createFilteredItems(false,false,true);
			return filteredItems;
		}
	}

});