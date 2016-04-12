angular.module('app')
    .service('geoService', function($http, $q) {

        var vm = this;

        function minuteToMs(min) {
            return min * 60000;
        }

        var options = {
            timeout: 4000,
            maximumAge: minuteToMs(60)
        };

        var key = "AIzaSyDOreIswD8rCeAp8GmTzd_s-f7pH_M6nnc";

        vm.getCurrentPosition = function() {
            var deferred = $q.defer();
            if (!navigator.geolocation) {
                deferred.reject('Geolocation not supported.');
            } else {
                navigator.geolocation.getCurrentPosition(
                    function(pos) {
                        deferred.resolve(pos.coords.latitude.toString() + ',' + pos.coords.longitude.toString());
                    },
                    function(err) {
                        deferred.reject(err);
                    }, options);
            }
            return deferred.promise;
        };

        vm.geoCode = function(address) {
            return $http({
                method: 'GET',
                params: {
                    address: address,
                    components: "components=country:US",
                    key: key
                },
                url: 'https://maps.googleapis.com/maps/api/geocode/json'
            }).then(function(result) {
                return [result.data.results[0].geometry.location.lng, result.data.results[0].geometry.location.lat];
            });
        };

        vm.reverseGeoCode = function(latlng) {
            return $http({
                method: 'GET',
                params: {
                    latlng: latlng,
                    result_type: "locality",
                    language: "en",
                    location_type: "APPROXIMATE",
                    key: key
                },
                url: 'https://maps.googleapis.com/maps/api/geocode/json'
            }).then(function(result) {
                return result.data.results[0].formatted_address.split(",").slice(0, -1).join(',');
            });
        };

        // console.log(business.formatted_address)
        // console.log(JSON.stringify(vm.place));
        // console.log(vm.place.geometry.location.lat());
        // console.log(vm.place.geometry.location.lng());

        vm.newBusiness = function(business) {
            var newBusiness = {
                address: business.formatted_address,
                phone: business.formatted_phone_number,
                loc: {
                    coordinates: [Number(business.geometry.location.lng()), Number(business.geometry.location.lat())]
                },
                busName: business.name,
                busHours: business.opening_hours.weekday_text,
                placeId: business.place_id,
                website: business.website

            };
            return $http({
                method: 'POST',
                data: newBusiness,
                url: '/api/bus'
            })
        };

    });
