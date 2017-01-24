angular
.module('MetronicApp')
.factory('ProductService', 
		['$http', '$rootScope', 
		 function($http, $rootScope){
			var service = {};
//			var localhost = $rootScope.h;
			var localhost = 'http://localhost:8080';
			service.f1 = f1;
			service.f11 = f11;
			service.f2 = f2;			
			service.f3 = f3;			
			service.f4 = f4;			
			service.f5 = f5;			
			service.f6 = f6;			
			service.f7 = f7;
			service.f8 = f8;
			function f1(a, f){
//				$http.post(localhost+'/check_v2.1_service_product/product/getlistbycompany', a)
				$http.post(localhost+'/check_v2_service_product/product/getlistbycompany', a)
            	.success(function (x, y, z, t) {
            		f(x);
            	})
            	.error(function(x, y, z, t) {
            		f(x);
            	});
		    }
			function f11(a, f){
//				$http.post(localhost+'/check_v2.1_service_product/product/getlistbycompanyex', a)
				$http.post(localhost+'/check_v2_service_product/product/getlistbycompanyex1', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f2(a, f){
				$http.post(localhost+'/ez_authen/rest/user/getprofile', a)
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
//				$http.post(localhost+'/check_v2.1_service_product/product/updatepicture', a)
				$http.post(localhost+'/check_v2_service_product/product/updatepicture', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f5(a, f){
//				$http.post(localhost+'/check_v2.1_service_product/product/insert', a)
				$http.post(localhost+'/check_v2_service_product/product/insert', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f6(a, f){
//				$http.post(localhost+'/check_v2.1_service_product/product/delete', a)
				$http.post(localhost+'/check_v2_service_product/product/delete', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f7(a, f){
//				$http.post(localhost+'/check_v2.1_service_product/product/update', a)
				$http.post(localhost+'/check_v2_service_product/product/update', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f8(a, f){
//				$http.post(localhost+'/check_v2.1_service_product/product/update', a)
				$http.post(localhost+'/check_v2_service_product/product/getimageproductbyid', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			return service;
		}]);