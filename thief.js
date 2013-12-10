var log = require('./lib/log')(module);
var Mongoose = require('./lib/mongoose');
//var DataModel = require('./models/data').Data;
var DataModel = require('./models/filter-list-item').Operator;
var oracle = require("oracle");
var connectData = { "hostname": "localhost", "user": "ASIMUS_DEVEL", "password": "ASIMUS_DEVEL123", "database": "XE"};
var async = require('async');
var moment = require('moment');
var curl = require("curlrequest");
var _ = require('underscore');

log.info('router thief')

var tasks = [];
var fromdate = '2013-10-12 00:00'
var todate = '2013-10-16 00:00'

function adValue(value) {
    if (value/value) {
        return null
    }
    return value
}


function iterator() {
    log.info(tasks.length);
    var row = tasks.shift();
    geocode(row);    
}

function geocode(row) {
    var lat = row['LAT'];
    var long = row['LON'];
    
    var options = { url: 'maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&sensor=false&language=en'};
    
    curl.request(options, function (err, results) {
        try {
            var obj = JSON.parse(results).results[1];
            
            //log.info(obj.address_components.length);
            
            _.each(obj.address_components, function(value, index){
                console.log(value)
                
                if (_.indexOf(value.types, 'locality') !=-1 ){
                    row['ad4'] = adValue(value.long_name);
                    console.log(row['ad4'])
                }
                else if (_.indexOf(value.types, 'administrative_area_level_3') !=-1 ){
                    row['ad3'] = adValue(value.long_name);
                    console.log(row['ad3'])
                }
                else if (_.indexOf(value.types, 'administrative_area_level_2') !=-1 ){
                    row['ad2'] = adValue(value.long_name);
                    console.log(row['ad2'])
                }
                else if (_.indexOf(value.types, 'administrative_area_level_1') !=-1 ){
                    row['ad1'] = adValue(value.long_name);
                    console.log(row['ad1'])
                }
                else if (_.indexOf(value.types, 'country') !=-1 ){
                    row['ad0'] = adValue(value.long_name);
                    console.log(row['ad0'])
                }
                
                //if (!_.has(row, 'ad0') && _.has(row, 'COUNTRY')) row['ad0'] = row['COUNTRY'];
                //if (!_.has(row, 'ad1') && _.has(row, 'REGION') && row['REGION'] != 'other') row['ad1'] = row['REGION'];
            })
            
	}
	catch (exception_var) {
            console.log(exception_var);
            log.error('exeption');
        }
        
        var row1 = {id: row['OPERATOR_ID'], name: row['OPERATOR'], country_id: row['COUNTRY_ID']}
        
        var data = new DataModel(row1);
        data.save(function(err, model) {
            if (err) {log.error('Failed to save in Mongo: '+ err);return false;}
            return true;
        }); 
        
        if (tasks.length>0){
            setTimeout(iterator, 1500)
        }
        else log.info('end tasks');
    }); 
    
    

}


async.waterfall([
        function(callback){
            oracle.connect(connectData, function(err, connection) {
                if(err) log.error("Connect err:" + err); 
                if(connection) log.info("Connection to DB - ok"); 
                callback(err, connection)
            })
        },
        function(connection, callback){
            connection.execute(
            //"SELECT /*rule*/ TS TS,k.COUNTRY COUNTRY,k.REGION REGION,k.OPERATOR OPERATOR, k.OPERATOR_ID OPERATOR_ID, k.IMEI IMEI, k.IMSI IMSI, TO_CHAR(k.RXLEVEL, '999999990.99') RXLEVEL, k.nettype NETTYPE,TO_CHAR((1*(1-nvl(ACTFR,0)))*(1-nvl(ATTACHFR,0))*(100*(1-nvl(SAFR,0))),'999999990.99') ACCESSIBILITY,k.LAT LAT,k.LON LON, TO_CHAR(rtt,'999999990.99') LATENCY,case when tt > 0 then TO_CHAR(8*1000* vol_dl/tt, '999999990.99') else null end MDR, case when OPERATOR_ID=25001 then 1 when OPERATOR_ID=25099 then 2 when OPERATOR_ID=25002 then 3 else null end OPER_COLOR FROM VI_ASL_KPI k WHERE k.TS >= TO_DATE(TO_CHAR(TO_TIMESTAMP_TZ(substr('"+fromdate+"', 1, 16) ||' '||'+4:00','YYYY-MM-DD HH24:MI TZR')AT TIME ZONE 'UTC', 'yyyy-mm-dd hh24:mi:ss'),'yyyy-mm-dd hh24:mi:ss') and k.TS < TO_DATE(TO_CHAR(TO_TIMESTAMP_TZ(substr('"+todate+"', 1, 16) ||' '||'+4:00','YYYY-MM-DD HH24:MI TZR')AT TIME ZONE 'UTC', 'yyyy-mm-dd hh24:mi:ss'),'yyyy-mm-dd hh24:mi:ss') ORDER BY 1 asc",
            "SELECT * FROM DEF_OPERATOR",
            [], function(err, results) {
                if ( err ) log.error('Failed to query table in Oracle: '+ err); 
                if(results) log.info("Fetch from table - ok");
                
                callback(err, connection, results)
            })
        },
        function(connection, results, callback){
            connection.close();
            log.info('rows count - '+results.length);
            tasks = results;
            
            DataModel.find().remove()
            if (results.length>0) iterator();
                    
            return true;
        }
    ], function (err, result) {
            log.error('error');    
        }
);

    
    
