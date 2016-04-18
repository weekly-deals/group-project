angular.module('app')
    .controller('NavbarCtrl', function ($scope, $auth, NgMap, geoService, $location, svgService) {

        var vm = this;

        vm.category = 'All';


        vm.hideDropdown = true;

        vm.toggleDropdown = function () {
            vm.hideDropdown = !vm.hideDropdown;
            vm.hideBotNav = !vm.hideBotNav;
        };

        vm.selectOption = function (cat) {
            vm.category = cat;
        };

        vm.hideBotNav = false;

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

        vm.days = geoService.days

        var date = new Date();
        vm.dayNum = date.getDay();
        vm.selectedDay = geoService.getCurrentDay();

        vm.dayDropdown = true;

        vm.toggleDayDD = function () {
            vm.dayDropdown = !vm.dayDropdown;
        }


        vm.selectDay = function (day, idx) {
            vm.day = geoService.selectDay(day, idx);
            vm.selectedDay = vm.day.selectedDay
        }

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
                vm.map.setZoom(10);
            });
        });

    });
