// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('play', ['chart.js', 'uiGmapgoogle-maps']);

//Config to load Google maps SDK
myApp.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
})

//
myApp.service('sharedData', function ($rootScope, filterFilter) {
  var response = gon.groups;
  var people = "";
  var alerts = gon.alerts_last_7days;
  var chartData = allUsersAlertsNum(gon.groups, gon.alerts_last_7days);
  var filteredData = filterFilter(response, people)
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
            getPeople:function () {
              return people;
            },
            setPeople: function(value){
              people = value;
              filteredData = filterFilter(response, people)
              $rootScope.$broadcast("people");
            },
            getFilteredData: function(){
              return filteredData;
            }
        }
      });


myApp.controller('dashboardCtrl', ['$scope', 'sharedData', function($scope, sharedData) {
  //Chart.defaults.global.colours[0].strokeColor = "rbga(95, 174, 87, 0.2)" 

  $scope.response = sharedData.getResponse();
  $scope.people = sharedData.getPeople();
  $scope.alertTexts = lastUsersAlerts(sharedData.getResponse(), sharedData.getAlerts());
  $scope.chartData = allUsersAlertsNum(gon.groups, gon.alerts_last_7days);

  $scope.labels = last7daysArray();
  $scope.series = $scope.chartData.names;
  $scope.data = $scope.chartData.alerts;

  $scope.$watch('people', function(newValue, oldValue) {
    sharedData.setPeople($scope.people)
    
  })

  $scope.$on('people', function(newValue, oldValue) {
    
    var filteredData = sharedData.getFilteredData();
    var newChartData = allUsersAlertsNum(filteredData, gon.alerts_last_7days);
    
    if (newChartData != $scope.chartData){
      $scope.chartData = newChartData;
      $scope.data = $scope.chartData.alerts;
      $scope.series = $scope.chartData.names;
      $scope.alertTexts = lastUsersAlerts(filteredData, gon.alerts_last_7days)
     
      if ($scope.data[0] == undefined){
        $scope.data=[[0,0,0,0,0,0,0]]; 
        $scope.series = ["No hay usuarios que coincidan con la búsqueda"];
      }
    }
    //console.log($scope.data)
  });

  
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

}]);

myApp.controller("mapsCtrl", function($scope, sharedData, uiGmapGoogleMapApi) {
   uiGmapGoogleMapApi.then(function(maps) {
      $scope.mapData = gon.assets_latest_payload;
      $scope.map = { 
        center: { latitude: 41.35890136704563, longitude:  2.0997726917266846 }, 
        zoom: 13 ,
      };
      $scope.circles = getAllCirclesMapData(sharedData.getResponse())
      
      $scope.$on( 'people', function() {
        $scope.people = sharedData.getPeople();
        $scope.circles = getAllCirclesMapData(sharedData.getFilteredData())
      });
    });
});

/*General Helper functions*/
//Function to convert hex format to a rgb color
var rgb2hex = function (rgb) {
    rgb = Array.apply(null, arguments).join().match(/\d+/g);
    rgb = ((rgb[0] << 16) + (rgb[1] << 8) + (+rgb[2])).toString(16);

    // for (var i = rgb.length; i++ < 6;) rgb = '0' + rgb;

    return "#" + rgb;
};
//Funtion to change users colors
var changeUsersColors = function(colors){
  var lis = document.getElementsByClassName('groupName')[0].children;
  for (var i = 0; i < lis.length; i++ ){
    //$( ".groupName:nth-child(" + i + ")" ).css( "background", rgb2hex(colors[i].fillColor) );
    //lis[i].style.color = rgb2hex(colors[i].strokeColor);
    for (var j = 0; j < lis[i].children.length; j++){
      if (lis[i].children[j].classList.contains("circle")){
        lis[i].children[j].style.background = rgb2hex(colors[i].strokeColor);
      }
    }
    //Probar a usar promesa!!!
 }
}

/* Dashboard Helper Functions */
var last7daysArray = function(){
  var last7daysArray = [];
  var day = new Date(Date.now())
  for (var i = 0; i <= 6; i++){
    last7daysArray.push(
      String(day.getDate()) + "/" + String(day.getUTCMonth()+1) + "/" + String(day.getUTCFullYear())
      );
    day.setDate(day.getDate()-1);
  }
  return last7daysArray.reverse()
};

