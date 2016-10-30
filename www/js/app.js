// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'firebase', 'starter.configs','starter.controllers'])


.run(function($ionicPlatform, CONFIG) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    firebase.initializeApp({
      apiKey: CONFIG.FIREBASE_API,
      authDomain: CONFIG.FIREBASE_AUTH_DOMAIN,
      databaseURL: CONFIG.FIREBASE_DB_URL,
      storageBucket: CONFIG.FIREBASE_STORAGE,
      messagingSenderId: CONFIG.FIREBASE_STORAGE
    });
  });
})












.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
     controller: 'loginController',
    controller: 'AppCtrl'
   
    
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
  .state('login', {
      url: '/login',
     
        
          templateUrl: 'templates/login.html',
          controller: 'AppCtrl'
          //controller: 'loginController'
          

        
      
    })
  .state('signup', {
      url: '/signup',
     
          templateUrl: 'templates/signup.html',
          controller: 'signupController'
       
    })
  .state('app.dashboard', {
        url: '/dashboard',
        views: {
          'menuContent': {

            templateUrl: "templates/dashboard.html",
            controller: 'dashboardController',
            
          }
        }
      })

  .state('app.reset', {
        url: '/reset',
        views: {
          'menuContent': {
            templateUrl: "templates/resetemail.html",
            controller: "resetController"
          }
        }
      })
 


    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'ChatsCtrl'
        }
      }
    })

    .state('app.dashDetail', {
      url: '/dashDetail',
      views: {
        'menuContent': {
          templateUrl: 'templates/dashDetail.html',
          controller: 'dashboardController'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:index',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'ChatDetailCtrl'
      }
    }
  })

  .state('intro', {
    url: '/',
    templateUrl: 'templates/intro.html',
    controller: 'IntroCtrl'
  })

  .state('home1', {
    url: '/home1',
    templateUrl: 'templates/home1.html'
   
  })

  .state('home2', {
    url: '/home2',
    templateUrl: 'templates/home2.html'
   
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('home1');
});
