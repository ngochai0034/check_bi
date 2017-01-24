angular
.module('MetronicApp')
.controller('HomeController', function($rootScope, $scope, $timeout, $location, $cookies, $window, $filter, NgTableParams, HomeService) {
	$scope.tableDisplaySMS = [];
    $scope.tableDataSMS = [];
    $scope.tableParamsSMS = new NgTableParams({
    	page: 1, // show first page
        count: 10, // count per page
        filter: {},
        sorting: {} 
    }, {
        total: $scope.tableDataSMS.length, // length of data
        getData: function($defer,params) {
        	 var filteredData = params.filter() ?
     	            $filter('filter')($scope.tableDataSMS, params.filter()) :
                 	$scope.tableDataSMS;
 	        var orderedData = params.sorting() ?
 	            $filter('orderBy')(filteredData, params.orderBy()) :
 	            $scope.tableDataSMS;
            params.total(orderedData.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            $scope.tableDisplaySMS = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
        }
    });
    $scope.tableDisplayHistory = [];
    $scope.tableDataHistory = [];
    $scope.tableParamsHistory = new NgTableParams({
    	page: 1, // show first page
    	count: 10, // count per page
    	filter: {},
    	sorting: {} 
    }, {
    	total: $scope.tableDataHistory.length, // length of data
    	getData: function($defer,params) {
    		var filteredData = params.filter() ?
    				$filter('filter')($scope.tableDataHistory, params.filter()) :
    					$scope.tableDataHistory;
    				var orderedData = params.sorting() ?
    						$filter('orderBy')(filteredData, params.orderBy()) :
    							$scope.tableDataHistory;
    						params.total(orderedData.length);
    						$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
    						$scope.tableDisplayHistory = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
    	}
    });
    $scope.tableDisplaySearchSMS = [];
    $scope.tableDataSearchSMS = [];
    $scope.tableParamsSearchSMS = new NgTableParams({
    	page: 1, // show first page
    	count: 10, // count per page
    	filter: {},
    	sorting: {} 
    }, {
    	total: $scope.tableDataSearchSMS.length, // length of data
    	getData: function($defer,params) {
    		var filteredData = params.filter() ?
    				$filter('filter')($scope.tableDataSearchSMS, params.filter()) :
    					$scope.tableDataSearchSMS;
    				var orderedData = params.sorting() ?
    						$filter('orderBy')(filteredData, params.orderBy()) :
    							$scope.tableDataSearchSMS;
    						params.total(orderedData.length);
    						$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
    						$scope.tableDisplaySearchSMS = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
    	}
    });
    $scope.tableDisplayLocation = [];
    $scope.tableDataLocation = [];
    $scope.tableParamsLocation = new NgTableParams({
    	page: 1, // show first page
    	count: 10, // count per page
    	filter: {},
    	sorting: {} 
    }, {
    	total: $scope.tableDataLocation.length, // length of data
    	getData: function($defer,params) {
    		var filteredData = params.filter() ?
    				$filter('filter')($scope.tableDataLocation, params.filter()) :
    					$scope.tableDataLocation;
    				var orderedData = params.sorting() ?
    						$filter('orderBy')(filteredData, params.orderBy()) :
    							$scope.tableDataLocation;
    						params.total(orderedData.length);
    						$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
    						$scope.tableDisplayLocation = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
    	}
    });
    $scope.m04 =$filter('date')( new Date(), 'yyyy/MM/dd');
    $scope.m03 = $filter('date')(new Date().setDate(new Date().getDate()-7), 'yyyy/MM/dd');
    $scope.m00 = new Date();
    $scope.cl01 = fn03;
    $scope.cl30 = fn30;
    $scope.cl31 = fn31;
    $scope.ch01 = fn001;
    $scope.ch02 = fn002;
	(function initController() {
		ComponentsDateTimePickers.init();
		fn01();
		fn10();		
    })();
	function fn01(){
    	$scope.bl213 = true;
		var rq = {};
		rq.sessionid = $cookies.get('ck1');
    	rq.com_id = $cookies.get('ck2');
    	rq.app = 'check';
    	HomeService.f1(rq, function (rp) {
    		if (rp.code == 200) {
    			$scope.o01 = rp.product;
    			$scope.m01 = rp.product[0];
    			fn02(rp.product[0]);
    		}else if(rp.code == 700){
    			$rootScope.fn2();
    		}else{
    			toaster.pop('warning', '', rp.description);
    		}
    	});
	}
    function fn02(a){
    	$scope.bl214 = true;
		var rq = {};
		rq.sessionid = $cookies.get('ck1');
    	rq.com_id = $cookies.get('ck2');
    	rq.app = 'check';		    	
    	rq.pro_id = a.pro_id;
    	HomeService.f2(rq, function (rp) {
    		if (rp.code == 200) {
    			$scope.o02 = rp.batch;
				$scope.m02 = rp.batch[0];
//				$scope.bl215 = true;
//				$scope.m215 = $scope.s1.cod_file;
				fn03($scope.m02, $scope.m03, $scope.m04);
				fn11($scope.m02);
    		}else if(rp.code == 700){
    			$rootScope.user_lockscreen();
    		}else{
    			toaster.pop('warning', '', rp.description);
    		}
    	});
	}
    function fn03(a0, a1, a2){
    	$scope.l1 = true;
    	var rq = {};
    	rq.sessionid = $cookies.get('ck1');
    	rq.com_id = $cookies.get('ck2');
		rq.app = 'check';
		rq.bat_id = a0.bat_id;
		rq.dat_start = a1;
		rq.dat_end = a2;
		console.log(rq);
		HomeService.f3(rq, function (rp){
			if (rp.code == 200) {
				fn04(a0.bat_name, rp.scannedex.scanned_date, rp.scannedex.scanned_web, rp.scannedex.scanned_app);				
				$scope.l1 = false;
			}else{
				$scope.l1 = false;
			}
			
//			$scope.isLoading = false;
		});
    }
    function fn001(a){//change product
    	fn02(a);
    }
    function fn002(a0, a1, a2){//change batch
    	fn03(a0, a1, a2);
    }
    function fn10(){
    	var rq = {};
    	rq.sessionid = $cookies.get('ck1');
    	rq.company_id = $cookies.get('ck2');
		rq.app = 'check';
		HomeService.f4(rq, function (rp){
			console.log(rp);
			if (rp.code == 200) {
				$scope.tableDataSMS = rp.info;
				$scope.tableParamsSMS.reload();
			}
		});
    }
    function fn11(a1){
    	var rq = {};
    	rq.sessionid = $cookies.get('ck1');
    	rq.com_id = $cookies.get('ck2');
    	rq.bat_id = a1.bat_id;
    	rq.app = 'check';
    	HomeService.f6(rq, function (rp){
    		console.log(rp);
    		if (rp.code == 200) {
    			$scope.tableDataLocation = rp.location;
    			$scope.tableParamsLocation.reload();
    		}
    	});
    }
    function fn30(a){
    	var rq = {};
    	rq.sessionid = $cookies.get('ck1');
    	rq.company_id = $cookies.get('ck2');
		rq.app = 'check';
		rq.code = a;
		HomeService.f5(rq, function (rp){
			console.log(rp);
			if (rp.code == 200) {
				$scope.tableDataHistory = rp.info;
				$scope.tableParamsHistory.reload();
			}
		});
    }
    function fn31(a){
    	var rq = {};
    	rq.sessionid = $cookies.get('ck1');
    	rq.com_id = $cookies.get('ck2');
    	rq.app = 'check';
    	rq.number = a;
    	console.log(rq);
    	HomeService.f7(rq, function (rp){
    		console.log(rp);
    		if (rp.code == 200) {
    			$scope.tableDataSearchSMS = rp.sms;
    			$scope.tableParamsSearchSMS.reload();
    		}
    	});
    }
    function fn04(title_data,categories_data,series_data1,series_data2){
		Highcharts.createElement('link', {
			   href: 'https://fonts.googleapis.com/css?family=Dosis:400,600',
			   rel: 'stylesheet',
			   type: 'text/css'
			}, null, document.getElementsByTagName('head')[0]);

			Highcharts.theme = {
			   colors: ["#7cb5ec", "#f7a35c", "#90ee7e", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
			      "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
			   chart: {
			      backgroundColor: null,
			      style: {
			         fontFamily: "Dosis, sans-serif"
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
		$('#Highchart-11').highcharts({
			chart: {
//               type: 'line'
//				type: 'areaspline'
               type: 'column'
           },
//           colors: ["#f45b5b", "#8085e9", "#8d4654", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
//	                 "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
           title: {
               text: title_data
           },
           subtitle: {
               text: 'ezCheck.vn'
           },
           xAxis: {
               categories: categories_data
           },
           yAxis: {
               title: {
                   text: 'Lượt quét'
               }
           },
           plotOptions: {
               line: {
                   dataLabels: {
                       enabled: true
                   },
                   enableMouseTracking: true
               },
               series: {
                   dataLabels: {
                       enabled: true
                   }
               }
           },
           series: [{
               name: 'Lượt quét sản phẩm trên Web',
               data: series_data1
           }, {
               name: 'Lượt quét sản phẩm trên App',
               data: series_data2
           }]
	    });
	}
});