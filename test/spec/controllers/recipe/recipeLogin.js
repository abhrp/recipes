'use strict';

describe('Controller: RecipeLoginCtrl', function() {

  // load the controller's module
  beforeEach(module('recipesApp'));

  var RecipeLoginCtrl,
    scope, mockBackend, session;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, _$httpBackend_, $rootScope) {
    scope = $rootScope.$new();

    mockBackend = _$httpBackend_;
    session = {logged : true, username: 'abhiroop'};
    mockBackend.expectPOST('/api/recipe/session').respond(session);
    RecipeLoginCtrl = $controller('RecipeLoginCtrl', {
      $scope: scope,
    });
  }));

  it('should login successfully', function() {
   scope.username = 'abhiroop';
   scope.password = 'abhi123';
   var LoginService = {login : true};

    mockBackend.expectPOST('/api/recipe/login', {username : 'abhiroop', password: 'abhi123'}).respond(session);
    scope.login();
    mockBackend.flush();
    expect(LoginService.login).toEqual(session.logged);
  });
});
