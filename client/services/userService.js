angular.module('docqr').factory('User', user);

function user($window, $state, $modal) {
  return {
    api: {},
    isAuth: true,
    email: 'n.mattise@gmail.com',
    name: 'Nick',

    logout: function() {
      delete $window.localStorage.token;
      $state.go('home');
      this.isAuth = false;
    }
  };
}
