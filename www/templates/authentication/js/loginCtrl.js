appControllers.controller('loginCtrl', function($scope, $state, UserSession, $ionicPopup, $rootScope) {
  $scope.data = {};

  $scope.login = function() {
    var user_session = new UserSession( $scope.data );
    user_session.$save(
      function(data){
        window.localStorage['userId'] = data.id;
        window.localStorage['userName'] = data.name;
        window.localStorage['authToken'] = data.authentication_token;
        $state.go("app.dashboard");
      },
      function(err){
        var error = err["data"]["error"] || err.data.join('. ')
        var confirmPopup = $ionicPopup.alert({
          title: 'Login Failed',
          template: error
        });
      }
    );
  };

  $scope.signup = function() {
    console.log("going to sign up");
    $state.go("app.signup");

  };

})
