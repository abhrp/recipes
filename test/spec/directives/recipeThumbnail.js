'use strict';

describe('Directive: recipeThumbnail', function() {
  beforeEach(module('recipesApp'));

  var element;

  it('should make hidden element visible', inject(function($rootScope, $compile) {
    element = angular.element('<recipe-thumbnail></recipe-thumbnail>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the recipeThumbnail directive');
  }));
});
