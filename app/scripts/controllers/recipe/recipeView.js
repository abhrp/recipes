'use strict';

recipesApp.controller('RecipeViewCtrl',['$scope', '$routeParams', 'Recipe', 
  function($scope, $routeParams, Recipe) {
    $scope.recipe = Recipe.get({id: $routeParams.id});
  }
]);
