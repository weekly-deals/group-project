angular.module('app')
    .controller('logoutCtrl', function ($location, $auth) {
        if (!$auth.isAuthenticated()) {
            return;
        }
        $auth.logout()
            .then(function () {
                // toastr.info('You have been logged out');
                $location.path('/');
            });
    });
