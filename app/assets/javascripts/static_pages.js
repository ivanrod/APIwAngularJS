// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
'use strict';

// Declare app level module which depends on views, and components
var playApp = angular.module('play', ['chart.js', 'uiGmapgoogle-maps']);

//Config to load Google maps SDK
playApp.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
})

playApp.config([
  '$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'AngularXMLHttpRequest';
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  }
]);

//
playApp.service('sharedData', function ($rootScope, filterFilter) {
  var response = {};
  var people = "";
  var alerts = [];
  var chartData = allUsersAlertsNum(response, alerts);
  var payloads = {};
  var filteredData = filterFilter(response, {name: people});
  var colours = Chart.defaults.global.colours;

        return {
            getResponse:function () {
              return response;
            },
            setResponse:function (obj) {
              response = obj;
            },
            getAlerts: function() {
              return alerts;
            },
            setAlerts: function(obj){
              alerts = obj;
            },
            getPayloads: function(){
              return payloads;
            },
            setPayloads: function(obj){
              payloads = obj;
            },
            getPeople:function () {
              return people;
            },
            setPeople: function(value){
              people = value;
              filteredData = filterFilter(response, {name: people})
              $rootScope.$broadcast("people");
            },
            getColours: function(){
              return colours;
            },
            getFilteredData: function(){
              return filteredData;
            }
        }
      });


playApp.factory('ajaxFactory', function($http){
  return {
    getGroups: function(){
      return $http.get("/groups")
                    /*.then(function(result){
                      console.log(result)
                      return result.data;
                    })*/
    },
    getAlertsLast7days: function(groups){
      return $http.post("/group_alerts", JSON.stringify(groups))
    },
    getLatestsPayloads: function(groups){
      return $http.post("/group_payloads", JSON.stringify(groups))
    }
  }
})


playApp.controller('dashboardCtrl', ['$scope', 'sharedData', 'ajaxFactory', function($scope, sharedData, ajaxFactory) {
  //Chart.defaults.global.colours[0].strokeColor = "rbga(95, 174, 87, 0.2)" 
//changeUsersColors(Chart.defaults.global.colours);
  ajaxFactory.getGroups().then(function(groups){
    sharedData.setResponse(groups.data)

    ajaxFactory.getAlertsLast7days(groups.data).then(function(alerts){
      $scope.response = sharedData.getResponse();
      sharedData.setAlerts(alerts.data)
      $scope.alertTexts = lastUsersAlerts(sharedData.getResponse(), sharedData.getAlerts());
      $scope.chartData = allUsersAlertsNum(sharedData.getResponse(), sharedData.getAlerts());
      $scope.people = sharedData.getPeople();
      
      $scope.labels = last7daysArray();
      $scope.series = $scope.chartData.names;
      $scope.data = $scope.chartData.alerts;


      ajaxFactory.getLatestsPayloads(groups.data).then(function(payloads){
        sharedData.setPayloads(payloads.data)
        $scope.people = sharedData.getPeople();

        $scope.$watch('people', function(newValue, oldValue) {
        sharedData.setPeople($scope.people)
        
        })
      })
    })
    

    
  })
  //$scope.people = sharedData.getPeople();
  //$scope.myStyle = {background: rgb2hex(Chart.defaults.global.colours[sharedData.getIndex()].strokeColor)}
  $scope.myStyle = function(indexColor){
    return {background: sharedData.getColours()[indexColor].strokeColor}
  }

  $scope.$on('people', function(newValue, oldValue) {
    var filteredData = sharedData.getFilteredData();
    var newChartData = allUsersAlertsNum(filteredData, sharedData.getAlerts());
    //changeUsersColors(Chart.defaults.global.colours);
    if (newChartData != $scope.chartData){
      $scope.chartData = newChartData;
      $scope.data = $scope.chartData.alerts;
      $scope.series = $scope.chartData.names;
      $scope.alertTexts = lastUsersAlerts(filteredData, sharedData.getAlerts())
     
      if ($scope.data[0] == undefined){
        $scope.data=[[0,0,0,0,0,0,0]]; 
        $scope.series = ["No hay usuarios que coincidan con la búsqueda"];
      }

    }
    //console.log($scope.data)
  });

  
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

}]);

