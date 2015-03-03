function mapsCtrl($scope, sharedData, uiGmapGoogleMapApi, mapsFactory) {
  'use strict';
  
  var vm = this;

   uiGmapGoogleMapApi.then(function(maps) {
      vm.mapData = sharedData.getPayloads();
      vm.map = { 
        center: { latitude: 41.35890136704563, longitude:  2.0997726917266846 }, 
        zoom: 13 ,
      };
      vm.randomMarkers = mapsFactory.getMarkersByUser(vm.mapData, Chart.defaults.global.colours, sharedData.getFilteredData())
      vm.circles = mapsFactory.getAllCirclesMapData(sharedData.getFilteredData())
      
      vm.windowOptions = {
            visible: false
        };

      vm.markerClick = function (e) {
        vm.markerUserId = e.model.userId;
        vm.markerPosition = {
          latitude: e.model.latitude,
          longitude: e.model.longitude
        }

        e.model.show = !e.model.show; 
      };

      $scope.$on( 'people', function() {
        vm.mapData = sharedData.getPayloads();
        vm.filteredData = sharedData.getFilteredData();
        vm.people = sharedData.getPeople();
        vm.circles = mapsFactory.getAllCirclesMapData(vm.filteredData)
        vm.randomMarkers = mapsFactory.getMarkersByUser(vm.mapData, Chart.defaults.global.colours, vm.filteredData);
      });
      
    });
};