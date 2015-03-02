describe('dashboardController', function() {
  beforeEach(module('play'));

  var scope;
  var ctrl;

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    vm = $controller('dashboardCtrl', {$scope: scope});
  }));

  
  it('should start with waitingForUsers true until users data is loaded', function() {

    expect(vm.waitingForUsers).toEqual(true);

  });
  
});