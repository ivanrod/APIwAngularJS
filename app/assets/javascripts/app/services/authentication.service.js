/**
 * Helper functions to autenticate admins and carers
 * @namespace  authentication
 * @memberOf Services
 */
function authenticationService($q, $timeout, $state){
	'use strict';
	return {
		/**
		 * @desc Redirects to signIn page if the user is not authenticated
		 * @param  {Object} authPromise A promise with the Authentication
		 * @return {Object} A promise
		 */
		redirectToSingin: function(authPromise){
			var deferred = $q.defer();
			authPromise.then(function(data){
                  deferred.resolve(data)
                }).catch(function(data){
					$state.go('signIn');
					deferred.resolve("No logeado")
			})
			
			return deferred.promise;
		}

	}
}