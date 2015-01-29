// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('play', ['chart.js']);

myApp.controller('dashboardCtrl', ['$scope', 'filterFilter', function($scope, filterFilter) {
  $scope.response = gon.groups;
  $scope.people = "";
  $scope.chartData = allUsersAlerts(gon.groups, gon.alerts_last_7days);

  $scope.labels = last7daysArray();
  $scope.series = $scope.chartData.names;
  $scope.data = $scope.chartData.alerts;

  $scope.$watch('people', function(newValue, oldValue) {
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
 /* $scope.$watch('data', function(newNames, oldNames) {
    $scope.data = $scope.chartData.alerts;
    $scope.series = $scope.chartData.names;
 [[0,0,0,0,0,0,0]]
    console.log($scope.data)

  });*/

  
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

}]);

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
  var today = new Date(Date.now())
  for (var i = 0; i < user['alerts'].length; i++){
    var day = new Date(user['alerts'][i]['fecha'])
    lastAlerts[today.getUTCDate()-day.getUTCDate()] += 1;
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