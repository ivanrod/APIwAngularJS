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
      url: "",
      views: {
        "dashboard": { controller: 'dashboardCtrl as dashboard', 
                        templateUrl: 'assets/app/dashboard/dashboard.html' },
        "dashboardMobile": { controller: 'dashboardCtrl as dashboard', 
                        templateUrl: "assets/app/dashboard/dashboard.mobile.html" },
      },
      
    })
    .state('dashboard', {
      url: "/dashboard",
      views: {
        "dashboard": { controller: 'dashboardCtrl as dashboard', 
                        templateUrl: "assets/app/dashboard/dashboard.html" },
        "dashboardMobile": { controller: 'dashboardCtrl as dashboard', 
                        templateUrl: "assets/app/dashboard/dashboard.mobile.html" },
      },
      controller: 'dashboardCtrl as dashboard'
    })  /*
    .state('route2', {
      url: "/route2",
      views: {
        "viewA": { template: "route2.viewA" },
        "viewB": { template: "route2.viewB" }
      }
    })  */

}