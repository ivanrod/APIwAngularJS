/* Dashboard Helper Function Factory */


/* CAMBIAR NOMBRE POR CHARTFACTORY!!!!! */
function dashboardFactory(sharedData){
  'use strict';
  return {
    last7daysArray: function(){
        var last7daysArray = [];
        var day = new Date(Date.now())
        for (var i = 0; i <= 6; i++){
          last7daysArray.push(
            String(day.getDate()) + "/" + String(day.getUTCMonth()+1) + "/" + String(day.getUTCFullYear())
            );
          day.setDate(day.getDate()-1);
        }
        return last7daysArray.reverse()
    },
    lastAlertsUserNum: function(user){
      //7 zeros array
      var lastAlerts = Array.apply(null, new Array(7)).map(Number.prototype.valueOf,0);
      var today = new moment().set({'seconds': 59, 'minutes': 59, 'hour': 23})
        for (var i = 0; i < user['alerts'].length; i++){
          var day = new moment(user['alerts'][i]['fecha'])
          lastAlerts[moment.duration(today - day).days()] += 1;
        }
      return lastAlerts.slice(0, 7).reverse();
    },
    lastAlertsFindUserNum: function(userName, users){
      for (var i = 0; i < users.length; i++){
        if (users[i].userId === userName){
          return this.lastAlertsUserNum(users[i]);
        }
      }
    },
    allUsersAlertsNum: function(groups, alerts){
      var chartData = {
        names: [],
        alerts: []
      };
      for (var i=0; i<groups.length; i++){
        if (groups[i].dbName == undefined){
        chartData.names.push(groups[i].name)
        }
        else{
        chartData.names.push(groups[i].dbName)
        }
        chartData.alerts.push(this.lastAlertsFindUserNum(groups[i].name, alerts))
      }

      return chartData;
    },

    alertsNumberByType: function(type, alerts){
      var alertsCounter = 0;
      for (var i = 0; i < alerts.length; i++){
        if (type == alerts[i].level){
          alertsCounter += 1;
        }
      }
      return alertsCounter;
    },
    allUserAlertsNum: function(alerts){
      var alertsNames = sharedData.getAlertsNames();

      var chartData = {
        alertTypes: [],
        alertsNumber: []
      };
      for (var i in alertsNames){
        chartData.alertTypes.push(alertsNames[i]["type"])
        chartData.alertsNumber.push(this.alertsNumberByType(i, alerts))
      }

      return chartData;
    }

  }
}