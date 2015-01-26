// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('play', ['chart.js']);

myApp.controller('dashboardCtrl', ['$scope', function($scope) {
  $scope.response = gon.response;

  $scope.labels = ["25 Enero", "26 Enero", "26 Enero", "26 Enero", "26 Enero", "26 Enero", "26 Enero"];
  $scope.series = ['Elder_001', "e"];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };


}]);




