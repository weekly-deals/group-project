angular.module('app')
    .controller('NavbarCtrl', function ($scope, $auth, NgMap, geoService, $location, svgService) {

        var vm = this;

        vm.category = 'All';

        vm.hideDealBar = function () {
            return !(/maps|login|signup/.test($location.url()))
        };

        vm.isAuthenticated = function () {
            return $auth.isAuthenticated();
        };

        vm.types = "['establishment']";

        geoService.getCurrentPosition().then(function (latlng) {
            geoService.reverseGeoCode(latlng).then(function (city) {
                vm.city = city;
            })
        });

        function svgs() {
            svgService.getSvg().then(function (res) {
                vm.svgs = res;
            })
        }

        svgs();

        vm.days = [
            {
                display: 'Sunday',
                val: function () {
                    return {day: 0};
                }
            },
            {
                display: 'Monday',
                val: function () {
                    return {day: 1};
                }
            },
            {
                display: 'Tuesday',
                val: function () {
                    return {day: 2};
                }
            },
            {
                display: 'Wednesday',
                val: function () {
                    return {day: 3};
                }
            },
            {
                display: 'Thursday',
                val: function () {
                    return {day: 4};
                }
            },
            {
                display: 'Friday',
                val: function () {
                    return {day: 5};
                }
            },
            {
                display: 'Saturday',
                val: function () {
                    return {day: 6};
                }
            }
        ];

        var date = new Date();
        vm.dayNum = date.getDay();
        vm.selectedDay = vm.days[vm.dayNum];

        vm.placeChanged = function () {
            vm.place = this.getPlace();
            vm.map.setCenter(vm.place.geometry.location);
            vm.marker = new google.maps.Marker({
                position: vm.place.geometry.location,
                map: vm.map,
                title: vm.place.name
            });
        };

        vm.addBusiness = function () {
            geoService.newBusiness(vm.place).then(function (res) {
                $scope.addedBus = res;
            });
        };

        NgMap.getMap().then(function (map) {
            geoService.getCurrentPosition().then(function (latlng) {
                vm.map = map;
                vm.map.setCenter(latlng);
                vm.map.setZoom(12);
            });
        });

    });
