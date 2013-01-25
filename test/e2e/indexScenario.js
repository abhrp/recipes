describe('Index Page Display', function() {
  beforeEach(function() {
    browser().navigateTo('/api/recipe/reload');
    browser().navigateTo('/');
  });

  it('should display the recipes on the index page', function() {
    expect(repeater('.recipe-list', 'List of Recipes').count()).toBe(4);
  });

  it('should display according to the search filter', function() {
    input('filters.title').enter('5');
    expect(repeater('.recipe-list', 'List of Recipes').count()).toBe(1);

    input('filters.title').enter('a');
    expect(repeater('.recipe-list', 'List of Recipes').count()).toBe(3);

    input('filters.title').enter('ac');
    expect(repeater('.recipe-list', 'List of Recipes').count()).toBe(2);
    
    input('filters.title').enter('AcH');
    expect(repeater('.recipe-list', 'List of Recipes').count()).toBe(1);
  });

  it('should display recipes according to cuisine filter', function() {
    select('filters.cuisine').option('All');
    expect(repeater('.recipe-list', 'List of Recipes').count()).toBe(4);

    select('filters.cuisine').option('Chinese');
    expect(repeater('.recipe-list', 'List of Recipes').count()).toBe(1);

    select('filters.cuisine').option('American');
    expect(repeater('.recipe-list', 'List of Recipes').count()).toBe(1);
  });

  it('should display recipes according to the time required', function() {
    input('filters.time').enter('10');
    expect(repeater('.recipe-list', 'List of Recipes').count()).toBe(2);

    input('filters.time').enter('30');
    expect(repeater('.recipe-list', 'List of Recipes').count()).toBe(3);

    input('filters.time').enter('50');
    expect(repeater('.recipe-list', 'List of Recipes').count()).toBe(4);

  });

  it('should display recipes according to the calories', function() {
    input('filters.calories').enter('200');
    expect(repeater('.recipe-list', 'List of Recipes').count()).toBe(3);

    input('filters.calories').enter('100');
    expect(repeater('.recipe-list', 'List of Recipes').count()).toBe(2);
  });

  it('should display recipes according to the multiple filters', function() {
    input('filters.title').enter('a');
    expect(repeater('.recipe-list', 'List of Recipes').count()).toBe(3);

    select('filters.cuisine').option('Indian');
    expect(repeater('.recipe-list', 'List of Recipes').count()).toBe(1);

    input('filters.time').enter('30');
    expect(repeater('.recipe-list', 'List of Recipes').count()).toBe(0);
  });

  it('should go to recipe details page when clicked n Goto Recipe', function() {
    element('#recipe1 a').click();
    expect(browser().location().url()).toEqual('/view/1');
    expect(element('h4 a').css('display')).toEqual('none');
  });

});