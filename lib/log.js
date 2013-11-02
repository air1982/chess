var winston = require('winston');
var config = require('../config');


//var ENV = process.env.NODE_ENV;
var ENV = config.get('env');

// can be much more flexible than that O_o
function getLogger(module) {

  var path = module.filename.split('/').slice(-2).join('/');

  return new winston.Logger({
    transports: [
      new winston.transports.Console({
        colorize: true,
        level: ENV == 'development' ? 'debug' : 'error',
        label: path
      })
    ]
  });
}

module.exports = getLogger;
