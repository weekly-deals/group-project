angular.module('app')
    .directive('profileDir', function () {
        return {
            restrict: 'E',
            templateUrl: '/profile.html',
            scope: {
                show: '='
            },
            link: function (scope) {
                scope.closeProfile = function () {
                    scope.show = false;
                    var body = document.getElementById('body');
                    body.style.overflow = 'auto';
                }
            },
            controller: function ($scope, $auth, Account) {

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
      };
    }
  };
  });
