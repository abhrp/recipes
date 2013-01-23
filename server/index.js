
var express = require('express'),
    fs = require('fs'),
    http = require('http');
    
var app = express();
var store = new express.session.MemoryStore();
app.use(express.cookieParser());
app.use(express.session({secret : 'the recipe website session', store: store}));

var recipes_json = JSON.parse(fs.readFileSync('server/data/recipes.json'));
var favourites_json = JSON.parse(fs.readFileSync('server/data/favourites.json'));
var lastIndex = 0;

Object.keys(recipes_json).forEach(function(val) {
  if (lastIndex < val * 1) { 
    lastIndex = val * 1;
  }
});

app.use(express.bodyParser());

var users = [{'username': 'abhiroop', 'password': 'abhi123'}, 
             {'username': 'chefcook', 'password': 'chef123'}];

require('./recipeRoutes')(app, recipes_json, favourites_json, lastIndex, users);
/* Required Route Files */ 

module.exports = app;
