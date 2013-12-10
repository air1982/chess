var Mongoose = require('../lib/mongoose'); 
var OperatorModel = require('../models/filter-list-item.js').Operator;
var log = require('../lib/log')(module);

exports.get = function(req, res){
	var filters=JSON.parse(req.param('filters'));
	
	var where = {}
	if (filters){
		console.log(filters);
		where = filters
		//query.where(filters);
	}
	var query = OperatorModel.find(where);
	query.select('-_id  -__v');
	query.exec(function(err, filterList) {
		if (err) return next(err);
		//log.info('rows count - '+filterList.length);
		
		var collection = [
			{id: 'OPERATOR', content: filterList},
		];
			
		res.json(collection);
		return true;
	})	
};
  

