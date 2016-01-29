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


appServices.factory('localStorage', function ($filter, $window) {
  return {
    // Get data from localStorage it will use data key for getting the data.
    // Parameter :
    // key = reference of object in localStorage.
    get: function (key) {
      return JSON.parse($window.localStorage[key] || "null");
    },

    // Add data to localStorage it will use data key
    // by input data key and value for setting data to localStorage.
    // Parameter :
    // key = reference of object in localStorage.
    // value = data that will store in localStorage.
    set: function (key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },

    //Remove all data from localStorage.
    removeAll: function () {
      $window.localStorage.clear();
    }

  };
});//End LocalStorage service.

// NoteDB service will call localStorage Services to present notes data to controller.
appServices.factory('NoteDB', function (localStorage) {
  return {
    //  Get all data from localStorage.
    selectAll: function () {
      //noteData is the key of object that store in localStorage.
      return localStorage.get("noteData");
    },

    // Add new note data to localStorage.
    // It will receive note data from controller to store in localStorage.
    // Parameter :
    // note = data that will store in localStorage.
    insert: function (note) {
      var notesList = localStorage.get("noteData");
      if (notesList == null) {
        // For first value of data.
        var newNoteData = [{
          id: 1,
          title: note.title,
          detail: note.detail,
          createDate: note.createDate
        }];
        localStorage.set("noteData", newNoteData);
      }
      else {
        // For up to second value of data.
        var newNoteData = {
          id: (notesList.length + 1),
          title: note.title,
          detail: note.detail,
          createDate: note.createDate
        };
        notesList.push(newNoteData);
        localStorage.set("noteData", notesList);
      }
    },

    // Update note data to localStorage.
    // It will receive note data from controller to store in localStorage.
    // Parameter :
    // note = data that will update to localStorage.
    update: function (note) {
      var notesList = localStorage.get("noteData");

      for (var i = 0; i <= notesList.length; i++) {
        if (notesList[i].id == note.id) {
          notesList[i] = note;
          break;
        }
      }

      localStorage.set("noteData", notesList);
    },

    // Remove data from localStorage it will receive note data
    // from controller to remove data from localStorage.
    // Parameter :
    // note = data that will delete from localStorage.
    delete: function (note) {
      var notesList = localStorage.get("noteData");

      for (var i = 0; i <= notesList.length; i++) {
        if (notesList[i].id == note.id) {
          notesList.splice(i, 1);
          break;
        }
      }

      localStorage.set("noteData", notesList);
    },

    // Remove All data from localStorage.
    clear: function () {
      localStorage.removeAll();
    },

    // Get number of notes.
    count: function () {
      var notesList = localStorage.get("noteData");
      return (notesList == null ? 0 : notesList.length);
    }
  };
});//End NoteDB service.

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
