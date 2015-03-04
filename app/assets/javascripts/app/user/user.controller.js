function userCtrl($scope, $stateParams, sharedData, alertsFactory, ajaxFactory, dashboardFactory, toaster){
'use strict';
	var vm = this;

	vm.userId = $stateParams.userId;

	vm.showAllAlerts = function(){
		vm.alertTexts = vm.allUserAlerts;
		vm.viewAllAlerts = true;
	}

	vm.showWeekAlerts = function(){
		vm.alertTexts = vm.lastWeekAlerts;
		vm.viewAllAlerts = false;
	}

	vm.startChart = function(data){
		vm.allUserAlerts = alertsFactory.userAlerts(vm.userId,data.data, vm.name);
		vm.lastWeekAlerts = alertsFactory.lastWeekAlerts(vm.allUserAlerts);
		vm.alertTexts = vm.lastWeekAlerts;
		vm.chartData = dashboardFactory.allUserAlertsNum(vm.lastWeekAlerts);
		vm.labels = vm.chartData.alertTypes;
		vm.data = [vm.chartData.alertsNumber];
	}


	activate();


	//////////

	function activate(){
		vm.elderDataPromise = ajaxFactory.getElderData(vm.userId)
		.then(function(data){
			//sharedData.setPeople(vm.userId)
			vm.name = data.data.name;
			vm.address = data.data.address;
			vm.phone = data.data.phone;

			ajaxFactory.getLatestPayloadFromGroup(vm.userId)
			.then(function(data){
				ajaxFactory.getGroups().then(function(groups){
      				sharedData.setResponse(groups.data)
      				sharedData.setPeople(vm.userId)
      			})
				var newPayload = {
					payloads: data.data,
					userId: vm.userId
				}
				sharedData.setPayloads([newPayload])
			})

			
			vm.viewAllAlerts = false;
			if (sharedData.getAlerts() === null){
				vm.allUserAlertsPromise = ajaxFactory.getAllUserAlerts(vm.userId)
					.then(function(data){
						vm.startChart(data);
					})
			}
			else{
				var userAlerts = alertsFactory.getAlertsByUser(vm.userId, sharedData.getAlerts());
				
				vm.alertTexts = alertsFactory.userAlerts(vm.userId, userAlerts.alerts, vm.name);	
				vm.viewAllAlerts = false;
				ajaxFactory.getAllUserAlerts(vm.userId)
					.then(function(data){
						vm.startChart(data);
					})	
			}
			
		})
	}




}