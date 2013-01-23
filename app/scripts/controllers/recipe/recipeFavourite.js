'use strict';

recipesApp.controller('RecipeFavouriteCtrl', ['$scope', '$http', '$location', 'LoginService', 'Recipe','recipeFilterService', 'errorService', 
  function($scope, $http, $location, LoginService, Recipe, recipeFilterService, errorService) {
    $scope.recipeFilterService = recipeFilterService;
    $scope.recipes = [];
 
    var loadRecipes = function() {
      $http.get('/api/recipe/fav/' + LoginService.username).success(function(response) {
        $scope.recipes = response;

        if($scope.recipes.length > 0) {
          $scope.filters = $scope.recipeFilterService.setFilterValues($scope.recipes);
          $scope.filter = $scope.filters.filter;  
        } else {
          $scope.filters = null;
          errorService.setError('You have no recently selected favourites');
          $location.path('/');
        }      
      });
    };
    
    loadRecipes();

    $scope.$on('event:favouriteChange', function() {
      loadRecipes();
    });
  } 
]);