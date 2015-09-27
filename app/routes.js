var Project = require('./models/project.js').Project;
var Model = require('./models/project.js').Model;
var View = require('./models/project.js').View;
var User = require('./models/user.js');
var _ = require('lodash');
var fs = require('fs');
module.exports = function(app, passport) {

  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get('/', function(req, res) {
    res.render('index.ejs', {
      message: req.flash('signupMessage'),
      user: req.user
    });

  });

  app.get('/camera', function(req, res) {
    res.render('camera.ejs');
  });

  // WEB VIEWER =============================
  app.get('/viewer/:vid', isLoggedIn, function(req, res) {
    View.findById(req.params.vid, function(err, view) {
      console.log(err);
      console.log(view);
      res.render('spectaclesviewer.ejs', {
        user: req.user,
        json: view.threed
      });
    })

  });

  // PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
      user: req.user
    });
  });

  // LOGOUT ==============================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function(req, res) {
    res.render('login.ejs', {
      message: req.flash('loginMessage')
    });
  });

  // app.get('/user/signin', passport.authenticate('local-login', function(err, user, info) {
  //
  // }));
  app.post('/user/signin', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401);
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        console.log(user);
        return res.json(user);
      });
    })(req, res, next);
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/projects', // redirect to the secure profile section
    failureRedirect: '/', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // SIGNUP =================================
  // show the signup form
  app.get('/signup', function(req, res) {
    res.render('signup.ejs', {
      message: req.flash('signupMessage')
    });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/projects', // redirect to the secure profile section
    failureRedirect: '/', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));


  // Projects SECTION =========================
  app.get('/projects', isLoggedIn, function(req, res) {
    // console.log(req.user);
    Project.find({
      'users': req.user._id
    }, function(err, projects) {
      res.render('projects.ejs', {
        projects: projects,
        user: req.user
      });
    });
  });

  app.get('/projects/:user', isAuth, function(req, res) {
    Project.find({
      'users': req.params.user
    }, function(err, projects) {
      console.log(projects);
      var p = [];
      for (var i = 0; i < projects.length; i++) {
        p.push({
          'name': projects[i].name,
          'id': projects[i]._id
        });
      }
      res.json(p);
    });
  });

  app.post('/addProject', isLoggedIn, function(req, res) {
    console.log("adding project", req.body);
    var newProject = new Project();
    newProject.users.push(req.user._id);
    newProject.name = req.body.name;
    newProject.save(function(err) {
      console.log("saved");
      res.redirect('/projects');
    });

  });
  app.post('/addUser', isLoggedIn, function(req, res) {
    console.log("adding User", req.body);
    User.findOne({
      'local.email': req.body.email
    }, function(err, user) {
      Project.findByIdAndUpdate(req.body.project, {
        $push: {
          'users': user._id
        }
      }, function(err, project) {
        res.redirect('/projects');
      });
    });

  });


  app.post('/views/:projectID/:modelID', isAuth, function(req, res) {
    console.log(req.params);
    // console.log(req.body);
    var newView = new View();
    newView.threed = req.body.threed;
    newView.model = req.params.modelID;
    newView.project = req.params.projectID;
    newView.save(function(err) {
        Project.findOne({
          '_id': req.params.projectID
        }, function(err, project) {
          res.json(newView._id);
        })

      })
      // console.log(newView);

    Project.findOneAndUpdate({
      // '_id': req.params.projectID,
      'models._id': req.params.modelID
    }, {
      $push: {
        'views': newView
      }
    }, function(err, project) {
      console.log(project);
    });
  });

  app.post('/newModelID/:projectID', isAuth, function(req, res) {
    console.log(req.params);
    var newID = Date.now();
    console.log(newID);
    var newModel = new Model();
    newModel.project = req.params.projectID;
    newModel.version = newID;
    Project.findByIdAndUpdate(req.params.projectID, {
      $set: {
        'currentVersion': newID
      },
      $push: {
        'models': newModel
      }
    }, function(err, project) {

      console.log("new View ID", newModel._id);
      res.json(newModel._id);
    });
  });
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  console.log(req.isAuthenticated);
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}

function isAuth(req, res, next) {
  // console.log(req);
  return next();
  // if (req.isAuthenticated())
  //   return next();
  //
  // res.status(401);
}
