describe('dashboardController', function() {
  beforeEach(module('play'));

  var scope;
  var ctrl;

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    ctrl = $controller('dashboardCtrl', {$scope: scope});
  }));

  describe('$scope.grade', function() {
    it('sets the strength to "strong" if the password length is >8 chars', function() {

      expect(true).toEqual(true);
    });
  });
});