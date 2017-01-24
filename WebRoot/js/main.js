/***
Metronic AngularJS App Main Script
***/

/* Metronic App */
var MetronicApp = angular.module("MetronicApp", [
    "ui.router", 
    "ui.bootstrap", 
    "oc.lazyLoad",  
    "ngSanitize",
    'uiRouterStyles',
    'ngCookies',
    'ngStorage',
    'textAngular',
    'angular-img-cropper'
]); 

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    	
    });
}]);

/********************************************
 BEGIN: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/
/**
`$controller` will no longer look for controllers on `window`.
The old behavior of looking on `window` for controllers was originally intended
for use in examples, demos, and toy apps. We found that allowing global controller
functions encouraged poor practices, so we resolved to disable this behavior by
default.

To migrate, register your controllers with modules rather than exposing them
as globals:

Before:

```javascript
function MyController() {
  // ...
}
```

After:

```javascript
angular.module('myApp', []).controller('MyController', [function() {
  // ...
}]);

Although it's not recommended, you can re-enable the old behavior like this:

```javascript
angular.module('myModule').config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);
**/

//AngularJS v1.3.x workaround for old style controller declarition in HTML
MetronicApp.config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/

/* Setup global settings */
MetronicApp.factory('settings', ['$rootScope', function($rootScope) {
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath: 'assets',
        globalPath: 'assets/global',
        layoutPath: 'assets/layouts/layout3',
    };
    $rootScope.settings = settings;
    return settings;
}]);

/* Setup App Main Controller */
MetronicApp.controller('AppController', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
    $scope.$on('$viewContentLoaded', function() {
        App.initComponents();
        if($location.path() === '/login'){
        	$rootScope.showLogin = false;
        }else{
        	$rootScope.showLogin = true;
        }
        if($('body').hasClass('page-quick-sidebar-open')){
        	$('body').removeClass('page-quick-sidebar-open');        	
        }
    });
}]);

/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial 
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/

/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
    });
}]);

/* Setup Layout Part - Sidebar */
MetronicApp.controller('SidebarController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initSidebar(); // init sidebar
    });
}]);

/* Setup Layout Part - Quick Sidebar */
MetronicApp.controller('QuickSidebarController', ['$rootScope', '$scope', '$cookies', '$state', '$sessionStorage', '$location', function($rootScope, $scope, $cookies, $state, $sessionStorage, $location) {    
	$scope.f1 = fn1;
	$scope.cl2 = fn2;
    $scope.$on('$includeContentLoaded', function() {
       setTimeout(function(){
            QuickSidebar.init(); // init quick sidebar        
        }, 2000);
    });
    
    function fn1(a){
    	$cookies.remove('ck2');
    	$cookies.put('ck2', a);
    	for(var i=0; i<$rootScope.r2.length; i++){
			if($rootScope.r2[i].com_id == $cookies.get('ck2')){
				$rootScope.r3 = $rootScope.r2[i];
			}
		}
    	console.log($rootScope.r3);
    	$state.reload();
    };
    function fn2(a){
    	console.log('click logout');
    	$cookies.remove('ck1');
    	$cookies.remove('ck2');
    	$cookies.remove('ck3');
		$rootScope.r1 = {};
		$sessionStorage.$reset();		
		$location.path('/login');
    }
}]);

