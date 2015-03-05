//= require actionsheet/actionsheet
//= require foundation.core
//= require modal/modal
//= require app/app.config
//= require app/filters/users.filter
//= require app/services/sharedData.service
//= require app/services/ajax.factory
//= require app/services/dashboard.factory
//= require app/services/maps.factory
//= require app/services/alerts.factory
//= require app/services/users.factory
//= require app/layout/layout.controller
//= require app/dashboard/dashboard.controller
//= require app/dashboard/map.controller
//= require app/admin/admin.controller
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
            'foundation.core',
            'foundation.actionsheet',
            'foundation.common',
            'foundation.modal',
            'toaster'])

    angular
        .module('play')
        .config(playConfig)
        .filter('usersFilter', usersFilter)
        .service('sharedData', sharedData)
        .factory('ajaxFactory', ajaxFactory)
        .factory('dashboardFactory', dashboardFactory)
        .factory('mapsFactory', mapsFactory)
        .factory('alertsFactory', alertsFactory)
        .factory('usersFactory', usersFactory)
        .controller('layoutCtrl', layoutCtrl)
        .controller('dashboardCtrl', dashboardCtrl)
        .controller('mapsCtrl', mapsCtrl)
        .controller('adminCtrl', adminCtrl)
        .controller('userCtrl', userCtrl)
        .value('cgBusyDefaults',{
          message:'Cargando...',
        })

})();