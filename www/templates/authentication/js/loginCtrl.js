appControllers.controller('loginCtrl', function($scope, $state, UserSession, $ionicPopup, $rootScope, $cordovaOauth, $http, localStorage, $timeout,  $stateParams, ionicMaterialInk) {
  $scope.data = {};

  $scope.$parent.clearFabs();
  $timeout(function() {
    $scope.$parent.hideHeader();
  }, 0);
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

  $scope.facebookLogin = function() {

//    if ($scope.isLoading == false) {
      $scope.isLoading = true;

      // Calling $cordovaOauth.facebook for login facebook.
      // Format:
      // $cordovaOauth.facebook(APP_ID,[FACEBOOK_PERMISION])
      // For APP_ID is window.globalVariable.oAuth.facebook from www/js/app.js at globalVariable session.
      $cordovaOauth.facebook(window.globalVariable.oAuth.facebook, ["publish_actions", "user_status", "user_birthday", "user_posts", "user_events"
        , "email", "user_actions.news", "user_friends", "public_profile"]).then(function (result) {
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
            $state.go("app.dashboard");
          });
        }
        , function (error) {
          // Error retrieve data.
          console.log(error);
        });
      $scope.isLoading = false;

//    }

  };

  $scope.initialForm();

}); // End of login controller.