/* Setup Layout Part - Sidebar */
MetronicApp.controller('PageHeadController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {        
        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Theme Panel */
MetronicApp.controller('ThemePanelController', ['$scope', function($scope) {    
    $scope.$on('$includeContentLoaded', function() {
        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Footer */
MetronicApp.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
    });
}]);

/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/home");      
    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "app/home/home.view.html",            
            data: {pageTitle: 'Bán Hàng'},
            controller: "HomeController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [                                
                                'app/home/home.controller.js',
                                'app/home/home.service.js',
                                'assets/global/plugins/ng-table-master/dist/ng-table.min.css',
        				        'assets/global/plugins/ng-table-master/dist/ng-table.min.js',
                                'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
        				        'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                                'assets/pages/scripts/components-date-time-pickers.min.js',
//                                'assets/global/plugins/highcharts/js/highcharts.js',
////                                'assets/global/plugins/highcharts/js/highcharts-more.js',
//                                'assets/global/plugins/highcharts/js/modules/exporting.js'
                        ] 
                    });
                }]
            }
        })      
        .state('product', {
        	url: "/product",
        	templateUrl: "app/product/product.view.html",            
        	data: {pageTitle: 'Sản Phẩm'},
        	controller: "ProductController",
        	resolve: {
        		deps: ['$ocLazyLoad', function($ocLazyLoad) {
        			return $ocLazyLoad.load({
        				name: 'MetronicApp',
        				insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
        				files: [                                
        				        'app/product/product.controller.js',
        				        'app/product/product.service.js',
        				        'assets/global/plugins/ng-table-master/dist/ng-table.min.css',
        				        'assets/global/plugins/ng-table-master/dist/ng-table.min.js'
//        				        'assets/global/plugins/bootstrap-modal/css/bootstrap-modal-bs3patch.css',
//        				        'assets/global/plugins/bootstrap-modal/css/bootstrap-modal.css',
//        				        'assets/global/plugins/bootstrap-modal/js/bootstrap-modal.js',
//        				        'assets/global/plugins/bootstrap-modal/js/bootstrap-modalmanager.js'
        				        ] 
        			});
        		}]
        	}
        })      
        .state('batch', {
        	url: "/batch",
        	templateUrl: "app/batch/batch.view.html",            
        	data: {pageTitle: 'Lô Hàng'},
        	controller: "BatchController",
        	resolve: {
        		deps: ['$ocLazyLoad', function($ocLazyLoad) {
        			return $ocLazyLoad.load({
        				name: 'MetronicApp',
        				insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
        				files: [                                
        				        'app/batch/batch.controller.js',
        				        'app/batch/batch.service.js',
        				        'assets/global/plugins/ng-table-master/dist/ng-table.min.css',
        				        'assets/global/plugins/ng-table-master/dist/ng-table.min.js',
        				        'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
        				        'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
        				        'assets/pages/scripts/components-date-time-pickers.min.js'
        				        ] 
        			});
        		}]
        	}
        })      
        .state('code', {
        	url: "/code",
        	templateUrl: "app/code/code.view.html",            
        	data: {pageTitle: 'Mã / Tem'},
        	controller: "CodeController",
        	resolve: {
        		deps: ['$ocLazyLoad', function($ocLazyLoad) {
        			return $ocLazyLoad.load({
        				name: 'MetronicApp',
        				insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
        				files: [                                
        				        'app/code/code.controller.js',
        				        'app/code/code.service.js',
        				        'assets/global/plugins/ng-table-master/dist/ng-table.min.css',
        				        'assets/global/plugins/ng-table-master/dist/ng-table.min.js',
        				        'assets/global/plugins/qrcode-generator-master/js/qrcode.js'
        				        ] 
        			});
        		}]
        	}
        })      
        .state('company', {
        	url: "/company",
        	templateUrl: "app/company/company.view.html",            
        	data: {
        		pageTitle: 'Mã / Tem',
        		css:['assets/pages/css/profile-2.min.css']
        			},
        	controller: "CompanyController",
        	resolve: {
        		deps: ['$ocLazyLoad', function($ocLazyLoad) {
        			return $ocLazyLoad.load({
        				name: 'MetronicApp',
        				insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
        				files: [                                
        				        'app/company/company.controller.js',
        				        'app/company/company.service.js',
        				        'assets/global/plugins/ng-table-master/dist/ng-table.min.css',
        				        'assets/global/plugins/ng-table-master/dist/ng-table.min.js',
        				        ] 
        			});
        		}]
        	}
        })      
        .state('support', {
        	url: "/support",
        	templateUrl: "app/support/support.view.html",            
        	data: {
        		pageTitle: 'Hỗ Trợ Khách Hàng'
        	},
        	controller: "CompanyController",
        	resolve: {
        		deps: ['$ocLazyLoad', function($ocLazyLoad) {
        			return $ocLazyLoad.load({
        				name: 'MetronicApp',
        				insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
        				files: [                                
        				        'app/support/support.controller.js',
        				        'app/support/support.service.js',
        				        'assets/global/plugins/ng-table-master/dist/ng-table.min.css',
        				        'assets/global/plugins/ng-table-master/dist/ng-table.min.js',
        				        ] 
        			});
        		}]
        	}
        })      
        
        // User Profile
        .state("profile", {
            url: "/profile",
            templateUrl: "app/profile/profile.view.html",
            data: {
            	pageTitle: 'User Profile',
            	css:['assets/pages/css/profile-2.min.css']
            	},
            controller: "ProfileController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',  
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'app/profile/profile.controller.js',
                            'app/profile/profile.service.js'
                        ]                    
                    });
                }]
            }
        })
        .state("login", {
            url: "/login",
            templateUrl: "app/login/login.view.html",
            data: {
            	pageTitle: 'Login',
            	css:['assets/pages/css/login-5.css']
            },
            controller: "LoginController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',  
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'app/login/login.controller.js',
                            'app/login/login.service.js'
                        ]                    
                    });
                }]
            }
        });
}]);

/* Init global settings and run the app */
MetronicApp.run(["$rootScope", "settings", "$state", '$location', '$cookies', '$sessionStorage', function($rootScope, settings, $state, $location, $cookies, $sessionStorage) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view
    
//    $rootScope.h = 'https://api.ezcheck.vn/';
    $rootScope.h = 'https://api.ezcheck.vn/';
    $rootScope.$on('$locationChangeStart', function () {
    	console.log('$locationChangeStart');
    	var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
    	var loggedIn = $cookies.get('ck1');
    	if (restrictedPage && !loggedIn) {
    		$location.path('/login');
    	}else{    		
        	$rootScope.r1 = $sessionStorage.ss1;
        	$rootScope.r2 = $sessionStorage.ss2;
        	if($cookies.get('ck2') && $rootScope.r2){
        		for(var i=0; i<$rootScope.r2.length; i++){
        			if($rootScope.r2[i].com_id == $cookies.get('ck2')){
        				$rootScope.r3 = $rootScope.r2[i];
//        				console.log($rootScope.r2);
        			}
        		}
        	}else{
        		$location.path('/login');
        	}
    	}
    });
}]);