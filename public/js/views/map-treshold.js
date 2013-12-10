define(function (require) {
    "use strict";
    var _ = require('underscore');
    var template = require('tpl!templates/data-map-treshold.html');
    var selectElemTemplate = require('tpl!templates/filters-chek-elem.html');
    var Mediator= require('events');
    var Helpers = require('helpers/map-helpers');
        
    var View = Backbone.View.extend({
        el: '.js-map-treshold',
	
	events: {
	    'change .treshold-select': 'kpiSelected',
	 },	
        
        initialize: function (options) {
	    _.bindAll(this);
	    this.appView = options.appView;
	    this.kpi = this.appView.kpi;
	    this.title = this.appView.title;
	    this.treshold = this.appView.treshold;
	    this.listenTo(Mediator, 'mapTreshold:render', this.render);
	    this.listenTo(Mediator, 'user:logout', this.clean);
	},
        
        render: function () {
	    console.log('render tres');
	    console.log(this.kpi);
	    
	    var that = this;
	    this.$el.html(template({treshold:this.treshold[this.kpi]}));
	   
	    this.$tresholdSelect = this.$('.treshold-select');
	    this.tresSelectInit();
	},
	
	kpiSelected: function (filters) {
	    var new_kpi = this.$tresholdSelect.children(':selected').val(); 
	    if (new_kpi == this.kpi) return false;
	    this.kpi = new_kpi;
	    this.render();
	    Mediator.trigger('map:redrawMarkers', this.kpi);
	    return true;
	},
	
	update: function (filters) {
	    console.log('tres update');
	},	
	
	tresSelectInit: function () {
	    var that = this;
	    _.each(this.treshold, function(value, index){
		that.$tresholdSelect.append(selectElemTemplate({id: index, name: that.title[index]}));
	    })
	},
	
	clean: function () {
	    this.$el.empty();
	}
		
    })
    
    return View;
})