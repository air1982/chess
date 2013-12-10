module.exports = function(app) {
    app.get('/', require('./root').get);
    //filters
    app.get('/filters', require('./filters').get);
    //data
    app.get('/data', require('./data').get);
    app.get('/data/map', require('./data-map').get);
    app.get('/data/table', require('./data-table').get);
    
    //User
    app.get('/user', require('./user').get);
    app.post('/user', require('./user').post);
    app.delete('/user', require('./user').delete);
    
    //app.get('/thief', require('./thief').get);
    //app.get('/curl', require('./curl').get)
};

