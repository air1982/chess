var mongoose = require('mongoose');

var schema = mongoose.Schema({
    whitePosition: Array,
    blackPosition: Array
})

mongoose.model('Document', schema);

exports.Document = function(db) {
  return db.model('Document');
};