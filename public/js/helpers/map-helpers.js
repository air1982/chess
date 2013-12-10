define(function (require) {
    'use strict';
    
    var _ = require('underscore');
	
    var helpers = {
//	icon: function (item, kpi, treshold) {
//            var color = 'grey';
//	    var size = 'small';
//	    if (item.get("OPER_COLOR") == 1) color = 'red';
//	    if (item.get("OPER_COLOR") == 2) color = 'blue';
//	    if (item.get("OPER_COLOR") == 3) color = 'green';
//	    if (_.has(treshold, kpi) && item.get(kpi)) {
//		var tresh = treshold[kpi];
//		var value = item.get(kpi);
//		if (value<=tresh.small.high) size = 'small';
//		if (value>tresh.middle.low && value<=tresh.middle.high) size = 'mid';
//		if (value>tresh.big.low) size = 'big';
//	    }
//	    	    
//	    return '/img/markers/'+color+'_'+size+'.png';
//	
//	}

	icon: function (item, kpi, treshold) {
            var color = 'grey';
	    var size = 'mid';
	    if (_.has(treshold, kpi) && item.get(kpi)) {
		var tresh = treshold[kpi];
		var value = item.get(kpi);
		if (value<=tresh.red.high) color = 'red';
		if (value>tresh.blue.low && value<=tresh.blue.high) color = 'blue';
		if (value>tresh.green.low) color = 'green';
	    }
	    	    
	    return '/img/markers/'+color+'_'+size+'.png';
	
	}
        
    }


    return helpers;
});