playApp.controller("mapsCtrl", function($scope, sharedData, uiGmapGoogleMapApi) {
   uiGmapGoogleMapApi.then(function(maps) {
      $scope.mapData = sharedData.getPayloads();
      $scope.map = { 
        center: { latitude: 41.35890136704563, longitude:  2.0997726917266846 }, 
        zoom: 13 ,
      };
      $scope.randomMarkers = getMarkersByUser($scope.mapData, Chart.defaults.global.colours, sharedData.getResponse())
      $scope.circles = getAllCirclesMapData(sharedData.getResponse())
      //console.log($scope.randomMarkers)
      $scope.$on( 'people', function() {
        $scope.mapData = sharedData.getPayloads();
        $scope.filteredData = sharedData.getFilteredData();
        $scope.people = sharedData.getPeople();
        $scope.circles = getAllCirclesMapData($scope.filteredData)
        $scope.randomMarkers = getMarkersByUser($scope.mapData, Chart.defaults.global.colours, $scope.filteredData);
        //console.log($scope.randomMarkers)
      });
    });
});

/*General Helper functions*/
//Function to convert hex format to a rgb color
var rgb2hex = function (rgb) {
    rgb = Array.apply(null, arguments).join().match(/\d+/g);
    rgb = ((rgb[0] << 16) + (rgb[1] << 8) + (+rgb[2])).toString(16);

    // for (var i = rgb.length; i++ < 6;) rgb = '0' + rgb;

    return "#" + rgb;
};

/*
//Funtion to change users colors
var changeUsersColors = function(colors){
  var lis = document.getElementsByClassName('groupName')[0].children;
  for (var i = 0; i < lis.length; i++ ){
    //$( ".groupName:nth-child(" + i + ")" ).css( "background", rgb2hex(colors[i].fillColor) );
    //lis[i].style.color = rgb2hex(colors[i].strokeColor);
    for (var j = 0; j < lis[i].children.length; j++){
      if ($.inArray("circle", lis[i].children[j].classList) != -1){
        lis[i].children[j].style.background = rgb2hex(colors[i].strokeColor);
        
      }
    }
    //Probar a usar promesa!!!
 }
}
*/

/* Dashboard Helper Functions */
var last7daysArray = function(){
  var last7daysArray = [];
  var day = new Date(Date.now())
  for (var i = 0; i <= 6; i++){
    last7daysArray.push(
      String(day.getDate()) + "/" + String(day.getUTCMonth()+1) + "/" + String(day.getUTCFullYear())
      );
    day.setDate(day.getDate()-1);
  }
  return last7daysArray.reverse()
};

var lastAlertsUserNum = function(user){
  //7 zeros array
  var lastAlerts = Array.apply(null, new Array(7)).map(Number.prototype.valueOf,0);
  var today = new moment().set({'seconds': 59, 'minutes': 59, 'hour': 23})
    for (var i = 0; i < user['alerts'].length; i++){
      var day = new moment(user['alerts'][i]['fecha'])
      lastAlerts[moment.duration(today - day).days()] += 1;
      //console.log(moment.duration(today - day).days())
    }

  //console.log(lastAlerts)
  //console.log(lastAlerts.slice(0, 7))
  return lastAlerts.slice(0, 7).reverse();
};

var lastAlertsFindUserNum = function(userName, users){
  for (var i = 0; i < users.length; i++){
    if (users[i].userId === userName){
      return lastAlertsUserNum(users[i]);
    }
  }
};

var allUsersAlertsNum = function(groups, alerts){
  var chartData = {
    names: [],
    alerts: []
  };
  for (var i=0; i<groups.length; i++){
    //console.log(groups[i])
    chartData.names.push(groups[i].name)
    chartData.alerts.push(lastAlertsFindUserNum(groups[i].name, alerts))
  }

  return chartData;
};

/* Google Maps Helper functions */
var pinPoints = function(pinColor){
    var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor.slice(1,pinColor.length),
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
    var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
        new google.maps.Size(40, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35));

    return [pinImage, pinShadow]
}

