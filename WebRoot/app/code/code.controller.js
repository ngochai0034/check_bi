angular
.module('MetronicApp')
.controller('CodeController', function($rootScope, $scope, $timeout, $location, $cookies, $window, $filter, $state, $sce, CodeService, NgTableParams) {
	$scope.tableDisplayCode = [];
    $scope.tableDataCode = [];
    $scope.tableParamsCode = new NgTableParams({
    	page: 1, // show first page
        count: 5, // count per page
        filter: {},
        sorting: {} 
    }, {
        total: $scope.tableDataCode.length, // length of data
        getData: function($defer,params) {
        	 var filteredData = params.filter() ?
     	            $filter('filter')($scope.tableDataCode, params.filter()) :
                 	$scope.tableDataCode;
 	        var orderedData = params.sorting() ?
 	            $filter('orderBy')(filteredData, params.orderBy()) :
 	            $scope.tableDataCode;
            params.total(orderedData.length); // set total for recalc pagination
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            $scope.tableDisplayCode = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
        }
    });
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
    $scope.o1 = [{n: 'Mã thường', v: 0},
                 {n: 'Mã tự hủy', v: 1},
                 {n: 'Mã xác thực 2 lần', v: 3},
                 {n: 'Mã cá nhân', v: 9}
//               {n: 'Mã vị trí', v: 8}
	];
    $scope.o216 = [
                          {n:'Mẫu Tem Lớn', v:1},
                          {n:'Mẫu Tem Nhỏ', v:2},
                          {n:'Mẫu Tem Tomy 145', v:145},
                          {n:'Mẫu Tem Tomy 145_2', v:1452},
                          {n:'Mẫu Tem Phủ Cào', v:802}
                          ];
    $scope.cl1 = fn1;
    $scope.cl11 = fn11; 
    $scope.cl111 = fn111;
    $scope.cl12 = fn12;
    $scope.s20 = fn20;
    $scope.cl21 = fn21; 
    $scope.cl22 = fn22; 
    $scope.cl23 = fn23; 
    $scope.cl211 = fn211; 
    $scope.cl2130 = fn213;
    $scope.cl213 = fn214;
    $scope.cl214 = fn2141
    $scope.cl216 = fn216;
    $scope.cl217 = fn217;
    $scope.bindHtmlRender = fnBindHtmlRender;
    $scope.cl2151 = fnClickPrintForm;
    $scope.cl215 = fn215;
	(function initController() {
//		console.log('anhdd-code');
//		console.log($rootScope.r3);
		fn1(1);
    })();
	function fn1(next){	
		$scope.l01 = true;
		App.startPageLoading({animate: true});
		var rq = {};
    	rq.sessionid = $cookies.get('ck1');
    	rq.com_id = $cookies.get('ck2');
    	rq.next = next;
    	rq.app = 'check';
    	CodeService.f10(rq, function (rp) {
    		if (rp.code == 200) {
    			console.log(rp);
    			if(rp.file[0]){
//    				$scope.tableDataCode.push.apply($scope.tableDataCode, rp.file);
    				$scope.tableDataCode = rp.file;
    				$scope.tableParamsCode.reload();
//    				fn12(rp.file[0]);    					
//    				if(next == 1){
//    				}
//    				fn1(next+1);
    				CodeService.f1(rq, function (rp1) {
    					if (rp1.code == 200) {
    						console.log(rp1);
    						$scope.tableDataCode = rp1.file;
    	    				$scope.tableParamsCode.reload();
    	    				fn12(rp1.file[0]);
//    						for(var i1=0; i1<$scope.tableDataCode.length; i1++){
//    							for(var i2=0; i<rp.file.length; i2++){
//    								if($scope.tableDataCode[i1].cod_id === rp.file[i2].cod_id){
//    									
//    								}
//    							}
//    						}
    	    				$scope.l01 = false;
    					}
    				});
    			}else{
    				$scope.tableDataCode = [];
    				$scope.tableParamsCode.reload();
    			}
    			App.stopPageLoading();
    		}else if(rp.code == 700){
    			App.stopPageLoading();
    			$rootScope.user_lockscreen();
    		}
    	});
	}
	function fn11() {
		$("#md1").modal({
            backdrop: 'static',
            keyboard: true, 
            show: true
		});
//		$scope.m11
    };
    function fn111(a1, a2, a3, a4, a5){//tao file ma
		var rq = {};
		rq.sessionid = $cookies.get('ck1');
    	rq.com_id = $cookies.get('ck2');
    	rq.app = 'check';
    	rq.cod_type = a1.v;
    	rq.cod_amount = a2;
    	rq.cod_description = a3;
    	rq.cod_serial = a4;
    	rq.cod_column = a5;
    	console.log(rq);
    	if(a4 == true){
    		if(a1.v == 3){
    			CodeService.f820(rq, function (rp) {
        			if (rp.code == 200) {
        				$('#md1').modal('hide');
        				$timeout(function () {
        					$state.reload();
        				}, 2000);
        			}else{
        				$('#md1').modal('hide');
        			}
        		});
    		}else{
    			CodeService.f82(rq, function (rp) {
        			if (rp.code == 200) {
        				$('#md1').modal('hide');
        				$timeout(function () {
        					$state.reload();
        				}, 2000);
        			}else{
        				$('#md1').modal('hide');
        			}
        		});
    		}    		
    	}else{
    		if(a1.v == 3){
    			CodeService.f810(rq, function (rp) {
    				console.log(rp);
    				if (rp.code == 200) {
    					$('#md1').modal('hide');
    					$timeout(function () {
    						$state.reload();
    					}, 2000);
    				}else{
    					$('#md11').modal('hide');
    				}
    			});
    		}else{
    			CodeService.f81(rq, function (rp) {
    				if (rp.code == 200) {
    					$('#md1').modal('hide');
    					$timeout(function () {
    						$state.reload();
    					}, 2000);
    				}else{
    					$('#md1').modal('hide');
    				}
    			});
    		}
    	}
	}
    function fn12(a){
    	if($scope.s11 == a.cod_id){
			$scope.bl1 = false;			
			$scope.s11 = 0;
		}else{
			$scope.bl1 = true;	
			$scope.sh1 = true;
			$scope.s11 = a.cod_id;
			$scope.s1 = a;	
			fn212(a);
			console.log(a);
			$scope.bl213 = false;
			$scope.sh2 = false;
		}
    }
    function fn20(a0,a1,a2,a3,a4){
    	
    }
    function fn21(a){
    	$scope.sh1 = true; $scope.sh2 = false; $scope.sh3 = false;$scope.sh2 = false;$scope.bl3 = false;
    	
    }
    function fn22(a){
    	$scope.sh1 = false; $scope.sh2 = true; $scope.sh3 = false;$scope.sh2 = true;$scope.bl3 = true;
    	$scope.bl213 = false;
    	fn213();
    }
    function fn23(a){
    	$scope.sh1 = false; $scope.sh2 = false; $scope.sh3 = true;$scope.sh2 = false;$scope.bl3 = false;
    	$scope.bl213 = false;
    }
    function fn211(a){
    	var rq = {};
    	rq.sessionid = $cookies.get('ck1');
    	rq.com_id = $cookies.get('ck2');
    	rq.app = 'check';
    	rq.cod_file = a;
    	CodeService.f4(rq, function (rp) {
    		if (rp.code == 200) {
    			$('#md11').modal('hide');
    			$timeout(function () {
    		        $state.reload();
    		    }, 1000);
    		}
    	});
    }
    function fn212(a){
    	App.blockUI({
            target: '#tb220',
            animate: true
        });
    	var rq = {};
    	rq.sessionid = $cookies.get('ck1');
    	rq.com_id = $cookies.get('ck2');
    	rq.cod_file = a.cod_file;
    	rq.app = 'check';
    	CodeService.f501(rq, function (rp) {
    		if (rp.code == 200) {
    			console.log(rp.batch);
    			$scope.tableDataBatch = rp.batch;
				$scope.tableParamsBatch.reload();
				App.unblockUI('#tb220');
//				fnHighchart21(cod);
    		}else if(rp.code == 700){
    			$rootScope.user_lockscreen();
    			App.unblockUI('#tb220');
    		}
    	});
    }
    function fn213(){
    	$scope.bl213 = true;
		var rq = {};
		rq.sessionid = $cookies.get('ck1');
    	rq.com_id = $cookies.get('ck2');
    	rq.app = 'check';
    	CodeService.f6(rq, function (rp) {
    		if (rp.code == 200) {
    			console.log(rp.product);
    			$scope.o213 = rp.product;
//    			$scope.m213 = rp.product[0];
//    			fn214(rp.product[0]);
    		}else if(rp.code == 700){
    			$rootScope.user_lockscreen();
    		}else{
    			toaster.pop('warning', '', rp.description);
    		}
    	});
	}
    function fn214(a){
    	$scope.m20 = a;
    	$scope.bl214 = true;
		var rq = {};
		rq.sessionid = $cookies.get('ck1');
    	rq.com_id = $cookies.get('ck2');
    	rq.app = 'check';		    	
    	rq.pro_id = a.pro_id;
    	CodeService.f7(rq, function (rp) {
    		if (rp.code == 200) {
    			console.log(rp.batch);
    			$scope.o214 = rp.batch;
//				$scope.m214 = rp.batch[0];
//				$scope.bl215 = true;
//				$scope.m215 = $scope.s1.cod_file;
    		}else if(rp.code == 700){
    			$rootScope.user_lockscreen();
    		}else{
    			toaster.pop('warning', '', rp.description);
    		}
    	});
	}
    
    function fn2141(a){
    	$scope.m21 = a;
    	
	}
    
    function fn215(a1, a2, a4, a5){
    	$scope.l1 = true;
    	var rq = {};
    	rq.sessionid = $cookies.get('ck1');
    	rq.com_id = $cookies.get('ck2');
    	rq.app = 'check';
    	rq.bat_id = a1;
    	rq.code_file = a2;
    	rq.ite_stat = 3;
    	rq.serial_from = a4;
    	rq.serial_to = a5;
    	console.log(rq);
    	if((a4>0) && (a5>a4)){
	    	CodeService.f101(rq, function (rp) {
	    		if (rp.code == 200) {
//	    			toaster.pop('success', 'Active file mã', rp.description);
	    			$('#md12').modal('hide');
	    			fn1(1);
	    			$scope.l1 = false;
	    		}else{
//	    			toaster.pop('success', 'Active file mã', rp.description);
	    			$('#md12').modal('hide');
	    			$scope.l1 = false;
	    		}
	    	});
    	}else{
	    	CodeService.f100(rq, function (rp) {
	    		if (rp.code == 200) {
//	    			toaster.pop('success', 'Active file mã', rp.description);
	    			$('#md12').modal('hide');
	    			fn1(1);
	    			$scope.l1 = false;
	    		}else{
//	    			toaster.pop('success', 'Active file mã', rp.description);
	    			$('#md12').modal('hide');
	    			$scope.l1 = false;
	    		}
	    	});		    		
    	}
    }
    function fn216(a1, a2, a3, a4){
    	$scope.bl216 = true;
    	if(a4.v === 1){
    		$scope.bl2151 = true;
    		$scope.m2151 = $rootScope.r3.com_fullname;
    		fnClickPrintForm(a1, a2, a3, a4, $rootScope.r3);
//    		console.log();
    	}
    	if(a4.v === 2){
    		$scope.bl2151 = true;
    		$scope.m2151 = $rootScope.r3.com_fullname;
    		fnClickPrintForm(a1, a2, a3, a4, $rootScope.r3);
//    		console.log();
    	}
    	if(a4.v === 145){
    		$scope.bl2151 = true;
    		$scope.m2151 = $rootScope.r3.com_fullname;
    		fnClickPrintForm(a1, a2, a3, a4, $rootScope.r3);
//    		console.log();
    	}
    	if(a4.v === 1452){
    		$scope.bl2151 = true;
    		$scope.m2151 = $rootScope.r3.com_fullname;
    		fnClickPrintForm(a1, a2, a3, a4, $rootScope.r3);
//    		console.log();
    	}
    	if(a4.v === 802){
    		$scope.bl2151 = true;
    		$scope.bl2152 = true;
    		$scope.m2151 = $rootScope.r3.com_fullname;
    		fnClickPrintForm(a1, a2, a3, a4, $rootScope.r3);
//    		console.log();
    	}
    }
    function fnClickPrintForm(pro, bat, cod, stamp, company, img_anhdd){
//    	console.log(img_anhdd);
    	if(stamp.v == 1){
			console.log('tem lớn');
			$scope.bindHtmlData = '';
			var item_total = cod.cod_amount;
			var iStampColumn = 3;
			//---
			var rq = {};
			rq.sessionid = $cookies.get('ck1');
		    rq.com_id = $cookies.get('ck2');
			rq.app = 'check';
			rq.cod_file = cod.cod_file;
			console.log(bat);
			CodeService.f9(rq, function (rp){
				console.log(rp);
				console.log(item_total);
				$scope.bindHtmlData += '<table class="padding-top-0">';
				while(item_total > 0){
					 $scope.bindHtmlData += '<tr style="page-break-inside:avoid; page-break-after:avoid">';
					 for(var iColumn=0; iColumn<iStampColumn; iColumn++){
						 // thanghm@
						 // anhdd@ sua ngay 16/4/2016
						 var body = '	<td  style="border: 0mm solid black; padding: 0px;">';
		//						 body += 	'      	<div style="border-radius: 2mm; border: 1mm solid #000000; background: #ffffff; width: 59.8mm; height: 35.6mm; margin-top: 0.95mm; margin-right: 2.84mm; margin-bottom:0.86mm; margin-left: 0.95mm; position: relative;  box-sizing: border-box; ">';
						 body += 	'      	<div style="border-radius: 2mm; border: 1mm solid #000000; background: #ffffff; width: 63.8mm; height: 38.1mm; margin-top: 0.95mm; margin-right: 2.84mm; margin-bottom:0.86mm; margin-left: 0.95mm; position: relative;  box-sizing: border-box; ">';
						 body +=  	'    		<div class="row">';
						 body +=  	'    			<div class="col-xs-12 text-center" style="color:blue; position: relative;  width:100%; font-size: 13pt; float:center;">';
						 body +=  	'    				<b>';
						 body +=                    		company.com_fullname;
						 body += 	'					</b>';
						 body +=  	'    			</div>';
						 body +=  	'    		</div>';
						 body +=  	'    		<div class="row no-margin">';
						 body +=  	'    			<div class="col-xs-8 text-left no-padding padding-left-2">';
		//						 body +=  	'                 	<img style="width:50%" src="data:image/gif;base64,'+$scope.modelCompany.com_picture+'">';
						 body +=	'					<p class="no-margin">';
						 body +=  	'                 		Mã SP: ' + rp.qrcode[item_total-1];
						 body +=	'					</p>';
						 body +=	'					<p class="no-margin">';
						 body +=  	'                 		Tên SP: ' + pro.pro_name;
						 body +=	'					</p>';
						 if(bat.bat_mandate){
							 body +=	'					<p class="no-margin">';
							 body +=  	'                 		Ngày SX: ' + bat.bat_mandate;
							 body +=	'					</p>';									 
						 }
						 body +=  	'    			</div>';
						 body +=  	'    			<div class="col-xs-4 text-center no-padding">';
						 body +=                    	fnQrCreate('http://ezcheck.vn/'+rp.qrcode[item_total-1]);
						 body +=  	'    			</div>';
						 body +=  	'    		</div>';
						 body +=  	'    		<div class="row no-margin">';
						 body +=  	'    			<div class="col-xs-12 text-center no-padding">';
						 body +=  	'                 	<div style="position: absolute; top:77%; width:100%; font-size: 7pt;">';
		//						 body +=  	'                 		Sản phẩm đã được công khai nguồn gốc, dùng phần mềm <b>ezCheck</b> trên điện thoại để kiểm tra!';
						 body +=  	'                 		Quét QrCode để kiểm tra sản phẩm chính hãng!';
						 body +=  	'                 	</div>';
						 body +=  	'    			</div>';
						 body +=  	'    		</div>';
						 body +=  	'    	</div>';
						 body += 	'	</td>';
						 $scope.bindHtmlData += body;
						 item_total --;
						 if(item_total == 0){break;}
					 }
					 $scope.bindHtmlData += '</tr>';
				 }
				 $scope.bindHtmlData += '</table>';
//				 console.log($scope.bindHtmlData);
				 $scope.bl3 = true;
			 });
    	}else if(stamp.v == 2){
    		 console.log(cod.cod_amount);
    		 $scope.bindHtmlData = '';
			 var item_total = cod.cod_amount;
			 var iStampColumn = 10;
			 //---
			 var rq = {};
			 rq.sessionid = $cookies.get('ck1');
			    rq.com_id = $cookies.get('ck2');
			 rq.app = 'check';
			 rq.cod_file = cod.cod_file;
			 console.log(rq);
			 CodeService.f9(rq, function (rp){
				 console.log(rp);
				 $scope.bindHtmlData += '<table class="padding-top-0">';
				 while(item_total > 0){
					 $scope.bindHtmlData += '<tr style="page-break-inside:avoid; page-break-after:avoid">';
					 for(var iColumn=0; iColumn<iStampColumn; iColumn++){
						 // thanghm@
						 // anhdd@ sua ngay 16/4/2016
						 var body = '	<td  style="border: 0mm solid black; padding: 0px;">';
						 body += 	'      	<div style="border-radius: 0mm; border: 0.0mm solid #000000; background: #ffffff; width: 19.51mm; height: 14.51mm; margin-top: 0.45mm; margin-right: 0.35mm; margin-bottom:0.0mm; margin-left: 0.0mm; position: relative;  box-sizing: border-box; ">';
						 body +=  	'    		<div class="row no-margin">';
						 body +=  	'    			<div class="col-xs-8 text-right padding-top-5 padding-right-0 padding-left-0 no-margin">';
						 body +=                    	fnQrCreate('http://ezcheck.vn/'+rp.qrcode[item_total-1]);
						 body +=  	'    			</div>';
						 body +=  	'    			<div class="col-xs-4 text-left no-padding">';
//						 body +=  	'                 	<p style="position: absolute; margin-top: 2.0mm; font-size: 6pt; transform: rotate(90deg);">';
//						 body +=  	'                 	<p class="no-margin " style="font-size: 6pt; width: 18.8mm; transform: rotate(90deg);">';
//						 body +=  	'                 	<div style="position: absolute; font-size: 6pt;">';
//						 body +=  	'                 		quét mã';
//						 body +=                    		company;
//						 body +=  	'                 	</p>';
						 
						 body +=  	'    				<span class="rotated-text">';
						 body +=  	'    					<span class="rotated-text__inner">';
						 body +=                    			company.com_fullname;
						 body +=  	'    					</span>';								 
						 body +=  	'    				</​span>';
						 body +=  	'    			</div>';
						 body +=  	'    		</div>';
						 body +=  	'    	</div>';
						 body += 	'	</td>';
						 $scope.bindHtmlData += body;
						 item_total --;
						 if(item_total == 0){break;}
					 }
					 $scope.bindHtmlData += '</tr>';
				 }
				 $scope.bindHtmlData += '</table>';
				 $scope.bl3 = true;
			 });
    	}else if(stamp.v == 145){
    		 console.log('tem tomy 145');
    		 $scope.bindHtmlData = '';
			 var item_total = cod.cod_amount;
			 var iStampColumn = 5;
			 //---
			 var rq = {};
			 rq.sessionid = $cookies.get('ck1');
			    rq.com_id = $cookies.get('ck2');
			 rq.app = 'check';
			 rq.cod_file = cod.cod_file;
			 console.log(rq);
			 CodeService.f9(rq, function (rp){
				 console.log(rp);
				 $scope.bindHtmlData += '<table class="padding-top-0">';
				 while(item_total > 0){
					 $scope.bindHtmlData += '<tr style="page-break-inside:avoid; page-break-after:avoid">';
					 for(var iColumn=0; iColumn<iStampColumn; iColumn++){
						 
						 // anhdd@ sua ngay 27/9/2016
						 var body = '	<td  style="border: 0mm solid black; padding: 0px;">';
//						 body += 	'      	<div style="border-radius: 2mm; border: 1mm solid #000000; background: #ffffff; width: 35.8mm; height: 35.6mm; margin-top: 0.95mm; margin-right: 2.84mm; margin-bottom:0.86mm; margin-left: 0.95mm; position: relative;  box-sizing: border-box; ">';
						 body += 	'      	<div style="border-radius: 1mm; border: 0.3mm solid #000000; background: #ffffff; width: 36mm; height: 20mm; margin-top: 0.4mm; margin-right: 0.9mm; margin-bottom:0.5mm; margin-left: 0.7mm; position: relative;  box-sizing: border-box; ">';
						 body +=  	'    		<div class="row">';
						 body +=  	'    			<div class="col-xs-12 text-center" style="color:blue; position: relative;  width:100%; font-size: 10pt; float:center;">';
						 body +=  	'    				<b>';
						 body +=                    		company.com_fullname;
						 body += 	'					</b>';
						 body +=  	'    			</div>';
						 body +=  	'    		</div>';
						 body +=  	'    		<div class="row no-margin">';
						 body +=  	'    			<div class="col-xs-8 text-left no-padding">';
//						 body +=  	'                 	<img style="width:50%" src="data:image/gif;base64,'+$scope.modelCompany.com_picture+'">';
						 body +=	'					<p class="no-margin" style="font-size: 6pt;">';
						 body +=  	'                 		Mã SP: ' + rp.qrcode[item_total-1];
						 body +=	'					</p>';
						 body +=	'					<p class="no-margin" style="font-size: 6pt;">';
						 body +=  	'                 		Tên SP: ' + pro.pro_name;
						 body +=	'					</p>';
						 if(bat.bat_mandate){
							 body +=	'					<p class="no-margin" style="font-size: 6pt;">';
							 body +=  	'                 		Ngày SX: ' + bat.bat_mandate;
							 body +=	'					</p>';									 
						 }
						 body +=  	'    			</div>';
						 body +=  	'    			<div class="col-xs-4 text-center no-padding  no-margin">';
						 body +=                    	fnQrCreate('http://ezcheck.vn/'+rp.qrcode[item_total-1]);
						 body +=  	'    			</div>';
						 body +=  	'    		</div>';
//						 body +=  	'    		<div class="row no-margin">';
//						 body +=  	'    			<div class="col-xs-12 text-center no-padding">';
//						 body +=  	'                 	<div style="position: absolute; top:77%; width:100%; font-size: 7pt;">';
////						 body +=  	'                 		Sản phẩm đã được công khai nguồn gốc, dùng phần mềm <b>ezCheck</b> trên điện thoại để kiểm tra!';
//						 body +=  	'                 		Quét QrCode để kiểm tra sản phẩm chính hãng!';
//						 body +=  	'                 	</div>';
//						 body +=  	'    			</div>';
//						 body +=  	'    		</div>';
						 body +=  	'    	</div>';
						 body += 	'	</td>';
						 $scope.bindHtmlData += body;
						 item_total --;
						 if(item_total == 0){break;}
					 }
					 $scope.bindHtmlData += '</tr>';
				 }
				 $scope.bindHtmlData += '</table>';
//				 console.log($scope.bindHtmlData);
				 $scope.bl3 = true;
			 });
    	}else if(stamp.v == 1452){
    		console.log('tem tomy 1452');
    		$scope.bindHtmlData = '';
			 var item_total = cod.cod_amount;
			 var iStampColumn = 5;
			 //---
			 var rq = {};
			 rq.sessionid = $cookies.get('ck1');
			    rq.com_id = $cookies.get('ck2');
			 rq.app = 'check';
			 rq.cod_file = cod.cod_file;
			 console.log(bat);
			 CodeService.f9(rq, function (rp){
				 console.log(rp);
				 $scope.bindHtmlData += '<table class="padding-top-0">';
				 while(item_total > 0){
					 $scope.bindHtmlData += '<tr style="page-break-inside:avoid; page-break-after:avoid">';
					 for(var iColumn=0; iColumn<iStampColumn; iColumn++){
						 
						 // anhdd@ sua ngay 27/9/2016
						 var body = '	<td  style="border: 0mm solid black; padding: 0px;">';
//						 body += 	'      	<div style="border-radius: 2mm; border: 1mm solid #000000; background: #ffffff; width: 35.8mm; height: 35.6mm; margin-top: 0.95mm; margin-right: 2.84mm; margin-bottom:0.86mm; margin-left: 0.95mm; position: relative;  box-sizing: border-box; ">';
						 body += 	'      	<div style="border-radius: 1mm; border: 0.3mm solid #000000; background: #ffffff; width: 36mm; height: 20mm; margin-top: 0.4mm; margin-right: 0.9mm; margin-bottom:0.5mm; margin-left: 0.7mm; position: relative;  box-sizing: border-box; ">';
						 body +=  	'    		<div class="row no-margin">';
						 body +=  	'    			<div class="col-xs-12 padding-right-0 padding-left-0 text-center" style="color:blue; position: relative;  width:100%; font-size: 10pt; float:center;">';
						 body +=  	'    				<b>';
						 body +=                    		company.com_fullname;
						 body += 	'					</b>';
						 body +=  	'    			</div>';
						 body +=  	'    		</div>';
						 body +=  	'    		<div class="row no-margin">';
						 body +=  	'    			<div class="col-xs-7 text-left padding-top-5 padding-right-0 padding-left-2">';
//						 body +=  	'                 	<img style="width:50%" src="data:image/gif;base64,'+$scope.modelCompany.com_picture+'">';
//						 body +=	'					<p class="no-margin" style="font-size: 6pt;">';
//						 body +=  	'                 		Mã SP: ' + rp.qrcode[item_total-1];
//						 body +=	'					</p>';
						 body +=	'					<p class="no-margin" style="font-size: 6pt;">';
						 body +=  	                 		'<strong>' +pro.pro_name+ '</strong>';
//						 body +=  	'                 		Tên SP: ' + pro.pro_name;
						 body +=	'					</p>';
						 body +=	'					<p class="no-margin" style="font-size: 6pt;">';
						 body +=  	'                 		<strong>Lô: ' + bat.bat_name+ '</strong>';
						 body +=	'					</p>';
						 body +=	'					<p class="no-margin" style="font-size: 6pt;">';
						 body +=  	'                 		<strong>ĐT: ' + company.com_mobile+ '</strong>';
						 body +=	'					</p>';
						 if(bat.bat_mandate){
							 body +=	'					<p class="no-margin" style="font-size: 6pt;">';
							 body +=  	'                 		Ngày Thu Hoạch: ' + bat.bat_mandate;
							 body +=	'					</p>';									 
						 }
						 body +=	'					<p class="no-margin text-center padding-top-3" style="font-size: 6pt;float:center;">';
						 body +=  	'                 		Quét để xác thực';
						 body +=	'					</p>';
						 body +=  	'    			</div>';
						 body +=  	'    			<div class="col-xs-5 text-center padding-2 no-margin">';
						 body +=                    	fnQrCreate('http://ezcheck.vn/'+rp.qrcode[item_total-1]);
						 body +=  	'    			</div>';
						 body +=  	'    		</div>';
//						 body +=  	'    		<div class="row no-margin">';
//						 body +=  	'    			<div class="col-xs-12 text-center no-padding">';
//						 body +=  	'                 	<div style="position: absolute; top:77%; width:100%; font-size: 7pt;">';
////						 body +=  	'                 		Sản phẩm đã được công khai nguồn gốc, dùng phần mềm <b>ezCheck</b> trên điện thoại để kiểm tra!';
//						 body +=  	'                 		Quét QrCode để kiểm tra sản phẩm chính hãng!';
//						 body +=  	'                 	</div>';
//						 body +=  	'    			</div>';
//						 body +=  	'    		</div>';
						 body +=  	'    	</div>';
						 body += 	'	</td>';
						 $scope.bindHtmlData += body;
						 item_total --;
						 if(item_total == 0){break;}
					 }
					 $scope.bindHtmlData += '</tr>';
				 }
				 $scope.bindHtmlData += '</table>';
//				 console.log($scope.bindHtmlData);
				 $scope.bl3 = true;
			 });
    	}else if(stamp.v == 802){
    		 console.log('tem moi');
//    		 console.log(img_anhdd);
    		 $scope.bindHtmlData = '';
			 var item_total = cod.cod_amount;
			 var iStampColumn = 4;
			 //---
			 var rq = {};
			 rq.sessionid = $cookies.get('ck1');
			    rq.com_id = $cookies.get('ck2');
			 rq.app = 'check';
			 rq.cod_file = cod.cod_file;
			 console.log(rq);
			 CodeService.f92(rq, function (rp){
				 console.log(rp);
				 
				 $scope.bindHtmlData += '<table class="padding-top-0">';
				 while(item_total > 0){
					 $scope.bindHtmlData += '<tr style="page-break-inside:avoid; page-break-after:avoid">';
					 for(var iColumn=0; iColumn<iStampColumn; iColumn++){
						 
						 // antony@ sua ngay 3/10/2016
						 var body = '	<td  style="border: 0mm solid black; padding: 0px; color:black">';
//						 body += 	'      	<div style="border-radius: 2mm; border: 1mm solid #000000; background: #ffffff; width: 35.8mm; height: 35.6mm; margin-top: 0.95mm; margin-right: 2.84mm; margin-bottom:0.86mm; margin-left: 0.95mm; position: relative;  box-sizing: border-box; ">';
						 body += 	'      	<div style="border-radius: 1mm; border: 0.3mm solid #000000; background: #ffffff; width: 48mm; height: 30mm; margin-top: 1mm; margin-right: 0.9mm; margin-bottom:0.5mm; margin-left: 0.7mm; position: relative;  box-sizing: border-box; ">';
						 body +=  	'    		<div class="row no-margin">';
						 body +=  	'    			<div class="col-xs-6 padding-left-10 padding-right-5  padding-top-5">';
						 body +=    '                		<img class="img-responsive margin-left-10" style="height:37px;" src="'+img_anhdd+'">';
						 body +=  	'    			</div>';
						 body +=  	'    			<div class="col-xs-6 text-center padding-top-10 padding-right-0 padding-left-0">';
						 body +=  	'    				<p class="no-margin red" style="font-size: 7pt; color:red">';
						 body +=  	'                 		<strong class="red">TEM XÁC THỰC </strong> ';
						 body +=	'					</p>';
						 body +=  	'    				<p class="no-margin blue" style="font-size: 5pt;color:#000066">';
						 body +=  	'                 		<b class="blue">HÀNG CHÍNH HÃNG </b>';
						 body +=	'					</p>';
						 body +=  	'    			</div>';
						 body +=  	'    		</div>';
						 body +=  	'    		<div class="row no-margin">';
						 body +=  	'    			<div class="col-xs-8 text-center no-padding margin-top-5">';
						 body +=	'					<p class="no-margin" style="font-size: 4pt; margin-left: 4mm">';
						 body +=  	'                 		<i>Cào nhẹ lớp phủ để lấy mã số</i>';
						 body +=	'					</p>';
						 body +=    '					<div style="border: 0.1mm solid #ffffff; background: #ffffff; width: 25mm; height: 4mm; margin-top: 1.5mm; margin-right: 0.9mm; margin-bottom:1.5mm; margin-left: 3mm; position: relative;  box-sizing: border-box; ">';
						 body +=	'						<p class="no-margin text-center" style="color:#888; font-size: 6pt;padding-top: 2px">';
						 body +=  	'                 			<span class = "grey">'+rp.qrcode[item_total-1].authen+'</span>' ;
						 body +=	'						</p>';
						 body +=    '   				</div>';			
						 body +=	'					<p class="no-margin" style="font-size: 4pt;">';
						 body +=  	'                 		<strong> <i>Để kiểm tra sản phẩm chính hãng</i></strong>';
						 body +=	'					</p>';
						 body +=	'					<p class="no-margin" style="font-size: 4pt;">';
						 body +=  	'                 		Quét mã <span style="color:red">QR code</span> và làm theo hướng dẫn';
						 body +=	'					</p>';
						 body +=	'					<p class="no-margin" style="font-size: 4pt;">';
						 body +=  	'                 		Hoặc soạn tin: <span style="color:red">XT</span>_<i>mã số</i> gửi <span style="color:red">8055</span> (1000đ/tin)';
						 body +=	'					</p>';
						 body +=  	'    			</div>';
						 body +=  	'    			<div class="col-xs-4 text-center no-padding  no-margin">';
						 body +=                    	fnQrCreate('http://ezcheck.vn/'+rp.qrcode[item_total-1].code);
						 if(rp.qrcode[item_total-1].serial){
						 body +=	'					<p class="no-margin" style="font-size: 5pt;">';
						 body +=  	'                 		Serial: '+ rp.qrcode[item_total-1].serial;
						 body +=	'					</p>';
						 }
						 body +=  	'    			</div>';
						 body +=  	'    		</div>';
//						 body +=  	'    		<div class="row no-margin">';
//						 body +=  	'    			<div class="col-xs-12 text-center no-padding">';
//						 body +=  	'                 	<div style="position: absolute; top:77%; width:100%; font-size: 7pt;">';
////						 body +=  	'                 		Sản phẩm đã được công khai nguồn gốc, dùng phần mềm <b>ezCheck</b> trên điện thoại để kiểm tra!';
//						 body +=  	'                 		Quét QrCode để kiểm tra sản phẩm chính hãng!';
//						 body +=  	'                 	</div>';
//						 body +=  	'    			</div>';
//						 body +=  	'    		</div>';
						 body +=  	'    	</div>';
						 body += 	'	</td>';
						 $scope.bindHtmlData += body;
						 item_total --;
						 if(item_total == 0){break;}
					 }
					 $scope.bindHtmlData += '</tr>';
				 }
				 $scope.bindHtmlData += '</table>';
//				 console.log($scope.bindHtmlData);
				 $scope.bl3 = true;
			 });
    	 }		    	
    }
    function fnBindHtmlRender(htmlCode) {
    	return $sce.trustAsHtml(htmlCode);
	}
    function fnQrCreate(text) {        	
     	var qr = qrcode(2, 'L');
     	
     	qr.addData(text);
     	qr.make();
     	return qr.createImgTag();      	
    }
    function fnQrCreate2(text) {        	
     	var qr = qrcode(2, 'L');
     	
     	qr.addData(text);
     	qr.make();
//     	return qr.createImgTag(); 
     	
     	var modules = qr.getModuleCount();
    	var tile = 25 / modules;
    	return qr.createImgTag(tile, 0); 
     	
    }
    function fnQrCreate3(text) {        	
     	var qr = qrcode(2, 'L');
     	
     	qr.addData(text);
     	qr.make();
//     	return qr.createImgTag(); 
     	
     	var modules = qr.getModuleCount();
    	var tile = 72 / modules;
    	return qr.createImgTag(tile, 0); 
     	
    }
    function fn217(){
		window.print();
		window.close();
	}
	function fnClickCancel(){
		$scope.bindHtmlData = '';
		$scope.isPrint = true;
		$scope.showPrintstamp = false;
	}
});