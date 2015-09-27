var Project = require('./models/project.js').Project;
var Models = require('./models/project.js').Models;
var Model = require('./models/project.js').Model;
var User = require('./models/user.js');
module.exports = function(app, passport) {

  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get('/', function(req, res) {
    res.render('index.ejs', {
      message: req.flash('signupMessage')
    });
    
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
    console.log(req.user);
    Project.find({
      'users': req.user._id
    }, function(err, projects) {
      res.render('projects.ejs', {
        projects: projects,
        user: req.user
      });
    });
  });

  app.get('/projects/:user', isLoggedIn, function(req, res) {
    Project.find({
      'users': req.params.user
    }, function(err, projects) {
      console.log(projects);
      var p = [];
      for (var i = 0; i < projects.length; i++) {
        p.push(projects[i].name);
      }
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

  app.post('/model', isLoggedIn, function(req, res){

  });


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}
