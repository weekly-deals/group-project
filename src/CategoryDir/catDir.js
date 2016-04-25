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

            controller: function ($scope, $auth, $window, Account, adminService) {

                $scope.windowWidth = $window.innerWidth;
                angular.element($window).bind('resize', function () {
                    $scope.windowWidth = $window.innerWidth;
                });

                $scope.pix = function (ind) {
                    if ($scope.windowWidth > 675) {
                        if (ind === 0) {
                            return (ind + 1) * 338 + 'px'
                        } else if (ind === 1){
                            return (ind + 1) * 363 + 'px'
                        } else if (ind === 2) {
                          return (ind + 1) * 371.25 + 'px'
                        }
                    } else {
                        if (ind === 0) {
                            return (ind + 1) * 260 + 'px'
                        } else {
                            return (ind + 1) * 320 + 'px'
                        }
                    }
                };

                //each deal is 270px wide including all border and margin
                $scope.scroll = function (dir, elem, e) {
                    var scrollDiv = angular.element(document.getElementById(elem));
                    e.stopPropagation();
                    if (dir === 'right') {
                        scrollDiv.scrollLeft(+(scrollDiv.scrollLeft() + $scope.windowWidth - 25), 425);
                        if (scrollDiv.scrollLeft() >= scrollDiv[0].scrollWidth - $scope.windowWidth - 25) {
                            scrollDiv.scrollLeft(+0, 425);
                        }
                    } else {
                        scrollDiv.scrollLeft(+(scrollDiv.scrollLeft() - $scope.windowWidth + 25), 425);
                        if (scrollDiv.scrollLeft() <= 25) {
                            scrollDiv.scrollLeft(scrollDiv[0].scrollWidth, 425);
                        }
                    }
                };

                $scope.showDealDetail = false;

                $scope.openDealDetail = function (deal) {
                    deal.hideDesc = false;
                    $scope.showDealDetail = true;
                    var body = document.getElementById('body');
                    body.style.overflow = 'hidden';
                    $scope.selectedDeal = deal;
                    var leftArrows = document.getElementsByClassName('leftArrow');
                    var rightArrows = document.getElementsByClassName('rightArrow');
                    Array.prototype.forEach.call(leftArrows, function (e) {
                        e.style.display = 'none';
                    });
                    Array.prototype.forEach.call(rightArrows, function (e) {
                        e.style.display = 'none';
                    });
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
                    location.reload();
                };

                $scope.isAuthenticated = function () {
                    // console.log($auth.isAuthenticated())
                    return $auth.isAuthenticated();
                };


                        $scope.aproveDeal = function(deal) {
                            deal.pending = false;
                            adminService.aproveDeal(deal._id, deal);
                    };

        //         $scope.expandEdit = function () {
        //             var modalEdit = document.getElementById('modal-edit');
        //             var bodyEdit = document.getElementById('body');
        //             var curtainEdit = document.getElementById('modal-curtain');
        //             curtainEdit.style.display = 'block';
        //             bodyEdit.style.overflow = 'hidden';
        //             modalEdit.style.display = 'block';
        //     // google.maps.event.trigger(vm.map, 'resize');
        // };

            }

        };


    });
