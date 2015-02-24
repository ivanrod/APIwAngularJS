function ajaxFactory($http){
  'use strict';
  return {
    getGroups: function(){
      return $http.get("/groups")
    },
    getAlertsLast7days: function(groups){
      return $http.post("/group_alerts", JSON.stringify(groups))
    },
    getLatestsPayloads: function(groups){
      return $http.post("/group_payloads", JSON.stringify(groups))
    }
  }
}