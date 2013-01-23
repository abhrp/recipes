'use strict';

recipesApp.controller('RecipeLoginCtrl',['$scope', '$routeParams', '$http', '$location', 'LoginService', 'errorService', 
  function($scope, $routeParams, $http, $location, LoginService, errorService) {
    $scope.username = '';
    $scope.password = '';

    $http.post('/api/recipe/session').success(function(session) {
      LoginService.authorized(session);
    });

    $scope.LoginService = LoginService;

    $scope.login = function() {
      $http.post('/api/recipe/login', {username : $scope.username, password: $scope.password}).success(function(session) {
        if (session.logged === true) {
          errorService.clear();
          LoginService.authorized(session);
        } else {
          LoginService.authorized(session);
        }
        $location.path('/');
      });
    };

    $scope.logout = function() {
      $http.get('/api/recipe/login').success(function(res) {
        LoginService.authorized(false);
        $location.path('/');
      });
    };

    $scope.$on('event:goToLogin', function() {
     $location.path('/login');
    }); 
  }
]);