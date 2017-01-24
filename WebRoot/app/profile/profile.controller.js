angular
.module('MetronicApp')
.controller('ProfileController', function($rootScope, $scope, $timeout, $location, $cookies, $window, ProfileService) {
	$scope.cl1 = fn1;
	$scope.cl11 = fn12;
	$scope.cl2 = fn2;
	$scope.cl21 = fn11;
	$scope.cl30 = fn13;
	(function initController() {
		console.log('anhdd-profile');
		console.log($rootScope.r1);
    })();
	function fn1(){
		$("#md1").modal({
            backdrop: 'static',
            keyboard: true, 
            show: true
		});
		$scope.mu1 = $rootScope.r1.usr_picture;
	}
	function fn2(){
		$("#md2").modal({
            backdrop: 'static',
            keyboard: true, 
            show: true
		});
//		console.log($rootScope.r3);
		$scope.mu20 = $rootScope.r1.usr_fullname;
		$scope.mu21 = $rootScope.r1.usr_mobile;
		$scope.mu22 = $rootScope.r1.usr_email;
	}
	function fn11(a1, a2, a3){
    	$scope.disabledUpdate = true;
    	var rq = {};
    	rq.sessionid = $cookies.get('ck1');    	
    	rq.usr_fullname = a1;
    	rq.usr_mobile = a2;
    	rq.usr_email = a3;
    	rq.app = 'check';
    	ProfileService.f1(rq, function (rp) {
    		console.log(rp);
            if (rp.code == 200) {
//            	toaster.pop('success', 'add Root', rp.description);
//            	$scope.disabledUpdate = false;
            	$('#md2').modal('hide');
            	$timeout(function () {
    		        $location.path('/login');
    		    }, 2000);        	
            } else if(rp.code == 700){
            	$('#md2').modal('hide');
            	$location.path('/login');
            }else {
            	$('#md2').modal('hide');
            	$scope.disabledUpdate = false;
                $window.alert(rp.description);
            }
        });
    }
    
    function fn12(a){
    	var rq = {};
    	rq.sessionid = $cookies.get('ck1');    	
    	rq.usr_picture = a.replace("data:image/png;base64,", "");
    	rq.app = 'check';
    	ProfileService.f2(rq, function (rp) {
    		console.log(rp);
            if (rp.code == 200) {
            	$('#md1').modal('hide');
            	$timeout(function () {
    		        $location.path('/login');
    		    }, 2000);
            } else if(rp.code == 700){
            	$('#md1').modal('hide');
            	$location.path('/login');
            }else {
            	$('#md1').modal('hide');
            	toaster.pop('warning', 'Cập nhật ảnh đại diện', rp.description);
            }
        });
    }
    
    function fn13(a0, a1, a2){
    	var rq = {};
    	rq.sessionid = $cookies.get('ck1');
    	rq.app = 'check';    	
    	rq.pwd_old = a0;
    	rq.pwd_new = a1;  
    	console.log(rq);
    	ProfileService.f3(rq, function (rp) {
    		if((rp.code == 200)){
    			$cookies.remove('ck1');
    			$location.path('/login');
        	}  else if(rp.code == 750){
        		toaster.pop('warning', 'Thay đổi mật khẩu', rp.description);
        	}
    		else{
        		$location.path('/login');
    		} 
        });
    }
});