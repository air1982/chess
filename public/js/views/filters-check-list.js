define(function (require) {
	"use strict";
	var _ = require('underscore');
	var template = require('tpl!templates/filters-chek-elem.html');
	var view = Backbone.View.extend({
		tagName: 'select',
						
		events: {
			//'click [name=hasDatepicker]': 'showСalendar'
		},
		
		initialize: function (options) {
			_.bindAll(this);
		},
		
		render: function () {
			var that = this;
			this.$el.append(template({id: -1, name: ''}));
			_.each(this.model.get('content'), function(elem){
				that.renderElement(elem)
			})
			this.$el.attr({multiple:'true', size: 4, name: this.model.get('id').toString()});
		},
		
		renderElement: function (item) {
			this.$el.append(template({id: item['id'], name: item['name']}));
		}
				
	})
return view;
});