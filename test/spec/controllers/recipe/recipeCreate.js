'use strict';

describe('Controller: RecipeCreateUpdateCtrl', function() {

  // load the controller's module
  beforeEach(module('recipesApp'));

  var RecipeCreateUpdateCtrl,
    scope, mockBackend, location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, _$httpBackend_) {
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });

    scope = {};
    location = {};
    mockBackend = _$httpBackend_;
    RecipeCreateUpdateCtrl = $controller('RecipeCreateUpdateCtrl', {
      $scope: scope,
    });
  }));

  it('should add the image', function() {
      scope.new_image_url = 'img/sample.jpg';
      scope.getImage();
      expect(scope.recipe.img_url).toEqual(scope.new_image_url);
  });

  it('should add the ingredient', function() {
    var ingredients = [{name: null, amount: null}, 
                       {name: null, amount: null}];
    scope.addIngredient();
    scope.addIngredient();

    expect(scope.recipe.ingredients).toEqual(ingredients);
  });

  it('should remove ingredient', function() {
    var ingredients = [{name: null, amount: null}];

    scope.addIngredient();
    scope.addIngredient();

    scope.removeIngredient();
    expect(scope.recipe.ingredients).toEqual(ingredients);

    scope.removeIngredient();
    expect(scope.recipe.ingredients).toEqual([]);     
  });

  it('should add cooking steps', function() {
    var method = [{step: null}, {step: null}];

    scope.addCookingSteps();
    scope.addCookingSteps();

    expect(scope.recipe.method).toEqual(method);
  });

  it('should remove cooking steps', function() {
    var method = [{step: null}];

    scope.addCookingSteps();
    scope.addCookingSteps();

    scope.removeCookingStep();
    expect(scope.recipe.method).toEqual(method);
    scope.removeCookingStep();
    expect(scope.recipe.method).toEqual([]);
  });

  it('should add cooking tips', function() {
    var tips = [{tip: null}, {tip: null}];

    scope.addCookingTips();
    scope.addCookingTips();

    expect(scope.recipe.cooking_tips).toEqual(tips);
  });

  it('should remove cooking tips', function() {
    var tips = [{tip: null}];
    scope.addCookingTips();
    scope.addCookingTips();

    scope.removeCookingTip();

    expect(scope.recipe.cooking_tips).toEqual(tips);

    scope.removeCookingTip();
    expect(scope.recipe.cooking_tips).toEqual([]);
  })

  it('should submit the recipe', function() {
    var recipe = {"id": 0, "author": "abc", "title" : "5 Spice Mushroom Rice", "description": "Mushrooms and Chinese 5 spice powder together make this rice very traditional fare.This dish is a delicate blend of flavours and textures that may not appeal to all,but it's a \"must\" for those who like to experiment beyond the conventional Chinese fried rice.", "cuisine":"Chinese", "category":"Main Course", "calories":100, "ingredients":[{"name": "chinese rice", "amount": "2 cups"}, {"name": "dark black mushroom, soaked and sliced", "amount": "1/2 cup"}, {"name": "mushrooms, sliced", "amount": "1/3 cup"}, {"name": "chinese 5 spice powder", "amount": "1 tsp"}, {"name": "sugar", "amount": "1 pinch"}, {"name": "oil", "amount": "2 tsp"}, {"name": "salt to taste", "amount":""}], "method":[{"step": "Heat the oil, add the mushrooms and sauté till they are tender."}, {"step":"Add the dried black mushrooms and sauté for 2 to 3 more minutes."}, {"step":"Add the Chinese 5 spice powder and sauté for ½ a minute."}, {"step":"Add the rice, sugar and salt and mix well."}, {"step":"Serve hot."}], "time": 10 , "servings": "4", "cooking_tips": [{"tip":"Soak the dried mushrooms in hot water for 15 minutes. Remove and discard the stalk."}], "img_url": "images/5-spice-mushroom-rice-1031.jpg"}; 
    var response = null;
    scope.recipe = recipe;
    mockBackend.expectPOST('/api/recipe', {recipe: recipe}).respond(response);

    scope.submitRecipe();
    expect(scope.recipe).toEqual(recipe);
  });

  });
