define(function (require) {
    "use strict";
    var _ = require('underscore');
    var template = require('tpl!templates/data-map.html');
    var TresholdView = require('views/map-treshold');
    var Mediator= require('events');
    //var Map = require('map/map');
    var Helpers = require('helpers/map-helpers');
    var Collection  = require('model/data-map');
    var Moment = require('moment');
        
    var View = Backbone.View.extend({
        el: '.js-view-map',
	
	events: {
	    //'click .treshold-select': 'kpiSelected',
	 },	
        
        initialize: function (options) {
	    _.bindAll(this);
	    this.appView = options.appView;
	    this.kpi = this.appView.kpi;
	    this.treshold = this.appView.treshold;
	    this.centerPutFlag = true; //Флаг устанавливать ли карту в центр
	    this.collection = new Collection();
	    this.collection.on('reset', this.addAll);
	    this.listenTo(Mediator, 'filter:change', this.update);
	    this.listenTo(Mediator, 'user:logout', this.clean);
	    this.listenTo(Mediator, 'map:redrawMarkers', this.redrawMarkers);
	    this.infoWindow = false;
	    this.firstRender = true;
	},
        
        render: function () {
	    console.log('render map');
	    var that = this;
	    this.$el.html(template({}));
	   
	    var center = new google.maps.LatLng(this.collection.at(0).get('LAT'),this.collection.at(0).get('LON'));
	    
	    this.map = new google.maps.Map(document.getElementById('map'), {
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		center: center,
		noClear: false,
		mapTypeControl: false,
		timeout: 6000, 
		maximumAge: 50000,
		zoom: 4
	    });
	    if (this.firstRender) {
		this.firstRender = false;
		Mediator.trigger('mapTreshold:render');	
	    }
	},
	
	update: function (filters, kpi) {
	    if (!filters) return false;
	    this.collection.setFilters(filters);
	    this.collection.fetch({
		//success: callback
	    });
	    return true;
	},	
	
	addAll: function () {
	    if (this.collection.length == 0) {
		Mediator.trigger('data:empty');	
		return false;
	    }
	    this.$el.empty();
	    this.render();
	    this.collection.each(this.addMarker);
	    return true;
	},
		
	addMarker: function (item) {
	    var that = this;
	    if (!item.get('LAT') || !item.get('LON')) return false;
	    
	    if (this.centerPutFlag) {
		var center = new google.maps.LatLng(item.get('LAT'), item.get('LON'));
		this.map.setCenter(center);
		this.centerPutFlag = false
	    }
	    
	    var icon=Helpers.icon(item, this.kpi, this.treshold);
	    
	    var marker = new google.maps.Marker({  
		position: new google.maps.LatLng(item.get('LAT'), item.get('LON')),  
		map: this.map,
		animation: google.maps.Animation.DROP,  
		clickable: true,
		//zIndex: zindex
	    });
	    
	    marker.setIcon(icon);
	    
	    google.maps.event.addListener(marker, 'mouseover', function() {
		if (that.infoWindow) that.infoWindow.close()
		var infoWindowContent = '';
						
		_.each(item.attributes, function(value, index){
		    if (index == "TS") value = moment(value).format('YYYY-M-D h:mm')
		    if (!_.has(that.title, index)) return false;
		    infoWindowContent += '<div class=map_popup>'+that.title[index]+': '+value+'</div>'
		    
		    return true;	
		})
		
		that.infoWindow = new google.maps.InfoWindow({
		    content: infoWindowContent
		});
		that.infoWindow.open(that.map, marker);
	    });
					
	    google.maps.event.addListener(marker, 'mouseout', function() {
		if (that.infoWindow) that.infoWindow.close()
		
            });
	    
	    item.set({marker: marker});
	    return true;
	},
	
	redrawMarkers: function (kpi) {
	    if (!kpi) return false;
	    this.kpi = kpi;
	    var that = this;
	    
	    this.collection.each(function(item){
		var marker = item.get('marker');
		if (!marker) return false;
		var icon=Helpers.icon(item, that.kpi, that.treshold);
		marker.setIcon(icon);
		
		return true;
	    });
	    return true;
	},
	
	clean: function () {
	    this.$el.empty();
	    this.firstRender = true;
    	}
    })
    
    return View;
})