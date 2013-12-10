var log = require('../lib/log')(module);

exports.get = function(req, res, next) {
  log.info('root');
  
  require('../lib/load-user')(req, res, function(){
    res.render('index', {user: req.user});
  })
};
