require.config({
	paths: {
		// libraries
		backbone: 'lib/backbone',
		underscore: 'lib/underscore',
		json2: 'lib/json2',
		// Require.js plugins
		text: 'lib/requirejs/text',
		tpl: 'lib/requirejs/tpl',
		async: 'lib/requirejs/async',
		i18n: 'lib/requirejs/i18n',
		// Templates
		templates: '../templates'
	},
	
	shim: {
		backbone: {
			deps: ['underscore', 'json2'],
			exports: 'Backbone'
		},

		underscore: {
			exports: '_'
		},
	}
});

define('main', [
	'views/app',
	'router',
	'vm',
	'backbone'
], function (AppView, Router, Vm, Backbone) {
	'use strict';
	//Backbone.emulateJSON = true;
	var appView = Vm.create({}, 'AppView', AppView);
	appView.render();
	Router.initialize({appView: appView});

	return appView;
});

require(['main']);
