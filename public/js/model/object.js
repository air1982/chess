define(function (require) {
	'use strict';

	var Backbone = require('backbone');

	var Model = Backbone.Model.extend({

		//defaults: {
//			lat: null,
//			long: null,
//			adress: null,
//			square:null,
//			rooms:null,
//			floor:null,
//			type:null,
//			desc:null,
//			cost:''
//		},

		url: 'object/save',
		
		first: {
			adress: true,
			category: true
		},
		
		validate: function(attrs) {
    		var errors = [];
			
			_.each(this.first, function(elem, index){ 
				if ( !attrs[index] || _.isNull(attrs[index])) 
					errors.push(index)
			})
			if (errors.length > 0) return errors
		}

	});


	return Model;
});