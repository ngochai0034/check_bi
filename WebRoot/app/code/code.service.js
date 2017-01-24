angular
.module('MetronicApp')
.factory('CodeService', 
		['$http', '$rootScope', 
		 function($http, $rootScope){
			var service = {};
			var localhost = $rootScope.h;
			service.f1 = f1;
			service.f10 = f10;
			service.f11 = f11;
			service.f2 = f2;			
			service.f3 = f3;			
			service.f4 = f4;			
			service.f5 = f5;			
			service.f501 = f501;			
			service.f6 = f6;			
			service.f7 = f7;			
			service.f81 = f81;			
			service.f810 = f810;			
			service.f82 = f82;			
			service.f820 = f820;			
			service.f9 = f9;			
			service.f91 = f91;			
			service.f92 = f92;			
			service.f100 = f100;			
			service.f101 = f101;			
			function f1(a, f){
				$http.post(localhost+'/check_v2.1_service_code/rest/getlistbycompany', a)
            	.success(function (x, y, z, t) {
            		f(x);
            	})
            	.error(function(x, y, z, t) {
            		f(x);
            	});
		    }
			function f10(a, f){
				$http.post(localhost+'/check_v2.1_service_code/rest/getlistbycompanyex0', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f11(a, f){
				$http.post(localhost+'/check_v2.1_service_code/rest/getlistbycompanyex', a)
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
				$http.post(localhost+'/check_v2_service_code/rest/delete', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f5(a, f){
				$http.post(localhost+'/check_v2.1_service_code/rest/getbatchbyfilename', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f501(a, f){
				$http.post(localhost+'/check_v2.1_service_code/rest/getbatchbyfilenameex', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f6(a, f){
				$http.post(localhost+'/check_v2.1_service_product/product/getlistofproductnamebycompanyex', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f7(a, f){
				$http.post(localhost+'/check_v2.1_service_product/batch/getlistofbatchnamebyproductex', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f81(a, f){
				$http.post(localhost+'/check_v2.1_service_code/rest/generatefileex', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f810(a, f){
				$http.post(localhost+'/check_v2.1_service_code/rest/generatefileex0', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f82(a, f){
				$http.post(localhost+'/check_v2.1_service_code/rest/generatefileex2', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f820(a, f){
				$http.post(localhost+'/check_v2.1_service_code/rest/generatefileex20', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f9(a, f){
				$http.post(localhost+'/check_v2.1_service_code/rest/getcodebyfilename', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f91(a, f){
				$http.post(localhost+'/check_v2.1_service_code/rest/getcodebyfilenamewithserial', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f92(a, f){
				$http.post(localhost+'/check_v2.1_service_code/rest/getcodebyfilenamewithserialex', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f100(a, f){
				$http.post(localhost+'/check_v2_service/rest/activebatchbyfile', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f101(a, f){
				$http.post(localhost+'/check_v2.1_service/rest/activebatchbyfilewithserial', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			return service;
		}]);