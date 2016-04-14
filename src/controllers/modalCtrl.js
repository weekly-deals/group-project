angular.module('app')
    .controller('ModalCtrl', function ($scope, $auth, NgMap, geoService, svgService) {

        var vm = this;

        vm.types = "['establishment']";

        vm.days = [];

        (function svg() {
            svgService.getSvg().then(function (svgs) {
                vm.svgs = svgs;
            })
        })();

        geoService.getCurrentPosition().then(function (latlng) {
            geoService.reverseGeoCode(latlng).then(function (city) {
                vm.city = city;
            });
        });

        vm.selectDay = function (day) {
            var box = document.getElementById(day);
            if (!box.style.backgroundColor) {
                box.style.background = '#58595B';
                // box.style.border = '1px solid rgb(221, 46, 68)';
                vm.days.push(day);
            } else if (box.style.backgroundColor === 'rgb(88, 89, 91)') {
                box.style.background = 'rgb(221, 46, 68)';
                var idx = vm.days.indexOf(day);
                if (idx !== -1) {
                    vm.days.splice(idx, 1);
                }
            } else if (box.style.backgroundColor === 'rgb(221, 46, 68)') {
                box.style.background = 'rgb(88, 89, 91)';
                vm.days.push(day);
            }
            return vm.days;
        };


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
            if (!vm.deal) {
                vm.deal = {}
            }
            if (vm.days) {
                vm.deal.day = vm.days
            }
            vm.place.picture = geoService.busPic;
            geoService.newBusiness(vm.place, vm.deal).then(function (res) {
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

        //Modal controls//
        vm.expand = function () {
            var modal = document.getElementById('modal');
            var body = document.getElementById('body');
            var curtain = document.getElementById('modal-curtain');
            curtain.style.display = 'block';
            body.style.overflow = 'hidden';
            modal.style.display = 'block';
            google.maps.event.trigger(vm.map, 'resize');
        };

        vm.closeClick = function () {
            var modal = document.getElementById('modal');
            modal.style.display = 'none';
            var body = document.getElementById('body');
            body.style.overflow = 'auto';
            var curtain = document.getElementById('modal-curtain');
            curtain.style.display = 'none';
        };

    });
