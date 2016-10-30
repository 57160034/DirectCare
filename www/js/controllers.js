
angular.module('starter.controllers', ['firebase'])

//.controller('DashCtrl', function($scope) {})





.controller('AppCtrl', function($scope, $ionicModal, $timeout, $firebaseArray, $document, $state ,login) {



  $scope.islogin = true;

  $scope.islogout = false;


  $scope.loginData = {};



  $scope.closeLogin = function() {
    $scope.modal.hide();
  };


    // Open the login modal
    $scope.login = function() {
  //     $scope.islogin = login.login();

  // $scope.islogout = login.logout();
        //alert($scope.islogout);
        
      $scope.islogin = false;

      $scope.islogout = true;

       //alert('111');
        //$scope.modal.show();
        //alert(login);
      };


      $scope.logout = function() {

  //      $scope.islogin = login.login();

  // $scope.islogout = login.logout();

   $scope.islogin = true;

  $scope.islogout = false;


        


      };

      $scope.signup = function() {

        // alert('as');
        $state.go('signup');

      };


      $scope.reset = function() {

        //alert('as1111');
        $state.go('reset');

      };

      $scope.dashboard_Detail = function() {

        //alert('as1111');
        $state.go('app.dashDetail');

      };



    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {

      console.log('Doing login', $scope.loginData);




    };



$scope.doLogin = function(userLogin) {
 
  if ($document[0].getElementById("user_name").value != "" && $document[0].getElementById("user_pass").value != "") {

    firebase.auth().signInWithEmailAndPassword(userLogin.username, userLogin.password).then(function() {
                    // Sign-In successful.
                    //console.log("Login successful");

                    var user = firebase.auth().currentUser;
                    var name, email, photoUrl, uid;
                    if (user.emailVerified) { //check for verification email confirmed by user from the inbox
                      console.log("email verified");


                       $scope.islogin = false;

                        $scope.islogout = true;
                        
                       $scope.login();
                       //alert($scope.islogout);
                       
                      //$scope.login();
                     
                       //alert($scope.islogin);
                     // $state.go("app.dashboard");
                      $state.go("app.dashboard", {}, {reload: true});
                      
                        //window.location("#/app/search")
                        name = user.displayName;
                        email = user.email;
                        photoUrl = user.photoURL;
                        uid = user.uid;



                        //console.log(name + "<>" + email + "<>" +  photoUrl + "<>" +  uid);
                        localStorage.setItem("photo", photoUrl);
                        localStorage.setItem("displayName", name);
                      } else {
                        alert("Email not verified, please check your inbox or spam messages")
                        return false;
                    } // end check verification email
                  }, function(error) {
                    // An error happened.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode);
                    if (errorCode === 'auth/invalid-email') {
                      alert('Enter a valid email.');
                      return false;
                    } else if (errorCode === 'auth/wrong-password') {
                      alert('Incorrect password.');
                      return false;
                    } else if (errorCode === 'auth/argument-error') {
                      alert('Password must be string.');
                      return false;
                    } else if (errorCode === 'auth/user-not-found') {
                      alert('No such user found.');
                      return false;
                    } else if (errorCode === 'auth/too-many-requests') {
                      alert('Too many failed login attempts, please try after sometime.');
                      return false;
                    } else if (errorCode === 'auth/network-request-failed') {
                      alert('Request timed out, please try again.');
                      return false;
                    } else {
                      alert(errorMessage);
                      return false;
                    }
                  });
} else {
  alert('Please enter email and password');
  return false;
            } //end check client username password
        }; // end $scope.doLogin()



  })


.factory('login', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var login = true;
    var logout = false;

    function editlogin(){
      alert('ddd');
      //login=e;
    }


    function editlogout(e){
      //logout=e;
    }

    return {

      login: function() {
            //login = true;
            //logout = false;
            return !login;
            
          },

          logout: function() {
             //login = false;
             //logout = true;
             return !logout;
           }

         }


       })



.factory('Chats', function($http) {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [];

    return {

      getUsers: function() {
        return $http.get('https://randomuser.me/api/?results=10').then(function(response) {
          chats = response.data.results;
          return response.data.results;
        });
      },

      getUser: function(index) {
            //alert(chats[index]);
            return chats[index];
          }

        }


      })

/*.controller('ChatsCtrl' , function($scope, Chats){
  Chats.getUsers().then(function(chats){
    $scope.chats = chats;
  });




})
*/






.controller('ChatsCtrl', function($scope, $stateParams, Chats) {

  Chats.getUsers().then(function(chats) {
    $scope.chats = chats;
  });



  $scope.$on('$ionicView.enter', function() {
    console.log('DetailsView - enter');
  });

  $scope.$on('$ionicView.leave', function() {
    console.log('DetailsView - leave');
  });

  $scope.$on('$ionicView.beforeEnter', function() {
    console.log('DetailsView - beforeEnter');
  });

  $scope.$on('$ionicView.afterEnter', function() {
    console.log('DetailsView - afterEnter');
  });

  $scope.$on('$ionicView.beforeLeave', function() {
    console.log('DetailsView - beforeLeave');
  });

  $scope.$on('$ionicView.afterLeave', function() {
    console.log('DetailsView - afterLeave');
  });

  $scope.$on('$ionicView.unloaded', function() {
    console.log('DetailsView - unloaded');
  });
})

