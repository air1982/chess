define(function (require) {
	'use strict';
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Vm = require('vm');
	//var Events = require('events');
	var Router = require('router');
	//var layoutTemplate = require('tpl!templates/layout.html');
	//var UserModel = require('models/user');
	


	var AppView = Backbone.View.extend({
		el: '.main',
		
		//events: {
			//'click .fetch': 'fetch',
			//'click .save': 'save'
		//},
		

		//initialize: function () {
			//_.bindAll(this);
		//},

		
		render: function(){
			console.log('AppView:render');
			this.initApp();
			
		},

		initApp: function(){
			var appView = this;
			require(['views/filters-block'], function (Page) {
				Vm.create(appView, 'FiltersView', Page,{ appView: appView}, 'Filters')
					.render();
			});
			
			require(['views/data-block'], function (Page) {
				Vm.create(appView, 'DataView', Page,{ appView: appView}, 'Data')
					.render();
			});
			
		}
		
	
	});

	return AppView;
});
