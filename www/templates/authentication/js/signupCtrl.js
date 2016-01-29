appControllers.controller('signupCtrl', function($scope, $state, RegisterUser, $ionicPopup,  $timeout, $rootScope, $http, localStorage,  $stateParams, ionicMaterialInk,ionicMaterialMotion, $ionicNativeTransitions) {
  $scope.data = {};
  $scope.data.role = "Select your role";
  $scope.data.adults = 1;
  $scope.data.children = 0;
  $scope.data.household = "Teli Family"

  $scope.countries = [
    {id: 1, text: 'USA', checked: false, icon: ''},
    {id: 2, text: 'France', checked: false, icon: 'https://www.zeendoc.com/wp-content/themes/zeendoc/img/french_flag_small.jpg'},
    {id : 3, text: 'Japan', checked: true, icon: ''}];

  $scope.selectables = [
    'Admin', 'Parent', 'Spouse', 'Nanny', 'Babysitter', 'Neighbor', 'Friend', 'Family Member', 'Coach'
  ];

  $scope.incrementAdults = function() {
    $scope.data.adults++;
  };

  $scope.decrementAdults = function() {
    if ($scope.data.adults > 1) {
      $scope.data.adults--;
    }
  };

  $scope.incrementChildren = function() {
    $scope.data.children++;
  };

  $scope.decrementChildren = function() {
    if ($scope.data.children > 0) {
      $scope.data.children--;
    }
  };

  $scope.$parent.clearFabs();
  $timeout(function () {
    $scope.$parent.hideHeader();
  }, 0);

  // Delay expansion
  $timeout(function() {
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
  }, 500);

  // Set Motion
  ionicMaterialMotion.fadeSlideInRight();

  // Set Ink
  ionicMaterialInk.displayEffect();

  $scope.navigateTo = function(state) {
    $ionicNativeTransitions.stateGo(state, {}, {
      "type": "slide",
      "direction": "up", // 'left|right|up|down', default 'left' (which is like 'next')
      "duration": 1500 // in milliseconds (ms), default 400
    });
  };

  $scope.login = function() {
    $state.go('app.login');
  };

  $scope.signup =  function() {

    $scope.$pending = true;
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
        $scope.$pending = false;
        $state.go("app.verify-phone");
      },
      function(err){
        $scope.$pending = false;
        var error = err["data"]["error"] || err.data.join('. ')
        var confirmPopup = $ionicPopup.alert({
          title: 'Registration Failure',
          template: error
        });
      }
    );
  }
})
