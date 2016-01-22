appControllers.controller('signupCtrl', function($scope, $state, RegisterUser, $ionicPopup,  $timeout, $rootScope) {
  $scope.data = {};

  $scope.login = function() {
    $state.go('app.login');
  };

  $scope.signup =  function() {

    request_data = {};
    request_data['mobile_registration'] = true;
    request_data['user'] = {};
    request_data['user']['first_name'] = $scope.data.firstname;
    request_data['user']['last_name'] = $scope.data.lastname;
    request_data['user']['email'] = $scope.data.email;
    request_data['user']['mobile_phone'] = $scope.data.mobile_phone;

    var register_user = new RegisterUser( request_data );
    register_user.$save(
      function(data){
        window.localStorage['userId'] = data.id;
        window.localStorage['username'] = data.username;
        window.localStorage['first_name'] = data.first_name;
        window.localStorage['last_name'] = data.last_name;
        window.localStorage['mobile_phone'] = data.mobile_phone;
        window.localStorage['mobile_pin'] = data.mobile_verification_pin;
        window.localStorage['authToken'] = data.authentication_token;
        $state.go("app.verify-phone");
      },
      function(err){
        var error = err["data"]["error"] || err.data.join('. ')
        var confirmPopup = $ionicPopup.alert({
          title: 'Registration Failure',
          template: error
        });
      }
    );
  }
})
