angular
.module('MetronicApp')
.factory('LoginService', 
		['$http', '$rootScope', 
		 function($http, $rootScope){
			var service = {};
			var localhost = $rootScope.h;
			service.f1 = f1;
			service.f2 = f2;			
			service.f3 = f3;			
			function f1(a, f){
				$http.post(localhost+'/ez_authen/rest/user/login', a)
            	.success(function (x, y, z, t) {
            		console.log(x);
            		console.log(y);
            		console.log(z);
            		console.log(t);
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
			return service;
		}]);