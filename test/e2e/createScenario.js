angular.scenario.dsl('repeaterInput', function() {
  var chain = {};
  var supportInputEvent =  'oninput' in document.createElement('div');

  chain.enter = function(value, event) {
    return this.addFutureAction("repeaterInput '" + this.name + "' enter '" + value + "'", function($window, $document, done) {
      var input = $document.elements();
      input.val(value);
      input.trigger(event || (supportInputEvent ? 'input' : 'change'));
      done();
    });
  };
  return function(selector, label) {
    this.dsl.using(selector, label);
    return chain;
  };
});

describe('Create Recipe Flow', function() {
  beforeEach(function() {
    browser().navigateTo('/api/recipe/reload');
    browser().navigateTo('/api/recipe/logout');
    browser().navigateTo('/index.html#login');
    input('username').enter('abhiroop');
    input('password').enter('abhi123');
    element('.btn-success', 'Click on login').click();
  });

  it('should display the create page if clicked on create option', function() {
    element('#create', 'Click on Create option').click();
    expect(browser().location().url()).toEqual('/create');
  });

  it('should display the create form with default values', function() {
    element('#create', 'Click on Create option').click();
    expect(element('.create-recipe-thumbnail').attr('src')).toEqual('images/default-recipe-image.png');
    expect(element('.submit').css('display')).toEqual('inline-block');
    expect(element('.submit').attr('disabled')).toEqual('disabled');
    expect(element('#recipe-author').attr('value')).toEqual('');
    expect(element('#recipe-title').attr('value')).toEqual('');
    expect(element('#recipe-cuisine').attr('value')).toEqual('');
    expect(element('#recipe-time').attr('value')).toEqual('');
    expect(element('#recipe-category').attr('value')).toEqual('');
    expect(element('#recipe-calories').attr('value')).toEqual('');
    expect(element('#recipe-description').attr('value')).toEqual('');
  });

  it('should add and remove ingredients, cooking steps and tips', function() {
    element('#create', 'Click on Create option').click();
    element('.add-ingredient', 'Click to Add Ingredient').click();
    expect(element('#ingredient1').css('display')).toEqual('block');
    element('#ingredient1 .btn-danger', 'Click To Remove Ingredient').click();

    expect(repeater('#ingredients').count()).toEqual(0);

    element('.add-step', 'Click to Add Cooking Step').click();
    expect(element('#step1').css('display')).toEqual('block');
    element('#step1 .btn-danger', 'Click To Remove Cooking Step').click();

    expect(repeater('#steps').count()).toEqual(0);

    element('.add-tip', 'Click to Add Cooking Tip').click();
    expect(element('#tip1').css('display')).toEqual('block');
    element('#tip1 .btn-danger', 'Click To Remove Cooking Tip').click();

    expect(repeater('#tips').count()).toEqual(0);
  });

  iit('should create a new recipe', function() {
    element('#create', 'Click on Create option').click();
    input('recipe.img_url').enter('http://www.tarladalal.com/members/9306/images/burritos-4622.jpg');
    input('recipe.author').enter('Tarla Dalal');
    input('recipe.title').enter('Burritos');
    input('recipe.cuisine').enter('Mexican');
    input('recipe.time').enter(10);
    input('recipe.category').enter('Snack');
    input('recipe.calories').enter(100);
    input('recipe.description').enter('Burritos are warm, soft flour tortillas filled with savoury ingredients like beans, cheese, tomatoes and green onions.');
    element('.add-ingredient', 'Click to Add Ingredient').click();
    element('.add-ingredient', 'Click to Add Ingredient').click();
    repeaterInput('#ingredient1 .ingredient-name', 'Enter Ingredient Name').enter('Flour Tortillas');
    repeaterInput('#ingredient2 .ingredient-name', 'Enter Ingredient Name').enter('Chopped Tomatoes');
    repeaterInput('#ingredient1 .ingredient-amount', 'Enter Ingredient Amount').enter(6);
    repeaterInput('#ingredient2 .ingredient-amount', 'Enter Ingredient Amount').enter(4);
    element('.add-step', 'Click to Add Cooking Step').click();
    element('.add-step', 'Click to Add Cooking Step').click();
    repeaterInput('#step1 .step', 'Enter Cooking Step').enter('Place the refried beans, cheese, gaucamole, sour cream, tomatoes and spring onions in individual bowls.');
    repeaterInput('#step2 .step', 'Enter Cooking Step').enter('Let the guests make their own burritos by placing the beans and cheese on the tortillas, then applying a spoonful of guacamole and sour cream and topping with chopped tomatoes and spring onions and finally rolling up the tortillas.');
    repeaterInput('#ingredient1 .ingredient-amount', 'Enter Ingredient Amount').enter(6);
    repeaterInput('#ingredient2 .ingredient-amount', 'Enter Ingredient Amount').enter(4);
    element('.add-tip', 'Click To Add Tip').click();
    repeaterInput("#tip1 .tip", "Enter Cookign Tip").enter('Serve with cold drinks');
    element('#submit', 'Enter the Recipe').click();
    expect(browser().location().url()).toEqual('/');
    expect(repeater('recipe-list').count()).toEqual(5);    
  });
});