'use strict';

recipesApp.controller('RecipeCreateUpdateCtrl',['$scope', '$routeParams', '$location', 'Recipe', 'LoginService',
  function($scope, $routeParams, $location, Recipe, LoginService) {
    if(LoginService.loggedin) {
      if($routeParams.id) {
        $scope.recipe = Recipe.get({id: $routeParams.id});
      } else {
        $scope.recipe = {
          ingredients: [],
          method: [],
          cooking_tips: [],
          img_url: "images/default-recipe-image.png"
        };  
      }
    } else {
      $location.path('/404');
    }
    
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
    
    $scope.saveRecipe = function() {
      Recipe.save({id: $scope.recipe.id}, {recipe: $scope.recipe}, function(response) {
        console.log('Create Response : ',response);
        $location.path('/');  
      });
    };
  }
]);
