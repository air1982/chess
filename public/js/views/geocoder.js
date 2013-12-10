define(function (require) {
    "use strict";
    var _ = require('underscore');
    var template = require('tpl!templates/data-block.html');
    var Mediator= require('events');
    var Helpers = require('helpers/service');
    var charts_lib  = require('lib/highcharts');
    var Map = require('map/map');
    
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
	    //this.update({filters:{'OPERATOR':'beeline'}});
	    
	     this.$map = this.$('.js-view-map');
	    var map = new google.maps.Map(document.getElementById('map'), {
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		center: pyrmont,
		zoom: 15
	    });

	    
	    
	    var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);
	    var geocoder = new google.maps.Geocoder();

	    

	    var request = {
		location: pyrmont,
		radius: '5000',
		types: ['administrative_area_level_2', 'country', 'administrative_area_level_3', 'administrative_area_level_1']
	    };

	    geocoder.geocode( { 'latLng': pyrmont}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
		    console.log(status);
		    console.log(results);
		    //map.setCenter(results[0].geometry.location);
		    //var marker = new google.maps.Marker({
			//map: map,
			//position: results[0].geometry.location
		    //});
		} else {
		    console.log("Geocode was not successful for the following reason: " + status);
	    }
    });

	    
	    function createMarker(place) {
		var placeLoc = place.geometry.location;
		var marker = new google.maps.Marker({
		    map: map,
		    position: place.geometry.location
		});

   
	    }

	},
	
	update: function (filters) {
	    console.log(filters);
	    var that = this;
	    $.ajax({
		url: 'data',
  		data:{filters: JSON.stringify(filters)},
		success: function(data){
		    console.log(data);
		    //that.chartConstruct(data);
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