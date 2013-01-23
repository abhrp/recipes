
'use strict';

recipesApp.controller('RecipeViewCtrl',['$scope', '$routeParams', 'Recipe', 'LoginService', 
  function($scope, $routeParams, Recipe, LoginService) {
    $scope.rating = null;
    $scope.recipe = Recipe.get({id: $routeParams.id});
  }
]);
