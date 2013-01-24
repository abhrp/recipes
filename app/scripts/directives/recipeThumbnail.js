'use strict';

recipesApp.directive('recipeThumbnail', ['LoginService', '$http', function(LoginService, $http) {
  return {
    templateUrl: 'views/recipe/recipe-thumbnail.html',
    restrict: 'A',
    scope: {
      asset: '=',
      favourites: '='
    },
    link: function(scope, elem, attrs) {
      scope.LoginService = LoginService;

      scope.toggleFavourite = function() {
        var response = null;       
        $http.post('/api/favourites/' + scope.asset.id).success(function(res) {
          scope.$emit('event:favouriteChange');
        });
      }
      
      scope.isFavourite = function() {
        return scope.favourites.indexOf(scope.asset.id) >= 0;
      };
    }
  };
}]);
