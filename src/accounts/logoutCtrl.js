angular.module('app')
    .controller('logoutCtrl', function ($location, $auth, $window) {
        if (!$auth.isAuthenticated()) {
            return;
        }
        $auth.logout()
            .then(function () {
                // toastr.info('You have been logged out');
                $location.path('/');
                $window.location.reload();
            });
    });
