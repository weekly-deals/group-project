angular.module('app')


    .controller('ModalCtrl', function ($scope, $auth, NgMap, geoService, svgService, $rootScope, adminService) {

     var vm = this;

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
        
          vm.isAuthenticated = function () {
            return $auth.isAuthenticated();
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
            if (vm.isAuthenticated() === "user") {
               alert("Thanks for submitting a deal, we will add it to the list shortly after reviewing it");
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
                
                
                
                //renders the deals on the screen
                
                
                geoService.getDeal(latlng).then(function (data) {
                   
                     if(vm.isAuthenticated() === "user") {
                           $rootScope.deals = data.data;
                           $rootScope.deals.forEach(function(cat) {
                              cat.data.forEach(function(deal) {
                                  if(deal.pending === true) {
                                      cat.data.splice(cat.data.indexOf(deal), 1);
                                      console.log("Here is the deal ", deal)
                                  } 
                              })
                           })
                        } else if (vm.isAuthenticated() === "admin") {
                        $rootScope.deals = data.data;
                        
                    }
                   
                    }); 
            })  
            };
        vm.getDealInfo();




       
        $scope.geoCode = function(address) {
            geoService.geoCode(address).then(function(latlng){
                geoService.getDeal(latlng).then(function (data) {
                    $rootScope.deals = data.data;
                });
            });
        };

        NgMap.getMap().then(function (map) {
            geoService.getCurrentPosition().then(function (latlng) {
                vm.map = map;
                vm.map.setCenter(latlng);
                vm.map.setZoom(12);
            });
        });

//Filtering stuff//

$rootScope.$watch('selectedDay',
  function(){
if ($scope.deals){
  $scope.deals.forEach(function(obj){
    if (obj.data) {
      obj.data.forEach(function(deal) {
        if (deal.day.includes($rootScope.selectedDay.idx)) {
          // console.log('included!', deal)
          deal.hideDeal = false;
        } else {
          // console.log('bye bye deal',deal);
          deal.hideDeal = true;
        }
      });
      }
    });
}

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
    
   
