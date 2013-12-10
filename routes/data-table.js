var Mongoose = require('../lib/mongoose');
var Model = require('../models/data').Data;
var log = require('../lib/log')(module);
var _ = require('underscore');

exports.get = function(req, res, next){
    require('../lib/db-exec')(req, res, next, 'table', function(summary){
	res.json(summary);
    })
};