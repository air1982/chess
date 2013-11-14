module.exports = function(app) {
	
	app.get('/', require('./root').get);
	app.get('/filters', require('./filters').get);
	app.get('/data-chart', require('./data-chart').get);

};
