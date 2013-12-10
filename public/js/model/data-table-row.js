define(function (require) {
    'use strict';
		var Backbone = require('backbone');
    var _ = require('underscore');

    var Model = Backbone.Model.extend({

        //defaults: {
        //id: false
        //},

				parser: function(response, options, callback){
            var that = this;
            var obj  = {};
            
            _.each(response, function(value, index){
                if (value==0) value = "";
                obj[index] = value;
            })
            
            return obj
        }
		
    });


    return Model;
});