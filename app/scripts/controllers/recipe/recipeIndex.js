
'use strict';

recipesApp.controller('RecipeIndexCtrl',['$scope', '$http', 'Recipe', 'LoginService', '$location', 'recipeFilterService', 
  function($scope, $http, Recipe, LoginService, $location, recipeFilterService) {
    $scope.recipeFilterService = recipeFilterService;
    $scope.filter = {};

    $scope.recipes = Recipe.query(function(response) {
      $scope.filters = $scope.recipeFilterService.setFilterValues(response);
      if($scope.filters !== null) {
        $scope.filter = $scope.filters.filter;  
      }
    });
  }
]);
