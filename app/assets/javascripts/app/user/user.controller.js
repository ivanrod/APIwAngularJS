function userCtrl($scope, $stateParams, sharedData, alertsFactory, ajaxFactory, toaster){
'use strict';
	var vm = this;

	vm.userId = $stateParams.userId;

	vm.editMode = false;

	activate();

	function activate(){
		vm.elderDataPromise = ajaxFactory.getElderData(vm.userId)
		.then(function(data){
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
						vm.allUserAlerts = alertsFactory.userAlerts(vm.userId,data.data);
						vm.lastWeekAlerts = alertsFactory.lastWeekAlerts(vm.allUserAlerts);
						vm.alertTexts = vm.lastWeekAlerts;
					
						//vm.viewAllAlerts = true;
					})
			}
			else{
				var userAlerts = alertsFactory.getAlertsByUser(vm.userId, sharedData.getAlerts());
				
				vm.alertTexts = alertsFactory.userAlerts(vm.userId, userAlerts.alerts);	
				vm.viewAllAlerts = false;
				ajaxFactory.getAllUserAlerts(vm.userId)
					.then(function(data){
						vm.allUserAlerts = alertsFactory.userAlerts(vm.userId,data.data);
						vm.lastWeekAlerts = alertsFactory.lastWeekAlerts(vm.allUserAlerts);
					})	
			}	
		})


		if (sharedData.getAlerts().length === 0){
			console.log("No data");
		}
		else{
			console.log(
				alertsFactory.getAlertsByUser(vm.userId,sharedData.getAlerts())
				);
		}
	}

	vm.editElder = function(){
		ajaxFactory.editElderData(vm.userId, vm.editedName, vm.editedAddress, vm.editedPhone)
			.then(function(data){
				console.log(data);
				vm.editMode = false;
				vm.name = vm.editedName;
				vm.address = vm.editedAddress;
				vm.phone = vm.editedPhone;

				vm.pop("Hecho", "Usuario modificado")
			})
	}

	vm.pop = function(title, text){
		toaster.pop('success', title, text);
	}

	vm.showAllAlerts = function(){
		vm.alertTexts = vm.allUserAlerts;
		vm.viewAllAlerts = true;
	}

	vm.showWeekAlerts = function(){
		vm.alertTexts = vm.lastWeekAlerts;
		vm.viewAllAlerts = false;
	}



}