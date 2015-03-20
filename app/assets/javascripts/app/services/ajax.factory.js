/**
 * AJAX requests to play API and our own BE
 * @namespace ajaxFactory
 * @memberOf Factories
 */
function ajaxFactory($http, sharedData){
  'use strict';

  /**
   * @desc Defines the request format (header & body) for play API requests
   * @param  {String} method 'GET', 'POST', 'PUT',...
   * @param  {String} urlExtension To merge with the base url defined in sharedData service 
   * @param  {Object} data Data to send in a POST or PUT request
   * @return {Object}
   */
  function corsReq(method, urlExtension, data){
    var request = {
       method: method,
       url: sharedData.getBaseApiUrl() + urlExtension,
       headers: angular.fromJson(sharedData.getCredentials()),
       data: data 
       }
    //In this case, we must avoid headers defined in app.config to interact with our Rails API
    request.headers['X-Requested-With'] = undefined;
    request.headers['X-CSRF-Token'] = undefined;
    return request;
    };

  return {
    ///////////////////////
    //Requests to our DB //
    ///////////////////////
    /**
     * @desc Obtains all assetGroups defined in our play platform throught our BE
     * @return {Object} A promise object which, if succeed, returns an Array of grouups
     */
    getGroups: function(){
      return $http.get("/groups");
    },
    /**
     * @desc Obtains the last 7 days alerts throught our BE
     * @param  {Array} groups
     * @return {Object} A promise object which, if succeed, returns an Array of alerts
     */
    getAlertsLast7days: function(groups){
      return $http.post("/group_alerts", JSON.stringify(groups));
    },
    /**
     * @desc Obtains the last payloads from every asset of our groups
     * @param  {Array} groups
     * @return {Object} A promise object which, if succeed, returns an Array of payloads
     */
    getLatestsPayloads: function(groups){
      return $http.post("/group_payloads", JSON.stringify(groups));
    },
    /**
     * @desc Obtains the alerts from a given user (elder)
     * @param  {String} userId Elder ID in the play platform  
     * @return {Object} A promise object which, if succeed, returns an array of alerts
     */
    getAllUserAlerts: function(userId){
      var userObj = {
        "userId": userId,
      };
      return $http.post("/get_all_user_alerts", JSON.stringify(userObj));
    },
    /**
     * @desc Obtains the latest payload from a given user (elder)
     * @param  {String} userId
     * @return {Object} A promise object which, if succeed, returns a payload object
     */
    getLatestPayloadFromGroup: function(userId){
      var userObj = {
        "userId": userId,
      };
      return $http.post("/get_latest_payload_from_group", JSON.stringify(userObj));
    },
    /**
     * @desc Obtains the carers data from our BE
     * @return {Object} A promise object, which, if succeed, returns an object with the carer info (name and elders)
     */
    getCarersData: function(){
      return $http.get("/carers");
    },
    /**
     * @desc Obtains elder data from our DB and play platform
     * @param  {String} userId
     * @return {Object} A promise object which, if succeed, returns an object with elder data
     */
    getElderData: function(userId){
      var userObj = {
        "userId": userId,
      };
      return $http.post("/get_elder_data", JSON.stringify(userObj));
    },
    /**
     * @desc Sends new elder data modified by an admin
     * @param  {String} userId 
     * @param  {String} name
     * @param  {String} address
     * @param  {String} phone
     * @return {Object} A promise object
     */
    editElderData: function(userId, name, address, phone){
      var elderData = {
        "userId": userId,
        "name": name,
        "address": address,
        "phone": phone
      };
      return $http.post("/edit_elder_data", JSON.stringify(elderData));
    },
    /**
     * @desc Sends new carer data modified by an admin
     * @param  {String} carerName
     * @param  {Array} carerElders
     * @return {Object} A promise object
     */
    editCarerData: function(carerName, carerElders){
      var carerData =  {
        "name": carerName,
        "elders": carerElders
      };
      return $http.post("/edit_carer_data", JSON.stringify(carerData));
    },



    ////////////////////////
    //Requests to Play API//
    ////////////////////////

    /**
     * @desc Obtains the alerts in a period of time from a given asset directly from the play API
     * @param  {String} assetId
     * @param  {String} startDate In miliseconds
     * @param  {String} endDate In miliseconds
     * @return {Object} A promise object, which, if succeed, returns alerts
     */
    getAssetAlerts: function(assetId, startDate, endDate){
      return $http(corsReq("GET", "/asset/" + assetId + '/alerts/' + startDate + "/" + endDate))
    },
    /**
     * @desc Obtains the payloads in a period of time from a given asset directly from the play API
     * @param  {String} assetId
     * @param  {String} startDate In miliseconds
     * @param  {String} endDate In miliseconds
     * @return {Object} A promise object, which, if succeed, returns payloads
     */
    getAssetPayloads: function(assetId, startDate, endDate){
      return $http(corsReq("GET", "/asset/" + assetId + '/payloads/' + startDate + "/" + endDate))
    },
    /**
     * @desc Obtains the latests payloads from a given asset directly from the play API
     * @param  {String} assetId
     * @param  {String} numberOfPayloads The number of latests payloads to return
     * @return {Object} A promise object
     */
    getAssetLatestPayloads: function(assetId, numberOfPayloads){
     return $http(corsReq("GET", "/asset/" + assetId + "/latestPayloads/" + numberOfPayloads))
    },
    /**
     * @desc Obtains all assets from a given group (elder, person) directly from the play API
     * @param  {String} userId
     * @return {Object} A promise object
     */
    getUserAssets: function(userId){
      return $http(corsReq("GET", "/group/" + userId));
    },


  }
}