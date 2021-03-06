function adminCtrl($scope, $filter, sharedData, ajaxFactory, usersFactory, FoundationApi, toaster){
	
	var vm = this;

	
	//////////////////
	//Panel choice //
	//////////////////
	
	vm.changeEldersOrCarers = function(eldersOrCarers){
		vm.adminPartial = sharedData.getPartial(eldersOrCarers);
		vm.adminPartialActive = eldersOrCarers;
	}

	
	//////////////
	//Get data //
	//////////////
	
	vm.getGroups = function(groups){
		sharedData.setResponse(groups.data);
        vm.elders = sharedData.getResponse();
        sharedData.setPeople("");
	}

	vm.getCarers = function(carers){
		vm.carers = carers.data;
		sharedData.setCarers(carers.data);
	}

	
	/////////////////
	//New & Edit  //
	/////////////////
	
	vm.cancelEdit  = function(){
		FoundationApi.publish('basicModal', 'close');
	}

	
	///////////////////////
	//New & Edit Elders //
	///////////////////////
	
	vm.editElder = function(elderId){
		vm.elderData = usersFactory.getElderDataFromGroup(vm.elders, elderId)
		FoundationApi.publish('basicModal', 'open');
	}

	vm.saveElderData = function(){
		vm.saveElderDataPromise = ajaxFactory.editElderData(vm.elderData.userId, vm.elderData.name, vm.elderData.address, vm.elderData.phone)
			.then(function(data){
				ajaxFactory.getGroups().then(vm.getGroups);
				FoundationApi.publish('basicModal', 'close');
				toaster.pop('success', "Guardado", "Datos del anciano modificados")

			})
	}

	
	///////////////////////
	//New & Edit Carers //
	///////////////////////
	
	vm.refreshFilteredElders = function(elders, eldersCarerList){
		vm.filteredElders = $filter('usersFilter')(vm.elders, vm.eldersCarerList)
		if (vm.filteredElders.length > 0){
			vm.elderToCarer = vm.filteredElders[0].name;
		}
	}

	vm.editOrCreateCarer = function(carerName){
		vm.eldersCarerList = [];
		vm.carerData = usersFactory.getCarerDataFromCarers(carerName, vm.carers);
		if (vm.carerData != undefined){
			vm.eldersCarerList = vm.carerData.elders.slice();		
		}
		vm.refreshFilteredElders();
		FoundationApi.publish('basicModal', 'open');
	}

	vm.addElderToCarer = function(){
		vm.eldersCarerList.push(usersFactory.getElderDataFromGroup(vm.elders, vm.elderToCarer));
		vm.refreshFilteredElders();
	}
	vm.subtractElderFromCarer =function(index){
		vm.eldersCarerList.splice(index,1)
		vm.refreshFilteredElders();
	}

	vm.saveCarerData = function(){
		vm.saveCarerDataPromise = ajaxFactory.editCarerData(vm.carerData.name, vm.eldersCarerList)
			.then(function(data){
				ajaxFactory.getCarersData().then(vm.getCarers);
				FoundationApi.publish('basicModal', 'close');
				toaster.pop('success', "Guardado", "Datos del cuidador modificados")

			})
	}

	activate();

	//////////

	function activate(){
		console.log("hola caracola1")
		sharedData.setPartials(sharedData.getAdminPartials());
		console.log(sharedData.getPartials())
		console.log("hola caracola")
		vm.changeEldersOrCarers(0);
		vm.elders = sharedData.getResponse();
		vm.carers = sharedData.getCarers();

		ajaxFactory.getCarersData().then(vm.getCarers);
		if (vm.elders === null || vm.elders === undefined ){
			vm.usersPromise = ajaxFactory.getGroups().then(vm.getGroups);
		}
		else{
			ajaxFactory.getGroups().then(vm.getGroups);
		}
	}
	
}