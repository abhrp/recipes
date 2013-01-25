'use strict';

var recipesApp = angular.module('recipesApp', ["ngResource"])
  .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/recipe/recipeIndex.html',
        controller: 'RecipeIndexCtrl',
        
        
      })
      .when('/create', {
        templateUrl: 'views/recipe/recipeCreateUpdate.html',
        controller: 'RecipeCreateUpdateCtrl',
        
      })
      .when('/update/:id', {
        templateUrl: 'views/recipe/recipeCreateUpdate.html',
        controller: 'RecipeCreateUpdateCtrl'
      })
      .when('/view/:id', {
        templateUrl: 'views/recipe/recipeView.html',
        controller: 'RecipeViewCtrl',
        
      })
      .when('/login', {
        templateUrl: 'views/recipe/recipeLogin.html',
        controller: 'RecipeLoginCtrl'
      })
      .when('/fav', {
        templateUrl: 'views/recipe/recipeIndex.html',
        controller: 'RecipeFavouriteCtrl'
      }).when('/404', {
        templateUrl: '404.html'
      })
      .otherwise({
        redirectTo: '/'
      });

    $httpProvider.responseInterceptors.push(['$rootScope', '$q', 'ErrorService', '$location', 
      function(scope, $q, ErrorService, $location) {
      
      function success(response) {
        return response;
      }
      
      function error(response) {
        var status = response.status;
        if(status === 401) {
          ErrorService.setError('Incorrect Credentials');
        }
        else if(status === 404) {
          $location.path('/404');
        }
        else if(status === 403) {
        }
        return response;
      }
      
      return function(promise) {
        return promise.then(success, error);
      };
    }]);
  }]);

  recipesApp.factory('Recipe', function($resource) {
    return $resource('/api/recipe/:id', {id: '@id'});
  });

  recipesApp.service('LoginService', function() {
    return {
      loggedin: false,
      username: null,
      authorized: function(login) {
        this.loggedin = login.logged;
        this.username = login.username;
      }
    };
  });

  recipesApp.service('ErrorService', function() {
    return {
      errorMessage: null,
      setError: function(msg) {
        this.errorMessage = msg;
      },
      clear: function() {
        this.errorMessage = null;
      }
    };
  });

  recipesApp.service('RecipeFilterService', function() {
    var maxCalories = 0,
        maxTime = 0,
        filter = null;
           
    var getMax = function(val1, val2) {
      return val1 > val2 ? val1 : val2;
    };

    var filterService =  {
      setFilterValues: function(recipes) {
        var cuisines = [];
 
        for (var i=0; i<recipes.length; i++) {
          cuisines.push(recipes[i].cuisine);
          maxTime = getMax(recipes[i].time, maxTime);
          maxCalories = getMax(recipes[i].calories, maxCalories);
        }

        var filterValues = {
          cuisines: _(cuisines).uniq(),
          maxCalories: maxCalories,
          maxTime: maxTime,
          title: '',
          cuisine: '',
          time: maxTime,
          calories: maxCalories
        };
        this.filters = filterValues;
        return filterValues;
      },
 
      filters: {},
 
      recipeFilter : function(recipe) {
        var filters  = filterService.filters;

        var valid = true;
        valid = valid && (filters.calories > 0 ? filters.calories >= recipe.calories : true);
        valid = valid && (filters.time > 0 ? filters.time >= recipe.time : true);
        valid = valid && (filters.cuisine != '' ? filters.cuisine === recipe.cuisine : true);
        valid = valid && (filters.title != '' ? (new RegExp(filters.title, 'i')).test(recipe.title) : true);
        return valid; 
      }
    };
    return filterService;    
  });