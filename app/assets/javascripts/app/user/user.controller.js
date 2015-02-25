function userCtrl($scope, $stateParams, sharedData, alertsFactory, ajaxFactory){
'use strict';
	var vm = this;

	vm.userId = $stateParams.userId;
	vm.tel = "6786324524";

	vm.editMode = false;

	activate();

	function activate(){
		if (sharedData.getAlerts().length === 0){
			console.log("No data");
		}
		else{
			console.log(
				alertsFactory.getAlertsByUser(vm.userId,sharedData.getAlerts())
				);
		}
	}

	vm.editElder = function(userId, name, address, phone){
		ajaxFactory.editElderData(userId, name, address, phone)
			.then(function(data){console.log(data)})
	}
	

}