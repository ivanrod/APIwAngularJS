/**
 * Data shared through the play module (between controllers, factories or directives)
 * @namespace sharedData
 * @memberOf Services
 */
function sharedData($rootScope, filterFilter) {
  'use strict';
  /////////////////////////
  //Variable definitions //
  /////////////////////////
  var response;
  var people;
  var peopleOrder;
  var carers;
  var payloads;
  var filteredData;
  var colours;
  var phoneSection;

  ///////////
  //Alerts //
  ///////////
  var alerts;
  var alertsNames;

  /////////////
  //Partials //
  /////////////
  var partials;
    //////////////////////
    //Dashboard Partials//
    //////////////////////
    var dashboardPartialsUrl;
    var dashboardPartials;
    ///////////////////
    //Admin Partials //
    ///////////////////
    var adminPartialsUrl;
    var adminPartials;
    ////////////////////
    //Elders Partials //
    ////////////////////
    var elderPartialsUrl;
    var elderPartials;


  /**
   * Initializes the shared data service variables
   * @return {[type]} [description]
   */
  var initData = function(){
    response = null;
    people = "";
    peopleOrder = {};
    carers = null;
    payloads = {};
    filteredData = filterFilter(response, people);
    colours = Chart.defaults.global.colours;
    phoneSection = angular.element(document.getElementById('phone-section'));

    alerts = null;
    alertsNames = {
        1: {type:"Botón de alerta", text:" ha pulsado el botón de alerta."},
        2: {type:"Inactividad", text:" lleva mas de 9 horas inactivo."},
        3: {type:"Caída", text:" se ha caído."},
        4: {type:"Salida de zona", text:" ha salido de su zona de seguridad."}
      }

    dashboardPartialsUrl = 'assets/app/dashboard/partials/';
    dashboardPartials = {
      0: {
        url: dashboardPartialsUrl + '_usersMobile.html',
        logo: "fi-torsos-all"
      },
      1: {
        url: dashboardPartialsUrl + '_map.html',
        logo: "fi-map"
      },
      2: {
        url: dashboardPartialsUrl + '_statistics.html',
        logo: "fi-graph-trend"
      },
      3: {
        url: dashboardPartialsUrl + '_lastAlerts.html',
        logo: "fi-alert"
      }
    }
    adminPartialsUrl = 'assets/app/admin/partials/';
    adminPartials = {
      0: {
        url: adminPartialsUrl + '_elders.html',
        logo: "fi-torsos"
      },
      1: {
        url: adminPartialsUrl + '_carers.html',
        logo: "fi-torso-business"
      }
    }
    elderPartialsUrl = 'assets/app/user/partials/';
    elderPartials = {
      0: {
        url: elderPartialsUrl + '',
        logo: ''
      }
    }

    partials = dashboardPartials;
  };

  //Call the initData function at start
  initData();






        //////////////////////
        //Service functions //
        //////////////////////
        return {
            resetData: initData,
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
            getCarers: function(){
              return carers;
            },
            setCarers: function(obj){
              carers = obj;
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
            //////////////////
            //People filter //
            //////////////////
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
            /////////////
            //Partials //
            /////////////
            setPartials: function(obj){
              partials = obj;
              $rootScope.$broadcast("partials");
            },
            getPartials: function(){
              return partials;
            },
            getPartial: function(partial){
              return partials[partial];
            },
            getDashboardPartial: function(partial){
              return dashboardPartials[partial];
            },
            getDashboardPartials: function(){
              return dashboardPartials;
            },
            getAdminPartial: function(partial){
              return adminPartials[partial];
            },
            getAdminPartials: function(){
              return adminPartials;
            },
            getElderPartial: function(partial){
              return elderPartials[partial];
            },
            getElderPartials: function(){
              return elderPartials;
            }
        }
      };