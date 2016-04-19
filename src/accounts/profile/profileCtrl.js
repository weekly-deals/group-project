angular.module('app')
    .controller('profileCtrl', function ($scope, $auth, Account, geoService) {

      $scope.setColor = function(user) {
        if (user.color === '#DD2E44') {
        } else {
          var backgroundsToChange = Array.from(document.getElementsByClassName('change-color'));
          var gradientChange = Array.from(document.getElementsByClassName('gradient-change'));
          gradientChange[0].style.background = 'linear-gradient('+ user.color +', transparent)';
          var changeTextColor = Array.from(document.getElementsByClassName('change-text-color'));
          changeTextColor.forEach(function(elem) {
            elem.style.color = user.color;
          });
          backgroundsToChange.forEach(function(elem) {
            elem.style.background = user.color;
          });

        }
      }
      Account.getProfile().then(function(resp){
        $scope.user = resp.data;
        $scope.setColor($scope.user);
      })

        $scope.getProfile = function () {
            Account.getProfile()
                .then(function (response) {
                    $scope.user = response.data;
                    $scope.setColor($scope.user);
                })
                .catch(function (response) {
                    // toastr.error(response.data.message, response.status);
                });
        };

        $scope.changeColor = function(color) {
          $scope.getProfile();
          $scope.user.color = color;
          var backgroundsToChange = Array.from(document.getElementsByClassName('change-color'));
          var gradientChange = Array.from(document.getElementsByClassName('gradient-change'));
          gradientChange[0].style.background = 'linear-gradient('+ color +', transparent)';
          var changeTextColor = Array.from(document.getElementsByClassName('change-text-color'));
          changeTextColor.forEach(function(elem) {
            elem.style.color = color;
          });
          backgroundsToChange.forEach(function(elem) {
            elem.style.background = color;
          });
        };

        $scope.updateProfile = function () {
            $scope.user.picture = Account.userPic
            // console.log($scope.user.picture)
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
                    $scope.setColor($scope.user);
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
