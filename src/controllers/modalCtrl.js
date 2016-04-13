angular.module('app')
    .controller('ModalCtrl', function ($scope, $auth, NgMap, geoService) {

      var vm = this;

      vm.types = "['establishment']";

      geoService.getCurrentPosition().then(function(latlng){
          geoService.reverseGeoCode(latlng).then(function(city){
              vm.city = city;
          });
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
          geoService.newBusiness(vm.place, geoService.busPic).then(function (res) {
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
      vm.expand = function() {
        var modal = document.getElementById('modal');
        modal.style.display = 'block';

      }

      vm.closeClick = function() {
        var modal = document.getElementById('modal');

        modal.style.display = 'none';
      };

});
