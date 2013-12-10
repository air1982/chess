define(function (require) {
    "use strict";
    var _ = require('underscore');
    var template = require('tpl!templates/data-table.html');
    var Mediator= require('events');
    var Map = require('map/map');
    var Collection  = require('model/data-table');
    
    var View = Backbone.View.extend({
        el: '.js-view-table',
	
	events: {
	    //'click table': 'update',
	},
        
        initialize: function (options) {
	    _.bindAll(this);
	    this.appView = options.appView;
	    this.collection = new Collection();
	    this.collection.on('reset', this.addAll);
	    this.listenTo(Mediator, 'filter:change', this.update);
	    this.listenTo(Mediator, 'user:logout', this.clean);
	},
        
        render: function () {
	    console.log('render table');
	    this.$el.html(template({}));
	    this.$tbody = this.$('.js-tbody');
	    
	},
	
	update: function (filters) {
	    //console.log(filters);
	    this.collection.setFilters(filters);
	    this.collection.fetch({
		//success: callback
	    });
	},
	
	addAll: function () {
	    if (this.collection.length == 0) {
		Mediator.trigger('data:empty');	
		return false;
	    }
	    this.$el.empty();
	    this.render();
	    this.collection.each(this.addOne);
	    return true;
	},
		
	addOne: function (item) {
	    var location = '';
	    if (item.get('ad0')) location += item.get('ad0');
	    if (item.get('ad1')) location += ', '+item.get('ad1');
	    if (item.get('ad2')) location += ', '+item.get('ad2');
	    
	    var row = '<td>'+item.get('OPERATOR')+'</td>' + '<td>'+item.get('NETTYPE') +'</td>' + '<td>'+location+'</td>' + '<td>'+item.get('ACCESSIBILITY')+'</td>' + '<td>'+item.get('MDR')+'</td>' + '<td>'+item.get('LATENCY')+'</td>'
	    this.$tbody.append('<tr>' + row + '</tr>');
	},
	
	clean: function () {
	    this.$el.empty();
	}
	
	
	

	
    })
    
    return View;
})