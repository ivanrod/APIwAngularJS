/* Google Maps Helper functions Factory*/

function mapsFactory(){
  return{
    //Function to convert hex format to a rgb color
    rgb2hex: function (rgb) {
        rgb = Array.apply(null, arguments).join().match(/\d+/g);
        rgb = ((rgb[0] << 16) + (rgb[1] << 8) + (+rgb[2])).toString(16);

        return "#" + rgb;
    },
    pinPoints: function(pinColor){
        var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor.slice(1,pinColor.length),
            new google.maps.Size(21, 34),
            new google.maps.Point(0,0),
            new google.maps.Point(10, 34));
        var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
            new google.maps.Size(40, 37),
            new google.maps.Point(0, 0),
            new google.maps.Point(12, 35));

        return [pinImage, pinShadow]
    },
    formatPayloadMapMarker: function(markerId, payload, color, userId){
      var markerPosition = this.parsePosition(payload.data.location)
      var marker = {
        id: markerId,
        userId: userId,
        latitude: markerPosition.latitude,
        longitude: markerPosition.longitude,
        icon: this.pinPoints(color)[0].url,
        show: false,
        options: {
                visible: true,
                labelContent: "$425K",
               labelAnchor: new google.maps.Point(22, 2),
               labelClass: "labels", // the CSS class for the label
               labelStyle: {opacity: 0.75}
              }
      }
      return marker;
    },
    getAllMarkers: function(payloads, colors){
      var markers = [];
      for (var i = 0; i < payloads.length; i++){
        
        if (payloads[i].payloads[0] != undefined){
          markers.push(this.formatPayloadMapMarker(i+1, payloads[i].payloads[0], this.rgb2hex(colors[i].fillColor), payloads[i].userId))
        }
      }
      return markers;
    },
    getMarkersByUser: function(payloads,colors,groups){
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

      return this.getAllMarkers(usersPayloads, colors)
    },
    parsePosition: function(assetPosition){
      var position = assetPosition.split(', ');
      var positionObject = {
        latitude: parseFloat(position[0]),
        longitude: parseFloat(position[1])
      }
      return positionObject;
    },
    parseCircleMapData: function(group, circleId){
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
          
          var parsedPosition = this.parsePosition(group.assets[i].location);
          circle.center.latitude = parsedPosition.latitude;
          circle.center.longitude = parsedPosition.longitude;
          
        }
      }
      return circle;
    },
    getAllCirclesMapData: function(groups){
      var circles = [];
      for (var i=0; i < groups.length; i++){
        circles.push(this.parseCircleMapData(groups[i], i+1))
        circles[i].fill.color = this.rgb2hex(Chart.defaults.global.colours[i].fillColor);
      }
      return circles;
    }

  }
}
