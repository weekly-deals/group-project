angular.module('app')
    .controller('ModalCtrl', function ($scope, $auth, NgMap, geoService, svgService, adminService, $rootScope) {

        var vm = this;

        (vm.getDealInfo = function () {
            geoService.getCurrentPosition().then(function (latlng) {
                geoService.reverseGeoCode(latlng).then(function (city) {
                    $scope.city = city;
                });
                geoService.getDeal(latlng).then(function (data) {
                    $rootScope.deals = data.data;
                });
            })
        })();

        $scope.geoCode = function (address) {
            geoService.geoCode(address).then(function (latlng) {
                geoService.getDeal(latlng).then(function (data) {
                    $rootScope.deals = data.data;
                });
            });
        };

//Filtering stuff//

        $rootScope.$watch('selectedDay',
            function () {
                if ($scope.deals) {
                    $scope.deals.forEach(function (obj) {
                        if (obj.data) {
                            obj.data.forEach(function (deal) {
                                if (deal.day.includes($rootScope.selectedDay.idx)) {
                                    // console.log('included!', deal)
                                    deal.hideDeal = false;
                                } else {
                                    // console.log('bye bye deal',deal);
                                    deal.hideDeal = true;
                                }
                            });
                        }
                    });
                }

            });

    });
