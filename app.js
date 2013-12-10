var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config');
var log = require('./lib/log')(module);
var Mongoose = require('./lib/mongoose');
var MongoStore = require('connect-mongo')(express);

var app = express()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());
//app.use(express.logger( config.get('logger:format')));
//app.use(express.urlencoded());
//app.use(express.methodOverride());



app.use(require('./lib/resExtensions'));

app.use(express.cookieParser('your secret here'));
// sessionConfig for express & sock.js
var sessionConfig = {
  secret: config.get('session:secret'), // подпись для куков с сессией
  cookie: {
    path: "/",
    maxAge: config.get('session:maxAge'), // 4h max inactivity for session
    httpOnly: true // hide from attackers
  },
  key: "sid",
  store: new MongoStore({mongoose_connection: Mongoose.connection})
};

app.use(express.session(sessionConfig));

require('./routes')(app);
app.use(express.static(path.join(__dirname, 'public')));

http.createServer(app).listen(config.get('port'), function(){
  log.info('Express server listening on port ' + config.get('port'));
});
