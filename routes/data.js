var Mongoose = require('../lib/mongoose');
var Model = require('../models/data').Data;
var log = require('../lib/log')(module);
var _ = require('underscore');

exports.get = function(req, res, next){
    var filters=JSON.parse(req.param('filters'));
    var match = {};
    _.each(filters, function(value, index){
	switch (index) {
	    case 'todate':
		if (!_.has(match, 'TS')) match['TS'] = {};
		match['TS']["$lt"] = new Date(value);
		break;
	    
	    case 'fromdate':
		if (!_.has(match, 'TS')) match['TS'] = {};
		match['TS']["$gte"] = new Date(value);
		break;
	    
	    case 'OPERATOR':
		if (parseInt(value)) match['OPERATOR_ID'] = parseInt(value);
		break;
	    case 'location':
		match['LONGITUDE'] = {"$gte": value.lng-2, "$lte": value.lng-2};
		match['LATITUDE'] = {"$gte": value.lat-2, "$lte": value.lat-2};
		break;
	}
    })

    Model.aggregate(  
	{ $match : match},
	{ $group:{
	    _id: {OPERATOR_ID: "$OPERATOR_ID", OPERATOR: "$OPERATOR", COUNTRY: "$COUNTRY", FILIAL: "$FILIAL"},
	    long: { $avg : "$LONGITUDE" },
	    lat: { $avg : "$LATITUDE" },	    
	    
	}},
	{ $project:{
	    _id: 0,
            "OPERATOR_ID": "$_id.OPERATOR_ID",
	    "OPERATOR": "$_id.OPERATOR",
	    "COUNTRY": "$_id.COUNTRY",
	    "FILIAL": "$_id.FILIAL",
	    "LONGTITUDE": "$long",
	    "LATITUDE": "$lat"
        }},
	function(err, summary) {
	    if (err) next(err)
	    res.json(summary);
	}
    );

};