angular.module('app')
    .controller('NavbarCtrl', function($rootScope, $scope, $auth, NgMap, geoService, $location, svgService, $window, $anchorScroll) {

        var vm = this;

        vm.category = 'All';

        vm.showProfile = false;

        vm.openProfile = function() {
            vm.showProfile = true;
            var body = document.getElementById('body');
            body.style.overflow = 'hidden';
            var leftArrows = document.getElementsByClassName('leftArrow');
            var rightArrows = document.getElementsByClassName('rightArrow');
            Array.prototype.forEach.call(leftArrows, function(e) {
                e.style.display = 'none';
            });
            Array.prototype.forEach.call(rightArrows, function(e) {
                e.style.display = 'none';
            });
        };

        vm.showAddDeal = false;

        vm.openAddDeal = function() {
            vm.showAddDeal = true;
            var body = document.getElementById('body');
            var leftArrows = document.getElementsByClassName('leftArrow');
            var rightArrows = document.getElementsByClassName('rightArrow');
            Array.prototype.forEach.call(leftArrows, function(e) {
                e.style.display = 'none';
            });
            Array.prototype.forEach.call(rightArrows, function(e) {
                e.style.display = 'none';
            });
            body.style.overflow = 'hidden';
        };

        vm.hideDropdown = true;

        vm.toggleDropdown = function() {
            vm.hideDropdown = !vm.hideDropdown;
            vm.hideBotNav = !vm.hideBotNav;
        };

        function isEmpty(obj) {
            return Object.keys(obj).length === 0 && JSON.stringify(obj) === JSON.stringify({});
        }

        vm.selectOption = function(cat) {
            var body = angular.element(document.getElementById('body'));
            if (cat === 'All') {
                body.scrollTo(0, 0, 250)
            } else {
                var category = angular.element(document.getElementById(cat));
                if (!isEmpty(category)) {
                    body.scrollTo(category, -25, 250);
                    //elem to scroll to, offset, duration
                }
            }
        };

        vm.hideBotNav = false;

        vm.hideDealBar = function() {
            return !(/login|signup/.test($location.url()))
        };

        $scope.$on('$locationChangeStart', function(event) {
            if ($location.url() === '/') {
              vm.notHome = false;
            } else {
              vm.notHome = true;
            }
        });

        vm.isAuthenticated = function() {
            return $auth.isAuthenticated();
        };

        vm.types = "['establishment']";

        geoService.getCurrentPosition().then(function(latlng) {
            geoService.reverseGeoCode(latlng).then(function(city) {
                vm.city = city;
            })
        });

        function svgs() {
            svgService.getSvg().then(function(res) {
                vm.svgs = res;
            })
        }

        svgs();

        vm.days = [{
            display: 'Sunday',
            val: function() {
                return {
                    day: 0
                };
            }
        }, {
            display: 'Monday',
            val: function() {
                return {
                    day: 1
                };
            }
        }, {
            display: 'Tuesday',
            val: function() {
                return {
                    day: 2
                };
            }
        }, {
            display: 'Wednesday',
            val: function() {
                return {
                    day: 3
                };
            }
        }, {
            display: 'Thursday',
            val: function() {
                return {
                    day: 4
                };
            }
        }, {
            display: 'Friday',
            val: function() {
                return {
                    day: 5
                };
            }
        }, {
            display: 'Saturday',
            val: function() {
                return {
                    day: 6
                };
            }
        }];

        var date = new Date();
        vm.dayNum = date.getDay();
        $rootScope.selectedDay = {
            day: vm.days[vm.dayNum].display
        };

        vm.dayDropdown = true;

        vm.toggleDayDD = function() {
            vm.dayDropdown = !vm.dayDropdown;
        };

        $rootScope.selectDay = function(day, idx) {
            $rootScope.selectedDay = {
                day: day,
                idx: idx
            };
        };

        vm.addBusiness = function() {
            geoService.newBusiness(vm.place).then(function(res) {
                $scope.addedBus = res;
            });
        };

    });
