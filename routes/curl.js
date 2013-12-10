var log = require('../lib/log')(module);
var curl = require("curlrequest");

exports.get = function(req, res, next) {

    log.info('curl');
      
    var options = { url: 'maps.googleapis.com/maps/api/geocode/json?latlng=56.321914,38.137527&sensor=false&language=en'};
    
    curl.request(options, function (err, results) {
	
	console.log(JSON.parse(results).results[1].address_components[1].long_name);
	console.log(JSON.parse(results).results[1].address_components[2].long_name);
	console.log(JSON.parse(results).results[1].address_components[3].long_name);
	console.log(JSON.parse(results).results[1].address_components[4].long_name);
	//console.log(JSON.parse(results).results[1].formatted_address);
	//console.log(JSON.parse(results).results[2].formatted_address);
	
	//console.log(JSON.parse(results).results[1]);
	
	//console.log(JSON.parse(results).results[1]);
    }); 
   
}