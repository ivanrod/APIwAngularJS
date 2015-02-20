function dashboardCtrl($scope, matchmedia, sharedData, ajaxFactory, dashboardFactory, alertsFactory) {
'use strict';
  //Si falla para algún explorador el matchmedia se puede mirar de incluir los polyfills;
  var vm = this;
  activate();

  function activate(){
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

  vm.usersStyle = function(indexColor, name){
    sharedData.setPeopleOrder(indexColor, name);
    return {background: sharedData.getColours()[indexColor].strokeColor}
  }  

  /*
  To have last alert colors equal to index colors uncomment the following lines
  and add it to the alert div in the HTML tag:
  --> ng-style="dashboard.alertsStyle('{{alert.userId}}')"  
  */
  
  vm.alertsStyle = function(userId){    
    return {background: sharedData.getColours()[sharedData.getPersonIndex(userId)].strokeColor}
  }
  




 
  /*
  Media queries with matchmedia
  */
  vm.fillBox = sharedData.getPartial('users');
  vm.selected = 'users';

  vm.enableBox = function(box){
    vm.fillBox = sharedData.getPartial(box);
    vm.selected = box;
  }


  matchmedia.onPhone( function(mediaQueryList){
    vm.phone = mediaQueryList.matches;
    if (mediaQueryList.matches){
      vm.usersBox = true;
      vm.mapBox = false;
      vm.statisticsBox = false;
      vm.lastAlertsBox = false;

      console.log("Esto es un teléfono, tio");
    }
    else{
      vm.usersBox = true;
      vm.mapBox = true;
      vm.statisticsBox = true;
      vm.lastAlertsBox = true;
      console.log("Esto NO es un teléfono, colega")
    }
  });


};
