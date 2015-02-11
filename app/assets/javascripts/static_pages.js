// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
'use strict';

// Declare app level module which depends on views, and components
angular
    .module('play', ['chart.js', 'uiGmapgoogle-maps', 'cgBusy'])

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



function playConfig(uiGmapGoogleMapApiProvider, $httpProvider) {
    //Config to load Google maps SDK
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });

    //AJAX headers to allow rails to identify it as request.xhr
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'AngularXMLHttpRequest';
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');

}


function sharedData($rootScope, filterFilter, dashboardFactory) {
  var response = {};
  var people = "";
  var alerts = [];
  var chartData = dashboardFactory.allUsersAlertsNum(response, alerts);
  var payloads = {};
  var filteredData = filterFilter(response, {name: people});
  var colours = Chart.defaults.global.colours;

        return {
            getResponse:function () {
              return response;
            },
            setResponse:function (obj) {
              response = obj;
            },
            getAlerts: function() {
              return alerts;
            },
            setAlerts: function(obj){
              alerts = obj;
            },
            getPayloads: function(){
              return payloads;
            },
            setPayloads: function(obj){
              payloads = obj;
            },
            getPeople:function () {
              return people;
            },
            setPeople: function(value){
              people = value;
              filteredData = filterFilter(response, {name: people})
              $rootScope.$broadcast("people");
            },
            getColours: function(){
              return colours;
            },
            getFilteredData: function(){
              return filteredData;
            }
        }
      };


function ajaxFactory($http){
  return {
    getGroups: function(){
      return $http.get("/groups")
    },
    getAlertsLast7days: function(groups){
      return $http.post("/group_alerts", JSON.stringify(groups))
    },
    getLatestsPayloads: function(groups){
      return $http.post("/group_payloads", JSON.stringify(groups))
    }
  }
}


/* Dashboard Helper Function Factory */
function dashboardFactory(){
  return {
    last7daysArray: function(){
        var last7daysArray = [];
        var day = new Date(Date.now())
        for (var i = 0; i <= 6; i++){
          last7daysArray.push(
            String(day.getDate()) + "/" + String(day.getUTCMonth()+1) + "/" + String(day.getUTCFullYear())
            );
          day.setDate(day.getDate()-1);
        }
        return last7daysArray.reverse()
    },
    lastAlertsUserNum: function(user){
      //7 zeros array
      var lastAlerts = Array.apply(null, new Array(7)).map(Number.prototype.valueOf,0);
      var today = new moment().set({'seconds': 59, 'minutes': 59, 'hour': 23})
        for (var i = 0; i < user['alerts'].length; i++){
          var day = new moment(user['alerts'][i]['fecha'])
          lastAlerts[moment.duration(today - day).days()] += 1;
        }
      return lastAlerts.slice(0, 7).reverse();
    },
    lastAlertsFindUserNum: function(userName, users){
      for (var i = 0; i < users.length; i++){
        if (users[i].userId === userName){
          return this.lastAlertsUserNum(users[i]);
        }
      }
    },
    allUsersAlertsNum: function(groups, alerts){
      var chartData = {
        names: [],
        alerts: []
      };
      for (var i=0; i<groups.length; i++){
        chartData.names.push(groups[i].name)
        chartData.alerts.push(this.lastAlertsFindUserNum(groups[i].name, alerts))
      }

      return chartData;
    }
  }
}


/* Google Maps Helper functions Factory*/

function mapsFactory(){
  return{
    //Function to convert hex format to a rgb color
    rgb2hex: function (rgb) {
        rgb = Array.apply(null, arguments).join().match(/\d+/g);
        rgb = ((rgb[0] << 16) + (rgb[1] << 8) + (+rgb[2])).toString(16);

        return "#" + rgb;
    },
    pinPoints: function(pinColor){
        var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor.slice(1,pinColor.length),
            new google.maps.Size(21, 34),
            new google.maps.Point(0,0),
            new google.maps.Point(10, 34));
        var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
            new google.maps.Size(40, 37),
            new google.maps.Point(0, 0),
            new google.maps.Point(12, 35));

        return [pinImage, pinShadow]
    },
    formatPayloadMapMarker: function(markerId, payload, color, userId){
      var markerPosition = this.parsePosition(payload.data.location)
      var marker = {
        id: markerId,
        latitude: markerPosition.latitude,
        longitude: markerPosition.longitude,
        icon: this.pinPoints(color)[0].url,
        title: userId,
        options: {
                visible: true
              }
      }
      return marker;
    },
    getAllMarkers: function(payloads, colors){
      var markers = [];
      for (var i = 0; i < payloads.length; i++){
        
        if (payloads[i].payloads[0] != undefined){
          markers.push(this.formatPayloadMapMarker(i+1, payloads[i].payloads[0], this.rgb2hex(colors[i].fillColor), payloads[i].userId))
        }
      }
      return markers;
    },
    getMarkersByUser: function(payloads,colors,groups){
      var usersPayloads = [];
      var users = [];
      for (var i = 0; i < groups.length; i++){
        users.push(groups[i].name);
      }
      for (var i = 0; i < payloads.length; i++){

        if ($.inArray(payloads[i].userId, users) != -1){
          usersPayloads.push(payloads[i]);
        }
      }

      return this.getAllMarkers(usersPayloads, colors)
    },
    parsePosition: function(assetPosition){
      var position = assetPosition.split(', ');
      var positionObject = {
        latitude: parseFloat(position[0]),
        longitude: parseFloat(position[1])
      }
      return positionObject;
    },
    parseCircleMapData: function(group, circleId){
      var circle = {
        id: circleId,
        labelStyle: {opacity: 0.75},
        center: {},
        radius: 150,
        stroke: {
          color: '#08B21F',
          weight: 2,
          opacity: 1      
        },
        fill:{
            color: '#08B21F',
            opacity: 0.5
        },
        visible: true
      };

      for (var i = 0; i < group.assets.length; i++){
        if (group.assets[i].location != ""){
          
          var parsedPosition = this.parsePosition(group.assets[i].location);
          circle.center.latitude = parsedPosition.latitude;
          circle.center.longitude = parsedPosition.longitude;
          
        }
      }
      return circle;
    },
    getAllCirclesMapData: function(groups){
      var circles = [];
      for (var i=0; i < groups.length; i++){
        circles.push(this.parseCircleMapData(groups[i], i+1))
        circles[i].fill.color = this.rgb2hex(Chart.defaults.global.colours[i].fillColor);
      }
      return circles;
    }

  }
}


