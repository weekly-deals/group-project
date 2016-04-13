angular.module('app')
    .controller('ModalCtrl', function ($scope, $auth, NgMap, geoService) {

      var vm = this;

      vm.types = "['establishment']";

      vm.days = []

      geoService.getCurrentPosition().then(function(latlng){
          geoService.reverseGeoCode(latlng).then(function(city){
              vm.city = city;
          });
      });

      vm.selectDay = function(day) {
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
          // console.log(vm.days)
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
          geoService.newBusiness(vm.place, geoService.busPic).then(function (res) {
              $scope.addedBus = res;
              geoService.newDeal(vm.deal, res, vm.days).then(function(results){
                console.log('done');
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

      //Modal controls//
      vm.expand = function() {
        var modal = document.getElementById('modal');
        modal.style.display = 'block';

      }

      vm.closeClick = function() {
        var modal = document.getElementById('modal');
        modal.style.display = 'none';
      };

});
