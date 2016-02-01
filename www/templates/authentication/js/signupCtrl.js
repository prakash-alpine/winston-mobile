appControllers.controller('signupCtrl', function($scope, $state, RegisterUser, $ionicPopup,  $timeout, $rootScope, $http, $cordovaOauth, localStorage,  $stateParams, ionicMaterialInk,ionicMaterialMotion, $ionicNativeTransitions) {
  $scope.data = {};
  $scope.data.role = "Select your role";
  $scope.data.adults = 1;
  $scope.data.children = 0;
  $scope.data.household = "Teli Family"

  $scope.$parent.clearFabs();
  $timeout(function () {
    $scope.$parent.hideHeader();
  }, 100);

  // Delay expansion
  $timeout(function() {
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
  }, 500);

  // Set Motion
  ionicMaterialMotion.fadeSlideInRight();

  // Set Ink
  ionicMaterialInk.displayEffect();

  // This function is the first activity in the controller.
  // It will initial all variable data and let the function works when page load.
  $scope.initialForm = function () {

    // $scope.isLogin is the variable for check that user is login or not.
    $scope.isLogin = false;

    // $scope.isLoading is the variable for loading progress.
    $scope.isLoading = false;

    // $scope.userInfo is the variable that store user information data.
    $scope.userInfo = {
      name: "",
      first_name: "",
      last_name: "",
      email: "",
      birthday: "",
      link: "",
      cover: "",
      pictureProfileUrl: "",
      gender: "",
      id: "",
      access_token: ""
    };

    // Getting user information.
    // $scope.userInfo = $scope.getUserProfile();

  };

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
  };

  $scope.facebookSignup = function() {

///    if ($scope.isLoading == false) {
    $scope.isLoading = true;
    // Calling $cordovaOauth.facebook for login facebook.
    // Format:
    // $cordovaOauth.facebook(APP_ID,[FACEBOOK_PERMISION])
    // For APP_ID is window.globalVariable.oAuth.facebook from www/js/app.js at globalVariable session.
    $cordovaOauth.facebook(window.globalVariable.oAuth.facebook, ["email"]).then(function (result) {
        $ionicPopup.alert({
          title: 'Facebook',
          template: "<p>Returned</p>"
        });
        //After call cordovaOauth.facebook it will return access_token for you to calling facebook API.
        $scope.accessToken = result.access_token;
        // Calling http service for getting user profile from facebook.
        // By send parameter access_token , fields, format.
        $http.get("https://graph.facebook.com/v2.4/me", {
          params: {
            access_token: result.access_token,
            fields: "birthday,first_name,email,last_name,name,link,cover,gender,id",
            format: "json"
          }
        }).then(function (result) {
          // Success retrieve data by calling http service.
          // Store user profile information from facebook API to userInfo variable.
          $scope.userInfo = {
            name: result.data.name,
            first_name: result.data.first_name,
            last_name: result.data.last_name,
            email: result.data.email,
            birthday: result.data.birthday,
            link: result.data.link,
            cover: result.data.cover,
            pictureProfileUrl: "http://graph.facebook.com/" + result.data.id + "/picture?width=500&height=500",
            gender: result.data.gender,
            id: result.data.id,
            access_token: $scope.accessToken
          };
          // Store user profile information to localStorage service.
          localStorage.set("Facebook", $scope.userInfo);
          // Navigate to facebook profile page.
          $state.go("app.signup-step-1");
        });
      }
      , function (error) {
        // Error retrieve data.
        console.log(error);
        $ionicPopup.alert({
          title: 'Signup Failure',
          template: error
        });
      });
    $scope.isLoading = false;

//    }

  };

})
