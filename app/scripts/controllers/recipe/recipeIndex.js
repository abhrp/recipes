'use strict';

recipesApp.controller('RecipeIndexCtrl',['$scope', 'Recipe', 'RecipeFilterService', 'LoginService', '$http', 'ErrorService',
  function($scope, Recipe, RecipeFilterService, LoginService, $http, ErrorService) {
    $scope.RecipeFilterService = RecipeFilterService;
    $scope.filters = {};
    $scope.favourites = [];
    $scope.recipes = [];

    var loadRecipes = function() {
      $scope.recipes = Recipe.query(function(response) {
        $scope.filters = $scope.RecipeFilterService.setFilterValues(response);
      });

      if (LoginService.loggedin) {
        $http.get('/api/favourites').success(function(favourites) {
          $scope.favourites = favourites;

          if(favourites.length > 0) {
            ErrorService.clear();
          }
        });
      }  
    };
    
    loadRecipes();

    $scope.$on('event:favouriteChange', function() {
      loadRecipes();
    });

  }
]);
