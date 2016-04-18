angular.module('app')
<<<<<<< HEAD
    .controller('ModalCtrl', function ($scope, $auth, NgMap, geoService, svgService, adminService) {
=======
    .controller('ModalCtrl', function ($scope, $auth, NgMap, geoService, svgService, $rootScope) {
>>>>>>> master

        var vm = this;

        vm.types = "['establishment']";

        vm.days = [];

        (function svg() {
            svgService.getSvg().then(function (svgs) {
                vm.svgs = svgs;
            })
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

        vm.selectedCat = false;

        vm.selectCat = function (cat) {
            vm.dealCat = cat;
            vm.selectedCat = !vm.selectedCat;
        };

        vm.openCat = function () {
            vm.selectedCat = !vm.selectedCat;
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

        vm.getDealInfo = function () {
            geoService.getCurrentPosition().then(function(latlng){
                geoService.reverseGeoCode(latlng).then(function (city) {
                    $scope.city = city;
                });
                geoService.getDeal(latlng).then(function (data) {
                    $rootScope.deals = data.data;
                });
            })
        };
        vm.getDealInfo();


         vm.isAuthenticated = function () {
            return $auth.isAuthenticated();
        };
        vm.showDesc = function (deal) {
            var desc = document.getElementById('deal-desc');
            desc.style.opacity = '1 !important';
            deal.hideDesc = true;
        };

        vm.hideDesc = function (deal) {
            deal.hideDesc = false;
        }
        
        $scope.geoCode = function(address) {
            geoService.geoCode(address).then(function(latlng){
                geoService.getDeal(latlng).then(function (data) {
                    $rootScope.deals = data.data;
                });
            });
        };
       
       // nat buttons on admin
        vm.showButton = function(deal) {
            deal.showButtons = true;
            var edit = document.getElementById('edit');
            var remove = document.getElementById('remove');  
        }
       
        vm.hideButton = function (deal) {
            deal.showButtons = false;
            var edit = document.getElementById('edit');
            var remove = document.getElementById('remove');
        }
        
        //remove a deal nat
        vm.removeDeal = function(dealId) {
       adminService.deleteDeal(dealId);
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
