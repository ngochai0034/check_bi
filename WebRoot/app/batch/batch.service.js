angular
.module('MetronicApp')
.factory('BatchService', 
		['$http', '$rootScope', 
		 function($http, $rootScope){
			var service = {};
//			var localhost = $rootScope.h;
			var localhost = 'http://localhost:8080';
			service.f1 = f1;
			service.f2 = f2;			
			service.f3 = f3;			
			service.f4 = f4;			
			service.f5 = f5;			
			service.f6 = f6;			
			service.f7 = f7;
			service.f8 = f8;
			function f1(a, f){
//				$http.post(localhost+'/check_v2.1_service_product/product/getlistofproductnamebycompanyex', a)
				$http.post(localhost+'/check_v2_service_product/product/getlistofproductnamebycompanyex', a)
            	.success(function (x, y, z, t) {
            		f(x);
            	})
            	.error(function(x, y, z, t) {
            		f(x);
            	});
		    }
			function f2(a, f){
//				$http.post(localhost+'/check_v2.1_service_product/batch/getlistbyproduct', a)
				$http.post(localhost+'/check_v2_service_product/batch/getlistbyproduct', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f3(a, f){
				$http.post(localhost+'/check_v2.1_service_company/rest/getlistofcompanybyuser', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f4(a, f){
//				$http.post(localhost+'/check_v2.1_service_product/batch/update', a)
				$http.post(localhost+'/check_v2_service_product/batch/update', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f5(a, f){
//				$http.post(localhost+'/check_v2.1_service_product/batch/delete', a)
				$http.post(localhost+'/check_v2_service_product/batch/delete', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f6(a, f){
//				$http.post(localhost+'/check_v2.1_service_product/batch/updatepicture', a)
				$http.post(localhost+'/check_v2_service_product/batch/updatepicture', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f7(a, f){
//				$http.post(localhost+'/check_v2.1_service_product/batch/insert', a)
				$http.post(localhost+'/check_v2_service_product/batch/insert', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f8(a, f){
//				$http.post(localhost+'/check_v2.1_service_product/batch/insert', a)
				$http.post(localhost+'/check_v2_service_product/batch/getimagebatchbyid', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			return service;
		}]);