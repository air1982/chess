define(function (require) {
    "use strict";
    var _ = require('underscore');
    var template = require('tpl!templates/filters-block.html');
    var ChekListView = require('views/filters-check-list');
    var Helpers = require('helpers/service');
    var Collection  = require('model/check-list');
    var Mediator= require('events');
    var formToJs = require('lib/form2js');
    var moment = require('moment');
    var Map = require('map/map');    	
	
    var View = Backbone.View.extend({
	el: '.js-filters-block',
		
        events: {
	    'click .hasDatepicker': 'calendarShow',
	    'click .js-submit': 'filterApply'
	},
		
	initialize: function (options) {
	    _.bindAll(this);
	    this.user = options.appView.user;
	    this.collection = new Collection();
	    this.collection.on('reset', this.addAllChekList);
	    this.listenTo(Mediator, 'data:empty', this.showWarning);
	    this.listenTo(Mediator, 'user:login user:logout', this.update);
	    this.location = false;
	},
		
	render: function () {
	    console.log('render filters');
	    this.$el.html(template({imei: this.user.get('imei')}));
			
	    this.$dateFiltersContainer = this.$('.js-date-filters');
	    this.checkListInit();
	    this.dateFiltersInit();
	    
	    this.$autocomplite = this.$('.js-autocomplete');
	    this.autocompleteInit();
	    
	    this.$submit = this.$('.js-submit');
	    this.$submit.popover({trigger: 'manual'})
	},
	
	showWarning: function () {
	    console.log('!!!')
	    this.$submit.popover('show');
	    Helpers.delayHide(this.$submit, {popover: 'hide'});
	},
	
	autocompleteInit: function () {
	    var that = this;
	    this.searchAutocomplete = new google.maps.places.Autocomplete(this.$autocomplite[0], { types: ['(cities)']});
	    google.maps.event.addListener(this.searchAutocomplete, 'place_changed', function () {
		that.locationChanged();
	    });
	},
	
	locationChanged: function () {
	    this.location = false;
	    if (this.$autocomplite.val() == "") {
		this.checkListInit({});
		return false;
	    }
	    
	    var place = this.searchAutocomplete.getPlace();
	    if (place) {
		var location = {
		    lng: place.geometry.location.lng(),
		    lat: place.geometry.location.lat()
		}
		this.location = location;
		var country = false;
		_.each(place.address_components, function(value){
		    if (_.indexOf(value.types, 'country') !=-1 ) country = value.long_name;
		})
		console.log(country);
	    }
	    this.checkListInit(country ? {country:country} : {});
	    console.log(this.location)
	    return true;
	},
	
		
	checkListInit: function (options) {
	    console.log('init list')
	    
	    this.collection.setFilters(options ? options : {});
	    this.collection.fetch();
	},
		
	addAllChekList: function () {
	    this.$('[data-tpl] select').remove();
	    this.collection.each(this.addOneChekList);
	},
		
	addOneChekList: function (item) {
	    var singleView = new ChekListView({
		model: item,
	    });

	    singleView.render();
	    this.$('[data-tpl="'+item.id+'"]').append(singleView.el);	
	},
		
	calendarShow: function (ev) {
	    this.$dateFiltersContainer.show();
	    var $targ = $(ev.target);
	    Helpers.popupOffset(this.$dateFiltersContainer,{top: $targ.offset().top, left: 10}, {top:30});
	    Helpers.delayHide(this.$dateFiltersContainer);
	},
		
	dateFiltersInit: function () {
	    var fromDateAlt = this.$('.js-fromdate');
	    var fromDateValue = moment().hour(-2000).format('YYYY-M-D h:mm');
	    
	    //.format('YYYY-M-D h:mm')
	    var $fromDate = this.$dateFiltersContainer.find('.js-fromdate-picker');
	    var $toDate = this.$dateFiltersContainer.find('.js-todate-picker');
	    $fromDate.datetimepicker({//Инициализация календаря
				showButtonPanel: false,
				duration: '',
				showTime: true,
				dateFormat: 'yy-mm-dd',
				time24h: true,
				altField: '.js-fromdate',
				altFieldTimeOnly: false
	    }) ;
	    //fromDateAlt.val(fromDateValue);
	    $fromDate.datetimepicker('setDate', moment().hour(-2000).toDate());
	    $toDate.datetimepicker({//Инициализация календаря
				showButtonPanel: false,
				duration: '',
				showTime: true,
				dateFormat: 'yy-mm-dd',
				time24h: true,
				altField: '.js-todate',
				altFieldTimeOnly: false
	    }) ;
	    $toDate.datetimepicker('setDate', moment().toDate());
			//toDateAlt.val(toDateValue);
	},
		
	filterApply: function (ev) {
	    
	    var form = this.$('#filters-form');
	    var data = form2js(form[0]);
	    
	    data['fromdate'] ? data['fromdate'] = moment(data['fromdate']).toDate() : false;
	    data['todate'] ? data['todate'] = moment(data['todate']).toDate() : false;
	    if (data['OPERATOR'] && data['OPERATOR'][0]!='-1') 
		data['OPERATOR'] = data['OPERATOR'][0] 
	    else
		delete data['OPERATOR']
	    //IMEI filter
	    if (data['IMEI']) data['IMEI'] = this.user.get('imei');
	    this.locationChanged();
	    if (this.location) {
		data.location = this.location;
	    }
	    else {
		this.location = false;
		this.$autocomplite.val('');
	    }
	
	    Mediator.trigger('filter:change', data);
	    return false;
	},
	
	update: function () {
	    this.render();
	}
		
    })
    return View;
});