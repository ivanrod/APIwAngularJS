/* Ultimas alertas Helper function Factory */
function alertsFactory(){
  'use strict';
  return{
    sortMomentHelper: function(a, b){
      if (a.time.isAfter(b.time)){ return 1}
        else if (b.time.isAfter(a.time)){return -1}
          else if (a.time.isSame(b.time)){return 0}
    },
    formatAlerts: function(alerts){
      var alertsFormated = [];
      for (var i = 0; i < alerts.alerts.length; i++){
        var alert = {
          "text": alerts.userId + this.alertsNames[alerts.alerts[i].level],
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

        var alertsByUser = this.getAlertsByUser(user, alerts);
        alertsTexts = alertsTexts.concat(this.formatAlerts(alertsByUser));
      }
      alertsTexts = alertsTexts.sort(this.sortMomentHelper);
      return alertsTexts.reverse();
    },
    alertsNames: {
      1: " ha pulsado el botón de alerta.",
      2: " lleva mas de 9 horas inactivo.",
      3: " se ha caído.",
      4: " ha salido de su zona de seguridad."
    }
  }
}