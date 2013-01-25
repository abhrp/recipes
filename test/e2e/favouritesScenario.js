describe('Favourites Flow', function() {
  beforeEach(function() {
    browser().navigateTo('/api/recipe/reload');
    browser().navigateTo('/index.html#login');
    input('username').enter('abhiroop');
    input('password').enter('abhi123')
    element('.login', 'Click on Login Button').click();
  });


  it('should display the correct recipes as favourites', function() {
    expect(element('#recipe2 .liked').css('display')).toEqual('inline-block');
    expect(element('#recipe3 .liked').css('display')).toEqual('inline-block');
    expect(element('#recipe1 .unliked').css('display')).toEqual('inline-block');
    expect(element('#recipe4 .unliked').css('display')).toEqual('inline-block');
  });

  it('should toggle the favourited state of recipes', function() {
    element('#recipe2 .liked', 'Click to remove favourite').click();
    expect(element('#recipe2 .liked').css('display')).toEqual('none');
    expect(element('#recipe2 .unliked').css('display')).toEqual('inline-block');

    element('#recipe4 .unliked', 'Click to remove favourite').click();
    expect(element('#recipe4 .unliked').css('display')).toEqual('none');
    expect(element('#recipe4 .liked').css('display')).toEqual('inline-block');
  });

  it('should show the favourite recipes on Favourites page', function() {
    element('.option-tab #favourites','Click on Favourites Link').click();
    expect(browser().location().url()).toEqual('/fav');

    expect(element('#recipe2').css('display')).toEqual('block');
    expect(element('#recipe3').css('display')).toEqual('block');
  });

  it('should show the newly favourited recipe on the Favourites page', function() {
    element('#recipe1 .unliked', 'Click to Favourite recipe').click();
    element('.option-tab #favourites','Click on Favourites Link').click();
    expect(element('#recipe1').css('display')).toEqual('block');
    expect(element('#recipe2').css('display')).toEqual('block');
    expect(element('#recipe3').css('display')).toEqual('block');
  });

  it('should remove the newly unfavourited recipe from the Favourites page', function() {
    element('.option-tab #favourites','Click on Favourites Link').click();
    element('#recipe2 .liked').click();
    expect(repeater('.recipe-list').count()).toEqual(1);
  });

  it('should display an alert if all recipes are unfavourited', function() {
    element('.option-tab #favourites','Click on Favourites Link').click();
    element('#recipe2 .liked').click();
    element('#recipe3 .liked').click();

    expect(element('.alert-bar').css('display')).toBe('inline-block');
    expect(element('.alert-bar').text()).toEqual('xYou have no recently selected favourites');
    expect(browser().location().url()).toEqual('/');
    expect(element('#recipe2 .liked').css('display')).toEqual('none');
    expect(element('#recipe3 .liked').css('display')).toEqual('none');

    element('.option-tab #favourites','Click on Favourites Link').click();
    expect(element('.alert-bar').css('display')).toBe('inline-block');
  });
});