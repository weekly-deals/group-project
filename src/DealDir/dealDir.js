angular.module('app')
    .directive('dealDir', function () {
        return {
            restrict: 'E',
            templateUrl: '/dealDir.html',
            scope: {
                show: '='
            },
            controllerAs: 'vm',
            link: function (scope) {
                scope.closeAddDeal = function () {
                    scope.show = false;
                    var body = document.getElementById('body');
                    body.style.overflow = 'auto';
                }
            },
            controller: function (NgMap, geoService, svgService, $scope) {

                var vm = this;

                function getMap() {
                    NgMap.getMap().then(function (map) {
                        vm.map = map;
                        vm.map.setZoom(12);
                        geoService.getCurrentPosition().then(function (latlng) {
                            vm.map.setCenter(latlng);
                        });
                    });
                }

                google.maps.event.addDomListener(window, 'click', getMap);

                vm.types = "['establishment']";

                vm.days = [];

                (function svg() {
                    svgService.getSvg().then(function (svgs) {
                        vm.svgs = svgs;
                    });
                })();

                vm.selectSvg = function (svg) {
                    var allSvgs = document.getElementsByClassName('svg');
                    for (var i = 0; i < allSvgs.length; i++) {
                        allSvgs[i].style.border = 'none';
                    }

                    vm.dealSvg = document.getElementById(svg)
                    if (vm.dealSvg.style.border === '1px solid black') {
                        vm.dealSvg.style.border = 'none';
                    } else {
                        vm.dealSvg.style.border = '1px solid black';
                    }
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
                    if (vm.dealSvg) {
                        vm.deal.dealSvg = vm.dealSvg.id;
                    }
                    if (vm.dealCat) {
                        vm.deal.dealCat = vm.dealCat;
                    }
                    vm.place.picture = geoService.busPic;
                    geoService.newBusiness(vm.place, vm.deal).then(function (res) {
                        $scope.addedBus = res;
                    });
                };

                vm.selectDay = function (day) {
                  console.log(day);
                    var box = document.getElementById(day);
                    if (!box.style.backgroundColor) {
                        box.style.background = '#58595B';
                        // box.style.border = '1px solid rgb(221, 46, 68)';
                        vm.days.push(day);
                    } else if (box.style.backgroundColor === 'rgb(88, 89, 91)') {
                        box.style.background = $scope.currentColor;
                        var idx = vm.days.indexOf(day);
                        if (idx !== -1) {
                            vm.days.splice(idx, 1);
                        }
                    } else if (box.style.backgroundColor === 'rgb(221, 46, 68)' || 'orange' || 'blue' || 'green' || 'purple' || 'yellow') {
                        $scope.currentColor = box.style.background;
                        box.style.background = 'rgb(88, 89, 91)';
                        vm.days.push(day);
                    }
                    return vm.days;
                };

                vm.selectedCat = false;

                vm.selectCat = function (cat) {
                    vm.dealCat = cat;
                    vm.selectedCat = !vm.selectedCat;
                };

                vm.openCat = function () {
                    vm.selectedCat = !vm.selectedCat;
                };

            }
        }
    });
