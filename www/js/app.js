// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in mdUiCtrl.js

//Global variable use for setting color, start page, message, oAuth key.
var db = null; //Use for SQLite database.
window.globalVariable = {
  //custom color style variable
  color: {
    appPrimaryColor: "",
    dropboxColor: "#017EE6",
    facebookColor: "#3C5C99",
    foursquareColor: "#F94777",
    googlePlusColor: "#D73D32",
    instagramColor: "#517FA4",
    wordpressColor: "#0087BE"
  },// End custom color style variable
  startPage: {
    url: "/app/login",
    state: "app.login"
  },
  message: {
    errorMessage: "Technical error please try again later." //Default error message.
  },
  oAuth: {
    dropbox: "your_api_key",//Use for Dropbox API clientID.
    facebook: "your_api_key",//Use for Facebook API appID.
    foursquare: "your_api_key", //Use for Foursquare API clientID.
    instagram: "your_api_key",//Use for Instagram API clientID.
    googlePlus: "your_api_key" //Use for Google API clientID.
  },
  config: {
    server_url: "http://winston-mobile.leanrails.com"
    //    server_url: "http://localhost:3006"


  },
  adMob: "your_api_key" //Use for AdMob API clientID.
};// End Global variable


angular.module('starter', ['ionic','ionic.service.core', 'starter.controllers', 'starter.services', 'ngMaterial', 'ngMessages', 'ngResource'])

.run(function($ionicPlatform, $rootScope, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive

    .state('app', {
      url: "/app",
      abstract: true,
      views: {
        'main-content': {
          templateUrl: "templates/welcome/html/welcome.html",
          controller: 'welcomeCtrl'
        }
      }
    })
    .state('app.dashboard', {
      url: "/dashboard",
      views: {
        'main-content@': {
          templateUrl: "templates/dashboard/html/dashboard_2.html",
          controller: 'dashboardCtrl'
        }
      }
    })
    .state('app.dashboard.tab-1', {
      url: "/tab_1",
      views: {
        "tab1-content@app.dashboard": {
          templateUrl: "templates/dashboard/html/tab_1.html",
          controller: 'dashboardCtrl'
        }
      }
    })
    .state('app.login', {
      url: "/login",
      cache: false,
      onEnter: function() { console.log("enter app.login"); },
      views: {
        'app-content': {
          templateUrl: "templates/authentication/html/login.html",
          controller: 'loginCtrl'
        }
      }
    })
    .state('app.signup', {
      url: "/signup",
      cache: false,
      onEnter: function() { console.log("enter app.signup"); },
      views: {
        'app-content': {
          templateUrl: "templates/authentication/html/signup.html",
          controller: 'signupCtrl'
        }
      }
    })
    .state('app.verify-phone', {
      url: "/verify-phone",
      cache: false,
      onEnter: function() { console.log("enter app.verify-phone"); },
      views: {
        'app-content': {
          templateUrl: "templates/authentication/html/verify-phone.html",
          controller: 'verifyPhoneCtrl'
        }
      }
    })
    .state('app.update-password', {
      url: "/update-password",
      cache: false,
      views: {
        'app-content': {
          templateUrl: "templates/authentication/html/update-password.html",
          controller: 'updatePasswordCtrl'
        }
      }
    })
    .state('app.material-ui', {
      url: "/material-ui",
      cache: false,
      views: {
        'app-content': {
          templateUrl: "templates/material-user-interface/default-user-interface/html/default-user-interface.html",
          controller: 'updatePasswordCtrl'
        }
      }
    })


    .state('app.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: "templates/dashboard/html/dashboard_2.html",
          controller: 'DashCtrl'
        }
      }
    })
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })


  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

    // This is needed in order to send session cookies on every request to server
    $httpProvider.defaults.withCredentials = true;

    //Use $urlRouterProvider.otherwise(Url);
    $urlRouterProvider.otherwise(window.globalVariable.startPage.url);

});
