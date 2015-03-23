/**
 * users (elders) Helper Function
 * @namespace usersFactory
 * @memberOf Factories
 */
function usersFactory(){
	'use strict';
	return {
		/**
		 * @desc Function to get data from our DB (obtained with a preview AJAX request) from a given elder
		 * @param  {Array} groups  An array of groups of assets
		 * @param  {String} elderId ID of the elder in play platform
		 * @return {Object} Formatted elder data
		 */
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
		/**
		 * @desc Function to get data from our DB (obtained with a preview AJAX request) from a given carer
		 * @param  {String} carerName 
		 * @param  {Array} carers
		 * @return {Object} Formatted carer data
		 */
		getCarerDataFromCarers: function(carerName, carers){
			for (var i = 0; i < carers.length; i++){
				if (carerName === carers[i].name){
					return carers[i];
				}
			}
		}
	}
}