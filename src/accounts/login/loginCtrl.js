angular.module('app')
    .controller('loginCtrl', function ($scope, $location, $auth, $window) {

        $scope.login = function () {
            $auth.login($scope.user)
                .then(function () {
                    // toastr.success('You have successfully signed in!');
                    $location.path('/');
                    $window.location.reload();
                })
                .catch(function (error) {
                    // toastr.error(error.data.message, error.status);
                });
        };

        $scope.authenticate = function (provider) {
            $auth.authenticate(provider)
                .then(function () {
                    // toastr.success('You have successfully signed in with ' + provider + '!');
                    $location.path('/');
                })
                .catch(function (error) {
                    if (error.error) {
                        // Popup error - invalid redirect_uri, pressed cancel button, etc.
                        // toastr.error(error.error);
                    } else if (error.data) {
                        // HTTP response error from server
                        // toastr.error(error.data.message, error.status);
                    } else {
                        // toastr.error(error);
                    }
                });
        };

    });
