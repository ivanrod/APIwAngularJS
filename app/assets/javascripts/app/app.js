//= require actionsheet/actionsheet
//= require app/app.config
//= require app/services/sharedData.service
//= require app/services/ajax.factory
//= require app/services/dashboard.factory
//= require app/services/maps.factory
//= require app/services/alerts.factory
//= require app/layout/layout.controller
//= require app/dashboard/dashboard.controller
//= require app/dashboard/map.controller
//= require app/user/user.controller

(function() {

    'use strict';

    // Declare app level module which depends on views, and components
    angular
        .module('play', ['chart.js', 
            'matchmedia-ng', 
            'uiGmapgoogle-maps', 
            'cgBusy', 
            'ngAnimate', 
            'ngScrollable', 
            'ngTouch',
            'ui.router',
            'foundation.actionsheet',
            'toaster'])

    angular
        .module('play')
        .config(playConfig)
        .service('sharedData', sharedData)
        .factory('ajaxFactory', ajaxFactory)
        .factory('dashboardFactory', dashboardFactory)
        .factory('mapsFactory', mapsFactory)
        .factory('alertsFactory', alertsFactory)
        .controller('layoutCtrl', layoutCtrl)
        .controller('dashboardCtrl', dashboardCtrl)
        .controller('mapsCtrl', mapsCtrl)
        .controller('userCtrl', userCtrl)
        .value('cgBusyDefaults',{
          message:'Cargando...',
        })

})();