function layoutCtrl($scope, $animate, matchmedia, sharedData){
  'use strict';
  //Si falla para algún explorador el matchmedia se puede mirar de incluir los polyfills;

	var vm = this;
  /*
  Media queries with matchmedia
  */
  vm.fillBox = sharedData.getPartial(1);
  vm.selected = 1;
  vm.slidification = false;

  vm.enableBox = function(box){
    vm.fillBox = sharedData.getPartial(box);
    vm.selected = box;
  }
  vm.slideBoxLeft = function(box){
    $animate.addClass(sharedData.getPhoneSection(), 'slideLeft').then(function(){
      sharedData.getPhoneSection().removeClass('slideLeft');
    })
    if (box < 4){
      vm.fillBox = sharedData.getPartial(box + 1);
      vm.selected = box + 1;
    }
    else{
      vm.fillBox = sharedData.getPartial(1);
      vm.selected = 1;
    }
    
  }

  vm.slideBoxRight = function(box){
    $animate.addClass(sharedData.getPhoneSection(), 'slideRight').then(function(){
      sharedData.getPhoneSection().removeClass('slideRight');
    })
    if (box > 1){
      vm.fillBox = sharedData.getPartial(box - 1);
      vm.selected = box - 1;
    }
    else{
      vm.fillBox = sharedData.getPartial(4);
      vm.selected = 4;
    }
  }


  matchmedia.on('(max-width: 1025px)', function(mediaQueryList){
    vm.phone = mediaQueryList.matches;
    if (mediaQueryList.matches){
      sharedData.setPhoneSection();
      vm.usersBox = true;
      vm.mapBox = false;
      vm.statisticsBox = false;
      vm.lastAlertsBox = false;

      console.log("Esto es un teléfono, tio");
    }
    else{
      vm.usersBox = true;
      vm.mapBox = true;
      vm.statisticsBox = true;
      vm.lastAlertsBox = true;
      console.log("Esto NO es un teléfono, colega")
    }
  });
  
}