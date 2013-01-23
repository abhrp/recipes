'use strict';

var recipesApp = angular.module('recipesApp', ["ngResource"])
  .config(['$routeProvider', '$httpProvider',  function($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/recipe/recipeIndex.html',
        controller: 'RecipeIndexCtrl',
      })
      .when('/create', {
        templateUrl: 'views/recipe/recipeCreateUpdate.html',
        controller: 'RecipeCreateUpdateCtrl'
      })
      .when('/update/:id', {
        templateUrl: 'views/recipe/recipeCreateUpdate.html',
        controller: 'RecipeCreateUpdateCtrl'
      })
      .when('/view/:id', {
        templateUrl: 'views/recipe/recipeView.html',
        controller: 'RecipeViewCtrl'
      })
      .when('/login', {
        templateUrl: 'views/recipe/recipeLogin.html',
        controller: 'RecipeLoginCtrl'
      })
      .when('/fav', {
        templateUrl: 'views/recipe/recipeIndex.html',
        controller: 'RecipeFavouriteCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $httpProvider.responseInterceptors.push(['$rootScope', '$q', 'errorService', function(scope, $q, errorService) {
      
      function success(response) {
        return response;
      }
      
      function error(response) {
        var status = response.status;
        if(status === 401) {
          errorService.setError('Incorrect Credentials');
        }
        else if(status == 400) {
        }
        else if(status == 403) {
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
      login: false,
      username: null,
      authorized: function(login) {
        this.login = login.logged;
        this.username = login.username;
      }
    };
  });

  recipesApp.service('errorService', function() {
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

  recipesApp.service('recipeFilterService', function() {
    var maxCalories = 0,
        maxTime = 0,
        filter = null;
           
    var updateMax = function(value, maxValue) {
      if(value > maxValue) {
        maxValue = value;
      }
      return maxValue;
    };

    var filterService =  {

      setFilterValues: function(recipes) {
        if(recipes.length != 0) {
          maxCalories = recipes[0].calories;
          maxTime = recipes[0].time;

          var c=[];
          var filterValues = {};
    
          for (var i=0; i<recipes.length; i++) {
            c.push(recipes[i].cuisine);
            maxTime = updateMax(recipes[i].time, maxTime);
            maxCalories = updateMax(recipes[i].calories, maxCalories);
          }

          filterValues.cuisines = _.uniq(c);

          filterValues.maxCalories = maxCalories;
          filterValues.maxTime = maxTime;
          
          filterValues.filter = {'title': '', 'cuisine': '', 'time': maxTime, 'calories' : maxCalories};
          this.filters = filterValues.filter;
          return filterValues;
        } else {
          return null;
        }
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