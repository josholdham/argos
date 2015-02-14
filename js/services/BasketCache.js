'use strict';

/* Services */

angular.module('app.services.basketcache', []).value('version', '0.1')
.factory('BasketCache', function() {
	
	var protoBasket = 'furniture';

	return {
		returnProtoBasket: function(){
			return protoBasket;
		},
		setProtoBasket: function(ctrlProtoBasket){
			protoBasket = ctrlProtoBasket;
		},
	}		
})