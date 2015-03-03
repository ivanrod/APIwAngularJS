function adminCtrl($scope, sharedData, ajaxFactory, usersFactory, FoundationApi){
	
	var vm = this;

	vm.elders = sharedData.getResponse();

	vm.getGroups = function(groups){
		sharedData.setResponse(groups.data);
        vm.elders = sharedData.getResponse();
        sharedData.setPeople("");
	}

	vm.editElder = function(elderId){
		vm.elderData = usersFactory.getElderDataFromGroup(vm.elders, elderId)
		FoundationApi.publish('basicModal', 'open');
	}
	
	if (vm.elders === {} ){
		vm.usersPromise = ajaxFactory.getGroups().then(vm.getGroups);
	}
	else{
		ajaxFactory.getGroups().then(vm.getGroups);
	}


	


	
}