'use strict';

/* Services */

angular.module('app.services.categories', []).value('version', '0.1')
.factory('Categories', function($q, $http, $location, $rootScope) {

	var categories = {
		'1': {
			'1': [
				{
					'title': 'Technology',
					'id': '1',
					'color': '#00a4d1',
				},
				{
					'title': 'Home & Garden',
					'id': '2',
					'color': '#87c041',
				},
				{
					'title': 'Baby & Nursery',
					'id': '3',
					'color': '#e3687f',
				},
				{
					'title': 'Jewellery & Watches',
					'id': '4',
					'color': '#e3687f',
				}
			]			
		},
		'2': {
			'1': [
				{
					'title': 'Sound & Vision',
					'id': '1_1',
				},
				{
					'title': 'Computing & Phones',
					'id': '1_2',
				},
				{
					'title': 'Tech Essentials',
					'id': '1_3',
				},
				{
					'title': 'Popular Searches',
					'id': '1_4',
				}
			],
			'2': [
				{
					'title': 'Garden & Outdoor',
					'id': '2_1',
				},
				{
					'title': 'Furniture & Storage',
					'id': '2_2',
				},
				{
					'title': 'Homeware & Accessories',
					'id': '2_3',
				},
				{
					'title': 'Home Electricals',
					'id': '2_4',
				},
				{
					'title': 'Home Improvement',
					'id': '2_5',
				}
			],
			'3': [
				{
					'title': 'Sleep',
					'id': '3_1',
				},
				{
					'title': 'Travel',
					'id': '3_2',
				},
				{
					'title': 'Baby Toys',
					'id': '3_3',
				},
				{
					'title': 'Feeding',
					'id': '3_4',
				},
				{
					'title': 'Bathing & Changing',
					'id': '3_5',
				},
				{
					'title': 'Safety & Health',
					'id': '3_6',
				},
				{
					'title': 'Baby Clothing',
					'id': '3_7',
				},
			],
			'4': [
				{
					'title': 'Rings',
					'id': '4_1',
				},
				{
					'title': 'Watches',
					'id': '4_2',
				},
			]			
		},
		'3': {
			'2_1': [
				{
					'title': 'Barbecues & Garden Heating',
					'id': '2_1_1',
				},
				{
					'title': 'Conservatories, sheds and greenhouses',
					'id': '2_1_2',
				},
				{
					'title': 'Garden decoration and landscaping',
					'id': '2_1_3',
				},
				{
					'title': 'Garden furniture',
					'id': '2_1_4',
				},
				{
					'title': 'Garden heating',
					'id': '2_1_5',
				},
				{
					'title': 'Gardening tools',
					'id': '2_1_6',
				},
				{
					'title': 'Lawnmowers and garden power tools',
					'id': '2_1_7',
				},
				{
					'title': 'Sheds',
					'id': '2_1_8',
				},
				{
					'title': 'Garden Storage',
					'id': '2_1_9',
				},
				{
					'title': 'Home and garden clearance',
					'id': '2_1_10',
				}
			],
			'2_2': [
				{
					'title': 'Bathroom furniture',
					'id': '2_2_1',
				},
				{
					'title': 'Beds',
					'id': '2_2_2',
				},
				{
					'title': 'Bedroom furniture',
					'id': '2_2_3',
				},
				{
					'title': 'Children\'s furniture',
					'id': '2_2_4',
				},
				{
					'title': 'Coffee tables, sideboards and display units',
					'id': '2_2_5',
				},
				{
					'title': 'Dining tables and chairs',
					'id': '2_2_6',
				},
				{
					'title': 'Mattresses',
					'id': '2_2_7',
				},
				{
					'title': 'Sofas, armchairs and chairs',
					'id': '2_2_8',
				},
				{
					'title': 'Storage, desks and filing',
					'id': '2_2_9',
				},
			],
			'2_3': [
				{
					'title': 'Bathroom',
					'id': '2_3_1',
				},
				{
					'title': 'Bedding',
					'id': '2_3_2',
				},
				{
					'title': 'Cooking, dining and kitchen equipment',
					'id': '2_3_3',
				},
				{
					'title': 'Curtains and blinds',
					'id': '2_3_4',
				},
				{
					'title': 'Home Furnishings',
					'id': '2_3_5',
				},
				{
					'title': 'Kitchen Storage',
					'id': '2_3_6',
				},
				{
					'title': 'Kitchenware',
					'id': '2_3_7',
				},
				{
					'title': 'Laundry and cleaning',
					'id': '2_3_8',
				},
				{
					'title': 'Lighting',
					'id': '2_3_9',
				},
				{
					'title': 'Pet Supplies',
					'id': '2_3_10',
				},
				{
					'title': 'Rugs and mats',
					'id': '2_3_11',
				},
				{
					'title': 'Tableware',
					'id': '2_3_12',
				},
				{
					'title': 'Washing lines and airers',
					'id': '2_3_13',
				},
			],
			'2_4': [
				{
					'title': 'Carpet Cleaners',
					'id': '2_4_1',
				},
				{
					'title': 'Cookers',
					'id': '2_4_2',
				},
				{
					'title': 'Fridge Freezers',
					'id': '2_4_3',
				},
				{
					'title': 'Small kitchen appliances',
					'id': '2_4_4',
				},
				{
					'title': 'Large kitchen appliances',
					'id': '2_4_5',
				},
				{
					'title': 'Handheld and cordless cleaners',
					'id': '2_4_6',
				},
				{
					'title': 'Irons',
					'id': '2_4_7',
				},
				{
					'title': 'Steam cleaners',
					'id': '2_4_8',
				},
				{
					'title': 'Tumble Dryers',
					'id': '2_4_9',
				},
				{
					'title': 'Vacuum and floor cleaners',
					'id': '2_4_10',
				},
				{
					'title': 'Washing Machines',
					'id': '2_4_11',
				}		
			],
			'2_5': [
				{
					'title': 'DIY and power tools',
					'id': '2_5_1',
				},
				{
					'title': 'Fans',
					'id': '2_5_2',
				},
				{
					'title': 'Fitted kitchens',
					'id': '2_5_3',
				},
				{
					'title': 'Heaters and radiators',
					'id': '2_5_4',
				},
				{
					'title': 'Heating and cooling',
					'id': '2_5_5',
				},
				{
					'title': 'Home improvements',
					'id': '2_5_6',
				},
				{
					'title': 'Showers and accessories',
					'id': '2_5_7',
				},
				{
					'title': 'Wallpaper',
					'id': '2_5_8',
				},
				{
					'title': 'Workbenches',
					'id': '2_5_9',
				},
			]
		}
	}

	
	return{
		returnCategories: function(){
			return categories;
		}
	}
});