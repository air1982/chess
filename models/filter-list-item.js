var mongoose = require('../lib/mongoose'),
Schema = mongoose.Schema;


//var countrySchema = new Schema({
//  'id': {type: Number},
//  'name': {type: String},
//  
//});
//
//var filfialSchema = new Schema({
//  'id': {type: Number},
//  'name': {type: String},
//});
//
//var operatorSchema = new Schema({
//  'id': {type: Number},
//  'name': {type: String},
//});

var schema = new Schema({
  'id': {type: Number, unique: true, required: true},
  'name': {type: String, required: true},
  'country': {type: String, default:null},
  'country_id': {type: Number, default:null},
});

schema.methods.getPublicFields = function() {
  return {
    ID: this.id,
    NAME: this.name,
  };
};


exports.Country = mongoose.model('country_list', schema);
exports.Filial = mongoose.model('filial_list', schema);
exports.Operator = mongoose.model('operator_list', schema);
