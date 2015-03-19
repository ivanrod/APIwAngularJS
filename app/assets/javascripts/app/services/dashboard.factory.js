/**
 * Dashboard Helper Function Factory
 * @namespace dashboardFactory
 * @memberOf Factories
 */

/* CAMBIAR NOMBRE POR CHARTFACTORY!!!!! */
function dashboardFactory(sharedData){
  'use strict';
  return {
    /**
     * @desc Obtain an array with the last 7 days     
     * @return {Array}  Elements are formated: dd/mm/yy
     */   
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
    /**
     * Obtains the last 7 days alerts for an user  
     * @param  {Object} user 
     * @return {Array} 7 elements (sorted by 7 days)
     */
    lastAlertsUserNum: function(user){
      var lastAlerts = Array.apply(null, new Array(7)).map(Number.prototype.valueOf,0);//7 zeros array
      var today = new moment().set({'seconds': 59, 'minutes': 59, 'hour': 23})
        for (var i = 0; i < user['alerts'].length; i++){
          var day = new moment(user['alerts'][i]['fecha'])
          lastAlerts[moment.duration(today - day).days()] += 1;
        }
      return lastAlerts.slice(0, 7).reverse();
    },
    /**
     * Obtains the last 7 days alerts for an user and discards alerts from other users
     * @param  {String} userName  
     * @param  {Array} alerts Alerts from diferent users
     * @return {Array} 7 elements (sorted by 7 days)
     */
    lastAlertsFindUserNum: function(userName, alerts){
      for (var i = 0; i < alerts.length; i++){
        if (alerts[i].userId === userName){
          return this.lastAlertsUserNum(alerts[i]);
        }
      }
    },
    /**
     * Obtains an object with user names and corresponding alerts ready to use in a charjs chart
     * @param  {Array} groups A list of group(people) objects
     * @param  {Array} alerts A list of alerts from diferent users
     * @return {Object} usernames and alerts
     */
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
    /**
     * Counts the number of alerts from a given type
     * @param  {String} type   
     * @param  {Array} alerts List of alerts
     * @return {Integer} 
     */
    alertsNumberByType: function(type, alerts){
      var alertsCounter = 0;
      for (var i = 0; i < alerts.length; i++){
        if (type == alerts[i].level){
          alertsCounter += 1;
        }
      }
      return alertsCounter;
    },
    /**
     * Obtains an object with alert types and the number of alerts for this types ready to use in a chartjs chart
     * @param  {Array} alerts List of alerts
     * @return {Object}        alertTypes and corresponding alerts
     */
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