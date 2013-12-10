define(function (require) {
    "use strict";
    var _ = require('underscore');
    var template = require('tpl!templates/data-block.html');
    var Mediator= require('events');
    var Helpers = require('helpers/service');
    var charts_lib  = require('lib/highcharts');
    var Map = require('map/map');
    var Collection  = require('model/data');
    
    var View = Backbone.View.extend({
        
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