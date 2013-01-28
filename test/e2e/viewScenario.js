describe('Recipe View Flow', function() {
  beforeEach(function() {
    browser().navigateTo('/api/recipe/reload');
    browser().navigateTo('/');
  });

  it('should show the selected recipe details', function() {
    element('#recipe1 .go_recipe', 'Go To Recipe').click();
    expect(browser().location().url()).toEqual('/view/1');
  });
});