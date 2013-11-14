define(function (require) {
	"use strict";
	var _ = require('underscore');
	var template = require('tpl!templates/filters.html');
	var ChekListView = require('views/check-list');
	var Helpers = require('helpers/service');
	var Collection  = require('model/check-list');
	var Mediator= require('events');
	var formToJs = require('lib/form2js');
	
	var View = Backbone.View.extend({
		el: '.js-filters-block',
		
		events: {
			'click .hasDatepicker': 'calendarShow',
			'click [type=submit]': 'filterApply'
		},
		
		initialize: function (options) {
			_.bindAll(this);
			this.collection = new Collection();
			this.collection.on('reset', this.addAllChekList);
			//this.collection.on('add', this.addOne);
		},
		
		render: function () {
			console.log('render filters');
			this.$el.html(template({}));
			
			this.$dateFiltersContainer = this.$('.js-date-filters');
			this.checkListInit();
			this.dateFiltersInit();
		},
		
		checkListInit: function () {
			this.collection.fetch({
				//success: callback
			});
		},
		
		addAllChekList: function () {
			this.collection.each(this.addOneChekList);
		},
		
		addOneChekList: function (item) {
			var singleView = new ChekListView({
				model: item,
			});

			singleView.render();
			this.$('[data-tpl="'+item.id+'"]').append(singleView.el);
			
			//console.log(singleView.el)
			//console.log(item.id)
			//console.log(this.$('[data-tpl="'+item.id+'"]'))
		},
		
		calendarShow: function (ev) {
			console.log('show');
			
			this.$dateFiltersContainer.show();
			var $targ = $(ev.target);
			Helpers.popupOffset(this.$dateFiltersContainer,{top: $targ.offset().top, left: 10}, {top:20});
			Helpers.delayHide(this.$dateFiltersContainer);
		},
		
		dateFiltersInit: function () {
			var $fromDate = this.$dateFiltersContainer.children('.js-fromdate-picker');
			console.log($fromDate)
			var $toDate = this.$dateFiltersContainer.children('.js-todate-picker');
			//var $fromDateAlt = this.$dateFiltersContainer.children('.js-fromdate');
			//var $toDateAlt = this.$dateFiltersContainer.children('.js-todate');
			//var fromDateValue = fromDateAlt.val();
			//that.toDate=$("<div/>").appendTo(date_filter);
			//var toDateAlt = parameters_container.find('.todate');
			//var toDateValue = toDateAlt.val();
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
			//that.fromDate.datetimepicker('setDate', fromDateValue);
			$toDate.datetimepicker({//Инициализация календаря
				showButtonPanel: false,
				duration: '',
				showTime: true,
				dateFormat: 'yy-mm-dd',
				time24h: true,
				altField: '.js-todate',
				altFieldTimeOnly: false
			}) ;
			//toDateAlt.val(toDateValue);
		},
		
		filterApply: function (ev) {
			var form = this.$('#filter-form');
			var data = form2js(form[0]);
			
			console.log(data)
			
			Mediator.trigger('filter:change', data);			
			return false;
		}
		
	})
return View;
});