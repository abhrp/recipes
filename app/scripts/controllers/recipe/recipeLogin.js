'use strict';

recipesApp.controller('RecipeLoginCtrl',['$scope', '$http', '$location', 'LoginService', 'ErrorService', 
  function($scope, $http, $location, LoginService, ErrorService) {
    $scope.username = '';
    $scope.password = '';

    $http.post('/api/recipe/session').success(function(session) {
      LoginService.authorized(session);
    });

    $scope.LoginService = LoginService;

    $scope.login = function() {
      $http.post('/api/recipe/login', {username : $scope.username, password: $scope.password}).success(function(session) {
        LoginService.authorized(session);
        if (session.logged === true) {
          ErrorService.clear();
          $location.path('/');
        }
      });
    };

    $scope.logout = function() {
      $http.post('/api/recipe/logout').success(function(res) {
        LoginService.authorized(false);
        $location.path('/');
      });
    };
  }
]);