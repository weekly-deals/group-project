angular.module('app')
    .controller('profileCtrl', function ($scope, $auth, Account, geoService) {



        $scope.getProfile = function () {
            Account.getProfile()
                .then(function (response) {
                    $scope.user = response.data;
                })
                .catch(function (response) {
                    // toastr.error(response.data.message, response.status);
                });
        };
        $scope.updateProfile = function () {
            $scope.user.picture = Account.userPic
            console.log($scope.user.picture)
            Account.updateProfile($scope.user)

                .then(function () {
                    // toastr.success('Profile has been updated');
                    $scope.getProfile();

                })
                .catch(function (response) {
                    // toastr.error(response.data.message, response.status);
                });
        };
        $scope.link = function (provider) {
            $auth.link(provider)
                .then(function () {
                    // toastr.success('You have successfully linked a ' + provider + ' account');
                    $scope.getProfile();
                })
                .catch(function (response) {
                    // toastr.error(response.data.message, response.status);
                });
        };
        $scope.unlink = function (provider) {
            $auth.unlink(provider)
                .then(function () {
                    // toastr.info('You have unlinked a ' + provider + ' account');
                    $scope.getProfile();
                })
                .catch(function (response) {
                    // toastr.error(response.data ? response.data.message : 'Could not unlink ' + provider + ' account', response.status);
                });
        };

        $scope.getProfile();

        //Modal controls//
        $scope.showMe = function() {
          var promodal = document.getElementById('promodal');
          var body = document.getElementById('body');
          var curtain = document.getElementById('promodal-curtain');
          curtain.style.display = 'block';
          body.style.overflow = 'hidden';
          promodal.style.display = 'block';
        };

        $scope.closeClick = function() {
          var promodal = document.getElementById('promodal');
          promodal.style.display = 'none';
          var body = document.getElementById('body');
          body.style.overflow = 'auto';
          var curtain = document.getElementById('promodal-curtain');
          curtain.style.display = 'none';
        };

    });
