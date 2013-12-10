//var oracle = require("oracle");
//var connectData = { "hostname": "82.165.195.106", "user": "ASIMUS_DEVEL", "password": "ASIMUS_DEVEL123", "database": "XE" };


exports.get = function(req, res, next) {
  
  //oracle.connect(connectData, function(err, connection) {
  //  if(err){ console.log("Connect err:" + err); }
  //  if(connection){ console.log("Connection:" + connection); }
  //  
  //  
  //  connection.execute("SELECT * FROM AS_LAC", [], function(err, results) {
  //    if ( err ) {console.log('Failed to query table in Oracle: '+ err);} 
  //      console.log(results);
  //      connection.close();
  //  })
  //});

  console.log('root');
  
  require('../lib/loadUser')(req, res, function(){
    
    console.log(req.user);
    
    res.render('index', {user: req.user});})
};
