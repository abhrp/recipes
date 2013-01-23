'use strict';

recipesApp.directive('recipeError',['errorService', function(errorService) {
  return {
    template: '<div class="alert alert-error alert-bar" ng-show="showAlert">' +
     '<button type="button" class="close" ng-click="hideAlert()">x</button>' +
      '{{errorService.errorMessage}}</div>',
    restrict: 'E',
    scope: {
      alertMessage: '='
    },
    link: function postLink(scope, element, attrs) {
      var alertMessageAttr = attrs['alertMessage'];
      scope.errorService = errorService;
      scope.showAlert = false;
      scope.$watch('errorService.errorMessage', function(newVal) {
        scope.showAlert = newVal ? true : false;
      });
      scope.hideAlert = function() {
        scope.showAlert = false;
      };
    }
  };
}]);
