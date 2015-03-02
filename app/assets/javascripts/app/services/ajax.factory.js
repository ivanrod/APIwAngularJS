function ajaxFactory($http){
  'use strict';
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
    }

  }
}