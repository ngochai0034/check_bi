angular
.module('MetronicApp')
.controller('LoginController', function($rootScope, $scope, $timeout, $location, $cookies, $window, $sessionStorage, LoginService) {
	$scope.s1 = fn1;
	(function initController() {
		console.log('anhdd-login');
		if($cookies.get('ck1')){
    		fn2($cookies.get('ck1')); 
    	}else{
    		$cookies.remove('ck1');
//    		$rootScope.user_profile = {};
//    		$rootScope.user_company = {};
    		$sessionStorage.$reset();       		
    	}
    })();
	function fn1(a, b){
		$scope.l1 = true;
//		$location.path('/home');
		var rq = {};
		rq.usr_name = a;
		rq.usr_pwd = b;
		rq.device_token = '';
		rq.device_type = 'web';
		rq.app = 'check';
    	LoginService.f1(rq, function (rp) {
    		console.log(rp);
    		$scope.x = {}; $scope.x = rp;
    		if ($scope.x.code == 200) {
    			$cookies.put('ck1', $scope.x.sessionid);
    			fn2($scope.x.sessionid);
    		} else {
    			$.notific8('zindex', 11500);
                $.notific8($scope.x.description);
                $scope.l1 = false;
    		}    		
    	});
	}
	function fn2(a){
    	var rq = {};
    	rq.sessionid = a;
    	rq.app = 'check';
    	LoginService.f2(rq, function (rp) {
    		console.log(rp);
    		$scope.y = {}; $scope.y = rp;
    		if(($scope.y.code == 200)){
    			$sessionStorage.ss1 = rp.profile;
    			fn3($cookies.get('ck1'));
    			
//    			if(respData.profile.usr_type == 40){
//    				$sessionStorage.user_profile = respData.profile;
//    				fnGetListOfCompanyByUser(sessionid);
//    				$scope.laddaLogin = false;
//    				if($cookies.get('log_page')){
////    					console.log($cookies.get('log_page'));
//    					$location.path('/app/'+$cookies.get('log_page'));    				
//    				}else{
//    					$location.path('/app/home');            			
//    				}        				
//    			}else{
//    				$cookies.remove('session');
//    				$rootScope.user_profile = {};
//    				$sessionStorage.$reset();
//    				$location.path('/auth/login');   
//    				$window.alert(respData.description);
//    			}
        	}  else{
//        		$cookies.remove('session');
//        		$rootScope.user_profile = {};
//        		$sessionStorage.$reset();
//        		$location.path('/auth/login');
//        		$window.alert(respData.description);
    		} 
        });
    }
	function fn3(a){
		var rq = {};
		rq.sessionid = a;
		rq.app = 'check';
    	LoginService.f3(rq, function (rp) {
    		console.log(rp);
    		$scope.z = {}; $scope.z = rp;
    		if($scope.z.code == 200){
        		if(rp.company.length > 0){
        			$sessionStorage.ss2 = rp.company;        			
        			if($cookies.get('ck2')){
                		for(var i=0; i<$sessionStorage.ss2.length; i++){
                			if($sessionStorage.ss2[i].com_id == $cookies.get('ck2')){
                				$rootScope.r3 = $sessionStorage.ss2[i];
                				console.log($rootScope.r3);
                			}
                		}
                	}else{
                		$rootScope.r3 = $sessionStorage.ss2[0];
                		$cookies.put('ck2', rp.company[0].com_id);                		
                	}
        			$location.path('/home');  
        		}
    			$scope.l1 = false;
        	}  else{
        		$location.path('/auth/login');
//        		$window.alert(respData.description);
        		$scope.l1 = false;
    		} 
        });
	}
});