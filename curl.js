var log = require('./lib/log')(module);
var curl = require("curlrequest");
var http = require('http');

log.info('curl');
  

  
  
    
var options = { url: 'maps.googleapis.com/maps/api/geocode/json?latlng=-34.397,150.644&sensor=false&language=en'};

curl.request(options, function (err, results) {
    console.log(JSON.stringify(parts));
}); 
   

