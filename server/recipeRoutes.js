module.exports = function(app, load_json, users_json){
  var json_index = load_json();
  var lastID = json_index.index + 1;
  var recipes = json_index.json;
  var users = users_json;
  
 
  app.post('/api/recipe/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    if (users[username] && users[username].password === password) {
      req.session.logged = true;
      req.session.username = username;
      req.session.password = password;
    } else {
      req.session.logged = false;
      res.status(401);
    }
    
    res.send(req.session);
  });

  app.post('/api/recipe/session', function(req, res) {
    res.send(req.session);
  });

  app.post('/api/recipe/logout', function(req, res) {
    req.session.logged = false;
    req.session.username = null;
    req.session.password = null;
    res.send(req.session);
  });

  app.get('/api/recipe/reload', function(req, res) {
    users =  {
    'abhiroop': { 'password': 'abhi123', favourites: ['2','3'] }, 
    'chefcook': { 'password': 'chef123', favourites: ['1', '2', '3'] }
    };
    json_index = load_json();
    recipes = json_index.json;
    lastID = json_index.index + 1;
    req.session.logged = false;
    req.session.username = null;
    req.session.password = null;
    res.send('done');
  });

  app.get('/api/recipe/:id', function(req, res) {
    res.send(recipes[req.params.id]);
  });

  app.get('/api/recipe', function(req, res) {
    if (req.query['ids']) {
      var ids = req.query['ids'].split(',');
      var to_send = [];
      for (var i = 0; i < ids.length; i++) {
        var rec = recipes[ids[i]];
        if (rec) {
          to_send.push(rec);
        }
      }
      res.send(to_send);
    } else {
      res.send(recipes);  
    }
    
  });

  app.post('/api/recipe', function(req, res) {
    if(req.session.logged) {
      var recipe = req.body.recipe;
      recipe.id = lastID++;
      recipes[recipe.id] = recipe;
      res.send('Done : Created');  
    } else {
      res.status('404');
      res.send('Not Found');  
    }        
  });

  app.post('/api/recipe/:id', function(req, res) {
    if(req.session.logged) {
      var recipe = req.body.recipe;
      recipes[req.params.id] = recipe;
      res.send('Done : Update');  
    } else {
      res.status('404');
      res.send('Not Found');  
    }    
  });

  app.get('/api/favourites', function(req, res) {
    if(req.session.logged) {
      var favourites = users[req.session.username].favourites;
      res.send(favourites);  
    } else {
      res.status('404');
      res.send('Not Found'); 
    }
  });

  app.post('/api/favourites/:id', function(req, res) {
    if(req.session.logged) {
      var id = req.params.id;

      var favourites = users[req.session.username].favourites;
      var curId = favourites.indexOf(id);

      if (curId >= 0) {
        favourites.splice(curId, 1);
      } else {
        favourites.push(id);
      }
      res.send('Done');  
    } else {
      res.status('404');
      res.send('Not Found'); 
    }    
  });
};
