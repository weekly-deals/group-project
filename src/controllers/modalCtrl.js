angular.module('app')
    .controller('ModalCtrl', function ($scope, geoService, $rootScope, $interval) {

        document.querySelector('.location-filter').focus();

        var backup = {};

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
                };
                var delayRand = function () {
                    return Math.random() * (200 - 125) + 125;
                };
                $interval(print, delayRand(), city.length)
            });
            geoService.getDeal(latlng).then(function (data) {
                $rootScope.deals = data.data;
                backup.deals = data.data;
            });
        });

        $scope.geoCode = function (address) {
            geoService.geoCode(address).then(function (latlng) {
                geoService.getDeal(latlng).then(function (data) {
                    $rootScope.deals = data.data;
                    backup.deals = data.data;
                });
            });
        };

//Filtering stuff//

        $rootScope.$watch('selectedDay',
            function () {
                if ($scope.deals) {
                    $scope.deals.forEach(function (obj) {
                        var hide = 0;
                        if (obj.data) {
                            obj.data.forEach(function (deal) {
                                var inc = !deal.day.includes($rootScope.selectedDay.idx);
                                deal.hideDeal = inc;
                                if (inc) {
                                    hide ++
                                }
                                obj.hideCat = (obj.data.length === hide)
                            });
                        }
                    });
                }
            });
    });
