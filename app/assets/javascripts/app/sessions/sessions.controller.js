function sessionsCtrl($rootScope, $scope, $state, $auth, toaster){
	'use strict';
	var vm = this;
$(document).foundation('reflow');
	vm.loginForm = {};
	vm.authConfigAdmin = { config: 'admin'};

	vm.handleLoginSubmit = function(){
		console.log("click")
		if (vm.loginForm.email.slice(-10) === "@ecare.com"){
	    	$auth.submitLogin(vm.loginForm, vm.authConfigAdmin).then(function(respAdmin){
	    		console.log()
	    		console.log(respAdmin)
	    		$state.go('index.dashboard')
	    	}).catch(function(respAdmin2){
	    		console.log(respAdmin2);
	    	})			
		}
		else{
	      $auth.submitLogin(vm.loginForm)
	        .then(function(resp) { 
	          console.log(resp)
	        })
	        .catch(function(resp) { 
	        	console.log(resp)
	        });			
		}

	}

	$rootScope.$on('auth:login-error', function(ev, reason) {
	    toaster.pop('error', "Error", "El usuario o contraseña no es correcto")
	});

}