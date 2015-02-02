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
myApp.service('sharedData', function ($rootScope) {
  var response = gon.groups;
  var people = "";
  var chartData = allUsersAlerts(gon.groups, gon.alerts_last_7days);
        return {
            getResponse:function () {
              return response;
            },
            setResponse:function (obj) {
              response = obj;
            },
            getPeople:function () {
              return people;
            },
            setPeople: function(value){
              people = value;
              $rootScope.$broadcast("people");
            }
        }
      });


myApp.controller('dashboardCtrl', ['$scope', 'filterFilter', 'sharedData', function($scope, filterFilter, sharedData) {
  $scope.response = sharedData.getResponse();
  $scope.people = sharedData.getPeople();
  $scope.chartData = allUsersAlerts(gon.groups, gon.alerts_last_7days);

  $scope.labels = last7daysArray();
  $scope.series = $scope.chartData.names;
  $scope.data = $scope.chartData.alerts;

  $scope.$watch('people', function(newValue, oldValue) {
    sharedData.setPeople($scope.people)
    var filteredData = filterFilter($scope.response, $scope.people)
    var newChartData = allUsersAlerts(filteredData, gon.alerts_last_7days);
    
    if (newChartData != $scope.chartData){
      $scope.chartData = newChartData;
      $scope.data = $scope.chartData.alerts;
      $scope.series = $scope.chartData.names;
      if ($scope.data[0] == undefined){
        $scope.data=[[0,0,0,0,0,0,0]]; 
        $scope.series = ["No hay usuarios que coincidan con la búsqueda"];
      }
    }
  });

  
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

}]);

myApp.controller("mapsCtrl", function($scope, sharedData, uiGmapGoogleMapApi) {
    // Do stuff with your $scope.
    // Note: Some of the directives require at least something to be defined originally!
    // e.g. $scope.markers = []
    
    // uiGmapGoogleMapApi is a promise.
    // The "then" callback function provides the google.maps object.
    uiGmapGoogleMapApi.then(function(maps) {
      $scope.map = { 
        center: { latitude: 41.35890136704563, longitude:  2.0997726917266846 }, 
        zoom: 13 ,
      };
      
      $scope.$on( 'people', function() {
        $scope.people = sharedData.getPeople();
      });
    });
});


/* Helper Functions */
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

var lastAlertsUser = function(user){
  //7 zeros array
  var lastAlerts = Array.apply(null, new Array(7)).map(Number.prototype.valueOf,0);
  var today = new moment().set({'seconds': 59, 'minutes': 59, 'hour': 23})
  for (var i = 0; i < user['alerts'].length; i++){
    var day = new moment(user['alerts'][i]['fecha'])
    lastAlerts[moment.duration(today - day).days()] += 1;
    //console.log(moment.duration(today - day).days())
  };

  return lastAlerts.reverse();
};

var lastAlertsFindUser = function(userName, users){
  for (var i = 0; i < users.length; i++){
    if (users[i].userId === userName){
      return lastAlertsUser(users[i]);
    }
  }
};

var allUsersAlerts = function(groups, alerts){
  var chartData = {
    names: [],
    alerts: []
  };
  for (var i=0; i<groups.length; i++){
    //console.log(groups[i])
    chartData.names.push(groups[i].name)
    chartData.alerts.push(lastAlertsFindUser(groups[i].name, alerts))
  }

  return chartData;
};