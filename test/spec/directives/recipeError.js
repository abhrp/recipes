'use strict';

describe('Directive: recipeError', function() {
  beforeEach(module('recipesApp'));

  var element;

  it('should make hidden element visible', inject(function($rootScope, $compile) {
    element = angular.element('<recipe-error></recipe-error>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the recipeError directive');
  }));
});
