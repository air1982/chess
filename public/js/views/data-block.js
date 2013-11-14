define(function (require) {
    "use strict";
    var _ = require('underscore');
    var template = require('tpl!templates/data-block.html');
    var Mediator= require('events');
    var Helpers = require('helpers/service');
    var charts_lib  = require('lib/highcharts');
    
    var View = Backbone.View.extend({
        el: '.js-data-block',
        
        events: {
	    //'click .hasDatepicker': 'calendarShow',
	},
        
        initialize: function (options) {
	    _.bindAll(this);
	    //this.model = new Collection();
	    //this.model.on('reset', this.addAll);
	    //this.collection.on('add', this.addOne);
	    this.listenTo(Mediator, 'filter:change', this.update);
	},
        
        render: function () {
	    console.log('render data');
	    this.$el.html(template({}));
	    //this.update();
	},
	
	update: function (filters) {
	    console.log(filters);
	    var that = this;
	    $.ajax({
		url: 'data-chart',
  		data:filters,
		success: function(data){
		    console.log(data);
		    that.chartConstruct(data);
		}
	    })
	},
	
	chartConstruct: function (data) {
	    var $chartContainer = this.$('.js-view-chart');
	    var chartOptions = Helpers.getChartOptions($chartContainer,'line','Line Chart');
	    
	    if ('xAxis' in data) {
		chartOptions.xAxis= {
            	    title: {
                	text: 'Date'
            	    },
		    //tickInterval: tickInt,
		    //tickPixelInterval:100,
		    categories: data.xAxis,
		    labels : {
			rotation: 270,
			align: "right",
			style: {
                    	    font: '10px normal Verdana'
                	}
		    },
		    offset: 0,
            	    gridLineWidth: 0,
            	};
	    };
	    
	    
	    chartOptions.series=data.series;
	    
	    
	    var chart = new Highcharts.Chart(chartOptions);
	},
	

	
    })
    
    return View;
})