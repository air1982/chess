var log = require('../lib/log')(module);
var UserModel = require('../models/user').User;


exports.get = function(req, res, next) {
    UserModel.findOne({username: req.param('email')}).exec(function(err, user) {
        if (err) return next(err);
        
        if (user && user.checkPassword(req.param('password'))) {
            req.session.user = user.getPublicFields();
            
            log.info(req.session.user);
            
            
            
            res.json(user.getPublicFields());   
        }
        else {
            //res.json({error: 'not auth'});
            next();
        }
    })
};

exports.post = function(req, res, next) {
    user = new UserModel({
          username: req.param('email'),
          password: req.param('password')
    });
    user.save(function(err, user) {
        if (err) return next(err);
        var userObject = user.getPublicFields();
        req.session.user = userObject; 
        res.json(userObject);  
    });
};

exports.delete = function(req, res, next) {
    req.session.destroy();
    res.json({}); 
};