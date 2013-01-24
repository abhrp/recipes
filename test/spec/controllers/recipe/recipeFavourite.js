describe('Controller : RecipeFavouriteCtrl', function() {
  beforeEach(module('recipesApp'));

  var RecipeFavouriteCtrl, mockBackend, scope, fav_list, fav_recipes;

  beforeEach(inject(function($controller, _$httpBackend_, $rootScope){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });

    scope = $rootScope.$new();
    mockBackend = _$httpBackend_;
    
    fav_list = [2,3];
    mockBackend.expectGET('/api/favourites').respond(fav_list);
    fav_recipes = [{"id": "2", "author": "abc", "title" : "5 Spice Mushroom Rice", "description": "Mushrooms and Chinese 5 spice powder together make this rice very traditional fare.This dish is a delicate blend of flavours and textures that may not appeal to all,but it's a \"must\" for those who like to experiment beyond the conventional Chinese fried rice.", "cuisine":"Chinese", "category":"Main Course", "calories":100, "ingredients":[{"name": "chinese rice", "amount": "2 cups"}, {"name": "dark black mushroom, soaked and sliced", "amount": "1/2 cup"}, {"name": "mushrooms, sliced", "amount": "1/3 cup"}, {"name": "chinese 5 spice powder", "amount": "1 tsp"}, {"name": "sugar", "amount": "1 pinch"}, {"name": "oil", "amount": "2 tsp"}, {"name": "salt to taste", "amount":""}], "method":[{"step": "Heat the oil, add the mushrooms and sauté till they are tender."}, {"step":"Add the dried black mushrooms and sauté for 2 to 3 more minutes."}, {"step":"Add the Chinese 5 spice powder and sauté for ½ a minute."}, {"step":"Add the rice, sugar and salt and mix well."}, {"step":"Serve hot."}], "time": 10 , "servings": "4", "cooking_tips": [{"tip":"Soak the dried mushrooms in hot water for 15 minutes. Remove and discard the stalk."}], "img_url": "images/5-spice-mushroom-rice-1031.jpg"}, {"id": "3", "author": "abc", "title" : "Achari Chana Pulao", "description": "Achaaris spices such as saunf, rai, methi, kalongi and elaichi are combined with some fine long grained rice some kabuli chana to form a highly flavourful and fragrant pulao. The Punjabi garam masala forms an important part as it lends great taste to the dish. The mango pickle paste used in the pulao is what I believe was the secret ingredient behind the scrumptious preparation. So go ahead serve your family some of this irresistible pulao.", "cuisine":"Indian", "category":"Main Course", "calories":150, "ingredients":[{"name": "mango pickle", "amount": "2 tbsp"}, {"name": "long grained rice (basmati)", "amount": "1 1/4 cups"}, {"name": "ghee", "amount": "2 tbsp"}, {"name": "fennel seeds (saunf)", "amount": "1 tbsp"}, {"name": "mustard seeds", "amount": "1 tbsp"}, {"name": "fenugreek seeds", "amount": "1 tsp"}, {"name": "nigella seeds", "amount":"1 tbsp"}, {"name": "black cardamoms", "amount":"2"}, {"name": "cumin seeds", "amount":"1/2 tsp"}, {"name": "asafoetida", "amount":"1/2 tsp"}, {"name": "sliced onions", "amount":"1/2 cup"}, {"name": "ginger garlic paste", "amount":"1 tsp"}, {"name": "soaked and boiled kabuli chana", "amount":"1 cup"}, {"name": "turmeric powder", "amount":"1/2 tsp"}, {"name": "chilli powder", "amount":"1/2 tsp"}, {"name": "garam masala", "amount":"1/2 tsp"}, {"name": "salt", "amount":"to taste"}], "method":[{"step": "Blend the mango pickle in a mixer to a coarse paste. Keep aside."}, {"step":"Clean, wash and soak the rice for 10 minutes. Drain and keep aside."}, {"step":"Put 2½ cups of water to boil."}, {"step":"Heat the ghee in a pressure cooker, add the fennel seeds, mustard seeds, fenugreek seeds, onion seeds, big cardamoms, cumin seeds and asafoetida."}, {"step":"When the seeds crackle, add the onions and sauté till they turn translucent."}, {"step":"Add the ginger-garlic paste, kabuli chana, turmeric powder, chilli powder, Punjabi garam masala, salt and the prepared pickle paste and sauté for 2 minutes."}, {"step":"Add the rice and sauté for 2 more minutes."}, {"step":"Add the hot water and pressure cook for 2 whistles."}, {"step":"Allow the steam to escape before opening the lid."}, {"step":"Separate each grain of rice lightly with a fork."}, {"step":"Serve hot."}], "time": 35 , "servings": "4", "cooking_tips": "", "img_url": "images/achari_chana_pulao-2981.jpg"}]
    mockBackend.expectGET('/api/recipe?ids=2,3').respond(fav_recipes);
    
    RecipeFavouriteCtrl = $controller('RecipeFavouriteCtrl', {
      $scope: scope,
      LoginService: {loggedin : true}
    });
  }));

  it('should load favourite recipes', function() {
    mockBackend.flush();
    expect(scope.favourites).toEqual(fav_list);
    expect(scope.recipes).toEqualData(fav_recipes);
  });
});