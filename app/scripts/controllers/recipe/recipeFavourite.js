'use strict';

recipesApp.controller('RecipeFavouriteCtrl', ['$scope', '$http', '$location', 'LoginService', 'Recipe','RecipeFilterService', 'ErrorService', 
  function($scope, $http, $location, LoginService, Recipe, RecipeFilterService, ErrorService) {
    $scope.RecipeFilterService = RecipeFilterService;
    $scope.recipes = [];
    $scope.favourites = [];
 
    var loadRecipes = function() {
      if(LoginService.loggedin) {
        $http.get('/api/favourites').success(function(response) {
          $scope.favourites = response;
          if($scope.favourites.length > 0) {
            ErrorService.clear();
            Recipe.query({ids: response}, function(recipes) {
              $scope.recipes = recipes;
              if($scope.recipes.length > 0) {
                $scope.filters = $scope.RecipeFilterService.setFilterValues($scope.recipes);
                $scope.filter = $scope.filters.filter;  
              }      
            });
          } else {
            $scope.filters = null;
            ErrorService.setError('You have no recently selected favourites');
            $location.path('/');
          }
        });  
      } else {
        $location.path('/404');
      }      
    };
    loadRecipes();

    $scope.$on('event:favouriteChange', function() {
      loadRecipes();
    });
  } 
]);