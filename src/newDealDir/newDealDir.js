angular.module('app')
    .directive('dealDir', function () {
        return {
            restrict: 'E',
            templateUrl: '/newDealDir.html',
            scope: {
                show: '='
            },
            controllerAs: 'vm',
            link: function (scope) {
                scope.closeAddDeal = function () {
                    scope.show = false;
                    var body = document.getElementById('body');
                    body.style.overflow = 'auto';
                    var leftArrows = document.getElementsByClassName('leftArrow');
                    var rightArrows = document.getElementsByClassName('rightArrow');
                    Array.prototype.forEach.call(leftArrows, function (e) {
                        e.style.display = 'block';
                    });
                    Array.prototype.forEach.call(rightArrows, function (e) {
                        e.style.display = 'block';
                    });
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

                function svg() {
                    svgService.getSvg().then(function (svgs) {
                        svgs.splice((svgs.length - 2), 1); //splicing out unwanted svgs (e.g. edit, delete, approve svgs)
                        svgs.splice((svgs.length - 7), 2);

                        vm.svgs = svgs;
                    });
                }

                svg();

                vm.selectSvg = function (svg) {
                    var allSvgs = document.getElementsByClassName('svg');
                    for (var i = 0; i < allSvgs.length; i++) {
                        allSvgs[i].style.border = 'none';
                    }

                    vm.dealSvg = document.getElementById(svg);

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
                    $scope.message = '';
                    if (vm.days && vm.deal) {
                        vm.deal.day = vm.days
                    }
                    if (vm.dealSvg) {
                        vm.deal.dealSvg = vm.dealSvg.id;
                    }
                    if (vm.dealCat) {
                        vm.deal.dealCat = vm.dealCat;
                    }
                    if (!vm.deal) {
                        vm.deal = {}
                    }
                    var dayCheck = 0;
                    if (vm.days) {
                        dayCheck = vm.days.length
                    }
                    if (!vm.place || !vm.deal.name || dayCheck === 0 || !vm.days || !vm.dealCat || !vm.deal.description || !vm.deal.details || !vm.dealSvg || !vm.deal) {
                        $scope.message += 'Please correct : \n';
                        if (!vm.deal) {
                            $scope.message += 'EVERYTHING';
                            return;
                        }
                        if (!vm.deal.name) {
                            $scope.message += 'Deal Name \n';
                        }
                        if (!vm.days || dayCheck === 0) {
                            $scope.message += 'Days deal is available \n';
                        }
                        if (!vm.dealCat) {
                            $scope.message += 'Category \n';
                        }
                        if (!vm.deal.description) {
                            $scope.message += 'Description \n';
                        }
                        if (!vm.deal.details) {
                            $scope.message += ' Details \n';
                        }
                        if (!vm.deal.dealSvg) {
                            $scope.message += 'Emoji \n';
                        }
                        if (!vm.place) {
                            $scope.message += 'Business \n';
                        }
                        if (!vm.place.opening_hours.weekday_text[6]) {
                            $scope.message += 'Find a business with hours listed \n';
                        }
                        return;
                    }
                    vm.place.picture = geoService.busPic;
                    geoService.newBusiness(vm.place, vm.deal).then(function (res) {
                        $scope.addedBus = res;
                        $scope.message = '';
                        vm.days = {};
                        vm.dealSvg = '';
                        vm.place = '';
                        vm.dealCat = '';
                        vm.deal = {};
                    });
                };

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
                    } else if (box.style.backgroundColor === 'rgb(221, 46, 68)' || 'orange' || 'blue' || 'green' || 'purple' || 'yellow') {
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
