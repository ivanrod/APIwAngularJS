function sharedData($rootScope, filterFilter, dashboardFactory) {
  'use strict';
  var response = {};
  var people = "";
  var peopleOrder = {};
  var alerts = [];
  var chartData = dashboardFactory.allUsersAlertsNum(response, alerts);
  var payloads = {};
  var filteredData = filterFilter(response, {name: people});
  var colours = Chart.defaults.global.colours;
  var partialsUrl = 'assets/static_pages/partials/'
  var partials = {
    'users': partialsUrl + '_usersMobile.html',
    'map': partialsUrl + '_map.html',
    'stats': partialsUrl + '_statistics.html',
    'alerts': partialsUrl + '_lastAlerts.html'
  }

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
            getPeopleOrder: function(){
              return peopleOrder;
            },
            getPersonIndex: function(personName){
              return peopleOrder[personName];
            },
            setPeopleOrder: function(indexKey, personName){
              peopleOrder[personName] = indexKey;
            },
            getColours: function(){
              return colours;
            },
            getFilteredData: function(){
              return filteredData;
            },
            getPartial: function(partial){
              return partials[partial];
            }
        }
      };