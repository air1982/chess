define([
	'underscore',
	'backbone',
	'events'
], function(_, Backbone, Events) {
	'use strict';
	var views = {};
	
	var create = function (context, name, View, options, viewName) {
		
		var oldView = views[name];
		if(oldView !== undefined)
		{
			if(oldView.viewName !== undefined && oldView.viewName == viewName) {
				if(typeof oldView.view.update === 'function'){
					oldView.view.update(options);
				}	
				return { view: oldView.view, render: function() {} };
			}
		}		
		
		close(context, name);
				
		var newView = { view: new View(options), viewName : viewName };
		views[name] = newView;
		
		if(context.children === undefined)
			context.children = {};
		  
		context.children[name] = newView;
		
		return newView.view;
	};
	
	var close = function (context, name) {		
		
		var oldView = views[name];
		if(oldView === undefined)
			return;
		oldView = oldView.view;
				
		oldView.undelegateEvents();
		if(oldView.model !== undefined)
			oldView.model.off(null, null, oldView);
		if(typeof oldView.clean === 'function')
			oldView.clean();
		if(oldView.children !== undefined)
			_.each(oldView.children, function(subView, name) {
				close(oldView, name);
			});
		
		if(context.children !== undefined)
			context.children[name] = undefined;
		
		views[name] = undefined;
	};

	return {
		create: create,
		close: close,
	};
});