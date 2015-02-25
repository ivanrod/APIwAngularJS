function userCtrl($scope, $stateParams, sharedData, alertsFactory){
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


}