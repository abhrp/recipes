'use strict';

recipesApp.controller('RecipeCreateUpdateCtrl',['$scope', '$routeParams', '$location', 'Recipe', 
  function($scope, $routeParams, $location, Recipe) {
    $scope.update = false;
    
    if($routeParams.id) {
      $scope.update = true;
      $scope.recipe = Recipe.get({id: $routeParams.id});
    } else {
      $scope.recipe = {
        ingredients: [],
        method: [],
        cooking_tips: [],
        img_url: "images/default-recipe-image.png"
      };  
    }

    $scope.getImage = function() {
      $scope.recipe.img_url = $scope.new_image_url;
    };

    $scope.addIngredient = function() {
      $scope.recipe.ingredients.push({name: null, amount: null});
    };

    $scope.removeIngredient = function(index) {
      $scope.recipe.ingredients.splice(index, 1);
    };

    $scope.addCookingSteps = function() {
      $scope.recipe.method.push({step: null});
    };

    $scope.removeCookingStep = function(index) {
      $scope.recipe.method.splice(index, 1);
    };

    $scope.addCookingTips = function() {
      $scope.recipe.cooking_tips.push({tip: null});
    };

    $scope.removeCookingTip = function(index) {
      $scope.recipe.cooking_tips.splice(index, 1);
    };
    
    $scope.submitRecipe = function() {
      Recipe.save({}, {recipe: $scope.recipe});
      $location.path('/');
    };

    $scope.saveRecipe = function() {
      Recipe.save({id: $routeParams.id}, {recipe: $scope.recipe}); 
      $location.path('/');
    };
  }
]);
