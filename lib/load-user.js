var log = require('../lib/log')(module);
var User = require('../models/user').User;

module.exports = function(req, res, next) {
  log.info(req.session.user);
  if (typeof(req.session.user)=='undefined' || !req.session.user.id) return next();
  
  User.findById(req.session.user.id).exec(function(err, user) {
    if (err) return next(err);
    req.user = user.getPublicFields();
    next();
  });

};