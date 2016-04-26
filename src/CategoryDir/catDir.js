angular.module('app')
    .directive('catDirective', function() {

        return {
            templateUrl: '/catDir.html',
            restrict: 'E',
            scope: {
                data: '=',
                ind: '=',
                cat: '=',
                title: '='
            },
            link: function(scope) {
                scope.toggle = function() {
                    scope.show = !scope.show;
                };
            },

            controller: function($scope, $auth, $window, Account, adminService, $timeout, $rootScope) {

                $scope.windowWidth = $window.innerWidth;
                $scope.numDeals = Math.floor(($window.innerWidth+100)/270);
                $scope.scrollWidth = ($scope.numDeals * 270);
                angular.element($window).bind('resize', function() {
                    $scope.windowWidth = $window.innerWidth;
                    $scope.numDeals = Math.floor(($window.innerWidth-100)/270);
                    if ($scope.numDeals > 0) {
                        $scope.scrollWidth = ($scope.numDeals * 270);
                    } else {
                        $scope.scrollWidth = 270;
                    }
                });

                if (!$rootScope.arr) {
                    $rootScope.arr = [];
                }
                if (!$rootScope.arr2) {
                    $rootScope.arr2 = [];
                }

                function arrMakr() {
                    for (var i = 0; i < 10; i++) {
                        $rootScope.arr[i] = {};
                        $rootScope.arr[i].ind = $scope.ind;
                        $rootScope.arr[i].len = $scope.cat.data.length;
                    }
                    $rootScope.arr2.push(uniq($rootScope.arr)[0]);
                }

                function uniq(a) {
                    var seen = {};
                    return a.filter(function(item) {
                        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
                    });
                }

                var locationChange = document.getElementsByClassName('location-filter')[0];
                angular.element(locationChange).bind('change', function() {
                    $timeout(arrMakr, 200);
                });

                $scope.pix = function(ind) {
                    if ($rootScope.arr2) {
                        if ($rootScope.arr2.length) {
                            for (var i = 0; i < ind; i++) {
                                if ($rootScope.arr2[i].len === 0) {
                                    ind--;
                                }
                            }
                        }
                    }
                    if ($scope.windowWidth > 675) {
                        if (ind === 0) {
                            return (ind + 1) * 338 + 'px'
                        } else if (ind === 1) {
                            return (ind + 1) * 363 + 'px'
                        } else if (ind === 2) {
                            return (ind + 1) * 371.25 + 'px'
                        }
                    } else {
                        if (ind === 0) {
                            return (ind + 1) * 220 + 'px'
                        } else {
                            return (ind + 1) * 305 + 'px'
                        }
                    }
                };

                $scope.scroll = function(dir, elem, e) {
                    var scrollDiv = angular.element(document.getElementById(elem));
                    e.stopPropagation();
                    if (dir === 'right') {
                        scrollDiv.scrollLeft(+(scrollDiv.scrollLeft() + $scope.scrollWidth), 425);
                        if (scrollDiv.scrollLeft() >= scrollDiv[0].scrollWidth - $scope.windowWidth - 25) {
                            scrollDiv.scrollLeft(+0, 425);
                        }
                    } else {
                        scrollDiv.scrollLeft(+(scrollDiv.scrollLeft() - $scope.scrollWidth), 425);
                        if (scrollDiv.scrollLeft() <= 25) {
                            scrollDiv.scrollLeft(scrollDiv[0].scrollWidth, 425);
                        }
                    }
                };

                $scope.showDealDetail = false;

                $scope.openDealDetail = function(deal) {
                    deal.hideDesc = false;
                    $scope.showDealDetail = true;
                    var body = document.getElementById('body');
                    body.style.overflow = 'hidden';
                    $scope.selectedDeal = deal;
                    var leftArrows = document.getElementsByClassName('leftArrow');
                    var rightArrows = document.getElementsByClassName('rightArrow');
                    Array.prototype.forEach.call(leftArrows, function(e) {
                        e.style.display = 'none';
                    });
                    Array.prototype.forEach.call(rightArrows, function(e) {
                        e.style.display = 'none';
                    });
                };

                $scope.showDesc = function(deal) {
                    var desc = document.getElementById('deal-desc');
                    desc.style.opacity = '1 !important';
                    deal.hideDesc = true;
                };

                $scope.hideDesc = function(deal) {
                    deal.hideDesc = false;
                };

                // nat buttons on admin
                $scope.showButton = function(deal) {
                    deal.showButtons = true;
                    var edit = document.getElementById('edit');
                    var remove = document.getElementById('remove');
                };

                $scope.hideButton = function(deal) {
                    deal.showButtons = false;
                    var edit = document.getElementById('edit');
                    var remove = document.getElementById('remove');
                };

                //remove a deal nat
                $scope.removeDeal = function(dealId) {
                    adminService.deleteDeal(dealId);
                    location.reload();
                };

                $scope.isAuthenticated = function() {
                    // console.log($auth.isAuthenticated())
                    return $auth.isAuthenticated();
                };


                $scope.aproveDeal = function(deal) {
                    deal.pending = false;
                    adminService.aproveDeal(deal._id, deal);
                };

                $scope.showDealEdit = false;

                $scope.expandEdit = function (deal) {
                    deal.hideDesc = false;
                    $scope.selectedDeal = deal;
                    var leftArrows = document.getElementsByClassName('leftArrow');
                    var rightArrows = document.getElementsByClassName('rightArrow');
                    Array.prototype.forEach.call(leftArrows, function(e) {
                        e.style.display = 'none';
                    });
                    Array.prototype.forEach.call(rightArrows, function(e) {
                        e.style.display = 'none';
                    });

                    $scope.showDealEdit = true;
                    var body = document.getElementById('body');
                    body.style.overflow = 'hidden';
                    $scope.selectedDeal = deal;
                };

            }

        };


    });
