angular.module('docqr').controller('navController', navController);

function navController($scope, User) {
  $scope.title = "DOCQR";
  $scope.user = User;
}
