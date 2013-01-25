describe('Login Flow', function() {
  beforeEach(function() {
    browser().navigateTo('/api/recipe/reload');
    browser().navigateTo('/api/recipe/logout');
    browser().navigateTo('/index.html#login');
  });

  it('should display alert for wrong login', function() {
    input('username').enter('aldhs');
    element('.btn-success', 'Click on Login Button').click();
    expect(element('.alert-bar').css('display')).toBe('inline-block');

    input('username').enter('');
    input('password').enter('ksajhd');
    element('.btn-success', 'Click on Login Button').click();
    expect(element('.alert-bar').css('display')).toBe('inline-block');


    input('username').enter('aldhs');
    input('password').enter('ksajhd');
    element('.btn-success', 'Click on Login Button').click();
    expect(element('.alert-bar').css('display')).toBe('inline-block');

    input('username').enter('abhiroop');
    input('password').enter('')
    element('.btn-success', 'Click on Login Button').click();
    expect(element('.alert-bar').css('display')).toBe('inline-block');

    input('username').enter('');
    input('password').enter('abhi123');
    element('.btn-success', 'Click on Login Button').click();
    expect(element('.alert-bar').css('display')).toBe('inline-block');
  });

  it('should navigate to index page on correct login', function() {
    input('username').enter('abhiroop');
    input('password').enter('abhi123')
    element('.btn-success', 'Click on Login Button').click();

    expect(browser().location().url()).toBe('/');
  });
  
  it('should display different option on correct login', function() {
    input('username').enter('abhiroop');
    input('password').enter('abhi123')
    element('.btn-success', 'Click on Login Button').click();

    expect(element('.option-tab ul').css('display')).toEqual('block');
    expect(element('.fav').css('display')).toEqual('inline');
  });


});