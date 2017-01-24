angular
.module('MetronicApp')
.controller('CompanyController', function($rootScope, $scope, $timeout, $location, $cookies, $window, $filter, $state, CompanyService, NgTableParams) {
	$scope.tableDisplayUserType = [];
    $scope.tableDataUserType = [];
    $scope.tableParamsUserType = new NgTableParams({
    	page: 1, // show first page
        count: 10, // count per page
        filter: {},
        sorting: {} 
    }, {
        total: $scope.tableDataUserType.length, // length of data
        getData: function($defer,params) {
        	 var filteredData = params.filter() ?
     	            $filter('filter')($scope.tableDataUserType, params.filter()) :
                 	$scope.tableDataUserType;
 	        var orderedData = params.sorting() ?
 	            $filter('orderBy')(filteredData, params.orderBy()) :
 	            $scope.tableDataUserType;
            params.total(orderedData.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            $scope.tableDisplayUserType = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
        }
    });
    $scope.tableDisplaySearchUser = [];
    $scope.tableDataSearchUser = [];
    $scope.tableParamsSearchUser = new NgTableParams({
    	page: 1, // show first page
        count: 15, // count per page
        filter: {},
        sorting: {} 
    }, {
        total: $scope.tableDataSearchUser.length, // length of data
        getData: function($defer,params) {
        	 var filteredData = params.filter() ?
     	            $filter('filter')($scope.tableDataSearchUser, params.filter()) :
                 	$scope.tableDataSearchUser;
 	        var orderedData = params.sorting() ?
 	            $filter('orderBy')(filteredData, params.orderBy()) :
 	            $scope.tableDataSearchUser;
            params.total(orderedData.length); // set total for recalc pagination
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            $scope.tableDisplaySearchUser = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
        }
    });
    $scope.cl01 = fn01;
    $scope.cl02 = fn02;
    $scope.cl1 = fn1;
    $scope.cl11 = fn11;
    $scope.cl2 = fn2;
    $scope.cl21 = fn21;
    $scope.cl3 = fn3;
    $scope.cl31 = fn31;
    $scope.cl32 = fn32;
    $scope.cl33 = fn33;
    $scope.cl34 = fn34;
    $scope.cl35 = fn35;
	(function initController() {
		console.log('anhdd-company');
		fn03();
    })();
	function fn01(){
		console.log('click1');
		$scope.s1=true; $scope.s2=false;
//		fn2();
	}
	function fn02(){
		console.log('click2');
		$scope.s2=true; $scope.s1=false;
	}
	function fn03(){
		var rq = {};
		rq.sessionid = $cookies.get('ck1');
		rq.com_id = $cookies.get('ck2');
		rq.app = 'check';
//		console.log(rq);
		CompanyService.f1(rq, function (rp) {
			console.log(rp);
			if(rp.code == 200){
				$scope.tableDataUserType = rp.member;
				$scope.tableParamsUserType.reload();
	    	}  else if(rp.code == 700){
    			$rootScope.user_lockscreen();
    		}else{
	    		$location.path('/login');
			} 
	    });
	}
	function fn1(){
		$("#md1").modal({
            backdrop: 'static',
            keyboard: true, 
            show: true
		});
		$scope.mu1 = $rootScope.r3.com_picture;
	}
	function fn11(a){
    	var rq = {};
    	rq.sessionid = $cookies.get('ck1');
		rq.com_id = $cookies.get('ck2');
    	rq.app = 'check';
    	rq.com_picture = a.replace("data:image/png;base64,", "");
    	CompanyService.f4(rq, function (rp) {
            if (rp.code == 200) {
//            	toaster.pop('success', 'Cập nhật ảnh đại diện', rp.description);
            	$('#md1').modal('hide');
            	$timeout(function () {
		        	$location.path('/login');
		    	}, 2000);
            } else if(rp.code == 700){
            	$('#md1').modal('hide');
            	$location.path('/login');
            }else {
            	$('#md1').modal('hide');
//            	toaster.pop('warning', 'Cập nhật ảnh đại diện lô hàng', rp.description);
            }
        });
    }
	function fn2(){
		$("#md2").modal({
            backdrop: 'static',
            keyboard: true, 
            show: true
		});
//		console.log($rootScope.r3);
		$scope.mu20 = $rootScope.r3.com_fullname;
		$scope.mu21 = $rootScope.r3.com_addr;
		$scope.mu22 = $rootScope.r3.com_mobile;
		$scope.mu23 = $rootScope.r3.com_email;
		$scope.mu24 = $rootScope.r3.com_website;
		$scope.mu25 = $rootScope.r3.com_fanpage;
	}
	function fn21(a0, a1, a2, a3, a4, a5, a6){
		var rq = {};
		rq.sessionid = $cookies.get('ck1');
		rq.com_id = $cookies.get('ck2');
		rq.app = 'check';
		
		rq.com_fullname = a0;
    	rq.com_addr = a1;
    	rq.com_mobile = a2;
    	rq.com_email = a3;
    	rq.com_website = a4;
    	rq.com_fanpage = a5;
    	rq.com_detail = a6;
		CompanyService.f5(rq, function (rp) {
			if(rp.code == 200){
//				toaster.pop('success', 'Cập nhật thông tin công ty', rp.description);	
				$('#md2').modal('hide');
            	$timeout(function () {
		        	$location.path('/login');
		    	}, 2000);
	    	}  else{
	    		$('#md2').modal('hide');
//	    		toaster.pop('success', 'Cập nhật thông tin công ty', rp.description);			
//	    		$location.path('/auth/login');
			} 
	    });
	}
	function fn3(a){
		var rq = {};
		rq.sessionid = $cookies.get('ck1');
		rq.com_id = $cookies.get('ck2');
		rq.usr_name = a;
//		console.log(rq);
		CompanyService.f6(rq, function (rp) {
//			console.log(rp);
			if(rp.code == 200){
				$scope.tableDataSearchUser = rp.user;
				$scope.tableParamsSearchUser.reload();

	    	}  else{
	    		$location.path('/login');
			} 
	    });
	}
	function fn31(a){
    	var rq = {};
    	rq.sessionid = $cookies.get('ck1');
		rq.com_id = $cookies.get('ck2');
		rq.mem_id = a;
		rq.mem_type = 5;
		rq.app = 'check';
		CompanyService.f61(rq, function (rp) {
			if(rp.code == 200){
				$('#md3').modal('hide');
            	$timeout(function () {
            		$state.reload();
		    	}, 2000);
			}else{
				$('#md3').modal('hide');
	    		$window.alert(rp.description);
//	    		$location.path('/auth/login');
			} 
	    });
    }
	function fn32(a1, a2){
		$scope.m350 = a1;
		$scope.m35 = a2;
		$("#md5").modal({
            backdrop: 'static',
            keyboard: true, 
            show: true
		});
	}
	function fn33(a){
		$scope.m33 = a;
		console.log($scope.m33);
		$("#md4").modal({
            backdrop: 'static',
            keyboard: true, 
            show: true
		});
	}
	function fn34(a){
		var rq = {};
		rq.sessionid = $cookies.get('ck1');
		rq.com_id = $cookies.get('ck2');
		rq.app = 'check';
		rq.mem_id = a;
		CompanyService.f63(rq, function (rp) {
			console.log(rp);
			if(rp.code == 200){
				fn03();	
				$('#md4').modal('hide');
	    	}  else{
	    		$('#md4').modal('hide');
	    		$location.path('/login');
			} 
	    });
	}
	function fn35(a0, a1){
		var rq = {};
		rq.sessionid = $cookies.get('ck1');
		rq.com_id = $cookies.get('ck2');
		rq.mem_id = a0;
		rq.mem_type = a1;
		rq.app = 'log';
		CompanyService.f62(rq, function (rp) {
			if(rp.code == 200){
				fn03();	
				$('#md5').modal('hide');
//				toaster.pop('success', 'Cập nhật thông tin nhân viên', rp.description);
//				fnGetListOfMemberByCompany($scope.modelCompany.com_id);
//				fnClickEditMember(-1);
	    	}  else{
	    		$('#md5').modal('hide');
	    		$location.path('/login');
			} 
	    });
	}
});