function dashboardCtrl($scope, $animate, matchmedia, sharedData, ajaxFactory, dashboardFactory, alertsFactory) {
'use strict';
  var vm = this;

  
  activate();

  function activate(){
    vm.waitingForUsers = true;

    vm.usersPromise = ajaxFactory.getGroups().then(function(groups){
      sharedData.setResponse(groups.data)
      vm.response = sharedData.getResponse()
      vm.people = sharedData.getPeople();

        vm.alertsPromise = ajaxFactory.getAlertsLast7days(groups.data).then(function(alerts){
        vm.waitingForUsers = false;
        vm.usersStyle = function(indexColor, name){
          sharedData.setPeopleOrder(indexColor, name);
          return {background: sharedData.getColours()[indexColor].strokeColor}
        } 
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
  }
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



  /*
  To have last alert colors equal to index colors uncomment the following lines
  and add it to the alert div in the HTML tag:
  --> ng-style="dashboard.alertsStyle('{{alert.userId}}')"  
  */
  
  vm.alertsStyle = function(userId){    
    return {background: sharedData.getColours()[sharedData.getPersonIndex(userId)].strokeColor}
  }


};
