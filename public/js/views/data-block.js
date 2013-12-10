define(function (require) {
    "use strict";
    var _ = require('underscore');
    var template = require('tpl!templates/data-block.html');
    var Mediator= require('events');
    var Helpers = require('helpers/service');
    var Vm = require('vm');
    
    var View = Backbone.View.extend({
        el: '.js-data-block',
        
        events: {
	    //'click .hasDatepicker': 'calendarShow',
	},
        
        initialize: function (options) {
	    this.appView = options.appView;
	},
        
        render: function () {
	    console.log('render data');
	    var that = this;
	    this.$el.html(template({}));
	    require(['views/map'], function (Page) {
		Vm.create(that.appView, 'MapView', Page,{ appView: that.appView}, 'Map')
	    });
	    require(['views/map-treshold'], function (Page) {
		Vm.create(that.appView, 'MapTresholdView', Page,{ appView: that.appView}, 'MapTreshold')
	    });
	    require(['views/table'], function (Page) {
		Vm.create(that.appView, 'TableView', Page,{ appView: that.appView}, 'Table')
	    });
	    
	}
	

	
    })
    
    return View;
})