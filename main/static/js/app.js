// var echoApp = angular.module('echoApp', ['ngRoute', 'ngResource', 'ngCookies', 'audioPlayer-directive', 'firebase']); //added firebase
//
//
//
//// Route providers for our views
//echoApp.config(['$routeProvider' ,function($routeProvider) {
//    $routeProvider.
//        when('/', {
//            templateUrl: '/static/views/base.html',
//            controller: 'authController'
//        }).
//        when('/main', {
//            templateUrl: '/static/views/MainPage.html',
//            controller: 'EchoAppCtrl'
//        });
//
//}]);
//
//
//
//// our auth code, for cookies
//echoApp.config(['$httpProvider', function($httpProvider){
//        // django and angular both support csrf tokens. This tells
//        // angular which cookie to add to what header.
//        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
//        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
//    }]).
//    factory('api', function($resource){
//        function add_auth_header(data, headersGetter){
//            // as per HTTP authentication spec [1], credentials must be
//            // encoded in base64. Lets use window.btoa [2]
//            var headers = headersGetter();
//            headers['Authorization'] = ('Basic ' + btoa(data.username +
//                                        ':' + data.password));
//        }
//        // defining the endpoints. Note we escape url trailing dashes: Angular
//        // strips unescaped trailing slashes. Problem as Django redirects urls
//        // not ending in slashes to url that ends in slash for SEO reasons, unless
//        // we tell Django not to [3]. This is a problem as the POST data cannot
//        // be sent with the redirect. So we want Angular to not strip the slashes!
//        return {
//            auth: $resource('/api/auth\\/', {}, {
//                login: {method: 'POST', transformRequest: add_auth_header},
//                logout: {method: 'DELETE'}
//            }),
//            users: $resource('/api/user\\/', {}, {
//                create: {method: 'POST'}
//            })
//        };
//    }).
//     controller('authController', function($scope, api, $location, $rootScope) {
//        // Angular does not detect auto-fill or auto-complete. If the browser
//        // autofills "username", Angular will be unaware of this and think
//        // the $scope.username is blank. To workaround this we use the
//        // autofill-event polyfill [4][5]
//        //$('#id_auth_form input').checkAndTriggerAutoFillEvent();
//
//        $scope.getCredentials = function(){
//            return {username: $scope.username, password: $scope.password};
//        };
//
//        $scope.login = function(){
//            api.auth.login($scope.getCredentials()).
//                $promise.
//                    then(function(data){
//                        // on good username and password
//                        $scope.user = data.username;
//                        $scope.id = data.id;
//                        $location.path('/main');
//                        $rootScope.username = $scope.user;
//                        $rootScope.id = $scope.id;
//                    }).
//                    catch(function(data){
//                        // on incorrect username and password
//                        alert(data.data.detail);
//                    });
//        };
//
//        $scope.logout = function(){
//            api.auth.logout(function(){
//                $scope.user = undefined;
//                $location.path('/');
//            });
//        };
//        $scope.register = function($event){
//            // prevent login form from firing
//            $event.preventDefault();
//            // create user and immediatly login on success
//            api.users.create($scope.getCredentials()).
//                $promise.
//                    then($scope.login).
//                    catch(function(data){
//                        alert("Someone has that username already!");
//                    });
//            };
//
//
//    });
//
//
//
//
//// our friends list and friends search
// echoApp.controller('EchoAppCtrl',function($scope, $http, user ) {
//     var friendSort = function(data) {
//         var userlog = null;
//         var friend = null;
//         var obj_test = data;
//
//         //console.log(obj_test.results);
//
//     };
//     $scope.usernamefinal= $scope.username;
//     $scope.idfinal = $scope.id;
//
//     user.get().then(function (data) {
//         //$scope.name = $rootScope.user;
//         $scope.name1 = data;
//
//         console.log($scope.name1);
//     });
//
//     //$http.get('api/user/').success();
//     $http.get('api/friend/').success(function (data) {
//         $scope.friends = data;
//         $scope.friendslist = friendSort(data);
//         //console.log($scope.friendslist)
//     });
//
//
//}).
//     factory('user', function ($http, $location) {
//         return {
//             get: function () {
//                 return $http.get('api/user/')
//                 .catch(function (status) {
//                     if (status === 403) {
//                         $location.path('/');
//                     }
//                 });
//             }
//         };
//     });
//
//
//
// //firebase controller for hosting
// echoApp.controller('Chat', ['$scope', '$firebase',
//    function($scope, $firebase) {
//      var ref = new Firebase('https://crackling-torch-9468.firebaseio.com/chat');
//      $scope.messages = $firebase(ref.limit(15));
//      $scope.username = 'Guest' + Math.floor(Math.random()*101);
//      $scope.addMessage = function() {
//        $scope.messages.$add({
//          from: $scope.username, content: $scope.message
//        });
//        $scope.message = "";
//      }}]);
