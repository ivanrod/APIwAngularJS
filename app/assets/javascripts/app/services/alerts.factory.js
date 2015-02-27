/* Ultimas alertas Helper function Factory */
function alertsFactory(sharedData){
  'use strict';
  return{
    sortMomentHelper: function(a, b){
      if (a.time.isAfter(b.time)){ return 1}
        else if (b.time.isAfter(a.time)){return -1}
          else if (a.time.isSame(b.time)){return 0}
    },
    formatAlerts: function(alerts, name){
      var alertsFormated = [];
      for (var i = 0; i < alerts.alerts.length; i++){
        var alert = {
          "name": name,
          "userId": alerts.userId,
          "text": " " + this.alertsNames[alerts.alerts[i].level].text,
          "level": alerts.alerts[i].level,
          "time": moment(alerts.alerts[i].fecha).locale("es")
        }
        alertsFormated.push(alert)
      }
      return alertsFormated;
    },
    getAlertsByUser: function(user, alerts){
      var alertsByUser = [];
      for (var i = 0; i < alerts.length; i++){
        if (user === alerts[i].userId){
          alertsByUser = alerts[i];
        }
      }
      return alertsByUser;
    },
    lastUsersAlerts: function(groups, alerts){
      var alertsTexts = [];
      for (var i=0; i<groups.length; i++){
        //console.log(groups[i])
        var user = groups[i].name;
        var name = groups[i].dbName

        var alertsByUser = this.getAlertsByUser(user, alerts);
        alertsTexts = alertsTexts.concat(this.formatAlerts(alertsByUser, name));
      }
      alertsTexts = alertsTexts.sort(this.sortMomentHelper);
      return alertsTexts.reverse();
    },
    lastWeekAlerts: function(alerts){
      var lastAlerts = [];
      for (var i = 0; i < alerts.length; i++){
        if (alerts[i].time > moment().subtract(7, 'days')){
          lastAlerts.push(alerts[i]);

        }
      }
      return lastAlerts;
    },
    userAlerts: function(userId, alerts, name){
      var alerts = this.formatAlerts({"alerts": alerts, "userId": userId}, name);
      alerts = alerts.sort(this.sortMomentHelper);
      return alerts.reverse();
    },
    alertsNames: sharedData.getAlertsNames()
  }
}