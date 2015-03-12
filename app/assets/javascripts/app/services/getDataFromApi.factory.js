function getDataFromApiFactory(ajaxFactory, $q, $rootScope){
	'use strict';

	return {
		getUserInfoFromGroup: function(group, promiseInfo, infoName){
			var user = {"userId": group.name};
			user[infoName] = [];	
			user.dataPromises = [];
			var userAssetPromises = [];
			angular.forEach(group.assets, function(asset){
				var assetPromise = promiseInfo(asset.assetId, 1);
				assetPromise.user = user;
				user.dataPromises.push(assetPromise);
			}, this)

			return user;			
		},

		getAssetAlertsLast7days: function(assetId){
			var endDate = moment().valueOf();
			var startDate = moment().subtract(7, 'days').valueOf();
			return ajaxFactory.getAssetAlerts(assetId, startDate, endDate);
		},
		getUserAlertsFromGroup: function(group){
			return this.getUserInfoFromGroup(group, this.getAssetAlertsLast7days);;
		},
		getAlertsLast7days: function(groups){
			var users = {data:[]};
			var usersq = $q.defer();
			var promisesContainer = [];

			angular.forEach(groups, function(group){
				var user = this.getUserInfoFromGroup(group, this.getAssetAlertsLast7days, ["alerts"])
				promisesContainer = promisesContainer.concat(user.dataPromises);
				users.data.push(user)
			}, this)

			angular.forEach(promisesContainer, function(assetPromise){
				assetPromise.then(function(assetAlerts){		
					assetPromise.user.alerts = assetPromise.user.alerts.concat(assetAlerts.data)		
				})
			})

			$q.all(promisesContainer).then(function(){
				usersq.resolve(users)
			})
			
			return usersq.promise;
		},

		getUserPayloadsFromGroup: function(group){
			return this.getUserInfoFromGroup(group, ajaxFactory.getAssetLatestPayloads, "payloads");;
		},
		getLatestsPayloads: function(groups){
			var users = {data: []};
			var usersq = $q.defer();
			var promisesContainer = [];

			angular.forEach(groups, function(group){
				var user = this.getUserPayloadsFromGroup(group);
				promisesContainer = promisesContainer.concat(user.dataPromises);
				users.data.push(user)
			}, this)

		  	angular.forEach(promisesContainer, function(assetPromise){
		 		assetPromise.then(function(assetPayloads){
		 			assetPromise.user.payloads = assetPromise.user.payloads.concat(assetPayloads.data);
		 			
		 		})
		 	})

			 $q.all(promisesContainer).then(function(data){
			 	usersq.resolve(users)
			 });
			
			return usersq.promise;
		},

		getUserAssetNames: function(userId){
			var assetNamesPromise = $q.defer();
			var assetNames = [];
			ajaxFactory.getUserAssets(userId).then(function(userAssets){
				angular.forEach(userAssets, function(asset){
					assetNames.push(asset.assetId);
				})
				assetNamesPromise.resolve(assetNames)
			});

			return assetNamesPromise.promise;
		},
		getAllAssetAlerts: function(assetId){
			var assetAlertsPromise = $q.defer();
			var startDate = 0;
			var endDate = moment().valueOf();
				ajaxFactory.getAssetAlerts(assetId, startDate, endDate).then(function(assetAlerts){
					assetAlertsPromise.resolve(assetAlerts);
				})
			return assetAlertsPromise.promise;
		},
		getAllUserAlerts: function(userId){
			var userAlertsq = $q.defer();
			var alertsPromises = [];
			var alerts = [];
			var vm = this;
			vm.getUserAssetNames(userId).then(function(assetNames){
				angular.forEach(assetNames, function(assetName){
					var alertPromise = vm.getAllAssetAlerts(assetName)
					alertsPromises.push(alertPromise);
					alertPromise.then(function(assetAlerts){
						alerts = alerts.concat(assetAlerts.data);
					})
				})
				$q.all(alertsPromises).then(function(data){
					userAlertsq.resolve(alerts);
				})
			})

			return userAlertsq.promise;
		}
	}

}