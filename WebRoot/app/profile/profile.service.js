angular
.module('MetronicApp')
.factory('ProfileService', 
		['$http', '$rootScope', 
		 function($http, $rootScope){
			var service = {};
			var localhost = $rootScope.h;
			service.f1 = f1;
			service.f2 = f2;			
			service.f3 = f3;			
			function f1(a, f){
				$http.post(localhost+'/ez_authen/rest/user/updateprofile', a)
            	.success(function (x, y, z, t) {
            		f(x);
            	})
            	.error(function(x, y, z, t) {
            		f(x);
            	});
		    }
			function f2(a, f){
				$http.post(localhost+'/ez_authen/rest/user/updatepicture', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			function f3(a, f){
				$http.post(localhost+'/ez_authen/rest/user/changepassword', a)
				.success(function (x, y, z, t) {
					f(x);
				})
				.error(function(x, y, z, t) {
					f(x);
				});
			}
			return service;
		}]);