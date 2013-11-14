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

		url: 'figures/save',
	});


	return Model;
});
