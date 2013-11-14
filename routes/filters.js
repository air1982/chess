//var mongoose = require('mongoose');
//var db = mongoose.connect('mongodb://localhost/test'); 
//var DocumentModel = require('../models/model.js').Document(db);


exports.get = function(req, res){
	var collection = [
		{id: '{operator}',
		content:[
			{'ID': 25099, 'NAME': 'Beeline'},
			{'ID': 25001, 'NAME': 'MTS'},
			{'ID': 25002, 'NAME': 'Megafon'},
		]},
		{id: '{region}',
		content:[
			{'ID': 12, 'NAME': 'МОСКВА'},
			{'ID': 3, 'NAME': 'ПРИВОЛЖСКИЙ'},
			{'ID': 1, 'NAME': 'ЦЕНТРАЛЬНЫЙ'},
		
		]},
		
	];
  	
	
  	res.json(collection);

};
  

