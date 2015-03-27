//= require actionsheet/actionsheet
//= require foundation.core
//= require modal/modal
//= require app/app.config
//= require app/filters/users.filter
//= require app/services/sharedData.service
//= require app/services/authentication.service
//= require app/services/ajax.factory
//= require app/services/dashboard.factory
//= require app/services/maps.factory
//= require app/services/alerts.factory
//= require app/services/users.factory
//= require app/services/getDataFromApi.factory
//= require app/layout/layout.controller
//= require app/dashboard/dashboard.controller
//= require app/dashboard/map.controller
//= require app/admin/admin.controller
//= require app/user/user.controller
//= require app/sessions/sessions.controller

(function() {

    'use strict';


    ///////////////////////////////////////
    ///Play App////////////////////////////
    //App declaration with deppendencies //
    ///////////////////////////////////////
    angular
        .module('play', ['chart.js', 
            'matchmedia-ng', 
            'uiGmapgoogle-maps', 
            'cgBusy', 
            'ngAnimate', 
            'ngScrollable', 
            'ngTouch',
            'ui.router',
            'foundation.core',
            'foundation.actionsheet',
            'foundation.common',
            'foundation.modal',
            'toaster',
            'ng-token-auth'])


    ///////////////////////////
    //Component declarations //
    ///////////////////////////
    angular
        .module('play')
        //////////////////
        //Configuration //
        //////////////////
        .config(playConfig)
        ////////////
        //Filters //
        ////////////
        .filter('usersFilter', usersFilter)
        /////////////
        //Services //
        /////////////
        .service('sharedData', sharedData)
        .service('authenticationService', authenticationService)
        //////////////
        //Factories //
        //////////////
        .factory('ajaxFactory', ajaxFactory)
        .factory('dashboardFactory', dashboardFactory)
        .factory('mapsFactory', mapsFactory)
        .factory('alertsFactory', alertsFactory)
        .factory('usersFactory', usersFactory)
        .factory('getDataFromApiFactory', getDataFromApiFactory)
        ////////////////
        //Controllers //
        ////////////////
        .controller('layoutCtrl', layoutCtrl)
        .controller('dashboardCtrl', dashboardCtrl)
        .controller('mapsCtrl', mapsCtrl)
        .controller('adminCtrl', adminCtrl)
        .controller('userCtrl', userCtrl)
        .controller('sessionsCtrl', sessionsCtrl)
        //cgBusy configuration
        .value('cgBusyDefaults',{
          message:'Cargando...',
        })
        
})();