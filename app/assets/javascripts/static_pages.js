//= require static_pages/static_pages.config
//= require static_pages/services/sharedData.service
//= require static_pages/services/ajax.factory
//= require static_pages/services/dashboard.factory
//= require static_pages/services/maps.factory
//= require static_pages/services/alerts.factory
//= require static_pages/controllers/dashboard.controller
//= require static_pages/controllers/map.controller

(function() {

    'use strict';

    // Declare app level module which depends on views, and components
    angular
        .module('play', ['chart.js', 'uiGmapgoogle-maps', 'cgBusy', 'ngAnimate'])

    angular
        .module('play')
        .config(playConfig)
        .service('sharedData', sharedData)
        .factory('ajaxFactory', ajaxFactory)
        .factory('dashboardFactory', dashboardFactory)
        .factory('mapsFactory', mapsFactory)
        .factory('alertsFactory', alertsFactory)
        .controller('dashboardCtrl', dashboardCtrl)
        .controller('mapsCtrl', mapsCtrl)
        .value('cgBusyDefaults',{
          message:'Cargando...',
        })

})();