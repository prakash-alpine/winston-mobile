appControllers.controller('signupOptionsCtrl', function($scope, $state, UserSession, $ionicPopup, $rootScope, $cordovaOauth, $http, localStorage, $timeout,  $stateParams, ionicMaterialInk) {
  $scope.data = {};

  $scope.$parent.clearFabs();
  $timeout(function () {
    $scope.$parent.hideHeader();
  }, 0);
  ionicMaterialInk.displayEffect();

});
