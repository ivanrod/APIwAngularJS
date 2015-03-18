function playConfig(uiGmapGoogleMapApiProvider, $authProvider, $httpProvider, $urlRouterProvider, $stateProvider) {
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
      abstract:true,
      controller: 'layoutCtrl as layout', 
      templateUrl: 'assets/app/layout/mainLayout.html' ,
      resolve: {
          auth: function($auth, $state) {
              $auth.validateUser().then(function(data){
                console.log(data);
                if (!data.signedIn){
                  console.log("No logeado")
                  $state.go('signIn');
                }
                
              })
            return true;
          },
        }
      
    })
    .state('index.dashboard', {
      url: "dashboard",
      views: {
        "viewNormal": { controller: 'dashboardCtrl as dashboard', 
                        templateUrl: "assets/app/dashboard/dashboard.html" },
        "viewMobile": { controller: 'dashboardCtrl as dashboard', 
                        templateUrl: "assets/app/dashboard/dashboard.mobile.html" },
      },

    })  
    .state('index.user', {
      url: "users/:userId",
      views: {
        "viewNormal": { controller: 'userCtrl as user',
                        templateUrl: "assets/app/user/user.html" },
        "viewMobile": { controller: 'userCtrl as user',
                        templateUrl: "assets/app/user/user.mobile.html" }
      }
    })  
    .state('index.admin', {
      url: "admin",
      views: {
        "viewNormal": { controller: 'adminCtrl as admin',
                        templateUrl: "assets/app/admin/admin.html" },
        "viewMobile": { controller: 'adminCtrl as admin',
                        templateUrl: "assets/app/admin/admin.mobile.html" }
      }
    }) 
    .state('signIn', {
      url: "/signIn",
      controller: 'sessionsCtrl as sessions',
      templateUrl: "assets/app/sessions/new.html",
      resolve: {
          auth: function($auth, $state) {
              $auth.validateUser().then(function(data){
                console.log(data);
                if (data.signedIn){
                  console.log("Logeado")
                  $state.go('index.dashboard');
                }
                
              })
            return true;
          },
        }
    }) 

$authProvider.configure([
  { 
    default: {
      apiUrl:                '',
      signOutUrl:            '/auth/sign_out',
      emailSignInPath:       '/auth/sign_in',
      emailRegistrationPath: '/auth',
      accountUpdatePath:     '/auth',
      accountDeletePath:     '/auth',
      passwordResetPath:     '/auth/password',
      passwordUpdatePath:    '/auth/password',
      tokenValidationPath:   '/auth/validate_token',
    }   
  }, {
    admin: {
      apiUrl:                '',
      signOutUrl:            '/admin_auth/sign_out',
      emailSignInPath:       '/admin_auth/sign_in',
      emailRegistrationPath: '/admin_auth',
      accountUpdatePath:     '/admin_auth',
      accountDeletePath:     '/admin_auth',
      passwordResetPath:     '/admin_auth/password',
      passwordUpdatePath:    '/admin_auth/password',
      tokenValidationPath:   '/admin_auth/validate_token',
    }
  }
]);



}