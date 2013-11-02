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
			this.startGame();
			
		},

		startGame: function(){
			var appView = this;
			require(['views/chess'], function (ProfilePage) {
				Vm.create(appView, 'CenterView', ProfilePage,{ appView: appView}, 'Chess')
					.render();
			});
			
		}
		
	
	});

	return AppView;
});
