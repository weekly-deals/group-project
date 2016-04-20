angular.module('app')
    .controller('ModalCtrl', function ($scope, geoService, $rootScope, $interval, $window) {

        document.querySelector('.location-filter').focus();

        geoService.getCurrentPosition().then(function (latlng) {
            geoService.reverseGeoCode(latlng).then(function (city) {
                var count = 1;
                var print = function () {
                    if (count) {
                        count--;
                        $scope.city = city.slice(0, 1);
                    } else {
                        $scope.city = city.slice(0, $scope.city.length + 1);
                    }
                    console.log($scope.city);
                };

                var delayRand = function () {
                    return Math.random() * (200 - 125) + 125
                };

                $interval(print, delayRand(), city.length)
            });
            geoService.getDeal(latlng).then(function (data) {
                $rootScope.deals = data.data;
            });
        });

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
