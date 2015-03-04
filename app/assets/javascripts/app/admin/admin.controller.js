function adminCtrl($scope, sharedData, ajaxFactory, usersFactory, FoundationApi, toaster){
	
	var vm = this;

	vm.getGroups = function(groups){
		sharedData.setResponse(groups.data);
        vm.elders = sharedData.getResponse();
        sharedData.setPeople("");
	}

	vm.editElder = function(elderId){
		vm.elderData = usersFactory.getElderDataFromGroup(vm.elders, elderId)
		FoundationApi.publish('basicModal', 'open');
	}

	vm.cancelEdit  = function(){
		FoundationApi.publish('basicModal', 'close');
	}
	vm.saveElderData = function(){
		ajaxFactory.editElderData(vm.elderData.elderId, vm.elderData.name, vm.elderData.address, vm.elderData.phone)
			.then(function(data){
				ajaxFactory.getGroups().then(vm.getGroups);
				FoundationApi.publish('basicModal', 'close');
				toaster.pop('success', "Guardado", "Datos del anciano modificados")

			})
	}

	activate();

	////

	function activate(){
		vm.elders = sharedData.getResponse();
		
		if (vm.elders === null || vm.elders === undefined ){
			vm.usersPromise = ajaxFactory.getGroups().then(vm.getGroups);
		}
		else{
			ajaxFactory.getGroups().then(vm.getGroups);
		}
	}
	
}