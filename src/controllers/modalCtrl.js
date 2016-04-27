angular.module('app')
    .controller('ModalCtrl', function ($scope, $auth, NgMap, geoService, svgService, adminService, $rootScope, $interval) {

        var vm = this;

        vm.isAuthenticated = function() {

            return $auth.isAuthenticated();
        };

        function init(){
          document.querySelector('.location-filter').focus();
        }

        function printCity(city){
                    document.querySelector('.location-filter').focus();
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
        }

        function removePending(data) {
            if (vm.isAuthenticated() !== "admin") {
                $rootScope.deals = data.data;
                $rootScope.deals.forEach(function (cat) {
                    cat.data.forEach(function (deal) {
                        if (deal.pending === true) {
                            cat.data.splice(cat.data.indexOf(deal), 1);
                        }
                    });
                });
            } else {
                $rootScope.deals = data.data;
            }
        }

        geoService.getCurrentPosition().then(function (latlng) {
            geoService.reverseGeoCode(latlng).then(function (city) {
                $scope.loading = false;
                printCity(city);
            });
            geoService.getDeal(latlng).then(function (data) {
                removePending(data);
            });
        }).catch(function(){
            $scope.loading = false;
            printCity('Provo');
            geoService.getDeal({lat: 40.2262019, lng: -111.66072919999999}).then(function (data) {
                removePending(data);
            });
        });

        $scope.geoCode = function (address) {
            geoService.geoCode(address).then(function (latlng) {
                geoService.getDeal(latlng).then(function (data) {
                    removePending(data);
                });
            });
        };

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
                                    hide++
                                }
                                obj.hideCat = (obj.data.length === hide)
                            });
                        }
                    });
                }

            });

    });
