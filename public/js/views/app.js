define(function (require) {
	'use strict';
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Vm = require('vm');
	var UserModel = require('model/user');
	var Router = require('router');
	
	var AppView = Backbone.View.extend({
		el: '.main',
		
		initialize: function (options) {
			this.user = new UserModel();
			if (typeof(user)!='undefined') this.user.set(user);
			this.kpi = "ACCESSIBILITY";
			
			//this.treshold = {
			//	"ACCESSIBILITY":{
			//		small:{low:0,high:70},
			//		middle:{low:70,high:80},
			//		big:{low:90,high:100}
			//	},
			//	"MDR":{
			//		small:{low:0,high:70},
			//		middle:{low:70,high:80},
			//		big:{low:90,high:100}
			//	},
			//	"LATENCY":{
			//		small:{low:0,high:70},
			//		middle:{low:70,high:80},
			//		big:{low:90,high:100}
			//	}
			//}
			
			this.treshold = {
				"ACCESSIBILITY":{
					red:{low:0,high:70},
					blue:{low:70,high:80},
					green:{low:90,high:100}
				},
				"MDR":{
					red:{low:0,high:100},
					blue:{low:100,high:600},
					green:{low:600,high:1000000}
				},
				"LATENCY":{
					red:{low:0,high:70},
					blue:{low:70,high:80},
					green:{low:90,high:100}
				}
			}
						
			this.title = {
				"OPERATOR": "Operator",
				"ACCESSIBILITY": "Accessibility (%)",
				"MDR": "MDR (Kbit/s)",
				"LATENCY": "Latency (ms)",
				"TS": "TS",
				"ad0": "Country",
				"ad1": "Region"
				
			}
		},
		
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
			require(['views/user-block'], function (Page) {
				Vm.create(appView, 'UserView', Page,{ appView: appView}, 'User')
					.render();
			});
		}
		
	
	});

	return AppView;
});
