define(function (require) {
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Model = require('model/data-table-row');

	return Backbone.Collection.extend({
		model: Model,
		
		initialize: function (models, options) {
			this.filter = {};
		},

		url: function(){
			return 'data/table?filters='+JSON.stringify(this.filters);
		},
		//url: 'data',
		
		setFilters: function(filters) {
				this.filters = filters;
		}
		
		

	});
});