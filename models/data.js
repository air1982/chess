var mongoose = require('../lib/mongoose'),
  Schema = mongoose.Schema;

var schema = new Schema({
  TS: {type: Date},
  COUNTRY: {type: String},
  REGION: {type: String},
  OPERATOR: {type: String},
  OPERATOR_ID: {type: Number},
  OPER_COLOR: {type: Number},
  RXLEVEL: {type: Number},
  NETTYPE: {type: String},
  IMEI: {type: Number},
  IMSI: {type: Number},
  LAT: {type: Number},
  LON: {type: Number},
  ACCESSIBILITY: {type: Number},
  MDR: {type: Number},
  LATENCY: {type: Number},
  N: {type: Number},
  ad0: {type: String},
  ad1: {type: String},
  ad2: {type: String},
  ad3: {type: String},
  ad4: {type: String}
});


exports.Data = mongoose.model('Data', schema);