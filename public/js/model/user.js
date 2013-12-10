define(function (require) {
    'use strict';
		var Backbone = require('backbone');

    var Model = Backbone.Model.extend({

    //defaults: {
    //id: false
    //},

				url: function(){
            return 'user?email=' + this.get('email') + '&password=' + this.get('password');
				}
		
    });


    return Model;
});