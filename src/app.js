angular.module('app', ['ui.router', 'satellizer', 'ngMap'])

    .config(function ($authProvider, $stateProvider, $urlRouterProvider, $locationProvider) {

        $authProvider.facebook({
            clientId: '1670205403245071'
        });

        $authProvider.google({
            clientId: '696255640250-ha91c7enlsravhptab5c63punfunlh8u.apps.googleusercontent.com'
        });

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: '/',
                controller: 'mainCtrl',
                templateUrl: 'home.html'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'login.html',
                controller: 'loginCtrl',
                resolve: {
                    skipIfLoggedIn: skipIfLoggedIn
                }
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'signup.html',
                controller: 'signupCtrl',
                resolve: {
                    skipIfLoggedIn: skipIfLoggedIn
                }
            })
            .state('logout', {
                url: '/logout',
                template: null,
                controller: 'logoutCtrl'
            })
            .state('profile', {
                url: '/profile',
                templateUrl: 'profile.html',
                controller: 'profileCtrl',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .state('addStuff', {
                url: '/addstuff',
                templateUrl: 'addStuff.html',
                controller: 'addStuff',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            // .state('maps', {
            //     url: '/maps',
            //     templateUrl: 'maps.html',
            //     controller: 'NavbarCtrl',
            //     controllerAs: 'vm'
            // });


        function skipIfLoggedIn($q, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.reject();
            } else {
                deferred.resolve();
            }
            return deferred.promise;
        }

        function loginRequired($q, $location, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.resolve();
            } else {
                $location.path('/login');
            }
            return deferred.promise;
        }

    });
