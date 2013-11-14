define(function (require) {
    'use strict';
    var Backbone = require('backbone');

    var Model = Backbone.Model.extend({
	url: 'figures/save'
    });


    return Model;
});