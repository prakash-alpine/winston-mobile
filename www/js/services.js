appServices = angular.module('starter.services', [])

appServices.factory('UserEntry', function($resource) {
  return $resource(window.globalVariable.config.server_url + "/api/v1/users.json");
});

appServices.factory('UserSession', function($resource) {
  return $resource(window.globalVariable.config.server_url + "/api/v1/users/sign_in.json");
  //return $resource("http://winston-mobile.leanrails.com/api/v1/users/sign_in.json");

});

appServices.factory('RegisterUser', function($resource) {
  return $resource(window.globalVariable.config.server_url + "/api/v1/users.json");
});

appServices.factory('VerifyMobile', function($resource) {
  return $resource(window.globalVariable.config.server_url + "/api/v1/users/:id/verify_mobile.json", {id: '@id'});
});

appServices.factory('UpdatePassword', function($resource) {
  return $resource(window.globalVariable.config.server_url + "/api/v1/users/:id/update_password.json", {id: '@id'});
});


appServices.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
