function usersFactory(){
	'use strict';
	return {
		getElderDataFromGroup: function(groups, elderId){
			var elderData = null;
			for (var i = 0; i < groups.length; i++){
				if (groups[i].name === elderId){
					elderData = {
						elderId: groups[i].name,
						name: groups[i].dbName,
						address: groups[i].address,
						phone: groups[i].phone
					}
				}
			}

			return elderData;
		}
	}
}