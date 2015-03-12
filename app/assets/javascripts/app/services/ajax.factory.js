function ajaxFactory($http, sharedData){
  'use strict';

  function corsReq(method, urlExtension, data){
    var request = {
       method: method,
       url: sharedData.getBaseApiUrl() + urlExtension,
       headers: angular.fromJson(sharedData.getCredentials()),
       data: data 
       }
    request.headers['X-Requested-With'] = undefined;
    request.headers['X-CSRF-Token'] = undefined;
    return request;
    };

  return {
    getGroups: function(){
      return $http.get("/groups");
    },
    getAlertsLast7days: function(groups){
      return $http.post("/group_alerts", JSON.stringify(groups));
    },
    getLatestsPayloads: function(groups){
      return $http.post("/group_payloads", JSON.stringify(groups));
    },

    getAllUserAlerts: function(userId){
      var userObj = {
        "userId": userId,
      };
      return $http.post("/get_all_user_alerts", JSON.stringify(userObj));
    },
    getLatestPayloadFromGroup: function(userId){
      var userObj = {
        "userId": userId,
      };
      return $http.post("/get_latest_payload_from_group", JSON.stringify(userObj));
    },

    getCarersData: function(){
      return $http.get("/carers");
    },
    getElderData: function(userId){
      var userObj = {
        "userId": userId,
      };
      return $http.post("/get_elder_data", JSON.stringify(userObj));
    },
    editElderData: function(userId, name, address, phone){
      var elderData = {
        "userId": userId,
        "name": name,
        "address": address,
        "phone": phone
      };
      return $http.post("/edit_elder_data", JSON.stringify(elderData));
    },
    editCarerData: function(carerName, carerElders){
      var carerData =  {
        "name": carerName,
        "elders": carerElders
      };
      return $http.post("/edit_carer_data", JSON.stringify(carerData));
    },





    getAssetAlerts: function(assetId, startDate, endDate){
      return $http(corsReq("GET", "/asset/" + assetId + '/alerts/' + startDate + "/" + endDate))
    },
    getAssetPayloads: function(assetId, startDate, endDate){
      return $http(corsReq("GET", "/asset/" + assetId + '/payloads/' + startDate + "/" + endDate))
    },
    getAssetLatestPayloads: function(assetId, numberOfPayloads){
     return $http(corsReq("GET", "/asset/" + assetId + "/latestPayloads/" + numberOfPayloads))
    },
    getUserAssets: function(userId){
      return $http(corsReq("GET", "/group/" + userId));
    },


  }
}