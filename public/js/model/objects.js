define(function (require) {
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Model = require('model/object');

	return Backbone.Collection.extend({
		model: Model,
		
		initialize: function (models, options) {
			this.filter = {};
		},

		/**
		 * @private
		 */
		url: function () {
			var urlString='';
			var urlArray=[];
			
			_.each(this.filter, function(elem, index){ 
				if (elem && !_.isNull(elem))
					urlArray.push(index+'='+elem)
			})
			if (urlArray.length > 0) urlString = '?' + urlArray.join('&')
			
			return 'object/get' + urlString;
		},

		/**
		 * Устанавливает новые настройки фильтра.
		 */
		setFilter: function (options) { 
			options = options || {};
			this.filter = options;
		}
	});
});
