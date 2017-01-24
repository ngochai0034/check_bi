angular
.module('MetronicApp')
.controller('BatchController', function($rootScope, $scope, $timeout, $location, $cookies, $window, $filter, $state, BatchService, NgTableParams) {
	$scope.tableDisplayBatch = [];
    $scope.tableDataBatch = [];
    $scope.tableParamsBatch = new NgTableParams({
    	page: 1, // show first page
        count: 5, // count per page
        filter: {},
        sorting: {} 
    }, {
        total: $scope.tableDataBatch.length, // length of data
        getData: function($defer,params) {
        	 var filteredData = params.filter() ?
     	            $filter('filter')($scope.tableDataBatch, params.filter()) :
                 	$scope.tableDataBatch;
 	        var orderedData = params.sorting() ?
 	            $filter('orderBy')(filteredData, params.orderBy()) :
 	            $scope.tableDataBatch;
            params.total(orderedData.length); // set total for recalc pagination
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            $scope.tableDisplayBatch = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
        }
    });
    $scope.o11 = [
                 {n:'Chưa kích hoạt', v:0},
                 {n:'Đã kích hoạt', v:1},
                 {n:'Hết hàng', v:2}
                 ];
    $scope.cl1 = fn12;
    $scope.cl11 = fn13;
    $scope.c1 = fn11;
    $scope.cl2 = fn21; //chon lo hang
    $scope.cl3 = fn3;
    $scope.cl31 = fn31;
    $scope.cl32 = fn32;
    //--crop img--
    $scope.cropper = {};
    $scope.cropper.sourceImage = null;
    $scope.cropper.croppedImage   = null;
    $scope.bounds = {};
//    $scope.bounds.left = 0;
//    $scope.bounds.right = 0;
//    $scope.bounds.top = 0;
//    $scope.bounds.bottom = 0;
    //--end of crop img--
	(function initController() {
		console.log('anhdd-batch');
		ComponentsDateTimePickers.init();
		fn1();
//		jQuery('#pulsate-regular').pulsate({
//            color: "#bf1c56"
//        });
    })();
	function fn1(){
		var rq = {};
    	rq.sessionid = $cookies.get('ck1');
    	rq.com_id = $cookies.get('ck2');
    	rq.app = 'check';
    	BatchService.f1(rq, function (rp) {
    		console.log(rp);
    		if (rp.code == 200) {
    			$scope.o1 = rp.product;
    			if($cookies.get('ck3')){
    				for(var i=0; i1<$scope.optionProduct.length; i++){
    					if($cookies.get('ck3') == rp.product[i].pro_id){
    						$scope.m1 = rp.product[i];
    						fn11(rp.product[i]);		    						
    					}
    				}
    			}else{
    				$scope.m1 = rp.product[0];
    				fn11(rp.product[0]);	
    				console.log('not ck3');
    			}
    		}else if(rp.code == 700){
//    			$rootScope.user_lockscreen();
    		}else{
//    			toaster.pop('warning', '', rp.description);
    		}
    	});
	}
	function fn11(a){
		fn2(a);
		$scope.m10 = $scope.m1.pro_id;
		$scope.m11 = $scope.m1.pro_name;
		$scope.m15 = $scope.o11[0];
	}
	function fn12() {
		$("#md1").modal({
            backdrop: 'static',
            keyboard: true, 
            show: true
		});
    };
    function fn13(a1, a2, a3, a4, a5, a6, a7, a71, a8, a81){
    	var rq = {};
    	rq.sessionid = $cookies.get('ck1');
    	rq.com_id = $cookies.get('ck2');
    	
    	rq.pro_id = $scope.m1.pro_id;
    	rq.bat_name = a1;
    	rq.bat_mandate = $filter('date')(a2, 'yyyy/MM/dd');
    	rq.bat_expdate = $filter('date')(a3, 'yyyy/MM/dd');
    	rq.bat_status = a4.v;
    	rq.bat_promotion = a5;
    	rq.bat_warning = a6;
    	rq.bat_detail = a7;
    	rq.bat_description_private = a71;
    	rq.app = 'check';
    	console.log(rq);
    	BatchService.f7(rq, function (rp) {
    		console.log(rp);
    		if (rp.code == 200){
    			$('#md1').modal('hide');
    			if(a8){
    				fn14(rp.bat_id, a8, a81);    				
    			}
    		}else{
//    			$scope.laddaInsertBatch = false;
//    			toaster.pop('warning', 'add Batch', rp.description);
    		}
    	});
	}
    function fn14(a0, a1, a2){
    	console.log(a2);
    	var rq = {};
    	rq.sessionid = $cookies.get('ck1');
    	rq.com_id = $cookies.get('ck2');
    	rq.app = 'check';
    	rq.bat_id = a0;
    	rq.bat_picture = a1.replace("data:image/png;base64,", "");
    	rq.bat_thumnail = a2.replace("data:image/png;base64,", "");
    	console.log(rq);
    	BatchService.f6(rq, function (rp) {
            if (rp.code == 200) {
//            	$scope.laddaUpdateBatchPicture = false;
//            	toaster.pop('success', 'Cập nhật ảnh', rp.description);
            	$timeout(function () {
    		        $state.reload();
    		    }, 1000);
            } else if(rp.code == 700){
//            	$scope.laddaUpdateBatchPicture = false;
            	$location.path('/auth/login');
            }else {
//            	toaster.pop('warning', 'Cập nhật ảnh', rp.description);
//            	$scope.laddaUpdateBatchPicture = false;
            }
        });
    }
	function fn2(a){
		var rq = {};
    	rq.sessionid = $cookies.get('ck1');
    	rq.com_id = $cookies.get('ck2');
    	rq.app = 'check';		    	
    	rq.pro_id = a.pro_id;
    	BatchService.f2(rq, function (rp) {
    		if (rp.code == 200) {
    			if(rp.batch[0]){
    				$scope.tableDataBatch = rp.batch;
    				$scope.tableParamsBatch.reload();
    				//---
//    				$scope.currentBatchId = rp.batch[0].bat_id;
//    				$scope.modelSelectedBatch = rp.batch[0];
//    				fnGetBatchById(rp.batch[0].bat_id);		 
    				fn21(rp.batch[0]);
    			}else{
    				$scope.enableButton = true;
    				$scope.tableDataBatch = [];
    				$scope.tableParamsBatch.reload();
    			}
    		}else if(rp.code == 700){
    			$rootScope.user_lockscreen();
    		}else{
    			toaster.pop('warning', '', rp.description);
    		}
    	});
	}
	function fn21(a){
		$scope.bat_image123= "";
		
    	if($scope.s01 == a.bat_id){
			$scope.bl1 = false;			
			$scope.s01 = 0;
			
			
		}else{
			$scope.bl1 = true;			
			$scope.s01 = a.bat_id;
			$scope.s0 = a;	
			$scope.showUpdateForm = false;
			console.log(a);
		}
    	
    	var rq = {};
		rq.sessionid = $cookies.get('ck1');
		rq.com_id = $cookies.get('ck2');
		rq.bat_id = a.bat_id;
		BatchService.f8(rq,function(rp){
			console.log(rp);
			if(rp.code == 200){
				$scope.bat_image123 = rp.bat_image;
			}
		});
    }
	function fn3(a) {
    	console.log(a);
		$("#md2").modal({
            backdrop: 'static',
            keyboard: true, 
            show: true
		});
//		$scope.mu0 = a.pro_id;
		$scope.mu10 = a.bat_id;
		$scope.mu11 = $scope.m1.pro_name;
		$scope.mu12 = a.bat_name;
		$scope.mu13 = a.bat_mandate;
		$scope.mu14 = a.bat_expdate;
		for(var i=0; i<$scope.o11.length; i++){
			if($scope.o11[i].v == a.bat_status){			
				$scope.mu15 = $scope.o11[i];
			}
		}
		$scope.mu16 = a.bat_promotion;
		$scope.mu17 = a.bat_warning;
		$scope.mu18 = a.bat_detail;
		$scope.mu181 = a.bat_description_private;
		$scope.mu19 = a.bat_picture;
    };
    function fn31(a1, a2){
//    	$scope.laddaDeleteBatch = true;
    	if(a2 > 0){
    		toaster.pop('success', 'Xóa lô', 'Lô đã có sản phẩm được bán ra thị trường, không thể xóa lô!');
    		return;
    	}
    	var rq = {};
    	rq.sessionid = $cookies.get('ck1');
    	rq.com_id = $cookies.get('ck2');
    	rq.app = 'check';    	
    	rq.bat_id = a1;
    	BatchService.f5(rq, function (rp) {
    		console.log(rp);
    		if (rp.code == 200) {
    			$('#md21').modal('hide');
    			$('#md2').modal('hide');
    			$timeout(function () {
    		        $state.reload();
    		    }, 1000);
//    			toaster.pop('success', 'Xóa lô', rp.description);
//    			$scope.laddaDeleteBatch = false;
//    			$timeout(function () {
//    		        $state.reload();
////	    			fnGetListOfBatchByProduct($scope.modelSelectedProduct.pro_id);
//	    			$scope.laddaDeleteBatch = false;
//    		    }, 1000);
    		}
    	});
    }
    function fn32(a0, a1, a2, a3, a4, a5, a6, a7, a71, a8, a80){
		var rq = {};
		rq.sessionid = $cookies.get('ck1');
    	rq.com_id = $cookies.get('ck2');
    	rq.bat_id = a0;
    	rq.bat_name = a1;
    	rq.bat_mandate = $filter('date')(a2, 'yyyy/MM/dd');
    	rq.bat_expdate = $filter('date')(a3, 'yyyy/MM/dd');
    	rq.bat_status = a4.v;
    	rq.bat_promotion= a5;
    	rq.bat_warning = a6;
    	rq.bat_detail = a7;
    	rqbat_description_private = a71;
    	
    	console.log(rq);
    	BatchService.f4(rq, function (rp) {
    		console.log(rp);
    		if (rp.code == 200) {    	
//    			$scope.laddaUpdateBatch = false;
//    			toaster.pop('success', 'Cập nhật thông tin sản phẩm', rp.description);	    			
//    			fnGetListOfBatchByProduct($scope.modelSelectedProduct.pro_id);
//    			$timeout(function () {
//    		        $state.reload();
//    		    }, 1000);
    			$('#md2').modal('hide');
    			if(a8){
    				fn14(a0, a8, a80);    				
    			}else{
    				$timeout(function () {
        		        $state.reload();
        		    }, 1000);
    			}
    		} else{
//    			$scope.laddaUpdateBatch = false;
//    			toaster.pop('warning', 'Cập nhật thông tin sản phẩm', rp.description);
    		}
    	});
	}
});