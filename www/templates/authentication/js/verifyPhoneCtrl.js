appControllers.controller('verifyPhoneCtrl', function($scope, $state, $q, $http, VerifyMobile, $ionicPopup, $rootScope) {
  $scope.data = {};

  $scope.verify_phone = function() {

    var verify_mobile = new VerifyMobile($scope.data);
    // Get userId from local storage
    var userId = window.localStorage['userId'];

    verify_mobile.$get({id:userId, mobile_verification_pin:$scope.data.mobile_verification_pin},
      function(data){
        window.localStorage['userName'] = data.name;
        window.localStorage['authToken'] = data.authentication_token;
        $state.go("app.update-password");
      },
      function(error) {
        var error = error['data']["error"];
        var confirmPopup = $ionicPopup.alert({
          title: 'Validation Failure',
          template: error
        });
      }
    );

    // $promise.then syntax is not working for Angular 1.4.8. Getting then is undefined error. There is lot of
    // chatter on web about this. For now I am avoiding using $promise syntax.
    //var verify = verify_mobile.$get({id:userId, mobile_verification_pin:$scope.data.mobile_verification_pin});
    //verify.$promise.then(
    //  function(data) {
    //    window.localStorage['userName'] = data.name;
    //    window.localStorage['authToken'] = data.authentication_token;
    //    $state.go("app.dashboard");
    //  },
    //  function(err) {
    //    var error = err["error"];
    //    var confirmPopup = $ionicPopup.alert({
    //    title: 'Validation Failure',
    //    template: error
    //    });
    //  }
    //
    //);

  }
});


