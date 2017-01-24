angular
.module('MetronicApp')
.controller('DashboardController', function($rootScope, $scope, $timeout, $cookies, $interval,
		DashboardService) {
	$scope.changeService = fnChangeService;
	$scope.clickRefreshEvent = fnRefreshEvent;
	$scope.changeRefreshTime = fnRefreshTime;
	$scope.modelRefreshTime = 2;
	$scope.vRefreshStop;
	$scope.changeArea = fnChangeArea;
	$scope.changeArea1 = fnChangeArea1;
	$scope.changeArea2 = fnChangeArea2;
	
	(function initController() {
//		fnHighchart22();
		fnGetServiceList();
		fnHighchartBG();
		fnRefreshTime($scope.modelRefreshTime);
		fnGetAreaList();
		fnHighchart13();
    })();
	function fnRefreshTime(time){
		console.log(time);
		if(time>0){
			console.log(time);
			if ( angular.isDefined($scope.vRefreshStop) ){
				$interval.cancel($scope.vRefreshStop);
				$scope.vRefreshStop = undefined;
			}
			$scope.vRefreshStop = $interval(function() {
				fnGetLastEventId();
				console.log('start-refresh');
			}, time*1000);
		}else{
			console.log(time);
			if (angular.isDefined($scope.vRefreshStop)) {
				console.log('stop-refresh');
				$interval.cancel($scope.vRefreshStop);
				$scope.vRefreshStop = undefined;				
			}
		}
	}
	function fnRefreshEvent(event){
//		console.log(event);
		$scope.switchsetting=!$scope.switchsetting;
		if($scope.switchsetting == true){
			if (angular.isDefined($scope.clickStopCheckRam)) return;
//			console.log('refresh');
//			fnGetCheckRamInfo();	
//			fnGetShiftWorkRamInfo();
		} else{
//			console.log('stop');
			if (angular.isDefined($scope.clickStopCheckRam)) {
	            $interval.cancel($scope.clickStopCheckRam);
	            $interval.cancel($scope.clickStopShiftworkRam);
	            $scope.clickStopCheckRam = undefined;
//	            $scope.clickStopShiftworkRam = undefined;
	          }
		}
	}
	function fnGetServiceList(){
		var reqData = {};
    	reqData.session_id = $cookies.get('session');
    	reqData.param = 1234;
    	DashboardService.kpigetservicelist(reqData, function (respData) {
    		if (respData.code == 200) {
    			$scope.optionService = respData.service_list;
    			$scope.modelServiceSelected = $scope.optionService[0];
    			fnChangeService($scope.modelServiceSelected, 0);
				console.log(respData);
    		}else if(respData.code == 700){
//    			$rootScope.user_lockscreen();
    		}
    	});
	}
	function fnGetAreaList(){
		var reqData = {};
		reqData.session_id = $cookies.get('session');
		reqData.parent_id = 0;
		DashboardService.arealistsubarea(reqData, function (respData) {
			if (respData.code == 200) {
				$scope.optionArea = respData.subarea_list;
				$scope.modelAreaSelected = $scope.optionArea[0];
				fnChangeArea($scope.modelAreaSelected, 0);
				console.log(respData);
				fnGetArea1List($scope.modelAreaSelected.area_id);
			}else if(respData.code == 700){
//    			$rootScope.user_lockscreen();
			}
		});
	}
	function fnGetArea1List(parent_id){
		var reqData = {};
		reqData.session_id = $cookies.get('session');
		reqData.parent_id = parent_id;
		DashboardService.arealistsubarea(reqData, function (respData) {
			if (respData.code == 200) {
				$scope.optionArea1 = respData.subarea_list;
				$scope.modelAreaSelected1 = $scope.optionArea1[0];
//				fnChangeArea($scope.modelAreaSelected, 0);
				console.log(respData);
				fnGetArea2List($scope.modelAreaSelected1.area_id)
			}else if(respData.code == 700){
//    			$rootScope.user_lockscreen();
			}
		});
	}
	function fnGetArea2List(parent_id){
		var reqData = {};
		reqData.session_id = $cookies.get('session');
		reqData.parent_id = parent_id;
		DashboardService.arealistsubarea(reqData, function (respData) {
			if (respData.code == 200) {
				$scope.optionArea2 = respData.subarea_list;
				$scope.modelAreaSelected2 = $scope.optionArea2[0];
//				fnChangeArea($scope.modelAreaSelected, 0);
				console.log(respData);
			}else if(respData.code == 700){
//    			$rootScope.user_lockscreen();
			}
		});
	}
	function fnChangeService(service, area_id){
		fnGetKPI(service.id, area_id);
		fnGetLastWeek(service.id, area_id);
	}
	function fnChangeArea(area){
		fnGetArea1List(area.area_id);
	};
	function fnChangeArea1(area){
		fnGetArea2List(area.area_id);
	};
	function fnChangeArea2(area){
		
	};
	function fnGetKPI(service_id, area_id){
		var reqData = {};
		reqData.session_id = $cookies.get('session');
		reqData.service_id = service_id;
		reqData.area_id = area_id;
		DashboardService.kpitest(reqData, function (respData) {
			console.log(respData);
			if (respData.code == 200) {
				fnHighchart11(respData.value);
				$scope.modelKPICounter = respData.counter;
			}else if(respData.code == 700){
//    			$rootScope.user_lockscreen();
			}
		});
	}
	function fnGetLastWeek(service_id, area_id){
		var reqData = {};
    	reqData.session_id = $cookies.get('session');
    	reqData.service_id = service_id;
		reqData.area_id = area_id;
    	DashboardService.kpilastweekkpi(reqData, function (respData) {
    		console.log(respData);
    		if (respData.code == 200) {
    			var arrData = [];
    			var arrData1 = [];
    			var arrData2 = [];
    			//[Date.UTC(2016, 8, 28), 4],
    			for(var i=0; i<respData.week_value.length; i++){
    				var arr = [];
    				arr.push(Date.UTC(respData.week_value[i].year, (respData.week_value[i].month-1), respData.week_value[i].day));
    				arr.push(respData.week_value[i].value);
    				arrData.push(arr);
    			}
    			//-- star --
    			var obj1 = {}, obj2={}, obj3={}, obj4={}, obj5 = {};
    			obj1.name = '1'; obj1.y = respData.star_1; 
    			obj2.name = '2'; obj2.y = respData.star_2; 
    			obj3.name = '3'; obj3.y = respData.star_3; 
    			obj4.name = '4'; obj4.y = respData.star_4; 
    			obj5.name = '5'; obj5.y = respData.star_5; 
    			
    			arrData2.push(obj1);
    			arrData2.push(obj2);
    			arrData2.push(obj3);
    			arrData2.push(obj4);
    			arrData2.push(obj5);
    			
    			arrData1.push(respData.star_1);
    			arrData1.push(respData.star_2);
    			arrData1.push(respData.star_3);
    			arrData1.push(respData.star_4);
    			arrData1.push(respData.star_5);
				fnHighchart12(arrData);
				fnHighchart21(arrData2);
    		}else if(respData.code == 700){
//    			$rootScope.user_lockscreen();
    		}
    	});
	}
	function fnGetLastEventId(){
		var reqData = {};
		DashboardService.eventgetlasteventid(reqData, function (respData) {
//			console.log(respData);
    		if (respData.code == 200) {    			
//				fnHighchart12(arrData);
				fnReadNewEvent(respData.last_event_id - 5, $scope.modelServiceSelected.id);
    		}else if(respData.code == 700){
//    			$rootScope.user_lockscreen();
    		}
    	});
	}
	function fnReadNewEvent(based_event_id, service_id){
		var reqData = {};
		reqData.based_event_id = based_event_id;
		reqData.service_id = service_id;
		DashboardService.eventreadnewevents(reqData, function (respData) {
			console.log(respData);
    		if (respData.code == 200) {    			
				$scope.modelEventList = respData.event_list;
//				fnHighchart12(arrData);
    		}else if(respData.code == 700){
//    			$rootScope.user_lockscreen();
    		}
    	});
	}
	function fnHighchart13(){
		if (typeof(AmCharts) === 'undefined' || $('#dashboard_amchart_1').size() === 0) {
            return;
        }

        var chartData = [{
            "date": "2012-01-05",
            "distance": 480,
            "townName": "Miami",
            "townName2": "Miami",
            "townSize": 10,
            "latitude": 25.83,
            "duration": 501
        }, {
            "date": "2012-01-06",
            "distance": 386,
            "townName": "Tallahassee",
            "townSize": 7,
            "latitude": 30.46,
            "duration": 443
        }, {
            "date": "2012-01-07",
            "distance": 348,
            "townName": "New Orleans",
            "townSize": 10,
            "latitude": 29.94,
            "duration": 405
        }, {
            "date": "2012-01-08",
            "distance": 238,
            "townName": "Houston",
            "townName2": "Houston",
            "townSize": 16,
            "latitude": 29.76,
            "duration": 309
        }, {
            "date": "2012-01-09",
            "distance": 218,
            "townName": "Dalas",
            "townSize": 17,
            "latitude": 32.8,
            "duration": 287
        }, {
            "date": "2012-01-10",
            "distance": 349,
            "townName": "Oklahoma City",
            "townSize": 11,
            "latitude": 35.49,
            "duration": 485
        }, {
            "date": "2012-01-11",
            "distance": 603,
            "townName": "Kansas City",
            "townSize": 10,
            "latitude": 39.1,
            "duration": 890
        }, {
            "date": "2012-01-12",
            "distance": 534,
            "townName": "Denver",
            "townName2": "Denver",
            "townSize": 18,
            "latitude": 39.74,
            "duration": 810
        }, {
            "date": "2012-01-13",
            "townName": "Salt Lake City",
            "townSize": 12,
            "distance": 425,
            "duration": 670,
            "latitude": 40.75,
            "alpha": 0.4
        }, {
            "date": "2012-01-14",
            "latitude": 36.1,
            "duration": 470,
            "townName": "Las Vegas",
            "townName2": "Las Vegas",
            "bulletClass": "lastBullet"
        }, {
            "date": "2012-01-15"
        }];
        var chart = AmCharts.makeChart("dashboard_amchart_1", {
            type: "serial",
            fontSize: 12,
            fontFamily: "Open Sans",
            dataDateFormat: "YYYY-MM-DD",
            dataProvider: chartData,

            addClassNames: true,
            startDuration: 1,
            color: "#6c7b88",
            marginLeft: 0,

            categoryField: "date",
            categoryAxis: {
                parseDates: true,
                minPeriod: "DD",
                autoGridCount: false,
                gridCount: 50,
                gridAlpha: 0.1,
                gridColor: "#FFFFFF",
                axisColor: "#555555",
                dateFormats: [{
                    period: 'DD',
                    format: 'DD'
                }, {
                    period: 'WW',
                    format: 'MMM DD'
                }, {
                    period: 'MM',
                    format: 'MMM'
                }, {
                    period: 'YYYY',
                    format: 'YYYY'
                }]
            },

            valueAxes: [{
                id: "a1",
                title: "distance",
                gridAlpha: 0,
                axisAlpha: 0
            }, {
                id: "a2",
                position: "right",
                gridAlpha: 0,
                axisAlpha: 0,
                labelsEnabled: false
            }, {
                id: "a3",
                title: "duration",
                position: "right",
                gridAlpha: 0,
                axisAlpha: 0,
                inside: true,
                duration: "mm",
                durationUnits: {
                    DD: "d. ",
                    hh: "h ",
                    mm: "min",
                    ss: ""
                }
            }],
            graphs: [{
                id: "g2",
                valueField: "latitude",
                classNameField: "bulletClass",
                title: "latitude/city",
                type: "line",
                valueAxis: "a2",
                lineColor: "#786c56",
                lineThickness: 1,
                legendValueText: "[[description]]/[[value]]",
                descriptionField: "townName",
                bullet: "round",
                bulletSizeField: "townSize",
                bulletBorderColor: "#02617a",
                bulletBorderAlpha: 1,
                bulletBorderThickness: 2,
                bulletColor: "#89c4f4",
                labelText: "[[townName2]]",
                labelPosition: "right",
                balloonText: "latitude:[[value]]",
                showBalloon: true,
                animationPlayed: true,
            }],

            chartCursor: {
                zoomable: false,
                categoryBalloonDateFormat: "DD",
                cursorAlpha: 0,
                categoryBalloonColor: "#e26a6a",
                categoryBalloonAlpha: 0.8,
                valueBalloonsEnabled: false
            },
            legend: {
                bulletType: "round",
                equalWidths: false,
                valueWidth: 120,
                useGraphSettings: true,
                color: "#6c7b88"
            }
        });
	}
	function fnHighchart11(data_kpi){
		$('#highchart_11').highcharts({

	        chart: {
	            type: 'gauge',
	            plotBackgroundColor: null,
	            plotBackgroundImage: null,
	            plotBorderWidth: 0,
	            plotShadow: false
	        },

	        title: {
	            text: ''
	        },

	        pane: {
	            startAngle: -150,
	            endAngle: 150,
	            background: [{
	                backgroundColor: {
	                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
	                    stops: [
	                        [0, '#FFF'],
	                        [1, '#333']
	                    ]
	                },
	                borderWidth: 0,
	                outerRadius: '109%'
	            }, {
	                backgroundColor: {
	                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
	                    stops: [
	                        [0, '#333'],
	                        [1, '#FFF']
	                    ]
	                },
	                borderWidth: 1,
	                outerRadius: '107%'
	            }, {
	                // default background
	            }, {
	                backgroundColor: '#DDD',
	                borderWidth: 0,
	                outerRadius: '105%',
	                innerRadius: '103%'
	            }]
	        },

	        // the value axis
	        yAxis: {
	            min: 0,
	            max: 10,

	            minorTickInterval: 'auto',
	            minorTickWidth: 1,
	            minorTickLength: 10,
	            minorTickPosition: 'inside',
	            minorTickColor: '#666',

	            tickPixelInterval: 30,
	            tickWidth: 2,
	            tickPosition: 'inside',
	            tickLength: 10,
	            tickColor: '#666',
	            labels: {
	                step: 2,
	                rotation: 'auto'
	            },
	            title: {
	                text: 'units'
	            },
	            plotBands: [{
	                from: 0,
	                to: 2.5,
	                color: 'red' // red
	            }, {
	                from: 2.5,
	                to: 5,
	                color: 'orange' // red
	            }, {
	                from: 5,
	                to: 7.5,
	                color: 'yellow' // yellow
	            }, {
	                from: 7.5,
	                to: 10,
	                color: 'green' // green
	            }]
	        },

	        series: [{
	            name: 'Giá trị trung bình',
	            data: [data_kpi],
	            tooltip: {
	                valueSuffix: 'units'
	            }
	        }]

	    });
	}
	function fnHighchart12(series_data){
		console.log(series_data);
		$('#highchart_12').highcharts({
	        chart: {
	            type: 'line'
	        },
	        title: {
	            text: ''
	        },
	        subtitle: {
	            text: ''
	        },
	        xAxis: {
	            type: 'datetime',
	            dateTimeLabelFormats: { // don't display the dummy year
	                month: '%e. %b',
	                year: '%b'
	            },
	            title: {
	                text: 'Date'
	            }
	        },
	        yAxis: {
	            title: {
	                text: 'Snow depth (m)'
	            },
	            min: 0
	        },
	        tooltip: {
	            headerFormat: '<b>{series.name}</b><br>',
	            pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
	        },

	        plotOptions: {
	        	line: {
	                dataLabels: {
	                    enabled: true
	                },
	                enableMouseTracking: false
	            }
	        },

	        series: [{
	            name: 'this week',
	            // Define the data points. All series have a dummy year
	            // of 1970/71 in order to be compared on the same x axis. Note
	            // that in JavaScript, months start at 0 for January, 1 for February etc.
	            data: series_data
//	            data: [
//	                [Date.UTC(2016, 8, 28), 4],
//	                [Date.UTC(2016, 8, 29), 4],
////	                [Date.UTC(2016, 8, 30), ],
//	                [Date.UTC(2016, 9, 1), 3.6],
//	                [Date.UTC(2016, 9, 2), 0],
//	                [Date.UTC(2016, 9, 3), 0],
//	                [Date.UTC(2016, 9, 4), 0]
//	            ]
	        }]
	    });
	}
	function fnHighchart21(series_data){
//		console.log(series_data);
//		Highcharts.getOptions().plotOptions.pie.colors = (function () {
//	        var colors = [],
//	            base = Highcharts.getOptions().colors[0],
//	            i;
//
//	        for (i = 0; i < 10; i += 1) {
//	            // Start out with a darkened base color (negative brighten), and end
//	            // up with a much brighter color
//	            colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
//	        }
//	        return colors;
//	    }());
		$('#highchart_21').highcharts({
	        chart: {
	            plotBackgroundColor: null,
	            plotBorderWidth: null,
	            plotShadow: false,
	            type: 'pie'
	        },
	        title: {
	            text: ''
	        },
	        tooltip: {
	            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	        },
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: true,
	                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
	                    style: {
	                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                    }
	                }
	            }
	        },
	        series: [{
	            name: 'Brands',
	            colorByPoint: true,
	            data: series_data
//	            data: [{
//	                name: 'Microsoft Internet Explorer',
//	                y: 56.33
//	            }, {
//	                name: 'Chrome',
//	                y: 24.03,
//	                sliced: true,
//	                selected: true
//	            }, {
//	                name: 'Firefox',
//	                y: 10.38
//	            }, {
//	                name: 'Safari',
//	                y: 4.77
//	            }, {
//	                name: 'Opera',
//	                y: 0.91
//	            }, {
//	                name: 'Proprietary or Undetectable',
//	                y: 0.2
//	            }]
	        }]
	    });
		// Apply the theme
