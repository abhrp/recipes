describe('Recipe Edit Flow', function() {
  
  beforeEach(function() {
    browser().navigateTo('/api/recipe/reload');
    browser().navigateTo('/index.html#login');
    input('username').enter('abhiroop');
    input('password').enter('abhi123');
    element('.login', 'Click on login').click();
  });

  it('should navigate to edit page when clicked on edit link', function() {
    element('#recipe2 .go_recipe', 'Go To Recipe').click();
    element('.span5 a', 'Click on Edit Button').click();
    expect(browser().location().url()).toEqual('/update/2');
  });

  it('should be able to edit recipe details', function() {
    element('#recipe2 .go_recipe', 'Go To Recipe').click();
    element('.span5 a', 'Click on Edit Button').click();
    input('recipe.author').enter('ABC-XYZ');
    element('#ingredient7 .btn-danger', 'Remove Ingredient').click();
    element('#save', 'Update the recipe').click();
    expect(browser().location().url()).toEqual('/');
    element('#recipe2 .go_recipe', 'Go To Recipe').click();
    expect(repeater('.ingredients_table').count()).toEqual(16);
  })
});