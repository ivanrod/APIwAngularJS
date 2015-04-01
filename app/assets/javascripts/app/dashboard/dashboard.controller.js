function dashboardCtrl($scope, $animate, matchmedia, sharedData, ajaxFactory, dashboardFactory, alertsFactory) {
'use strict';
  var vm = this;

  $scope.$on('people', function(newValue, oldValue) {
    var filteredData = sharedData.getFilteredData();
    if (sharedData.getAlerts() != null){
      var newChartData = dashboardFactory.allUsersAlertsNum(filteredData, sharedData.getAlerts());      
    }
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

  /*
  To have last alert colors equal to index colors uncomment the following lines
  and add it to the alert div in the HTML tag:
  --> ng-style="dashboard.alertsStyle('{{alert.userId}}')"  
  */

  vm.alertsStyle = function(userId){    
    return {background: sharedData.getColours()[sharedData.getPersonIndex(userId)].strokeColor}
  }

  vm.usersStyle = function(indexColor, name){
    sharedData.setPeopleOrder(indexColor, name);
    return {background: sharedData.getColours()[indexColor].strokeColor}
  } 

  function startAlertsData(){
    vm.alertTexts = alertsFactory.lastUsersAlerts(sharedData.getResponse(), sharedData.getAlerts());
    vm.chartData = dashboardFactory.allUsersAlertsNum(sharedData.getResponse(), sharedData.getAlerts());

    vm.labels = dashboardFactory.last7daysArray();
    vm.series = vm.chartData.names;
    vm.data = vm.chartData.alerts;
  }
  
  function waitForUsers(groups){
    sharedData.setResponse(groups.data)
    vm.response = sharedData.getResponse();
    sharedData.setPeople("");
    vm.people = sharedData.getPeople();  

    vm.usersReady = true;
  }

  function waitForAlerts(alerts){
    vm.waitingForUsers = false;
    vm.response = sharedData.getResponse();
    sharedData.setAlerts(alerts.data);
    vm.alertTexts = alertsFactory.lastUsersAlerts(sharedData.getResponse(), sharedData.getAlerts());
    vm.chartData = dashboardFactory.allUsersAlertsNum(sharedData.getResponse(), sharedData.getAlerts());
    vm.people = sharedData.getPeople();
    
    vm.labels = dashboardFactory.last7daysArray();
    vm.series = vm.chartData.names;
    vm.data = vm.chartData.alerts;

    vm.alertsReady = true;
  }

  function waitForMap(payloads){
    sharedData.setPayloads(payloads.data)
    vm.people = sharedData.getPeople();

    //vm.showBox(angular.element(document.getElementById('map-box')))
    vm.mapReady = true;
    //Tambien se puede $scope.$watch('dashboard.people', function(){...})
    $scope.$watch(angular.bind(vm, function () {
                        return vm.people;}), 
                      function(newValue, oldValue) {
                          sharedData.setPeople(vm.people)        
    })    
  }


  activate();



  ///////////

  function activate(){
    sharedData.setPartials(sharedData.getDashboardPartials());

    vm.waitingForUsers = true;

    vm.response = sharedData.getResponse();

    if (vm.response === null || vm.response === undefined ){
      vm.usersPromise = ajaxFactory.getGroups().then(function(groups){
        waitForUsers(groups);

          vm.alertsPromise = ajaxFactory.getAlertsLast7days(groups.data).then(function(alerts){
            waitForAlerts(alerts);
            console.log(JSON.stringify(alerts.data))

            vm.mapPromise = ajaxFactory.getLatestsPayloads(groups.data).then(function(payloads){
              waitForMap(payloads);
            })
          })
      })
    }
    else{ 
      if (sharedData.getAlerts() != null){
        startAlertsData();
      }
      ajaxFactory.getGroups().then(function(groups){
        waitForUsers(groups);

          ajaxFactory.getAlertsLast7days(groups.data).then(function(alerts){
            waitForAlerts(alerts);

            ajaxFactory.getLatestsPayloads(groups.data).then(function(payloads){
              waitForMap(payloads);
            })
          })
      })      
    }
    
  }




};
