define(function (require) {
	var _ = require('underscore');
	var Backbone = require('backbone');
	//var Model = require('model/figure');

	return Backbone.Collection.extend({
		//model: Model,
		
		initialize: function (models, options) {
			//this.filter = {};
		},

		/**
		 * @private
		 */
		url: 'filters',
		

	});
});
