function layoutCtrl($scope, auth, $rootScope, $document, $animate, $state, $auth, matchmedia, sharedData){
  'use strict';
  //Si falla para algún explorador el matchmedia se puede mirar de incluir los polyfills;
  
	var vm = this;

  console.log("Logeado como: " + auth.email)
  
  //To identify an admin, his nickname has to be ADMIN
  if (auth.nickname === "ADMIN"){
    vm.admin = true;
  }
  /*
  Media queries with matchmedia
  */
  $(document).foundation('reflow');

  vm.fillBoxes = function(){
    vm.partials = sharedData.getPartials();
    //console.log(sharedData.getPartials())
    //console.log(sharedData.getAdminPartials())
    vm.fillBox = sharedData.getPartial(0).url;
    vm.selected = 0;
    vm.slidification = false;    
  }

  vm.signOut = function(){
    $auth.signOut()
    .then(function(resp){
      $state.go('signIn');
    })
    .catch(function(resp){
      console.log(resp)
    })
  }

  vm.enableBox = function(box){
    vm.fillBox = sharedData.getPartial(box).url;
    vm.selected = box;
  }
  vm.slideBoxLeft = function(box){
    $animate.addClass(sharedData.getPhoneSection(), 'slideLeft').then(function(){
      sharedData.getPhoneSection().removeClass('slideLeft');
    })
    if (box < Object.keys(vm.partials).length-1){
      vm.fillBox = sharedData.getPartial(box + 1).url;
      vm.selected = box + 1;
    }
    else{
      vm.fillBox = sharedData.getPartial(0).url;
      vm.selected = 0;
    }
    
  }

  vm.slideBoxRight = function(box){
    $animate.addClass(sharedData.getPhoneSection(), 'slideRight').then(function(){
      sharedData.getPhoneSection().removeClass('slideRight');
    })
    if (box > 0){
      vm.fillBox = sharedData.getPartial(box - 1).url;
      vm.selected = box - 1;
    }
    else{
      vm.fillBox = sharedData.getPartial(Object.keys(vm.partials).length-1).url;
      vm.selected = Object.keys(vm.partials).length-1;
    }
  }


  matchmedia.on('(max-width: 1025px)', function(mediaQueryList){
    vm.phone = mediaQueryList.matches;
    if (mediaQueryList.matches){
      vm.fillBoxes();

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
  
  $scope.$on('partials', function(){
    vm.fillBoxes();
  })

}