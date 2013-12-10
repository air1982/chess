var http = require('http');
var path = require('path');
var config = require('./config');
var log = require('./lib/log')(module);
var Mongoose = require('./lib/mongoose');
var DataModel = require('./models/data').User;
var oracle = require("oracle");
var connectData = { "hostname": "localhost", "user": "ASIMUS_DEVEL", "password": "ASIMUS_DEVEL123", "database": "XE" };

var app = express();
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());


oracle.connect(connectData, function(err, connection) {
    if(err){ log.error("Connect err:" + err); }
    if(connection){ log.info("Connection:" + connection); }
        
    connection.execute(
    "SELECT /*rule*/ TO_CHAR(MAX(TS),'yyyy-mm-dd hh24:mi:ss') TS,k.COUNTRY COUNTRY,k.FILIAL FILIAL,k.OPERATOR OPERATOR, TO_CHAR(AVG(k.RXLEVEL), '999999990.99') RXLEVEL,maxdistr(k.nettype) NETTYPE,TO_CHAR((1*(1-nvl(AVG(ACTFR),0)))*(1-nvl(AVG(ATTACHFR),0))*(100*(1-nvl(AVG(SAFR),0))),'999999990.99') ACCESSIBILITY,ROUND(AVG(k.LAT),4) LATITUDE,ROUND(AVG(k.LON),4) LONGITUDE, TO_CHAR(avg(rtt),'999999990.99') LATENCY,case when sum(tt) > 0 then TO_CHAR(8*1000* sum(vol_dl)/sum(tt), '999999990.99') else null end MDR, COUNT(1) N, case when OPERATOR_ID=25001 then 1 when OPERATOR_ID=25099 then 2 when OPERATOR_ID=25002 then 3 else null end OPER_COLOR FROM VI_ASL_KPI k WHERE k.TS >= TO_DATE(TO_CHAR(TO_TIMESTAMP_TZ(substr('2013-08-01 00:00', 1, 16) ||' '||'+4:00','YYYY-MM-DD HH24:MI TZR')AT TIME ZONE 'UTC', 'yyyy-mm-dd hh24:mi:ss'),'yyyy-mm-dd hh24:mi:ss') and k.TS < TO_DATE(TO_CHAR(TO_TIMESTAMP_TZ(substr('2013-11-06 00:00', 1, 16) ||' '||'+4:00','YYYY-MM-DD HH24:MI TZR')AT TIME ZONE 'UTC', 'yyyy-mm-dd hh24:mi:ss'),'yyyy-mm-dd hh24:mi:ss') GROUP BY k.COUNTRY,k.FILIAL,k.OPERATOR,k.OPERATOR_ID ORDER BY 1 asc",
    [], function(err, results) {
      if ( err ) {log.error('Failed to query table in Oracle: '+ err);} 
        log.info('rows count - '+results.length);
        
        DataModel.find().remove();
        
        //for (var index in results){
            //var row = new DataModel(results[index]);
            //save(row, index);
        //}
        
        connection.close();
        return true;
    })
    
    function save(row, index){
      var thisIndex = index;
      row.save(function(err, row, index1) {
              if (err) {log.error('Failed to save in Mongo: '+ err);return false;}
              log.info(thisIndex+'-OK');
              return true;
      }); 
    }
    
    return true;
});
