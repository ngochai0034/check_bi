angular
.module('MetronicApp')
.factory('HomeService', 
		['$http', '$rootScope', 
		 function($http, $rootScope){
			var service = {};
			var localhost = $rootScope.h;
			service.f1 = f1;
			service.f2 = f2;			
			service.f3 = f3;			
			service.f4 = f4;			
			service.f5 = f5;			
			service.f6 = f6;			
			service.f7 = f7;			
			function f1(a, f){
				$http.post(localhost+'/check_v2.1_service_product/product/getlistofproductnamebycompanyex', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f2(a, f){
				$http.post(localhost+'/check_v2.1_service_product/batch/getlistofbatchnamebyproductex', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f3(a, f){
				$http.post(localhost+'/check_v2.1_service/rest/getscannedbybatchwithdate', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f4(a, f){
				$http.post(localhost+'/check_v1_sms/sms/getsmsreceiverbycomid', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f5(a, f){
				$http.post(localhost+'/check_v1_sms/sms/gethistoryscanbycode', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f6(a, f){
				$http.post(localhost+'/check_v2.1_service/rest/getlocationbybatch', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f7(a, f){
				$http.post(localhost+'/check_v2.1_service/rest/getsmsbynumber', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			return service;
		}]);