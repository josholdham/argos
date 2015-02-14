'use strict';

/* Services */

angular.module('app.services.grids', []).value('version', '0.1')
.factory('Grids', function($q, $http, $location, $rootScope) {

	var basicGrids = {
		5: [
			{
				'rows': 3,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 2,
						'ySize': 2,
						'restrict': 'large',
						'direction': 'bottom',
						'home1': 'largePromo',
						//'home1Detail': 'splash'
					},
					{
						'yPos': 0,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'bottom',
						'home1': 'promo',
					},
					{
						'yPos': 0,
						'xPos' : 3,
						'xSize': 1,
						'ySize': 1,
						'direction': 'bottom',
						'home1': 'promo',//specialProduct
						//'home1Detail': 'bestSeller'
					},
					{
						'yPos': 0,
						'xPos' : 4,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'promo',
						'direction': 'bottom',
						'home1': 'promo',
						//'home1Detail': 'category',
					},
				//
				//	Row 1
				//
					{
						'yPos': 1,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'promo',
						'direction': 'top',
						'home1': 'promo',
					},
					{
						'yPos': 1,
						'xPos' : 3,
						'xSize': 2,
						'ySize': 2,
						'restrict': 'specialLarge',
						'direction': 'top',
						'home1': 'largePromo',
					},
				//
				//	ROW 2
				//
					{
						'yPos': 2,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'promo',
						'home1': 'promo',
					},
					{
						'yPos': 2,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top',
						'home1': 'promo', //specialProduct
						//'home1Detail': 'new',
					},
					{
						'yPos': 2,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top',
						'home1': 'promo',
					}
				]
			},
			{
				'rows': 2,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'bottom',
						'home1': 'specialProduct',
						'home1Detail': 'bestSeller',
					},
					{
						'yPos': 0,
						'xPos' : 1,
						'xSize': 2,
						'ySize': 2,
						'restrict': 'specialLarge',
						'direction': 'top',
						'home1': 'specialProduct',
						'home1Detail': 'hot',
					},
					{
						'yPos': 0,
						'xPos' : 3,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'bottom',
						'home1': 'promo',
						'home1Detail': 'brand',
					},
					{
						'yPos': 0,
						'xPos' : 4,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'promo',
						'direction': 'bottom',
						'home1': 'promo',
					},
					//
					//	ROW 2
					//
					{
						'yPos': 1,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'promo',
						'direction': 'top',
						'home1': 'promo',
					},
					{
						'yPos': 1,
						'xPos' : 3,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top',
						'home1': 'promo',
					},
					{
						'yPos': 1,
						'xPos' : 4,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top',
						'home1': 'specialProduct',
						'home1Detail': 'bestSeller',
					}
				]
			}
		],
		3: [
			{
				'rows': 5,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 2,
						'ySize': 2,
						//'restrict': 'large',
						'direction': 'top',
						'home1': 'promo',//specialProduct
						//'home1Detail': 'splash',
					},
					{
						'yPos': 0,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'direction': 'bottom',
						'home1': 'promo',
					},
					//
					//	ROW 1
					//
					{
						'yPos': 1,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'promo',
						'direction': 'top',
						'home1': 'promo',
					},
					//
					//	ROW 2
					//
					{
						'yPos': 2,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'specialProduct',
						'home1': 'promo',
					},
					{
						'yPos': 2,
						'xPos' : 1,
						'xSize': 2,
						'ySize': 2,
						'restrict': 'specialLarge',
						'direction': 'top',
						'home1': 'largePromo',
					},
					//
					//	COL 4
					//
					{
						'yPos': 3,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'promo',
						'direction': 'top',
						'home1': 'promo',
						//'home1Detail': 'category',
					},
					//
					//	COL 4
					//
					{
						'yPos': 4,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'home1': 'promo',

					},
					{
						'yPos': 4,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'home1': 'promo',
						//'home1Detail': 'new',
					},
					{
						'yPos': 4,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'home1': 'promo',
					}
				]	
			},
			{
				'rows': 3,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'bottom',
						'home1': 'specialProduct',
						'home1Detail': 'bestSeller',
					},
					{
						'yPos': 0,
						'xPos' : 1,
						'xSize': 2,
						'ySize': 2,
						'direction': 'top',
						'home1': 'largePromo',
					},
					//
					//	ROW 1
					//
					{
						'yPos': 1,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'home1': 'promo',
						'home1Detail': 'brand',
					},
					//
					//	ROW 2
					//
					{
						'yPos': 2,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'home1': 'promo',
					},
					{
						'yPos': 2,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'promo',
						'direction': 'top',
						'home1': 'promo',
					},
					{
						'yPos': 2,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'home1': 'specialProduct',
						'home1Detail': 'bestSeller',
					}
				]	
			}
		],
		2: [
			{
				'rows': 6.8,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						//'restrict': 'large',
						'direction': 'top',
						'home1': 'promo', //specialProduct
						//'home1Detail': 'bestSeller',
					},
					{
						'yPos': 0,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'promo',
						'direction': 'top',
						'home1': 'promo',
					},
					//
					//	ROW 1
					//
					{
						'yPos': 1,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'home1': 'promo',
						'home1Detail': 'category',
					},
					{
						'yPos': 1,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'home1': 'promo', //specialProduct
						//'home1Detail': 'new',
					},
					//
					//	ROW 2
					//
					{
						'yPos': 2,
						'xPos' : 0,
						'xSize': 2,
						'ySize': 1.4,
						'restrict': 'specialLarge',
						'direction': 'top',
						'home1': 'promo',//specialProduct
						//'home1Detail': 'splash',
					},
					//
					//	ROW 4
					//
					{
						'yPos': 3.4,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'promo',
						'direction': 'top',
						'home1': 'promo',//specialProduct
						//'home1Detail': 'hot',
					},
					{
						'yPos': 3.4,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'home1': 'promo',
					},
					//
					//	ROW 5
					//
					{
						'yPos': 4.4,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'home1': 'promo', ////specialProduct
						//'home1Detail': 'bestSeller',
					},
					{
						'yPos': 4.4,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'home1': 'promo',
					},
					//
					//	ROW 6
					//
					{
						'yPos': 5.4,
						'xPos' : 0,
						'xSize': 2,
						'ySize': 1.4,
						'restrict': 'specialLarge',
						'direction': 'top',
						'home1': 'promo',
						//'home1Detail': 'hot',
					},
				]	
			},
			{
				'rows': 3.4,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'home1': 'promo',
					},
					{
						'yPos': 0,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'home1': 'specialProduct',
						'home1Detail': 'bestSeller',
					},
					//
					//	ROW 1
					//
					{
						'yPos': 1,
						'xPos' : 0,
						'xSize': 2,
						'ySize': 1.4,
						'direction': 'top',
						'home1': 'largePromo',
					},
					//
					//	ROW 2
					//
					{
						'yPos': 2.4,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'promo',
						'direction': 'top',
						'home1': 'promo',
					},
					{
						'yPos': 2.4,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'home1': 'promo',
					},
				]	
			}
		]
	}

	var basicSearchGrids = {
		5: [
			{
				'rows': 3,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top',
						'home1': 'specialProduct',
						'home1Detail': 'splash'
					},
					{
						'yPos': 0,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top',
						'home1': 'specialProduct',
						'home1Detail': 'splash'
					},
					{
						'yPos': 0,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top',
						'home1': 'promo',
					},
					{
						'yPos': 0,
						'xPos' : 3,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'home1': 'specialProduct',
						'home1Detail': 'bestSeller'
					},
					{
						'yPos': 0,
						'xPos' : 4,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'promo',
						'direction': 'top',
						'home1': 'promo',
						'home1Detail': 'category',
					},
				//
				//	Row 1
				//
					{
						'yPos': 1,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top',
						'home1': 'specialProduct',
						'home1Detail': 'splash'
					},
					{
						'yPos': 1,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top',
						'home1': 'specialProduct',
						'home1Detail': 'splash'
					},
					{
						'yPos': 1,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'promo',
						'direction': 'top',
						'home1': 'promo',
					},
					{
						'yPos': 1,
						'xPos' : 3,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top',
						'home1': 'largePromo',
					},
					{
						'yPos': 1,
						'xPos' : 4,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top',
						'home1': 'largePromo',
					},
				//
				//	ROW 2
				//
					{
						'yPos': 2,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'promo',
						'home1': 'promo',
					},
					{
						'yPos': 2,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top',
						'home1': 'specialProduct',
						'home1Detail': 'new',
					},
					{
						'yPos': 2,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top',
						'home1': 'promo',
					},
					{
						'yPos': 2,
						'xPos' : 3,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top',
						'home1': 'specialProduct',
						'home1Detail': 'new',
					},
					{
						'yPos': 2,
						'xPos' : 4,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top',
						'home1': 'specialProduct',
						'home1Detail': 'new',
					},
				]
			},
			{
				'rows': 2,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top',
						'home1': 'specialProduct',
						'home1Detail': 'bestSeller',
					},
					{
						'yPos': 0,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top',
						'home1': 'specialProduct',
						'home1Detail': 'bestSeller',
					},
					{
						'yPos': 0,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top',
						'home1': 'specialProduct',
						'home1Detail': 'bestSeller',
					},
					// {
					// 	'yPos': 0,
					// 	'xPos' : 1,
					// 	'xSize': 2,
					// 	'ySize': 2,
					// 	'restrict': 'specialLarge',
					// 	'direction': 'top',
					// 	'home1': 'specialProduct',
					// 	'home1Detail': 'hot',
					// },
					{
						'yPos': 0,
						'xPos' : 3,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top',
						'home1': 'promo',
						'home1Detail': 'brand',
					},
					{
						'yPos': 0,
						'xPos' : 4,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'promo',
						'direction': 'top',
						'home1': 'promo',
					},
					//
					//	ROW 2
					//
					{
						'yPos': 1,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'promo',
						'direction': 'top',
						'home1': 'promo',
					},
					{
						'yPos': 1,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top',
						'home1': 'promo',
					},
					{
						'yPos': 1,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top',
						'home1': 'promo',
					},
					{
						'yPos': 1,
						'xPos' : 3,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top',
						'home1': 'promo',
					},
					{
						'yPos': 1,
						'xPos' : 4,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top',
						'home1': 'specialProduct',
						'home1Detail': 'bestSeller',
					}
				]
			}
		],
		3: [
			{
				'rows': 5,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						//'restrict': 'large',
						'direction': 'top',
						'home1': 'specialProduct',
						'home1Detail': 'splash',
					},
					{
						'yPos': 0,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						//'restrict': 'large',
						'direction': 'top',
						'home1': 'specialProduct',
						'home1Detail': 'splash',
					},
					{
						'yPos': 0,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'home1': 'promo',
					},
					//
					//	ROW 1
					//
					{
						'yPos': 1,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'promo',
						'direction': 'top',
						'home1': 'promo',
					},
					{
						'yPos': 1,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top',
						'home1': 'promo',
					},
					{
						'yPos': 1,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top',
						'home1': 'promo',
					},
					//
					//	ROW 2
					//
					{
						'yPos': 2,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'specialProduct',
						'home1': 'bestSeller',
					},
					{
						'yPos': 2,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top',
						'home1': 'largePromo',
					},
					{
						'yPos': 2,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top',
						'home1': 'largePromo',
					},
					//
					//	COL 4
					//
					{
						'yPos': 3,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'promo',
						'direction': 'top',
						'home1': 'promo',
						'home1Detail': 'category',
					},
					{
						'yPos': 3,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top',
						'home1': 'promo',
						'home1Detail': 'category',
					},
					{
						'yPos': 3,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top',
						'home1': 'promo',
						'home1Detail': 'category',
					},
					//
					//	COL 4
					//
					{
						'yPos': 4,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'home1': 'promo',

					},
					{
						'yPos': 4,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'home1': 'specialProduct',
						'home1Detail': 'new',
					},
					{
						'yPos': 4,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'home1': 'promo',
					}
				]	
			},
			{
				'rows': 3,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'home1': 'specialProduct',
						'home1Detail': 'bestSeller',
					},
					{
						'yPos': 0,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top',
						'home1': 'largePromo',
					},
					{
						'yPos': 0,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top',
						'home1': 'largePromo',
					},
					//
					//	ROW 1
					//
					{
						'yPos': 1,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'home1': 'promo',
						'home1Detail': 'brand',
					},
					{
						'yPos': 1,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'home1': 'promo',
						'home1Detail': 'brand',
					},
					{
						'yPos': 1,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'home1': 'promo',
						'home1Detail': 'brand',
					},
					//
					//	ROW 2
					//
					{
						'yPos': 2,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'home1': 'promo',
					},
					{
						'yPos': 2,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'promo',
						'direction': 'top',
						'home1': 'promo',
					},
					{
						'yPos': 2,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'home1': 'specialProduct',
						'home1Detail': 'bestSeller',
					}
				]	
			}
		],
		2: [
			{
				'rows': 6,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						//'restrict': 'large',
						'direction': 'top',
						'home1': 'specialProduct',
						'home1Detail': 'bestSeller',
					},
					{
						'yPos': 0,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'promo',
						'direction': 'top',
						'home1': 'promo',
					},
					//
					//	ROW 1
					//
					{
						'yPos': 1,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'home1': 'promo',
						'home1Detail': 'category',
					},
					{
						'yPos': 1,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'home1': 'specialProduct',
						'home1Detail': 'new',
					},
					//
					//	ROW 2
					//
					{
						'yPos': 2,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top',
						'home1': 'specialProduct',
						'home1Detail': 'splash',
					},
					{
						'yPos': 2,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top',
						'home1': 'specialProduct',
						'home1Detail': 'splash',
					},
					//
					//	ROW 4
					//
					{
						'yPos': 3,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'promo',
						'direction': 'top',
						'home1': 'specialProduct',
						'home1Detail': 'hot',
					},
					{
						'yPos': 3,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'home1': 'promo',
					},
					//
					//	ROW 5
					//
					{
						'yPos': 4,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'home1': 'specialProduct',
						'home1Detail': 'bestSeller',
					},
					{
						'yPos': 4,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'home1': 'promo',
					},
					//
					//	ROW 6
					//
					{
						'yPos': 5,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top',
						'home1': 'specialProduct',
						'home1Detail': 'hot',
					},
					{
						'yPos': 5,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top',
						'home1': 'specialProduct',
						'home1Detail': 'hot',
					},
				]	
			},
			{
				'rows': 3,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'home1': 'promo',
					},
					{
						'yPos': 0,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'home1': 'specialProduct',
						'home1Detail': 'bestSeller',
					},
					//
					//	ROW 1
					//
					{
						'yPos': 1,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'home1': 'largePromo',
					},
					{
						'yPos': 1,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'home1': 'largePromo',
					},
					//
					//	ROW 2
					//
					{
						'yPos': 2,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'promo',
						'direction': 'top',
						'home1': 'promo',
					},
					{
						'yPos': 2,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'home1': 'promo',
					},
				]	
			}
		]
	}

	var biggerGridStructures = {
		10: [
			{
				'rows': 3,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
					{
						'yPos': 0,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
					{
						'yPos': 0,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
					{
						'yPos': 0,
						'xPos' : 3,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
					{
						'yPos': 0,
						'xPos' : 4,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
					{
						'yPos': 0,
						'xPos' : 5,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
					{
						'yPos': 0,
						'xPos' : 6,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
					{
						'yPos': 0,
						'xPos' : 7,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
					{
						'yPos': 0,
						'xPos' : 8,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
					{
						'yPos': 0,
						'xPos' : 9,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
				//
				//	ROW 1
				//
					{
						'yPos': 1,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
					{
						'yPos': 1,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
					{
						'yPos': 1,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
					{
						'yPos': 1,
						'xPos' : 3,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
					{
						'yPos': 1,
						'xPos' : 4,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
					{
						'yPos': 1,
						'xPos' : 5,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
					{
						'yPos': 1,
						'xPos' : 6,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
					{
						'yPos': 1,
						'xPos' : 7,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
					{
						'yPos': 1,
						'xPos' : 8,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
					{
						'yPos': 1,
						'xPos' : 9,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
				//
				//	ROW 2
				//
					{
						'yPos': 2,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
					{
						'yPos': 2,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
					{
						'yPos': 2,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
					{
						'yPos': 2,
						'xPos' : 3,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
					{
						'yPos': 2,
						'xPos' : 4,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
					{
						'yPos': 2,
						'xPos' : 5,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
					{
						'yPos': 2,
						'xPos' : 6,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
					{
						'yPos': 2,
						'xPos' : 7,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
					{
						'yPos': 2,
						'xPos' : 8,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
					{
						'yPos': 2,
						'xPos' : 9,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
				]
			},
			{
				'rows': 3,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 2,
						'ySize': 2,
						'restrict': 'specialLarge',
						'direction': 'bottom'
					},
					{
						'yPos': 0,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'bottom'
					},
					{
						'yPos': 0,
						'xPos' : 3,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'bottom'
					},
					{
						'yPos': 0,
						'xPos' : 4,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'bottom'
					},
					{
						'yPos': 0,
						'xPos' : 5,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'bottom'
					},
					{
						'yPos': 0,
						'xPos' : 6,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'bottom'
					},
					{
						'yPos': 0,
						'xPos' : 7,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'bottom'
					},
					{
						'yPos': 0,
						'xPos' : 8,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'bottom'
					},
					{
						'yPos': 0,
						'xPos' : 9,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'bottom'
					},
				//
				//	ROW 1
				//
					{
						'yPos': 1,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
					{
						'yPos': 1,
						'xPos' : 3,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
					{
						'yPos': 1,
						'xPos' : 4,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
					{
						'yPos': 1,
						'xPos' : 5,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
					{
						'yPos': 1,
						'xPos' : 6,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
					{
						'yPos': 1,
						'xPos' : 7,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
					{
						'yPos': 1,
						'xPos' : 8,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
					{
						'yPos': 1,
						'xPos' : 9,
						'xSize': 1,
						'ySize': 1,
						'restrict': 'product',
						'direction': 'top'
					},
				]
			}
		]
	}

	var specialGridStructures = {
		10: {
			1: {
				'rows': 1,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
				]
			},
			2: {
				'rows': 1,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 0,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
				]
			},
			3: {
				'rows': 1,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 0,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 0,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 0,
						'xPos' : 3,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'promo'
					},
				]
			},
			4: {
				'rows': 1,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 0,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 0,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 0,
						'xPos' : 3,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'promo'
					},
					{
						'yPos': 0,
						'xPos' : 4,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'promo'
					},
					{
						'yPos': 0,
						'xPos' : 5,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
				]
			}
		},
		5: {
			1: {
				'rows': 1,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top'
					},
				]
			},
			2: {
				'rows': 1,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top'
					},
					{
						'yPos': 0,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top'
					},
				]
			},
			3: {
				'rows': 2,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'bottom'
					},
					{
						'yPos': 0,
						'xPos' : 1,
						'xSize': 2,
						'ySize': 2,
						'direction': 'top'
					},
					{
						'yPos': 0,
						'xPos' : 3,
						'xSize': 1,
						'ySize': 1,
						'direction': 'bottom'
					},
					{
						'yPos': 0,
						'xPos' : 4,
						'xSize': 1,
						'ySize': 1,
						'direction': 'bottom',
						'restrict': 'promo'
					},
					{
						'yPos': 1,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'promo'
					},
				]
			},
			4: {
				'rows': 2,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'bottom'
					},
					{
						'yPos': 0,
						'xPos' : 1,
						'xSize': 2,
						'ySize': 2,
						'direction': 'top'
					},
					{
						'yPos': 0,
						'xPos' : 3,
						'xSize': 1,
						'ySize': 1,
						'direction': 'bottom'
					},
					{
						'yPos': 0,
						'xPos' : 4,
						'xSize': 1,
						'ySize': 1,
						'direction': 'bottom',
						'restrict': 'promo'
					},
					{
						'yPos': 1,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'promo'
					},
					{
						'yPos': 1,
						'xPos' : 3,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
					},
				]
			},
			'5Special': {
				'rows': 1,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 0,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 0,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 0,
						'xPos' : 3,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 0,
						'xPos' : 4,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
				]
			},
			'home2': {
				'rows': 2,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 0,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 0,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 0,
						'xPos' : 3,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 0,
						'xPos' : 4,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 1,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 1,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 1,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 1,
						'xPos' : 3,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 1,
						'xPos' : 4,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
				]
			},
			'pdp': {
				'rows': 2,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 0,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 0,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 1,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 1,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 1,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
				]
			}
		},
		3: {
			1: {
				'rows': 1,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top'
					},
				]
			},
			2: {
				'rows': 1,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top'
					},
					{
						'yPos': 0,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top'
					},
				]
			},
			3: {
				'rows': 2,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'bottom'
					},
					{
						'yPos': 0,
						'xPos' : 1,
						'xSize': 2,
						'ySize': 2,
						'direction': 'top'
					},
					// {
					// 	'yPos': 0,
					// 	'xPos' : 3,
					// 	'xSize': 1,
					// 	'ySize': 1,
					// 	'direction': 'bottom'
					// },
					// {
					// 	'yPos': 0,
					// 	'xPos' : 4,
					// 	'xSize': 1,
					// 	'ySize': 1,
					// 	'direction': 'bottom',
					// 	'restrict': 'promo'
					// },
					{
						'yPos': 1,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
					},
				]
			},
			4: {
				'rows': 3,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'bottom'
					},
					{
						'yPos': 0,
						'xPos' : 1,
						'xSize': 2,
						'ySize': 2,
						'direction': 'top'
					},
					{
						'yPos': 1,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'promo'
					},
					{
						'yPos': 2,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top'
					},
					{
						'yPos': 2,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'promo'
					},
					{
						'yPos': 2,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
					},
				]
			},
			'5Special': {
				'rows': 1,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 0,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 0,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
				]
			},
			'pdp': {
				'rows': 2,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 0,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 0,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 1,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 1,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 1,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
				]
			},
			'home2': {
				'rows': 2,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 0,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 0,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					// {
					// 	'yPos': 0,
					// 	'xPos' : 3,
					// 	'xSize': 1,
					// 	'ySize': 1,
					// 	'direction': 'top',
					// 	'restrict': 'product'
					// },
					// {
					// 	'yPos': 0,
					// 	'xPos' : 4,
					// 	'xSize': 1,
					// 	'ySize': 1,
					// 	'direction': 'top',
					// 	'restrict': 'product'
					// },
					{
						'yPos': 1,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 1,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 1,
						'xPos' : 2,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					// {
					// 	'yPos': 1,
					// 	'xPos' : 3,
					// 	'xSize': 1,
					// 	'ySize': 1,
					// 	'direction': 'top',
					// 	'restrict': 'product'
					// },
					// {
					// 	'yPos': 1,
					// 	'xPos' : 4,
					// 	'xSize': 1,
					// 	'ySize': 1,
					// 	'direction': 'top',
					// 	'restrict': 'product'
					// },
				]
			},
		},
		2: {
			1: {
				'rows': 1,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top'
					},
				]
			},
			2: {
				'rows': 1,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top'
					},
					{
						'yPos': 0,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top'
					},
				]
			},
			3: {
				'rows': 2,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top'
					},
					{
						'yPos': 0,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top'
					},
					{
						'yPos': 1,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
					},
				]
			},
			4: {
				'rows': 3,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'bottom'
					},
					{
						'yPos': 0,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top'
					},
					{
						'yPos': 1,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'promo'
					},
					{
						'yPos': 1,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top'
					},
					{
						'yPos': 2,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'promo'
					},
					{
						'yPos': 2,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
					},
				]
			},
			'5Special': {
				'rows': 2,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 0,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 1,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 1,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
				]
			},
			'pdp': {
				'rows': 3,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 0,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 1,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 1,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 2,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 2,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
				]
			},
			'home2': {
				'rows': 2,
				'tiles': [
					{
						'yPos': 0,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 0,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					// {
					// 	'yPos': 0,
					// 	'xPos' : 2,
					// 	'xSize': 1,
					// 	'ySize': 1,
					// 	'direction': 'top',
					// 	'restrict': 'product'
					// },
					// {
					// 	'yPos': 0,
					// 	'xPos' : 3,
					// 	'xSize': 1,
					// 	'ySize': 1,
					// 	'direction': 'top',
					// 	'restrict': 'product'
					// },
					// {
					// 	'yPos': 0,
					// 	'xPos' : 4,
					// 	'xSize': 1,
					// 	'ySize': 1,
					// 	'direction': 'top',
					// 	'restrict': 'product'
					// },
					{
						'yPos': 1,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 1,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					// {
					// 	'yPos': 1,
					// 	'xPos' : 2,
					// 	'xSize': 1,
					// 	'ySize': 1,
					// 	'direction': 'top',
					// 	'restrict': 'product'
					// },
					// {
					// 	'yPos': 1,
					// 	'xPos' : 3,
					// 	'xSize': 1,
					// 	'ySize': 1,
					// 	'direction': 'top',
					// 	'restrict': 'product'
					// },
					// {
					// 	'yPos': 1,
					// 	'xPos' : 4,
					// 	'xSize': 1,
					// 	'ySize': 1,
					// 	'direction': 'top',
					// 	'restrict': 'product'
					// },
					{
						'yPos': 2,
						'xPos' : 0,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
					{
						'yPos': 2,
						'xPos' : 1,
						'xSize': 1,
						'ySize': 1,
						'direction': 'top',
						'restrict': 'product'
					},
				]
			},

		}
	}
	
	return{
		returnBasicGrids: function(){
			return basicGrids;
		},
		returnBasicSearchGrids: function(){
			return basicSearchGrids;
		},
		returnSpecialGridStructures: function(){
			return specialGridStructures;
		},
		returnBiggerGridStructures: function(){
			return biggerGridStructures;
		},
	}
});