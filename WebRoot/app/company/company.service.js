angular
.module('MetronicApp')
.factory('CompanyService', 
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
			service.f61 = f61;			
			service.f62 = f62;			
			service.f63 = f63;			
			function f1(a, f){
				$http.post(localhost+'/check_v2.1_service_company/rest/getlistofmemberbycompany', a)
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
				$http.post(localhost+'/check_v2.1_service_company/rest/updatepicture', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f5(a, f){
				$http.post(localhost+'/check_v2.1_service_company/rest/update', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f6(a, f){
				$http.post(localhost+'/check_v2.1_service_company/rest/searchuser', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f61(a, f){
				$http.post(localhost+'check_v2.1_service_company/rest/addmembertocompany', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f62(a, f){
				$http.post(localhost+'/check_v2.1_service_company/rest/updatemembertype', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f63(a, f){
				$http.post(localhost+'/check_v2.1_service_company/rest/deletemembertype', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			return service;
		}]);