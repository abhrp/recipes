'use strict';

describe('Controller: RecipeIndexCtrl', function() {

  // load the controller's module
  beforeEach(module('recipesApp'));

  var RecipeIndexCtrl,
    scope, mockBackend, recipes;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, _$httpBackend_) {
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });

    scope = {};
    mockBackend = _$httpBackend_;
    recipes = [{"id": 0, "author": "abc", "title" : "5 Spice Mushroom Rice", "description": "Mushrooms and Chinese 5 spice powder together make this rice very traditional fare.This dish is a delicate blend of flavours and textures that may not appeal to all,but it's a \"must\" for those who like to experiment beyond the conventional Chinese fried rice.", "cuisine":"Chinese", "category":"Main Course", "calories":100, "ingredients":[{"name": "chinese rice", "amount": "2 cups"}, {"name": "dark black mushroom, soaked and sliced", "amount": "1/2 cup"}, {"name": "mushrooms, sliced", "amount": "1/3 cup"}, {"name": "chinese 5 spice powder", "amount": "1 tsp"}, {"name": "sugar", "amount": "1 pinch"}, {"name": "oil", "amount": "2 tsp"}, {"name": "salt to taste", "amount":""}], "method":[{"step": "Heat the oil, add the mushrooms and sauté till they are tender."}, {"step":"Add the dried black mushrooms and sauté for 2 to 3 more minutes."}, {"step":"Add the Chinese 5 spice powder and sauté for ½ a minute."}, {"step":"Add the rice, sugar and salt and mix well."}, {"step":"Serve hot."}], "time": 10 , "servings": "4", "cooking_tips": [{"tip":"Soak the dried mushrooms in hot water for 15 minutes. Remove and discard the stalk."}], "img_url": "images/5-spice-mushroom-rice-1031.jpg"}];
    mockBackend.expectGET('/api/recipe').respond(recipes);
    RecipeIndexCtrl = $controller('RecipeIndexCtrl', {
      $scope: scope
    });
  }));

  it('should retreive the recipes from the server', function() {
    mockBackend.flush();
    expect(scope.recipes).toEqualData(recipes);
  });
 
  
});
