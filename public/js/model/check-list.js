define(function (require) {
	var _ = require('underscore');
	var Backbone = require('backbone');
	//var Model = require('model/figure');

	return Backbone.Collection.extend({
		//model: Model,
		
		initialize: function (models, options) {
			this.filters = {};
		},

		/**
		 * @private
		 */
		//url: 'filters',
		
		url: function(){
			var filters = '?filters='+JSON.stringify(this.filters);
			return 'filters' + filters
		},
		
		
		setFilters: function (options){
			this.filters = options;
		}
		

	});
});