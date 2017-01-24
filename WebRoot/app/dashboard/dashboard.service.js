angular
.module('MetronicApp')
.factory('DashboardService', 
		['$http', '$rootScope', 
		 function($http, $rootScope){
			var service = {};
			var localhost = $rootScope.host;
			service.kpitest = kpitest;
			service.kpigetservicelist = kpigetservicelist;
			service.kpilastweekkpi = kpilastweekkpi;
			service.eventgetlasteventid = eventgetlasteventid;
			service.eventreadnewevents = eventreadnewevents;
			service.arealistsubarea = arealistsubarea;
			//--- system ---
			function kpitest(reqData, callback){
		    	$http.post(localhost + '/CityAPIs/kpi/get', reqData)
		        	.success(function (respData, status, headers, config) {
		        		callback(respData);
		        	})
		            .error(function(respData, status, headers, config) {
		            });
		    }
			function kpigetservicelist(reqData, callback){
				$http.post(localhost + '/CityAPIs/service/getservicelist', reqData)
				.success(function (respData, status, headers, config) {
					callback(respData);
				})
				.error(function(respData, status, headers, config) {
				});
			}
			function kpilastweekkpi(reqData, callback){
				$http.post(localhost + '/CityAPIs/kpi/lastweekkpi', reqData)
				.success(function (respData, status, headers, config) {
					callback(respData);
				})
				.error(function(respData, status, headers, config) {
				});
			}
			function eventgetlasteventid(reqData, callback){
				$http.post(localhost + '/CityAPIs/event/getlasteventid', reqData)
				.success(function (respData, status, headers, config) {
					callback(respData);
				})
				.error(function(respData, status, headers, config) {
				});
			}
			function eventreadnewevents(reqData, callback){
				$http.post(localhost + '/CityAPIs/event/readnewevents', reqData)
				.success(function (respData, status, headers, config) {
					callback(respData);
				})
				.error(function(respData, status, headers, config) {
				});
			}
			function arealistsubarea(reqData, callback){
				$http.post(localhost + '/CityAPIs/area/listsubarea', reqData)
				.success(function (respData, status, headers, config) {
					callback(respData);
				})
				.error(function(respData, status, headers, config) {
				});
			}
			return service;
		}]);