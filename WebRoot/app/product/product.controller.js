angular
.module('MetronicApp')
.controller('ProductController', function($rootScope, $scope, $timeout, $location, $cookies, $window, $filter, $state, NgTableParams, ProductService) {
	$scope.tableDisplayProduct = [];
    $scope.tableDataProduct = [];
    $scope.tableParamsProduct = new NgTableParams({
    	page: 1, // show first page
        count: 5, // count per page
        filter: {},
        sorting: {} 
    }, {
        total: $scope.tableDataProduct.length, // length of data
        getData: function($defer,params) {
        	 var filteredData = params.filter() ?
     	            $filter('filter')($scope.tableDataProduct, params.filter()) :
                 	$scope.tableDataProduct;
 	        var orderedData = params.sorting() ?
 	            $filter('orderBy')(filteredData, params.orderBy()) :
 	            $scope.tableDataProduct;
            params.total(orderedData.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            $scope.tableDisplayProduct = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
        }
    });
    $scope.o1 = [
                   {l:'Chưa sản xuất', v:0},
                   {l:'Đang sản xuất', v:1},
                   {l:'Tạm dừng sản xuất', v:2},
                   {l:'Dừng sản xuất', v:3}
                   ];
    $scope.cl1 = f11; 
    $scope.cl11 = f12;
    $scope.cl2 = f2; //chon san pham
    $scope.cl3 = f3; //sua doi thong tin san pham
    $scope.cl31 = f31; //xoa san pham
    $scope.cl32 = f32; //cap nhat san pham
    $scope.c01 = fn01;
	(function initController() {
//		console.log($rootScope.r3);
		fn1(1);
    })();
	function fn1(next){
		App.startPageLoading({animate: true});
    	var rq = {};
    	rq.sessionid = $cookies.get('ck1');
    	rq.com_id = $cookies.get('ck2');
    	rq.app = 'check';
    	rq.next = next;
    	ProductService.f11(rq, function (rp) {
    		console.log(rp);
    		if (rp.code == 200) {
    			if(rp.product[0]){
//    				$scope.tableDataProduct = rp.product;
    				$scope.tableDataProduct.push.apply($scope.tableDataProduct, rp.product);
    				$scope.tableParamsProduct.reload();	
    				f2(rp.product[0]);
//    				//---
//    				fnGetTotalItem();
//    				if(next == 1){
////    					$scope.s01 = rp.product[0].pro_id;
////    					$scope.s0 = rp.product[0];    		
//    					f2(rp.product[0]);
//    				}
//    				fn1(next+1);
//    				console.log(next);
    			}else{
    				$scope.enableButton = true;
    			}
    			App.stopPageLoading();
    		}else if(rp.code == 700){
    			App.stopPageLoading();
//    			$rootScope.user_lockscreen();
    		}
    	});
    }
	function fn01(a){
		console.log('anhdd');
		console.log(a);
	}
	function f11() {
		$("#md0").modal({
            backdrop: 'static',
            keyboard: false, 
            show: true
		});
		$scope.i1 = {};
//	    $scope.i1.sourceImage = null;
//	    $scope.i1.croppedImage   = null;
	    $scope.i2 = {};
//	    $scope.i2.left = 0;
//        $scope.i2.right = 0;
//        $scope.i2.top = 0;
//        $scope.i2.bottom = 0;
	    console.log($scope.i1);
    };
    function f12(a1, a2, a3, a4, a5, a6, a7, a8, a9){
//		$scope.disabledAddProduct = true;
		$scope.laddaRefresh = true;
		var rq = {};
    	rq.sessionid = $cookies.get('ck1');
    	rq.com_id = $cookies.get('ck2');
    	rq.pro_name = a1;
    	rq.pro_tag = a2;
    	rq.pro_type = a3;
    	rq.pro_detail = a4;
    	rq.pro_status = a5.v;
    	rq.exp_day = 0;
    	rq.pro_manuallink = a6;
    	rq.pro_description_private = a9;
    	rq.app = 'check';
    	console.log(rq);
//    	console.log(a7);
    	ProductService.f5(rq, function (rp) {
    		if (rp.code == 200) {
    			console.log(rp);
    			$('#md0').modal('hide');
    			if(a7){
    				f13(rp.id, a7, a8);    				
    			}
    		} else{
    			toaster.pop('danger', 'add Product', rp.description);
    			$scope.laddaRefresh = false;
    		}
    	});
	}
    function f13(a1, a2, a3){
    	$scope.laddaRefresh = true;
    	var rq = {};
    	rq.sessionid = $cookies.get('ck1');
    	rq.com_id = $cookies.get('ck2');
    	rq.app = 'check';
    	rq.pro_id = a1;
    	rq.pro_picture = a2.replace("data:image/png;base64,", "");
    	rq.pro_thumnail = a3.replace("data:image/png;base64,", "");
    	console.log(rq);
    	ProductService.f4(rq, function (rp) {
    		console.log(rp);
            if (rp.code == 200) {
//            	$scope.laddaRefresh = false;
//            	toaster.pop('success', 'Cập nhật thành công', rp.description);
            	$timeout(function () {
    		        $state.reload();
    		    }, 2000);
            } else if(rp.code == 700){
            	$location.path('/auth/login');
            }else {
            	toaster.pop('warning', 'Cập nhật ảnh đại diện lô hàng', rp.description);
            }
        });
    }
    function f2(a){
    	if($scope.s01 == a.pro_id){
			$scope.bl1 = false;			
			$scope.s01 = 0;
		}else{
			$scope.bl1 = true;			
			$scope.s01 = a.pro_id;
			$scope.s0 = a;	
			$scope.showUpdateForm = false;
//			console.log(a);
		}
    	var rq = {};
    	$scope.pro_picture12 = "";
    	rq.sessionid = $cookies.get('ck1');
    	rq.com_id = $cookies.get('ck2');
    	rq.pro_id = a.pro_id;
    	ProductService.f8(rq,function(rp){
    		
    		if(rp.code == 200){
    			$scope.pro_picture12 = rp.pro_image;
    			$scope.mu6 = rp.pro_image;
    		}

    	});
    }
    function f3(a) {
		$("#md1").modal({
            backdrop: 'static',
            keyboard: true, 
            show: true
		});
		$scope.mu0 = a.pro_id;
		$scope.mu1 = a.pro_name;
		$scope.mu2 = a.pro_tag;
		for(var i=0; i<$scope.o1.length; i++){
			if($scope.o1[i].v == a.pro_status){
				$scope.mu3 = $scope.o1[i];				
			}
		}
		$scope.mu4 = a.pro_manuallink;
		$scope.mu5 = a.pro_detail;
		$scope.mu51 = a.pro_description_private;
//		$scope.mu6 = a.pro_picture;
	    $scope.i21 = {};
	    $scope.i21.sourceImage = null;
	    $scope.i21.croppedImage   = null;
	    $scope.i22 = {};
	    console.log($scope.i21);
    };
    function f31(a){
		var rq = {};
		rq.sessionid = $cookies.get('ck1');
    	rq.com_id = $cookies.get('ck2');
    	rq.pro_id = a;
    	rq.app = 'check';
    	ProductService.f6(rq, function (rp) {
    		console.log(rp);
    		if (rp.code == 200) {
//    			toaster.pop('success', 'Xóa sản phẩm', rq.description);
    			$('#md11').modal('hide');
    			$('#md1').modal('hide');
    			$timeout(function () {
    		        $state.reload();
    		    }, 1000);
    		}
    	});
	}
    function f32(a0, a1, a2, a3, a4, a5, a51, a6,a7){
    	var rq = {};
		rq.sessionid = $cookies.get('ck1');
    	rq.com_id = $cookies.get('ck2');
    	rq.app = 'check';
    	rq.pro_id = a0;
    	rq.pro_name = a1;
    	rq.pro_tag = a2;
    	rq.pro_status = a3.v;
    	rq.pro_manuallink = a4;
    	rq.pro_detail = a5;
    	rq.pro_description_private = a51;
    	rq.exp_day = 0;
    	rq.pro_type = 1;
    	rq.pro_picture = a6;
    	rq.pro_thumnail = a7;
    	console.log(rq);
    	
    	ProductService.f7(rq, function (rp) {
    		console.log(rp);
    		if (rp.code == 200) {	
    			$('#md1').modal('hide');
    			if(a6){
    				f13(a0, a6,a7);				
    			}else{
    				$timeout(function () {
        		        $state.reload();
        		    }, 1000);
    			}
//    			toaster.pop('success', 'Cập nhật thành công', rp.description);
//    			$timeout(function () {
//    				$state.reload();
//    			}, 2000);
    		}
    	});
    }
});