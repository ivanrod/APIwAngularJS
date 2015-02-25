function playConfig(uiGmapGoogleMapApiProvider, $httpProvider, $urlRouterProvider, $stateProvider) {
	'use strict';
    //Config to load Google maps SDK
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });

    //AJAX headers to allow rails to identify it as request.xhr
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'AngularXMLHttpRequest';
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');

/*
    Routes with UI Router
*/
  $urlRouterProvider.otherwise("/dashboard");

  $stateProvider
    .state('index', {
      url: "/",
      views: {
        "viewNormal": { controller: 'dashboardCtrl as dashboard', 
                        templateUrl: 'assets/app/dashboard/dashboard.html' },
        "viewMobile": { controller: 'dashboardCtrl as dashboard', 
                        templateUrl: "assets/app/dashboard/dashboard.mobile.html" },
      },
      
    })
    .state('dashboard', {
      url: "/dashboard",
      views: {
        "viewNormal": { controller: 'dashboardCtrl as dashboard', 
                        templateUrl: "assets/app/dashboard/dashboard.html" },
        "viewMobile": { controller: 'dashboardCtrl as dashboard', 
                        templateUrl: "assets/app/dashboard/dashboard.mobile.html" },
      },
      controller: 'dashboardCtrl as dashboard'
    })  
    .state('user', {
      url: "/:userId",
      views: {
        "viewNormal": { controller: 'userCtrl as user',
                        templateUrl: "assets/app/user/user.html" },
        "viewMobile": { controller: 'userCtrl as user',
                        templateUrl: "assets/app/user/user.mobile.html" }
      }
    })  

}