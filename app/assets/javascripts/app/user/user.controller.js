function userCtrl($scope, $stateParams, sharedData, alertsFactory, ajaxFactory, dashboardFactory, toaster){
'use strict';
	var vm = this;

	vm.userId = $stateParams.userId;

	vm.editMode = false;

	activate();

	function activate(){
		vm.elderDataPromise = ajaxFactory.getElderData(vm.userId)
		.then(function(data){
			//sharedData.setPeople(vm.userId)

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

			
			vm.name = data.data.name;
			vm.editedName = vm.name;
			vm.address = data.data.address;
			vm.editedAddress = vm.address;
			vm.phone = data.data.phone;
			vm.editedPhone = vm.phone;
			vm.viewAllAlerts = false;
			if (sharedData.getAlerts().length == 0){
				vm.allUserAlertsPromise = ajaxFactory.getAllUserAlerts(vm.userId)
					.then(function(data){
						vm.allUserAlerts = alertsFactory.userAlerts(vm.userId,data.data, vm.name);
						vm.lastWeekAlerts = alertsFactory.lastWeekAlerts(vm.allUserAlerts);
						vm.alertTexts = vm.lastWeekAlerts;
						vm.chartData = dashboardFactory.allUserAlertsNum(vm.lastWeekAlerts);
						vm.startChart();
					})
			}
			else{
				var userAlerts = alertsFactory.getAlertsByUser(vm.userId, sharedData.getAlerts());
				
				vm.alertTexts = alertsFactory.userAlerts(vm.userId, userAlerts.alerts, vm.name);	
				vm.viewAllAlerts = false;
				ajaxFactory.getAllUserAlerts(vm.userId)
					.then(function(data){
						vm.allUserAlerts = alertsFactory.userAlerts(vm.userId,data.data, vm.name);
						vm.lastWeekAlerts = alertsFactory.lastWeekAlerts(vm.allUserAlerts);
						vm.chartData = dashboardFactory.allUserAlertsNum(vm.lastWeekAlerts);
						vm.startChart();
					})	
			}
			
		})
	}

	vm.editElder = function(){
		ajaxFactory.editElderData(vm.userId, vm.editedName, vm.editedAddress, vm.editedPhone)
			.then(function(data){
				vm.editMode = false;
				vm.name = vm.editedName;
				vm.address = vm.editedAddress;
				vm.phone = vm.editedPhone;

				toaster.pop('success', "Hecho", "Usuario modificado")

			})
	}

	vm.showAllAlerts = function(){
		vm.alertTexts = vm.allUserAlerts;
		vm.viewAllAlerts = true;
	}

	vm.showWeekAlerts = function(){
		vm.alertTexts = vm.lastWeekAlerts;
		vm.viewAllAlerts = false;
	}

	vm.startChart = function(){
		vm.labels = vm.chartData.alertTypes;
		vm.data = [vm.chartData.alertsNumber];
	}


}