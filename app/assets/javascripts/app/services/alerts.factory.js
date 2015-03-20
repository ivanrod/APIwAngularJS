/**
 * Ultimas alertas Helper function Factory
 * @namespace alertsFactory
 * @memberOf Factories
 */
function alertsFactory(sharedData){
  'use strict';
  return{
    /**
     * @desc Helper to JS sort() function, to sort an array with Moment objects
     * @param  {Object} a Moment object
     * @param  {Object} b Moment object
     * @return {Integer} 1, -1 or 0
     */
    sortMomentHelper: function(a, b){
      if (a.time.isAfter(b.time)){ return 1}
        else if (b.time.isAfter(a.time)){return -1}
          else if (a.time.isSame(b.time)){return 0}
    },
  /**
   * @desc Obtains an array of alerts with a custom format
   * @param  {Object} alerts  
   * @param  {String} name
   * @return {Array} List of alerts formated
   */
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
    /**
     * @desc Selects only the alerts from a given user
     * @param  {String} user 
     * @param  {Array} alerts
     * @return {Array} User alerts
     */
    getAlertsByUser: function(user, alerts){
      var alertsByUser = [];
      for (var i = 0; i < alerts.length; i++){
        if (user === alerts[i].userId){
          alertsByUser = alerts[i];
        }
      }
      return alertsByUser;
    },
    /**
     * @desc Sort alerts by date (moment) and format them
     * @param  {Array} groups An array of groups (people)
     * @param  {Array} groups An array of  alerts
     * @return {Array}
     */
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
    /**
     * @desc Given a list of alerts, selects only those added the last 7 days
     * @param  {Array} alerts
     * @return {Array}
     */
    lastWeekAlerts: function(alerts){
      var lastAlerts = [];
      for (var i = 0; i < alerts.length; i++){
        if (alerts[i].time > moment().subtract(7, 'days')){
          lastAlerts.push(alerts[i]);

        }
      }
      return lastAlerts;
    },
    /**
     * @desc Format a list of alerts and then sort them    
     * @param  {String} userId ID given in play DB
     * @param  {Array} alerts List of alerts
     * @param  {String} name Name given in our DB
     * @return {Array}
     */
    userAlerts: function(userId, alerts, name){
      var alerts = this.formatAlerts({"alerts": alerts, "userId": userId}, name);
      alerts = alerts.sort(this.sortMomentHelper);
      return alerts.reverse();
    },
    /**
     * @desc Obtains the alerts texts and levels from sharedData service
     * @type {Object}
     */
    alertsNames: sharedData.getAlertsNames()
  }
}