var formatPayloadMapMarker = function(markerId, payload, color, userId){
  var markerPosition = parsePosition(payload.data.location)
  var marker = {
    id: markerId,
    latitude: markerPosition.latitude,
    longitude: markerPosition.longitude,
    icon: pinPoints(color)[0].url,
    title: userId,
    options: {
            visible: true
          }
  }
  return marker;
} 

var getAllMarkers = function(payloads, colors){
  var markers = [];
  for (var i = 0; i < payloads.length; i++){
    
    if (payloads[i].payloads[0] != undefined){
      markers.push(formatPayloadMapMarker(i+1, payloads[i].payloads[0], rgb2hex(colors[i].fillColor), payloads[i].userId))
    }
  }
  return markers;
}

var getMarkersByUser = function(payloads,colors,groups){
  var usersPayloads = [];
  var users = [];
  for (var i = 0; i < groups.length; i++){
    users.push(groups[i].name);
  }
  for (var i = 0; i < payloads.length; i++){

    if ($.inArray(payloads[i].userId, users) != -1){
      usersPayloads.push(payloads[i]);
    }
  }

  return getAllMarkers(usersPayloads, colors)
}

var parsePosition = function(assetPosition){
  var position = assetPosition.split(', ');
  var positionObject = {
    latitude: parseFloat(position[0]),
    longitude: parseFloat(position[1])
  }
  return positionObject;
}

var parseCircleMapData = function(group, circleId){
  var circle = {
    id: circleId,
    labelStyle: {opacity: 0.75},
    center: {},
    radius: 150,
    stroke: {
      color: '#08B21F',
      weight: 2,
      opacity: 1      
    },
    fill:{
        color: '#08B21F',
        opacity: 0.5
    },
    visible: true
  };

  for (var i = 0; i < group.assets.length; i++){
    if (group.assets[i].location != ""){
      
      var parsedPosition = parsePosition(group.assets[i].location);
      circle.center.latitude = parsedPosition.latitude;
      circle.center.longitude = parsedPosition.longitude;
      
    }
  }
  return circle;
}

var getAllCirclesMapData = function(groups){
  var circles = [];
  for (var i=0; i < groups.length; i++){
    circles.push(parseCircleMapData(groups[i], i+1))
    circles[i].fill.color = rgb2hex(Chart.defaults.global.colours[i].fillColor);
    //circles[i].stroke.color = rgb2hex(Chart.defaults.global.colours[i].fillColor);
    //document.getElementsByClassName('groupName')[i].style.color = rgb2hex(Chart.defaults.global.colours[i].strokeColor);
    
  }
  //changeUsersColors(Chart.defaults.global.colours);
  return circles;
}




/* Ultimas alertas Helper functions */

var sortMomentHelper = function(a, b){
  if (a.time.isAfter(b)){ return 1}
    if (b.time.isAfter(a)){return -1}
      if (a.time.isSame(b)){return 0}
}

var formatAlerts = function(alerts){
  var alertsFormated = [];
  for (var i = 0; i < alerts.alerts.length; i++){
    var alert = {
      "text": alerts.userId + alertsNames[alerts.alerts[i].level],
      "time": moment(alerts.alerts[i].fecha)
    }
    alertsFormated.push(alert)
  }
  return alertsFormated;
}

var getAlertsByUser = function(user, alerts){
  var alertsByUser = [];
  for (var i = 0; i < alerts.length; i++){
    if (user === alerts[i].userId){
      alertsByUser = alerts[i];
    }
  }
  return alertsByUser;
}

var lastUsersAlerts = function(groups, alerts){
  var alertsTexts = [];
  for (var i=0; i<groups.length; i++){
    //console.log(groups[i])
    var user = groups[i].name;

    var alertsByUser = getAlertsByUser(user, alerts);
    alertsTexts = alertsTexts.concat(formatAlerts(alertsByUser));
  }
  alertsTexts = alertsTexts.sort(sortMomentHelper);
  return alertsTexts.reverse();
}

var alertsNames = {
  1: " ha pulsado el botón de alerta.",
  2: " lleva mas de 9 horas inactivo.",
  3: " se ha caído.",
  4: " ha salido de su zona de seguridad."
}
