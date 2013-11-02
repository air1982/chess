define(function (require) {
	/**
	 * Шахматная доска
	 */
	var _ = require('underscore');
	var template = require('tpl!templates/chess-table.html');
		
	var view = Backbone.View.extend({
		el: '.chess-table',
		
		events: {
			
		},

		initialize: function (options) {
		
},

		render: function () {
			this.$el.html(template({}));
			console.log('render table');
			console.log(template({}))

		}
	})

	return view;
});
