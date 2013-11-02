
/*
 * GET home page.
 */

exports.index = function(req, res){
	//var mongoose = require('mongoose');
	//mongoose.connect('mongodb://localhost/test');


	//var Cat = mongoose.model('Cat', { name: String });

	//var kitty = new Cat({ name: 'Zildjian' });
	//kitty.save(function (err) {
  	//	if (err) // ...
  	//	console.log('meow');
	//});
	res.render('index', { title: 'Express' });
};