var lastAlertsUserNum = function(user){
  //7 zeros array
  var lastAlerts = Array.apply(null, new Array(7)).map(Number.prototype.valueOf,0);
  var today = new moment().set({'seconds': 59, 'minutes': 59, 'hour': 23})
    for (var i = 0; i < user['alerts'].length; i++){
      var day = new moment(user['alerts'][i]['fecha'])
      lastAlerts[moment.duration(today - day).days()] += 1;
      //console.log(moment.duration(today - day).days())
    }

  //console.log(lastAlerts)
  //console.log(lastAlerts.slice(0, 7))
  return lastAlerts.slice(0, 7).reverse();
};

var lastAlertsFindUserNum = function(userName, users){
  for (var i = 0; i < users.length; i++){
    if (users[i].userId === userName){
      return lastAlertsUserNum(users[i]);
    }
  }
};

var allUsersAlertsNum = function(groups, alerts){
  var chartData = {
    names: [],
    alerts: []
  };
  for (var i=0; i<groups.length; i++){
    //console.log(groups[i])
    chartData.names.push(groups[i].name)
    chartData.alerts.push(lastAlertsFindUserNum(groups[i].name, alerts))
  }

  return chartData;
};

/* Google Maps Helper functions */
var formatPayloadMapData = function(alert){
  
} 

var parsePosition = function(assetPosition){
  var position = assetPosition.split(', ');
  var positionObject = {
    latitude: parseFloat(position[0]),
    longitude: parseFloat(position[1])
  }
  return positionObject;
}

var parseCircleMapData = function(group, circleId){
  var circle = {
    id: circleId,
    labelContent: "$425K",
    labelStyle: {opacity: 0.75},
    center: {},
    radius: 180,
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
      
      var parsedPosition = parsePosition(group.assets[i].location);
      circle.center.latitude = parsedPosition.latitude;
      circle.center.longitude = parsedPosition.longitude;
      
    }
  }
  return circle;
}

var getAllCirclesMapData = function(groups){
  var circles = [];
  for (var i=0; i < groups.length; i++){
    circles.push(parseCircleMapData(groups[i], i+1))
    circles[i].fill.color = rgb2hex(Chart.defaults.global.colours[i].fillColor);
    //circles[i].stroke.color = rgb2hex(Chart.defaults.global.colours[i].fillColor);
    //document.getElementsByClassName('groupName')[i].style.color = rgb2hex(Chart.defaults.global.colours[i].strokeColor);
    
  }
  changeUsersColors(Chart.defaults.global.colours);
  return circles;
}

/* Ultimas alertas Helper functions */

var sortMomentHelper = function(a, b){
  if (a.time.isAfter(b)){ return 1}
    if (b.time.isAfter(a)){return -1}
      if (a.time.isSame(b)){return 0}
}

var formatAlerts = function(alerts){
  var alertsFormated = [];
  for (var i = 0; i < alerts.alerts.length; i++){
    var alert = {
      "text": alerts.userId + alertsNames[alerts.alerts[i].level],
      "time": moment(alerts.alerts[i].fecha)
    }
    alertsFormated.push(alert)
  }
  return alertsFormated;
}

var getAlertsByUser = function(user, alerts){
  var alertsByUser = [];
  for (var i = 0; i < alerts.length; i++){
    if (user === alerts[i].userId){
      alertsByUser = alerts[i];
    }
  }
  return alertsByUser;
}

var lastUsersAlerts = function(groups, alerts){
  var alertsTexts = [];
  for (var i=0; i<groups.length; i++){
    //console.log(groups[i])
    var user = groups[i].name;

    var alertsByUser = getAlertsByUser(user, alerts);
    alertsTexts = alertsTexts.concat(formatAlerts(alertsByUser));
  }
  alertsTexts = alertsTexts.sort(sortMomentHelper);
  return alertsTexts;
}

var alertsNames = {
  1: " ha pulsado el botón de alerta.",
  2: " lleva mas de 9 horas inactivo.",
  3: " se ha caído.",
  4: " ha salido de su zona de seguridad."
}
