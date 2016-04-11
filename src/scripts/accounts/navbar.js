angular.module('app')
    .controller('NavbarCtrl', function ($scope, $auth, NgMap, geoService) {

        var vm = this;

        vm.isAuthenticated = function () {
            return $auth.isAuthenticated();
        };

        vm.types = "['establishment']";

        geoService.getCurrentPosition().then(function(latlng){
            geoService.reverseGeoCode(latlng).then(function(city){
                vm.city = city;
            })
        });

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
                vm.temp = latlng.split(',');
                vm.center = new google.maps.LatLng(Number(vm.temp[0]), Number(vm.temp[1]));
                vm.map.setCenter(vm.center);
                vm.map.setZoom(12);
            });
        });

    });
