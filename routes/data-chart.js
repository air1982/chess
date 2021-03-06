var log = require('../lib/log')(module);

exports.get = function(req, res, next){
    var mess=JSON.parse(req.param('filters'));
    //log.info(req.param);
    var model = { 
    
    "xAxis":["2013-10-01","2013-10-02","2013-10-03","2013-10-04","2013-10-08",
	     "2013-10-10","2013-10-11","2013-10-12","2013-10-13","2013-10-14",
	     "2013-10-15","2013-10-16","2013-10-17","2013-10-18","2013-10-19",
	     "2013-10-20","2013-10-21","2013-10-24","2013-10-25","2013-10-26",
	     "2013-10-28","2013-10-29","2013-10-30","2013-11-05"],
    "series":[{"name":"Beeline","color":"#FFFF00",
	      "data":[{"x":0,"y":97.73},{"x":1,"y":98.49},{"x":2,"y":100},
		      {"x":5,"y":100},{"x":6,"y":100},{"x":7,"y":100},{"x":8,"y":100},
		      {"x":9,"y":100},{"x":10,"y":100},{"x":11,"y":93.33},
		      {"x":12,"y":98.22},{"x":13,"y":93.66},{"x":14,"y":97.57},
		      {"x":15,"y":100},{"x":17,"y":100},{"x":18,"y":93.62},
		      {"x":20,"y":97.67},{"x":21,"y":98.71},{"x":22,"y":100}]},
	      {"name":"MTS","color":"#FF0000",
	      "data":[{"x":0,"y":100},{"x":18,"y":97.37},{"x":19,"y":94.33}]},
	      {"name":"Utel","data":[{"x":0,"y":100},{"x":12,"y":100},{"x":13,"y":100}]},
	      {"name":"T-Mobile(DE)","data":[{"x":1,"y":100},{"x":2,"y":100},
					     {"x":3,"y":100},{"x":4,"y":100},
					     {"x":5,"y":100},{"x":16,"y":100},
					     {"x":23,"y":100}]}
	      ]
    }
    
    //    var query = Model.find({}); 
//    _.each(filters, function(value, index){
//	switch (index) {
//	    case 'todate':
//		query.where('TS').lte(value );
//		break;
//	    
//	    case 'fromdate':
//		query.where('TS').gte(value);
//		break;
//	    
//	    case 'OPERATOR':
//		query.where('OPERATOR_ID').equals(value);
//		break;
//	    case 'location':
//		query.where('LONGITUDE').gte(value.lng-2).lte(value.lng+2);
//		query.where('LATITUDE').gte(value.lat-2).lte(value.lat+2);
//		break;
//	}
//    })
    
    //query.select('-_id  -__v');
    
    log.info(mess['{fromdate}'])
    	
    res.json(model);
};