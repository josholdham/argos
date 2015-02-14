'use strict';

/* Services */

angular.module('app.services.items', []).value('version', '0.1')
.factory('Items', function($q, $http, $location, $rootScope, $timeout) {

	var potentialTags = [
		"Gold",
		"Stainless Steel",
		"Constant",
		"Sekonda",
		"Timex",
		"Rotary",
		"Accurist",
		"French Connection",
		"Casio",
		"Lorus",
		"Monsoon",
		"Versace",
		"Silver",
		"Accessorize",
		"Necklace",
		"White Gold",
		"D Shape",
		"Diamond",
		"Bridal",
		"2-Piece",
		"Wedding",
		"Amethyst",
		"Cubic Zirconia",
		"Lucy Quartermaine",
		"Ruby",
		"Citizen",
		"Skeleton",
		"Chronograph",
		"Seiko",
		"Accurist",
		"LCD",
		"Titanium",
		"G-Shock",
		"Illuminator",
		"Brown",
		"Sports",
		"Leather",
		"Leather Effect",
		"Corner Sofa",
		"Regular Sofa",
		"Large Sofa",
		"Chocolate",
		"Erinne",
		"Caitlin",
		"Daisy",
		"Mink",
		"Duck Egg",
		"Charcoal",
		"Black Piping",
		"Heart of House",
		"Colby",
		"Jasper",
		"Logan",
		"Sage",
		"Romario",
		"Stefano",
		"Lorenza",
		"Tabitha",
		"Vinnie",
		"Chaise Longue",
		"Floral",
		"Armless Chair",
		"Bentwood",
		"Foot Stool",
		"Blue",
		"Tub Chair",
		"Harmony",
		"Argyll",
		"Recliner",
		"Wingback Chair",
		"Warwick",
		"Massage",
		"Habitat",
		"Bosch",
		"Cordless",
		"Hammer Drill",
		"Accessory Kit",
		"Black & Decker",
		"Worx",
		"Argos Value",
		"Triton",
		"Stanley FatMax",
		"Drill Driver",
		"Impact Driver",
		"Hilka",
		"Pillar Drill",
		"Challenge XTreme",
		"Jigsaw",
		"Multifunction Saw",
		"Circular Saw",
		"Precision",
		"Garden Saw",
		"Rotorazer",
		"Mitre Saw",
		"Table Saw",
		"Reciprocating Saw",
		"Stanley",
		"Screwdriver",
		"Riveter",
		"Silverline",
		"Spirit Level",
		"Suction Pad",
		"Tarpaulin",
		"Cable Ties",
		"Helmet",
		"Crimping Tool",
		"Grease Gun",
		"Ear Defenders",
		"Face Shield",
		"Caliper",
		"Respirator",
		"Litter Picker",
		"Drain Unblocker",
		"Wrench",
		"Torque Wrench",
		"Camera",
		"Digital Camera",
		"Compact",
		"Nikon",
		"Coolpix",
		"Canon",
		"Polaroid",
		"Ixus",
		"Sony",
		"Panasonic",
		"Fuji",
		"Fujifilm",
		"FinePix",
		"16MP",
		"18MP",
		"10MP",
		"20.3MP"
	]

	var promoItems = [
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
			'tags': ['general']
		},
		{
			'type': 'promo',
			'colour': 'white',
			'layout': 'image',
			'image': 'img/promo/gifts_her.png',
			'imageSize': 'full',
			'tags': ['general']
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
			'tags': ['general']
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
		},
	]

	var specialLargeItems = [
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
	]

	var specialProducts = [
		{
		  "title": "Xbox One 500GB Console with FIFA 15 Game",
		  "price": "£349.99",
		  "was": "",
		  "rating": 4.3,
		  "ratingIterative": [true,true,true,true,false],
		  "type": "specialProduct",
		  "home1Detail": 'splash',
		  'splashImage': 'img/paint.png',
		  "category": "Technology",
		  "seeMore": [
		    "Technology",
		    "Xbox",
		    "Consoles"
		  ],
		  "used": false,
		  "grid": {},
		  "filterMenu": false,
		  "images": [
		    "img/home/xboxfifa.png",
		  ],
		  "id": "xbox1"
		},
		{
		  "title": "Sony ZX3 On-Ear Headphones",
		  "price": "£19.99",
		  "was": "",
		  "rating": 5,
		  "ratingIterative": [true,true,true,true,true],
		  "type": "specialProduct",
		  "home1Detail": 'bestSeller',
		  "bestSeller": 1,
		  "category": "Technology",
		  "seeMore": [
		    "Technology",
		    "Sound & Music",
		    "Headphones"
		  ],
		  "used": false,
		  "grid": {},
		  "filterMenu": false,
		  "images": [
		    "img/home/sonyheadphones.png",
		  ],
		  "id": "sonyzx3"
		},
		{
		  "title": "Sharp LC46LD266K 46 Inch Full HD TV",
		  "price": "£299.99",
		  "was": "",
		  "rating": 3,
		  "ratingIterative": [true,true,true,false,false],
		  "type": "specialProduct",
		  "home1Detail": 'new',
		  "category": "Technology",
		  "seeMore": [
		    "Technology",
		    "Televisions",
		    "Full HD"
		  ],
		  "used": false,
		  "grid": {},
		  "filterMenu": false,
		  "images": [
		    "img/home/sharptv.png",
		  ],
		  "id": "sharplc46"
		},
		{
		  "title": "Samsung Washing Machine",
		  "price": "£386.99",
		  "was": "",
		  "rating": 4,
		  "ratingIterative": [true,true,true,true,false],
		  "type": "specialProduct",
		  "home1Detail": 'bestSeller',
		  "bestSeller": 2,
		  "category": "Home & Garden",
		  "seeMore": [
		    "Home & Garden",
		    "Electricals",
		    "Washing Machines"
		  ],
		  "used": false,
		  "grid": {},
		  "filterMenu": false,
		  "images": [
		    "img/home/samsungwashing.png",
		  ],
		  "id": "samsungwashingmachine"
		},
		{
		  "title": "LG 49UB850V 49 Inch Ultra HD 4K Freeview HD Smart LED TV",
		  "price": "£1099.99",
		  "was": "",
		  "rating": 5,
		  "ratingIterative": [true,true,true,true,true],
		  "type": "specialProduct",
		  "home1Detail": 'hot',
		  'splashImage': 'img/yellow_splat.png',
		  "category": "Technology",
		  "seeMore": [
		    "Technology",
		    "Televisions",
		    "Full HD"
		  ],
		  "used": false,
		  "grid": {},
		  "filterMenu": false,
		  "images": [
		    "img/home/lgtv.png",
		  ],
		  "id": "LG49UB850V"
		},
		{
		  "title": "Spirit Lux Ladies' Rose Diamond Watch",
		  "price": "£19.99",
		  "was": "",
		  "rating": 5,
		  "ratingIterative": [true,true,true,true,true],
		  "type": "specialProduct",
		  "home1Detail": 'bestSeller',
		  "bestSeller": 3,
		  "category": "Jewellery",
		  "seeMore": [
		    "Jewellery",
		    "Watches",
		    "Ladies' Watches",
		    "Spirit",
		    "Diamond"
		  ],
		  "used": false,
		  "grid": {},
		  "filterMenu": false,
		  "images": [
		    "img/home/luxwatch.png",
		  ],
		  "id": "spiritluxrosediamond"
		},
	]

	var items = [];

	
	var genericItems = [
		{
			"title": "Nisi quis facilisis elementum sit placerat",
			"price": "£49.99",
			"was": "",
			"rating": 4,
			"type": "product",
			"category": "Jewellery",
			"seeMore": [
			    "Tools",
			    "Sofas",
			    "Jewellery"
			],
			"images": [
			  "img/home/light.png",
			],
			'id': "x"
		},
		{
			'type': 'promo',
			'colour': 'white',
			'layout': 'image',
			'image': 'img/promo/shtl.png'
		},
		{
			'type': 'specialLarge',
			'image': 'img/home/tablet_promo.png',
			'layout': 'image',
		}
	]

	

	var productSearch = function(id){
		var url = "http://api.homeretailgroup.com/product/argos/"+id+"?apiKey=5h3phmrk2sbrfctzfnv5v63w&format=xml";
		$.get( url, function( data ) {
			console.log(data);
		})
	}

	var recursiveImages = function(processed,i,end){
		var item = processed[i];
		var href = item.image.href;
		//var id = href.split("partNumber/")[1].split('.htm')[0];
		var id = item.id;
		var url = "http://api.homeretailgroup.com/product/argos/"+id+"?apiKey=dyy8d7dz3k5rnfjs5fbqkw2n&format=xml";

		$.get( url, function( data ) {
			var images = [];
			$(data).find( "Product" ).find("AssociatedMedia").find("Content").each(function () {
				if($(this).attr("provider") === 'Scene7'){
					if($(this).attr("href")){
						images.push($(this).attr("href"));
					}
				}
			})

			processed[i].images = images;
			processed[i].image = null;

			i++;
			if(i < end){
				$timeout(function(){
					recursiveImages(processed,i,end);
				},1000)
				
			}
			else{
				console.log(JSON.stringify(processed,null,2));

			}
		})
	}

	var getItems = function(){
		var deferred = $q.defer();

		$http.get('js/services/itemsMin.json').success(function(response) {
	        items = response;
	        deferred.resolve();
		});

		return deferred.promise;
	}

	var findItem = function(id){
		var foundItem = _.find(items, function(item){ return item.id === id; });
		return foundItem;
	}


	return{
		
		returnAllItems: function(){
			var deferred = $q.defer();

			if(items && items.length > 0){
				deferred.resolve(items);
			}
			else{
				getItems().then(function(){
					deferred.resolve(items);
				})	
			}

			return deferred.promise;
		},
		getItem: function(productId){
			//console.log(productId);
			var deferred = $q.defer();

			if(items && items.length > 0){
				var item = findItem(productId);
				deferred.resolve(item);
			}
			else{
				getItems().then(function(){
					var item = findItem(productId);
					deferred.resolve(item);
				})	
			}

			return deferred.promise;
		},
		productSearch: function(id){
			productSearch(id);
		},
		returnHomeItems: function(){
			return homeItems;
		},
		returnPromoItems: function(){
			return promoItems;
		},
		returnSpecialLargeItems: function(){
			return specialLargeItems;
		},
		returnGenericItems: function(){
			return genericItems;
		},
		returnSpecialProducts: function(){
			return specialProducts;
		},
		// processLadiesWatches: function(){
		// 	var length = tempItems.length;
		// 	for(var i=0; i<length; i++){

		// 		var item = tempItems[i];

		// 		item.type = 'product';
		// 		item.category = 'Ladies Watches';
		// 		if(item.rating && item.rating.src){
		// 			var split = item.rating.src.split("rating-")[1].split('.')[0];
		// 			var number = Number(split.split("_").join('.'));
		// 			//console.log(number);
		// 			item.rating = number;
		// 		}
		// 		else{
		// 			item.rating = 4;
		// 		}

		// 		var titleSafe = item.title.replace(/\s+/g, '').toLowerCase();
		// 		item.seeMore = ["Jewellery","Ladies Watches"];
		// 		var tagsLength = potentialTags.length;
		// 		for(var j = 0; j < tagsLength; j++){
		// 			var tag = potentialTags[j];
		// 			var tagSafe = tag.replace(/\s+/g, '').toLowerCase();
		// 			if(titleSafe.indexOf(tagSafe) > -1){
		// 				item.seeMore.push(tag);
		// 			}
		// 		}

		// 		//console.log(item.seeMore);
		// 	}

		// 	//console.log(JSON.stringify(tempItems,null,2));
		// },
		// processRings: function(){
		// 	var length = tempItemsRings.length;
		// 	for(var i=0; i<length; i++){

		// 		var item = tempItemsRings[i];

		// 		item.type = 'product';
		// 		item.category = 'Ladies Watches';
		// 		if(item.rating && item.rating.src){
		// 			var split = item.rating.src.split("rating-")[1].split('.')[0];
		// 			var number = Number(split.split("_").join('.'));
		// 			//console.log(number);
		// 			item.rating = number;
		// 		}
		// 		else{
		// 			item.rating = 4;
		// 		}

		// 		var titleSafe = item.title.replace(/\s+/g, '').toLowerCase();
		// 		item.seeMore = ["Jewellery","Rings"];
		// 		var tagsLength = potentialTags.length;
		// 		for(var j = 0; j < tagsLength; j++){
		// 			var tag = potentialTags[j];
		// 			var tagSafe = tag.replace(/\s+/g, '').toLowerCase();
		// 			if(titleSafe.indexOf(tagSafe) > -1){
		// 				item.seeMore.push(tag);
		// 			}
		// 		}

		// 	}

		// 	//console.log(JSON.stringify(tempItemsRings,null,2));
		// },
		fixWas: function(){
			var length = items.length;
			for(var i=0; i<length; i++){
				var item = items[i];
				if(item.was){
					var was = item.was;
					var wasValue = was.split('Was \n')[1];
					item.was = wasValue;
					//console.log(wasValue);
				}		
			}
			//console.log(JSON.stringify(items,null,2));
		},
		getImages: function(){
			var length = processed.length;
			recursiveImages(0,length)
		},
		idsFix: function(){
			var length = items.length;
			for(var i = 0; i<length; i++){
				var item = items[i];
				var href = item.image.href;
				var id = href.split("partNumber/")[1].split('.htm')[0];
				items[i].id = id;
				items[i].grid = {};
				items[i].used = false;
				items[i].filterMenu = false;
			}
			console.log(JSON.stringify(items,null,2));		
		},
		processItems: function(){
			var itemsToProcess = pre;
			var length = itemsToProcess.length;
			for(var i=0; i<length; i++){
				var item = itemsToProcess[i];
				item.type = 'product';
// Categories
				item.category = ["Technology","Cameras", "Compact Digital Camera"];

// Rating
				if(item.rating && item.rating.src){
					var split = item.rating.src.split("rating-")[1].split('.')[0];
					var number = Number(split.split("_").join('.'));
					item.rating = number;
				}
				else{
					item.rating = 4;
				}
// Title Safe
				//console.log(item);
				var titleSafe = item.title.replace(/\s+/g, '').toLowerCase();
// Create tags
				item.seeMore = item.category;
				var tagsLength = potentialTags.length;
				for(var j = 0; j < tagsLength; j++){
					var tag = potentialTags[j];
					var tagSafe = tag.replace(/\s+/g, '').toLowerCase();
					if(titleSafe.indexOf(tagSafe) > -1){
						item.seeMore.push(tag);
					}
				}
// Fix was values
				var was = item.was;
				var wasValue = was.split('Was \n')[1];
				item.was = wasValue;
// Set the ID
				var href = item.image.href;
				var id = href.split("partNumber/")[1].split('.htm')[0];
				item.id = id;

			}

			recursiveImages(pre,0,pre.length)

			//console.log(JSON.stringify(itemsToProcess,null,2));
		},
		testStock: function(){
			var url = "http://api.homeretailgroup.com/stock/argos/9805347?apiKey=dyy8d7dz3k5rnfjs5fbqkw2n&format=xml";

			$.post( url, function( data ) {
				console.log(data);
			})
		}
	}

});