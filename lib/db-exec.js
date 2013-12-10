var log = require('../lib/log')(module);
var Model = require('../models/data').Data;
var _ = require('underscore');
var config = require('nconf');

module.exports = function(req, res, next, type, callback) {
  var filters=JSON.parse(req.param('filters'));
  var group = config.get('views')[type]['group'];
  var project = config.get('views')[type]['project'];
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
		match['LAT'] = {"$gte": value.lat-2, "$lte": value.lat+2};
                match['LON'] = {"$gte": value.lng-2, "$lte": value.lng+2};
		break;
            case 'IMEI':
		//log.info = parseInt(value);
                match['IMEI'] = parseInt(value);
                break;  
	}
  })
    
  //console.log(match);
  
  Model.aggregate(  
        {$match : match},
        {$group: group},
        {$project: project},
        
        function(err, summary) {
            if (err) next(err)
            callback(summary);
        }
  );

};