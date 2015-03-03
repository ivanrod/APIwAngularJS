function adminCtrl($scope, sharedData, ajaxFactory, FoundationApi){
	
	var vm = this;

	vm.elders = sharedData.getResponse();

	vm.getGroups = function(groups){
		sharedData.setResponse(groups.data);
        vm.elders = sharedData.getResponse();
        sharedData.setPeople("");
        console.log(vm.response)
	}
	
	if (vm.elders === {} ){
		vm.usersPromise = ajaxFactory.getGroups().then(vm.getGroups);
	}
	else{
		ajaxFactory.getGroups().then(vm.getGroups);
	}


	


	
}