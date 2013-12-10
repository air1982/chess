var log = require('../lib/log')(module);
var Mongoose = require('../lib/mongoose');
var DataModel = require('../models/data').Data;
var DataModel = require('../models/filter-list-item').Operator;
var oracle = require("oracle");
var connectData = { "hostname": "localhost", "user": "ASIMUS_DEVEL", "password": "ASIMUS_DEVEL123", "database": "XE"};
var async = require('async');
var moment = require('moment');
var curl = require("curlrequest");

log.info('router thief')

var tasks = [];

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
            var obj1 = JSON.parse(results);
            
            
            
            var obj = obj1.results[1];
            
            //consol.log(obj)
            log.info(obj.address_components.length)
            
            if (obj.address_components.length == 5) {
                console.log(obj.address_components[1].long_name);
                
                row['ad3'] = obj.address_components[1].long_name;
                row['ad2'] = obj.address_components[2].long_name;
                row['ad1'] = obj.address_components[3].long_name;
                row['ad0'] = obj.address_components[4].long_name;
            }
            else if (obj.address_components.length == 4) {
                console.log(obj.address_components[1].long_name);
                
                
                row['ad2'] = obj.address_components[1].long_name;
                row['ad1'] = obj.address_components[2].long_name;
                row['ad0'] = obj.address_components[3].long_name;
            }
            
            else if (obj.address_components.length == 3) {
                console.log(obj.address_components[0].long_name);
                console.log(obj.address_components[1].long_name);
                console.log(obj.address_components[2].long_name);
                
                row['ad2'] = obj.address_components[0].long_name;
                row['ad1'] = obj.address_components[1].long_name;
                row['ad0'] = obj.address_components[2].long_name;
            }
            
            
	}
	        
        catch (exception_var) {
            console.log(exception_var);
            log.error('exeption');
        }
        
        var data = new DataModel(row);
        data.save(function(err, row) {
            if (err) {log.error('Failed to save in Mongo: '+ err);return false;}
            //log.info(thisIndex+'-OK');
            //callback();
            return true;
        }); 
        
        
        
        if (tasks.length>0){
            setTimeout(iterator, 1500)
        }
        else log.info('end tasks');
    }); 
    
    

}

exports.get = function(req, res, next) {
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
            "SELECT /*rule*/ TS TS,k.FILIAL FILIAL,k.OPERATOR OPERATOR, k.OPERATOR_ID OPERATOR_ID, TO_CHAR(k.RXLEVEL, '999999990.99') RXLEVEL, k.nettype NETTYPE,TO_CHAR((1*(1-nvl(ACTFR,0)))*(1-nvl(ATTACHFR,0))*(100*(1-nvl(SAFR,0))),'999999990.99') ACCESSIBILITY,k.LAT LAT,k.LON LON, TO_CHAR(rtt,'999999990.99') LATENCY,case when tt > 0 then TO_CHAR(8*1000* vol_dl/tt, '999999990.99') else null end MDR, case when OPERATOR_ID=25001 then 1 when OPERATOR_ID=25099 then 2 when OPERATOR_ID=25002 then 3 else null end OPER_COLOR FROM VI_ASL_KPI k WHERE k.TS >= TO_DATE(TO_CHAR(TO_TIMESTAMP_TZ(substr('2013-10-01 00:00', 1, 16) ||' '||'+4:00','YYYY-MM-DD HH24:MI TZR')AT TIME ZONE 'UTC', 'yyyy-mm-dd hh24:mi:ss'),'yyyy-mm-dd hh24:mi:ss') and k.TS < TO_DATE(TO_CHAR(TO_TIMESTAMP_TZ(substr('2013-11-07 00:00', 1, 16) ||' '||'+4:00','YYYY-MM-DD HH24:MI TZR')AT TIME ZONE 'UTC', 'yyyy-mm-dd hh24:mi:ss'),'yyyy-mm-dd hh24:mi:ss') ORDER BY 1 asc",
            //"SELECT * FROM DEF_OPERATOR",
            [], function(err, results) {
                if ( err ) log.error('Failed to query table in Oracle: '+ err); 
                if(results) log.info("Fetch from table - ok");
                
                callback(err, connection, results)
            })
        },
        function(connection, results, callback){
            log.info('rows count - '+results.length);
            tasks = results;
            
            DataModel.find().remove();
            if (results.length>0) iterator();
                    
            connection.close();
            return true;
        }
    ], function (err, result) {
            res.render('thief', {status:'error'});    
        }
    );

    
    
};
