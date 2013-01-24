'use strict';

recipesApp.directive('recipeError', ['ErrorService', function(ErrorService) {
  return {
    template: '<div class="alert alert-error alert-bar" ng-show="ErrorService.errorMessage">' +
     '<button type="button" class="close" ng-click="hideAlert()">x</button>' +
      '{{ErrorService.errorMessage}}</div>',
    restrict: 'E',
    scope: {},
    link: function(scope, element, attrs) {
      scope.ErrorService = ErrorService;
      scope.hideAlert = function() {
        scope.ErrorService.clear();
      };
    }
  };
}]);