//		Highcharts.setOptions(Highcharts.theme);
//		$('#highchart_21').highcharts({
//
//	        chart: {
//	            polar: true,
//	            type: 'line'
//	        },
//
////	        title: {
////	            text: 'Đánh giá',
////	            x: -80
////	        },
//
//	        pane: {
//	            size: '80%'
//	        },
//
//	        xAxis: {
//	            categories: ['1', '2', '3', '4', '5'],
//	            tickmarkPlacement: 'on',
//	            lineWidth: 0
//	        },
//
//	        yAxis: {
//	            gridLineInterpolation: 'polygon',
//	            lineWidth: 0,
//	            min: 0
//	        },
//
//	        tooltip: {
//	            shared: true,
//	            pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
//	        },
//
////	        legend: {
////	            align: 'right',
////	            verticalAlign: 'top',
////	            y: 70,
////	            layout: 'vertical'
////	        },
//
//	        series: [{
//	            name: '',
//	            data: series_data,
//	            pointPlacement: 'on'
//	        }]
//
//	    });
	}
	function fnHighchart22(){
		// Prepare random data
	    var data = [
	                {
	                    "hc-key": "vn-yb",
	                    "value": 0
	                },
	                {
	                    "hc-key": "vn-pt",
	                    "value": 1
	                },
	                {
	                    "hc-key": "vn-3655",
	                    "value": 2
	                },
	                {
	                    "hc-key": "vn-qn",
	                    "value": 3
	                },
	                {
	                    "hc-key": "vn-kh",
	                    "value": 4
	                },
	                {
	                    "hc-key": "vn-tg",
	                    "value": 5
	                },
	                {
	                    "hc-key": "vn-bv",
	                    "value": 6
	                },
	                {
	                    "hc-key": "vn-bu",
	                    "value": 7
	                },
	                {
	                    "hc-key": "vn-hc",
	                    "value": 8
	                },
	                {
	                    "hc-key": "vn-br",
	                    "value": 9
	                },
	                {
	                    "hc-key": "vn-st",
	                    "value": 10
	                },
	                {
	                    "hc-key": "vn-li",
	                    "value": 11
	                },
	                {
	                    "hc-key": "vn-311",
	                    "value": 12
	                },
	                {
	                    "hc-key": "vn-ty",
	                    "value": 13
	                },
	                {
	                    "hc-key": "vn-318",
	                    "value": 14
	                },
	                {
	                    "hc-key": "vn-hd",
	                    "value": 15
	                },
	                {
	                    "hc-key": "vn-bn",
	                    "value": 16
	                },
	                {
	                    "hc-key": "vn-317",
	                    "value": 17
	                },
	                {
	                    "hc-key": "vn-vc",
	                    "value": 18
	                },
	                {
	                    "hc-key": "vn-nb",
	                    "value": 19
	                },
	                {
	                    "hc-key": "vn-hm",
	                    "value": 20
	                },
	                {
	                    "hc-key": "vn-ho",
	                    "value": 21
	                },
	                {
	                    "hc-key": "vn-bg",
	                    "value": 22
	                },
	                {
	                    "hc-key": "vn-tb",
	                    "value": 23
	                },
	                {
	                    "hc-key": "vn-ld",
	                    "value": 24
	                },
	                {
	                    "hc-key": "vn-bp",
	                    "value": 25
	                },
	                {
	                    "hc-key": "vn-tn",
	                    "value": 26
	                },
	                {
	                    "hc-key": "vn-py",
	                    "value": 27
	                },
	                {
	                    "hc-key": "vn-bd",
	                    "value": 28
	                },
	                {
	                    "hc-key": "vn-3623",
	                    "value": 29
	                },
	                {
	                    "hc-key": "vn-724",
	                    "value": 30
	                },
	                {
	                    "hc-key": "vn-qg",
	                    "value": 31
	                },
	                {
	                    "hc-key": "vn-331",
	                    "value": 32
	                },
	                {
	                    "hc-key": "vn-dt",
	                    "value": 33
	                },
	                {
	                    "hc-key": "vn-333",
	                    "value": 34
	                },
	                {
	                    "hc-key": "vn-la",
	                    "value": 35
	                },
	                {
	                    "hc-key": "vn-337",
	                    "value": 36
	                },
	                {
	                    "hc-key": "vn-bl",
	                    "value": 37
	                },
	                {
	                    "hc-key": "vn-vl",
	                    "value": 38
	                },
	                {
	                    "hc-key": "vn-hg",
	                    "value": 39
	                },
	                {
	                    "hc-key": "vn-nd",
	                    "value": 40
	                },
	                {
	                    "hc-key": "vn-db",
	                    "value": 41
	                },
	                {
	                    "hc-key": "vn-ls",
	                    "value": 42
	                },
	                {
	                    "hc-key": "vn-th",
	                    "value": 43
	                },
	                {
	                    "hc-key": "vn-307",
	                    "value": 44
	                },
	                {
	                    "hc-key": "vn-tq",
	                    "value": 45
	                },
	                {
	                    "hc-key": "vn-328",
	                    "value": 46
	                },
	                {
	                    "hc-key": "vn-na",
	                    "value": 47
	                },
	                {
	                    "hc-key": "vn-qb",
	                    "value": 48
	                },
	                {
	                    "hc-key": "vn-723",
	                    "value": 49
	                },
	                {
	                    "hc-key": "vn-nt",
	                    "value": 50
	                },
	                {
	                    "hc-key": "vn-6365",
	                    "value": 51
	                },
	                {
	                    "hc-key": "vn-299",
	                    "value": 52
	                },
	                {
	                    "hc-key": "vn-300",
	                    "value": 53
	                },
	                {
	                    "hc-key": "vn-qt",
	                    "value": 54
	                },
	                {
	                    "hc-key": "vn-tt",
	                    "value": 55
	                },
	                {
	                    "hc-key": "vn-kg",
	                    "value": 56
	                },
	                {
	                    "hc-key": "vn-da",
	                    "value": 57
	                },
	                {
	                    "hc-key": "vn-ag",
	                    "value": 58
	                },
	                {
	                    "hc-key": "vn-cm",
	                    "value": 59
	                },
	                {
	                    "hc-key": "vn-tv",
	                    "value": 60
	                },
	                {
	                    "hc-key": "vn-cb",
	                    "value": 61
	                },
	                {
	                    "hc-key": "vn-lo",
	                    "value": 62
	                },
	                {
	                    "hc-key": "vn-bi",
	                    "value": 63
	                }
	            ];
	    $('#highchart_22').highcharts('Map', {
	    	
	    	title: {
	    		text: $scope.modelCitySelected
	    	},
	    	
	    	mapNavigation: {
	    		enabled: true,
	    		buttonOptions: {
	    			verticalAlign: 'bottom'
	    		}
	    	},
	    	colorAxis: {
	    	},
	    	plotOptions:{
	            series:{
	                point:{
	                    events:{
	                        click: function(){
//	                            alert(this.name);
	                        	$scope.modelCitySelected = this.name;
	                        	console.log($scope.modelCitySelected);
//	                        	highcharts().get('vn-tn').zoomTo();
	                        }
	                    }
	                }
	            }
	        },
	    	series: [{
	    		data: data,
//	    		mapData: geojson,
	    		mapData: Highcharts.maps['countries/vn/vn-all'],	    		
	    		joinBy: ['hc-key', 0],
	    		keys: ['hc-key', 'value'],
	    		name: 'Random data',
	    		states: {
	    			hover: {
	    				color: '#BADA55'
	    			}
	    		},
	    		dataLabels: {
	    			enabled: true,
	    			format: '{point.properties.postal}'
	    		}
	    	}]
	    });
	}
	function fnHighchartBG(){
		Highcharts.createElement('link', {
			   href: 'https://fonts.googleapis.com/css?family=Dosis:400,600',
			   rel: 'stylesheet',
			   type: 'text/css'
			}, null, document.getElementsByTagName('head')[0]);

		Highcharts.theme = {
		   colors: ['#7cb5ec', '#f7a35c', '#90ee7e', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
		      '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
		   chart: {
		      backgroundColor: null,
		      style: {
		         fontFamily: 'Dosis, sans-serif'
		      }
		   },
		   title: {
		      style: {
		         fontSize: '16px',
		         fontWeight: 'bold',
		         textTransform: 'uppercase'
		      }
		   },
		   tooltip: {
		      borderWidth: 0,
		      backgroundColor: 'rgba(219,219,216,0.8)',
		      shadow: false
		   },
		   legend: {
		      itemStyle: {
		         fontWeight: 'bold',
		         fontSize: '13px'
		      }
		   },
		   xAxis: {
		      gridLineWidth: 1,
		      labels: {
		         style: {
		            fontSize: '12px'
		         }
		      }
		   },
		   yAxis: {
		      minorTickInterval: 'auto',
		      title: {
		         style: {
		            textTransform: 'uppercase'
		         }
		      },
		      labels: {
		         style: {
		            fontSize: '12px'
		         }
		      }
		   },
		   plotOptions: {
		      candlestick: {
		         lineColor: '#404048'
		      }
		   },


		   // General
		   background2: '#F0F0EA'

		};

		// Apply the theme
		Highcharts.setOptions(Highcharts.theme);
	}
});