'use strict';

describe('Controller: RecipeCreateUpdateCtrl', function() {

  // load the controller's module
  beforeEach(module('recipesApp'));

  var RecipeCreateUpdateCtrl,
    scope, mockBackend, recipe;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, _$httpBackend_) {
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
    scope = {};
    mockBackend = _$httpBackend_;

    recipe = {"id": 1, "author": "abc", "title" : "5 Spice Mushroom Rice", "description": "Mushrooms and Chinese 5 spice powder together make this rice very traditional fare.This dish is a delicate blend of flavours and textures that may not appeal to all,but it's a \"must\" for those who like to experiment beyond the conventional Chinese fried rice.", "cuisine":"Chinese", "category":"Main Course", "calories":100, "ingredients":[{"name": "chinese rice", "amount": "2 cups"}, {"name": "dark black mushroom, soaked and sliced", "amount": "1/2 cup"}, {"name": "mushrooms, sliced", "amount": "1/3 cup"}, {"name": "chinese 5 spice powder", "amount": "1 tsp"}, {"name": "sugar", "amount": "1 pinch"}, {"name": "oil", "amount": "2 tsp"}, {"name": "salt to taste", "amount":""}], "method":[{"step": "Heat the oil, add the mushrooms and sauté till they are tender."}, {"step":"Add the dried black mushrooms and sauté for 2 to 3 more minutes."}, {"step":"Add the Chinese 5 spice powder and sauté for ½ a minute."}, {"step":"Add the rice, sugar and salt and mix well."}, {"step":"Serve hot."}], "time": 10 , "servings": "4", "cooking_tips": [{"tip":"Soak the dried mushrooms in hot water for 15 minutes. Remove and discard the stalk."}], "img_url": "images/5-spice-mushroom-rice-1031.jpg"};
    mockBackend.expectGET('/api/recipe/1').respond(recipe);

    RecipeCreateUpdateCtrl = $controller('RecipeCreateUpdateCtrl', {
      $scope: scope,
      $routeParams : {id: 1}, 
      LoginService: {loggedin: true}
    });
  }));

  it('should get an existing recipe', function() {
    mockBackend.flush();
    expect(scope.recipe).toEqualData(recipe);   
  });

  it('should update an existing recipe', function() {
    mockBackend.flush();
    var original_recipe = scope.recipe;
    original_recipe.cooking_tips.splice(0, 1);
    original_recipe.ingredients.splice(5, 1);
    original_recipe.method.splice(3, 1);
    var updated_recipe = original_recipe;
    scope.removeIngredient(5);
    scope.removeCookingStep(3);
    scope.removeCookingTip(0);

    expect(scope.recipe).toEqualData(updated_recipe);

    mockBackend.expectPOST('/api/recipe/1',{recipe: scope.recipe}).respond(null);
  });
});
