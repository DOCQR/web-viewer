var Project = require('./models/project.js');
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
    failureRedirect: '/login', // redirect back to the signup page if there is an error
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
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));


  // Projects SECTION =========================
  app.get('/projects', isLoggedIn, function(req, res) {
    console.log(req.user);
    res.render('projects.ejs', {
      projects: ['1', '2', '3'],
      user: req.user
    });
  });

  app.post('/projects', isLoggedIn, function(req, res) {
    var newProject = new Project();
    newProject.users.push(req.user.id);
    newProject.name = req.body.name;
    newBuilding.save(function(err) {
      

      res.render('project.ejs')
    });

  });
  app.post('/projectsAddUser', isLoggedIn, function(req, res) {

  });


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}
