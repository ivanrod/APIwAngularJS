function playConfig(uiGmapGoogleMapApiProvider, $httpProvider, $routeProvider) {
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


    $routeProvider.
      when('/', {
        templateUrl: 'assets/app/dashboard/dashboard.html',
        controller: 'dashboardCtrl'
      }).
/*
      when('/user/:userId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
*/
      otherwise({
        redirectTo: '/'
      });


}