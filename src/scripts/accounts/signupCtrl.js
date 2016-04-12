angular.module('app')
    .controller('signupCtrl', function ($scope, $location, $auth) {
        $scope.signup = function () {
            if ($scope.user.password == $scope.confirmPassword) {
            $auth.signup($scope.user)
                .then(function (response) {
                    $auth.setToken(response);
                    $location.path('/');
                    // toastr.info('You have successfully created a new account and have been signed-in');
                })
                .catch(function (response) {
                    // toastr.error(response.data.message);
                });
        } else {
            $scope.message = "*Passwords don't match, please try again"
        }
    }
    });
