angular.module('app')
    .directive('catDirective', function () {

        return {
            templateUrl: '/catDir.html',
            restrict: 'E',
            scope: {
                data: '=',
                ind: '=',
                title: '='
            },
            link: function (scope) {
                scope.toggle = function () {
                    scope.show = !scope.show;
                };
            },
            controller: function ($scope, $auth, $window) {

                $scope.windowWidth = $window.innerWidth;
                angular.element($window).bind('resize', function () {
                    $scope.windowWidth = $window.innerWidth;
                });

                $scope.pix = function (ind) {
                    if ($scope.windowWidth > 675) {
                        if (ind === 0) {
                            return (ind + 1) * 392 + 'px'
                        } else {
                            return (ind + 1) * 402 + 'px'
                        }
                    } else {
                        if (ind === 0) {
                            return (ind + 1) * 260 + 'px'
                        } else {
                            return (ind + 1) * 325 + 'px'
                        }
                    }
                };

                var scrollLog = {};
                $scope.scroll = function (dir, elem, e) {
                    var scrollDiv = angular.element(document.getElementById(elem));
                    e.stopPropagation();
                    if (!scrollLog.elem && !scrollDiv.scrollLeft()) {
                        scrollLog.elem = 0;
                    } else if (scrollDiv.scrollLeft()) {
                        scrollLog.elem = scrollDiv.scrollLeft();
                    }
                    if (dir === 'right') {
                        scrollLog.elem += ($scope.windowWidth - 50);
                        scrollDiv.scrollLeft(+scrollLog.elem, 425);
                        if (scrollLog.elem >= scrollDiv[0].scrollWidth - 50) {
                            scrollLog.elem = 0;
                            scrollDiv.scrollLeft(scrollLog.elem, 425);
                        }
                    } else {
                        scrollLog.elem -= ($scope.windowWidth - 50);
                        scrollDiv.scrollLeft(+scrollLog.elem, 425);
                        if (scrollLog.elem <= -($scope.windowWidth * 0.85)) {
                            scrollLog.elem = scrollDiv[0].scrollWidth - ($scope.windowWidth);
                            scrollDiv.scrollLeft(scrollDiv[0].scrollWidth, 425);
                        }
                    }
                };

                $scope.showDealDetail = false;

                $scope.openDealDetail = function (deal) {
                    $scope.showDealDetail = true;
                    var body = document.getElementById('body');
                    body.style.overflow = 'hidden';
                    $scope.selectedDeal = deal;
                };

                $scope.showDesc = function (deal) {
                    var desc = document.getElementById('deal-desc');
                    desc.style.opacity = '1 !important';
                    deal.hideDesc = true;
                };

                $scope.hideDesc = function (deal) {
                    deal.hideDesc = false;
                };

                // nat buttons on admin
                $scope.showButton = function (deal) {
                    deal.showButtons = true;
                    var edit = document.getElementById('edit');
                    var remove = document.getElementById('remove');
                };

                $scope.hideButton = function (deal) {
                    deal.showButtons = false;
                    var edit = document.getElementById('edit');
                    var remove = document.getElementById('remove');
                };

                //remove a deal nat
                $scope.removeDeal = function (dealId) {
                    adminService.deleteDeal(dealId);
                };

                $scope.isAuthenticated = function () {
                    return $auth.isAuthenticated();
                };

            }
        };


    });