/* Ultimas alertas Helper function Factory */
function alertsFactory(){
  return{
    sortMomentHelper: function(a, b){
      if (a.time.isAfter(b)){ return 1}
        if (b.time.isAfter(a)){return -1}
          if (a.time.isSame(b)){return 0}
    },
    formatAlerts: function(alerts){
      var alertsFormated = [];
      for (var i = 0; i < alerts.alerts.length; i++){
        var alert = {
          "text": alerts.userId + this.alertsNames[alerts.alerts[i].level],
          "time": moment(alerts.alerts[i].fecha)
        }
        alertsFormated.push(alert)
      }
      return alertsFormated;
    },
    getAlertsByUser: function(user, alerts){
      var alertsByUser = [];
      for (var i = 0; i < alerts.length; i++){
        if (user === alerts[i].userId){
          alertsByUser = alerts[i];
        }
      }
      return alertsByUser;
    },
    lastUsersAlerts: function(groups, alerts){
      var alertsTexts = [];
      for (var i=0; i<groups.length; i++){
        //console.log(groups[i])
        var user = groups[i].name;

        var alertsByUser = this.getAlertsByUser(user, alerts);
        alertsTexts = alertsTexts.concat(this.formatAlerts(alertsByUser));
      }
      alertsTexts = alertsTexts.sort(this.sortMomentHelper);
      return alertsTexts;
    },
    alertsNames: {
      1: " ha pulsado el botón de alerta.",
      2: " lleva mas de 9 horas inactivo.",
      3: " se ha caído.",
      4: " ha salido de su zona de seguridad."
    }
  }
}

function dashboardCtrl($scope, sharedData, ajaxFactory, dashboardFactory, alertsFactory) {
  //Chart.defaults.global.colours[0].strokeColor = "rbga(95, 174, 87, 0.2)" 
//changeUsersColors(Chart.defaults.global.colours);
  var vm = this;
  ajaxFactory.getGroups().then(function(groups){
    sharedData.setResponse(groups.data)

      vm.usersPromise = ajaxFactory.getAlertsLast7days(groups.data).then(function(alerts){
      vm.response = sharedData.getResponse();
      sharedData.setAlerts(alerts.data)
      vm.alertTexts = alertsFactory.lastUsersAlerts(sharedData.getResponse(), sharedData.getAlerts());
      vm.chartData = dashboardFactory.allUsersAlertsNum(sharedData.getResponse(), sharedData.getAlerts());
      vm.people = sharedData.getPeople();
      
      vm.labels = dashboardFactory.last7daysArray();
      vm.series = vm.chartData.names;
      vm.data = vm.chartData.alerts;


      vm.mapPromise = ajaxFactory.getLatestsPayloads(groups.data).then(function(payloads){
        sharedData.setPayloads(payloads.data)
        vm.people = sharedData.getPeople();

        //Tambien se puede $scope.$watch('dashboard.people', function(){...})
        $scope.$watch(angular.bind(vm, function () {
                            return vm.people;}), 
                          function(newValue, oldValue) {
          sharedData.setPeople(vm.people)        
        })
      })
    })
    

    
  })


  $scope.$on('people', function(newValue, oldValue) {
    var filteredData = sharedData.getFilteredData();
    var newChartData = dashboardFactory.allUsersAlertsNum(filteredData, sharedData.getAlerts());

    if (newChartData != vm.chartData){
      vm.chartData = newChartData;
      vm.data = vm.chartData.alerts;
      vm.series = vm.chartData.names;
      vm.alertTexts = alertsFactory.lastUsersAlerts(filteredData, sharedData.getAlerts())
     
      if (vm.data[0] == undefined){
        vm.data=[[0,0,0,0,0,0,0]]; 
        vm.series = ["No hay usuarios que coincidan con la búsqueda"];
      }
    }
  });

  vm.myStyle = function(indexColor){
    return {background: sharedData.getColours()[indexColor].strokeColor}
  }  
};

function mapsCtrl($scope, sharedData, uiGmapGoogleMapApi, mapsFactory) {
  var vm = this;
   uiGmapGoogleMapApi.then(function(maps) {
      vm.mapData = sharedData.getPayloads();
      vm.map = { 
        center: { latitude: 41.35890136704563, longitude:  2.0997726917266846 }, 
        zoom: 13 ,
      };
      vm.randomMarkers = mapsFactory.getMarkersByUser(vm.mapData, Chart.defaults.global.colours, sharedData.getResponse())
      vm.circles = mapsFactory.getAllCirclesMapData(sharedData.getResponse())

      $scope.$on( 'people', function() {
        vm.mapData = sharedData.getPayloads();
        vm.filteredData = sharedData.getFilteredData();
        vm.people = sharedData.getPeople();
        vm.circles = mapsFactory.getAllCirclesMapData(vm.filteredData)
        vm.randomMarkers = mapsFactory.getMarkersByUser(vm.mapData, Chart.defaults.global.colours, vm.filteredData);

      });
    });
};