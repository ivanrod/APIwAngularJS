function usersFactory(){
	'use strict';
	return {
		getElderDataFromGroup: function(groups, elderId){
			var elderData = null;
			for (var i = 0; i < groups.length; i++){
				if (groups[i].name === elderId){
					elderData = {
						userId: groups[i].name,
						name: groups[i].dbName,
						address: groups[i].address,
						phone: groups[i].phone
					}
				}
			}

			return elderData;
		},
		getCarerDataFromCarers: function(carerName, carers){
			for (var i = 0; i < carers.length; i++){
				if (carerName === carers[i].name){
					return carers[i];
				}
			}
		}
	}
}