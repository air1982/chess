define(function (require) {
	'use strict';
	var Backbone = require('backbone');
	var AppRouter = Backbone.Router.extend({
		routes: {
			// Pages
			//'profile': 'profile',
			//'my-objects': 'myObjects',
			//'map': 'map',
			'*actions': 'default'
			
		}
	});

	var router = new AppRouter();

	function initialize(options) {
		var appView = options.appView;

		router.latestRoute = null;
		router.latestFragment = null;

		// Запоминаем последнюю открытую страницу.
		router.on('all', function () {
			router.latestFragment = document.location.href.replace(/^.*#/, '#');
		});

		router.on('route:default', function () {
			console.log('route:default');
			//appView.render();
		});
		
				
		Backbone.history.start();// TODO: need to support new HTML History API & test {pushState : true} param
		//var ffffffffff={};
		
	
	}

	
	
	
	return {
		initialize: initialize,
		router: router
	};
});
