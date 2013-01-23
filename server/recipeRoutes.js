module.exports = function(app, recipes_json, lastIndex, users){
  var lastID = lastIndex + 1;
  var recipes = recipes_json;
  
  app.get('/api/recipes', function(req, res) {
    
  });

  app.post('/api/recipe/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var flag = 0;

    for(var i=0; i<users.length; i++) {
      if(username === users[i].username && password === users[i].password) {
        req.session.logged = true;
        req.session.username = username;
        req.session.password = password;
        flag = 1;
        break;
      }
    }

    if(flag === 1) {
      res.send(req.session);
    } else {
      req.session.logged = false;
      res.status(401);
      res.send(req.session);
    }
  });

  app.post('/api/recipe/session', function(req, res) {
    res.send(req.session);
  });

  app.get('/api/recipe/login', function(req, res) {
    req.session.logged = false;
    req.session.username = null;
    req.session.password = null;
    res.send(req.session);
  });

  app.put('/api/recipe/:id', function(req, res) {

  });

  app.get('/api/recipe/:id', function(req, res) {
    res.send(recipes[req.params.id]);
  });

  app.get('/api/recipe', function(req, res) {
    res.send(recipes);
  });

  app.post('/api/recipe', function(req, res) {
    if(req.session.logged) {
      var recipe = req.body.recipe;
      recipe.id = lastID++;
      recipes[recipe.id] = recipe;  
    } else {
      res.status('404');
      res.send('Not Found');  
    }        
  });

  app.post('/api/recipe/:id', function(req, res) {
    if(req.session.logged) {
      var recipe = req.body.recipe;
      recipes[req.params.id] = recipe;  
    } else {
      res.status('404');
      res.send('Not Found');  
    }    
  });

  app.get('/api/recipe/fav/:id', function(req, res) {
    if(req.session.logged) {
      var fav_recipes = [];
      for(var  key in recipes) {
        if(recipes[key].favourite === true) {
          fav_recipes.push(recipes[key]);
        }
      }
      res.send(fav_recipes);  
    } else {
      res.status('404');
      res.send('Not Found'); 
    }
  });

  app.post('/api/recipe/fav/:id', function(req, res) {
    if(req.session.logged) {
      var id = req.params.id;

      if(recipes[id].favourite) {
        recipes[id].favourite = false;
      } else {
        recipes[id].favourite = true;
      }
      res.send('Done');  
    } else {
      res.status('404');
      res.send('Not Found'); 
    }    
  });
};
