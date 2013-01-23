'use strict';

recipesApp.directive('recipeThumbnail', ['LoginService', '$http', function(LoginService, $http) {
  return {
    templateUrl: 'views/recipe/recipe-thumbnail.html',
    restrict: 'A',
    scope: {
      asset: '='
    },
    link: function(scope, elem, attrs) {
      scope.LoginService = LoginService;

      scope.toggleFavourite = function(recipe) {
        var response = null;       
        $http.post('/api/recipe/fav/' + recipe.id).success(function(res) {
          response = res;
          if(recipe.favourite) {
            recipe.favourite = false;
          } else {
            recipe.favourite = true;
          }
          scope.$emit('event:favouriteChange');
        });
      }
    }
  };
}]);
