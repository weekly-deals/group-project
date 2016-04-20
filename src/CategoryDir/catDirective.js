angular.module('app')
    .directive('catDirective', function (adminService) {

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
            controller: function ($scope, $auth) {

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
                   location.reload();
                 };
                 $scope.isAuthenticated = function () {
                    return $auth.isAuthenticated();
                };
                $scope.aproveDeal = function(deal) {
                    console.log(deal)
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
