describe("Shared data in the app", function() {
  var sharedData, httpBackend;

  beforeEach(module("play"));

  beforeEach(inject(function (_sharedData_, $httpBackend) {
    sharedData = _sharedData_;
    httpBackend = $httpBackend;
  }));

  //////////
  //Tests //
  //////////
  it("should have a getResponse() function", function() {
    expect(sharedData.getResponse()).toBeDefined();
  });

});