angular.module('app')
    .directive('catDirective', function () {

        return {
            templateUrl: '/catTemplate.html',
            restrict: 'E',
            scope: {
                data: '='
            },
            link: function (scope, element, attributes) {
                scope.toggle = function () {
                    scope.show = !scope.show;
                };
            },
            controller: function ($scope, $auth, Account) {

                $scope.showDesc = function (deal) {
                    var desc = document.getElementById('deal-desc');
                    desc.style.opacity = '1 !important';
                    deal.hideDesc = true;
                };

                $scope.hideDesc = function (deal) {
                    deal.hideDesc = false;
                };

                $scope.showDeal = function (deal) {
                    var body = document.getElementById('body');
                    var curtain = document.getElementById('modal-curtain');
                    curtain.style.display = 'block';
                    body.style.overflow = 'hidden';
                    deal.showDetail = true;
                };

                $scope.close = function (deal) {
                    var body = document.getElementById('body');
                    var curtain = document.getElementById('modal-curtain');
                    curtain.style.display = 'none';
                    body.style.overflow = 'auto';
                    deal.showDetail = false;
                };
                // nat buttons on admin
                 $scope.showButton = function(deal) {
                     deal.showButtons = true;
                     var edit = document.getElementById('edit');
                     var remove = document.getElementById('remove');
                 }

                 $scope.hideButton = function (deal) {
                     deal.showButtons = false;
                     var edit = document.getElementById('edit');
                     var remove = document.getElementById('remove');
                 }
                 //remove a deal nat
                 $scope.removeDeal = function(dealId) {
                   adminService.deleteDeal(dealId);
                 };
                 $scope.isAuthenticated = function () {
                    return $auth.isAuthenticated();
                };
                Account.getProfile().then(function(resp) {
                    $scope.user = resp.data;
                    $scope.setColor($scope.user);
                })
                $scope.setColor = function(user) {
                  if (user.color === '#DD2E44') {
                  } else {
                    var backgroundsToChange = Array.from(document.getElementsByClassName('change-color'));
                    backgroundsToChange.forEach(function(elem) {
                      elem.style.background = user.color;
                    });
                    var gradientChange = Array.from(document.getElementsByClassName('gradient-change'));
                    gradientChange[0].style.background = 'linear-gradient('+ user.color +', transparent)';
                    var changeTextColor = Array.from(document.getElementsByClassName('change-text-color'));
                    changeTextColor.forEach(function(elem) {
                      elem.style.color = user.color;
                    });
                  }

                }

        }
      };


    });