/*
.controller('ChatDetailCtrl' , function($scope,$stateParams, Chats){
  //$scope.chat = Chats.get($stateParams.chatId);
  var index = $stateParams.index;
  //var index = Chats.getUser($stateParams.index);
  $scope.chat = Chats.getUser(index);
  


})

*/

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    /*$scope.playlists = [
      { title: 'Reggae', id: 1 },
      { title: 'Chill', id: 2 },
      { title: 'Dubstep', id: 3 },
      { title: 'Indie', id: 4 },
      { title: 'Rap', id: 5 },
      { title: 'Cowbell', id: 6 }
      ];*/

    //$scope.chat = Chats.get($stateParams.chatId);
    var index = $stateParams.index;
    //var index = Chats.getUser($stateParams.index);
    $scope.chat = Chats.getUser(index);


    $scope.$on('$ionicView.enter', function() {
      console.log('PlayListsView - enter');
    });

    $scope.$on('$ionicView.leave', function() {
      console.log('PlayListsView - leave');
    });

    $scope.$on('$ionicView.beforeEnter', function() {
      console.log('PlayListsView - beforeEnter');
    });

    $scope.$on('$ionicView.afterEnter', function() {
      console.log('PlayListsView - afterEnter');
    });

    $scope.$on('$ionicView.beforeLeave', function() {
      console.log('PlayListsView - beforeLeave');
    });

    $scope.$on('$ionicView.afterLeave', function() {
      console.log('PlayListsView - afterLeave');
    });

    $scope.$on('$ionicView.unloaded', function() {
      console.log('PlayListsView - unloaded');
    });
  })



.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate, $ionicHistory) {

    // Called to navigate to the main app
    $scope.startApp = function() {





        //window.location="templates/search.html";
        $state.go('app.search');

      };
      $scope.next = function() {

        $ionicSlideBoxDelegate.next();
      };
      $scope.previous = function() {
        $ionicSlideBoxDelegate.previous();
      };

      $scope.home_login = function() {
        //$ionicSlideBoxDelegate.back();
        $state.go("app.dashboard");
      };

    // Called each time the slide changes
    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };
  })

// $ionicHistory.nextViewOptions({
//     disableBack: true
//   });
.controller('loginController', ['$scope', '$firebaseArray', 'CONFIG', '$document', '$state', 




  function($scope, $firebaseArray, CONFIG, $document, $state, $ionicHistory , login ) {

        //   $ionicHistory.nextViewOptions({
        //   disableBack: true
        // });  


      }

      ])

.controller('appController', ['$scope', '$firebaseArray', 'CONFIG', '$document', '$state',

  function($scope, $firebaseArray, CONFIG, $document, $state) {

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        $document[0].getElementById("photo_user").src = localStorage.getItem("photo");
        $document[0].getElementById("displayName").innerHTML = localStorage.getItem("displayName");
      } else {
                // No user is signed in.
                $state.go("app.login");
              }
            });
    $scope.doLogout = function() {
      firebase.auth().signOut().then(function() {
                    // Sign-out successful.
                    //console.log("Logout successful");
                    $state.go("app.login");
                  }, function(error) {
                    // An error happened.
                    console.log(error);
                  });
            } // end dologout()

          }

          ])

.controller('resetController', ['$scope', '$state', '$document', '$firebaseArray', 'CONFIG',
  function($scope, $state, $document, $firebaseArray, CONFIG) {

    $scope.doResetemail = function(userReset) {
            //console.log(userReset);
            if ($document[0].getElementById("ruser_name").value != "") {
              firebase.auth().sendPasswordResetEmail(userReset.rusername).then(function() {
                    // Sign-In successful.
                    //console.log("Reset email sent successful");
                    $state.go("app.login");
                  }, function(error) {
                    // An error happened.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode);
                    if (errorCode === 'auth/user-not-found') {
                      alert('No user found with provided email.');
                      return false;
                    } else if (errorCode === 'auth/invalid-email') {
                      alert('Email you entered is not complete or invalid.');
                      return false;
                    }
                  });
            } else {
              alert('Please enter registered email to send reset link');
              return false;
            } //end check client username password
        }; // end $scope.doSignup()
      }
      ])



.controller('signupController', ['$scope', '$state', '$document', '$firebaseArray', 'CONFIG',
  function($scope, $state, $document, $firebaseArray, CONFIG) {
    $scope.doSignup = function(userSignup) {
            //console.log(userSignup);
            if ($document[0].getElementById("cuser_name").value != "" && $document[0].getElementById("cuser_pass").value != "") {
              firebase.auth().createUserWithEmailAndPassword(userSignup.cusername, userSignup.cpassword).then(function() {
                    // Sign-In successful.
                    //console.log("Signup successful");
                    var user = firebase.auth().currentUser;
                    user.sendEmailVerification().then(function(result) {
                      console.log(result)
                    }, function(error) {
                      console.log(error)
                    });
                    user.updateProfile({
                      displayName: userSignup.displayname,
                      photoURL: userSignup.photoprofile
                    }).then(function() {
                        // Update successful.
                        $state.go("app.login");
                      }, function(error) {
                        // An error happened.
                        console.log(error);
                      });
                  }, function(error) {
                    // An error happened.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode);
                    if (errorCode === 'auth/weak-password') {
                      alert('Password is weak, choose a strong password.');
                      return false;
                    } else if (errorCode === 'auth/email-already-in-use') {
                      alert('Email you entered is already in use.');
                      return false;
                    }
                  });
} else {
  alert('Please enter email and password');
  return false;
            } //end check client username password
        }; // end $scope.doSignup()
      }
      ])

.controller('dashboardController', ['$scope', '$firebaseArray', 'CONFIG',
  function($scope, $firebaseArray, CONFIG) {
        // TODO: Show profile data

        $scope.user = firebase.auth().currentUser;
      }
      ]);
