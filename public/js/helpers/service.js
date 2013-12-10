define(function (require) {
    'use strict';
	
    var helpers = {
	popupOffset: function ($elem, coordinate, offset) {
            var top	= coordinate.top ? coordinate.top : 0;
	    var left = coordinate.left ? coordinate.left : 0;
		
	    var height	= $elem.height();
	    var width = $elem.width();
	    var offsetTop = offset.top ? offset.top : 0;
	    var offsetLeft= offset.left ? offset.left : 0;
		
	    var pageX = top+offsetTop;
	    var pageY = left+offsetLeft;
		
	    if (pageY+width>=document.body.clientWidth) {
		pageY = document.body.clientWidth - width - 40;
	    }
		
	    $elem.offset({top:pageX, left: pageY});
		
	    return true;
	
	},
        
        delayHide: function ($elem, tuning) {
            var flag = true;
	    $elem.mouseenter(function(){
		flag=true;
	    });
	    $elem.mouseleave(function(){
		flag=false;
		function hideFilter(){
                    if (flag) return false;
		    if (tuning){
			if (tuning.removeClass) $elem.removeClass(tuning.removeClass);
			else if (tuning.popover) $elem.popover(tuning.popover);
		    }
		    else $elem.hide();
		    
		    $elem.off('mouseleave');
                    return true;
		}
		setTimeout(hideFilter, 1000);
	    })
	
	},
	
	getChartOptions: function(chart,views_type,parent_report_code){
	    var chart_options = {
		chart: {
		    renderTo: chart[0],
			type: views_type,
			zoomType: 'xy'
		    },
		    credits: {
			enabled: false
		    },
		    title: {
			text: parent_report_code,
			style: {
			    font: '13px normal Arial'
			},
			margin: 25
		    },
		    tooltip: {
			formatter: function() {
			    if (views_type=='pie'){return '<b>'+ this.point.name +':</b> '+ this.y;}
			    else {return '<b>'+ this.series.name.split('$')[0] +'</b><br/>' + this.x +': '+ this.y;}
			}
		    },
		    legend: {
			align: "left",
        		itemStyle: {
			    font: '10px normal Verdana'                
           		},
			borderWidth: 0,
			verticalAlign: 'top',
			x: 30,
			y: 10,
			floating: true,
			labelFormatter: function() {
			    return this.name.split('$')[0];
			}
		    },
		    //exporting: {
			//enabled: true
		    //}
		}
		return chart_options
	}
    }


    return helpers;
});