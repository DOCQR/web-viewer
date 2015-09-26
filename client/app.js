angular.module('docqr', ['ui.router', 'ui.bootstrap'])
  .config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html'
      })
      .state('signup', {
        url: '/user/signup',
        templateUrl: 'views/signup.html',
        controller: 'authController'
      })
      .state('signin', {
        url: '/user/signin',
        templateUrl: 'views/signin.html',
        controller: 'authController'
      })
      .state('projects', {
        url: '/projects',
        templateUrl: 'views/projects.html',
        controller: 'projectsController'
      })
      .state('models', {
        url: '/models',
        templateUrl: 'views/models.html',
        controller: 'modelsController'
      });
    $urlRouterProvider.otherwise('/');
    //Auth Interceptor
    $httpProvider.interceptors.push('authInterceptor');
  });
