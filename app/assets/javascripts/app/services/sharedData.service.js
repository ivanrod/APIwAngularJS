function sharedData($rootScope, filterFilter) {
  'use strict';
  var response = null;
  var people = "";
  var peopleOrder = {};
  var alerts = null;
  //var chartData = dashboardFactory.allUsersAlertsNum(response, alerts);
  var payloads = {};
  var filteredData = filterFilter(response, people);
  var colours = Chart.defaults.global.colours;
  var phoneSection = angular.element(document.getElementById('phone-section'));
  var partialsUrl = 'assets/app/dashboard/partials/';
  var alertsNames = {
      1: {type:"Botón de alerta", text:" ha pulsado el botón de alerta."},
      2: {type:"Inactividad", text:" lleva mas de 9 horas inactivo."},
      3: {type:"Caída", text:" se ha caído."},
      4: {type:"Salida de zona", text:" ha salido de su zona de seguridad."}
    }
  var partials = {
    1: partialsUrl + '_usersMobile.html',
    2: partialsUrl + '_map.html',
    3: partialsUrl + '_statistics.html',
    4: partialsUrl + '_lastAlerts.html'
  }

        return {
            getPhoneSection: function() {
              return phoneSection;
            },
            setPhoneSection: function() {
              phoneSection = angular.element(document.getElementById('phone-section'));
            },
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
            getAlertsNames: function(){
              return alertsNames;
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
              filteredData = filterFilter(response, people)
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