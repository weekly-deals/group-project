angular.module('app')
    .directive('catDirective', function () {

        return {
            templateUrl: '/catDir.html',
            restrict: 'E',
            scope: {
                data: '=',
                ind: '='
            },
            link: function (scope) {
                scope.toggle = function () {
                    scope.show = !scope.show;
                };
            },

            controller: function ($scope, $auth, $window, Account, adminService) {

                $scope.$watch(function () {
                    return $window.innerWidth;
                }, function (value) {
                    $scope.windowWidth = value;
                    var num = Math.ceil($scope.windowWidth / 290) - 1;
                    $scope.dealMin = 0;
                    $scope.dealdisplayNum = num > 1 ? num : 1;
                });

                //290px width each box
                //need to take into account breakpoints at 675px and 600px

                $scope.pix = function (ind) {
                    if (ind === 0) {
                        return (ind + 1) * 470 + 'px'
                    } else {
                        return (ind + 1) * 442 + 'px'
                    }
                };

                $scope.scroll = function (dir, data, e) {
                    e.stopPropagation();
                    console.log(data.length);
                    if (dir === 'right') {
                        $scope.dealMin += $scope.dealdisplayNum
                    } else {
                        $scope.dealMin -= $scope.dealdisplayNum
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
                    location.reload();
                };

                $scope.isAuthenticated = function () {
                    return $auth.isAuthenticated();
                };

               
                        $scope.aproveDeal = function(deal) {
                            deal.pending = false;
                            adminService.aproveDeal(deal._id, deal);
                    };
                
                $scope.expandEdit = function () {
                    var modalEdit = document.getElementById('modal-edit');
                    var bodyEdit = document.getElementById('body');
                    var curtainEdit = document.getElementById('modal-curtain');
                    curtainEdit.style.display = 'block';
                    bodyEdit.style.overflow = 'hidden';
                    modalEdit.style.display = 'block';
            // google.maps.event.trigger(vm.map, 'resize');
        };

            }
            
        };


    });
