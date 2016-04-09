angular.module('app')
    .controller('homeCtrl', function ($scope, $auth, $http) {

        $scope.isAuthenticated = function () {
            return $auth.isAuthenticated();
        };

        function minuteToMs(min) {
            return min * 60000;
        }

        var options = {
            timeout: 2000,
            maximumAge: minuteToMs(60)
        };

        function success(pos) {
            var latlng = pos.coords.latitude.toString() + ',' + pos.coords.longitude.toString();
            // reverseGeoCode(latlng);
        }

        function error(err) {
            //here we can get location via ip if the user doesn't have geolocation
            console.warn('ERROR(' + err.code + '): ' + err.message);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);

        function geoCode(address) {
            $http({
                method: 'GET',
                params: {
                    address: address,
                    components: "components=country:US",
                    key: "AIzaSyDfbbD0QS-Ez9fLWI3lR8l6UkZ1VGWDLgQ"
                },
                url: 'https://maps.googleapis.com/maps/api/geocode/json'
            }).then(function (result) {
                var ret = {coordinates: [result.data.results[0].geometry.location.lng, result.data.results[0].geometry.location.lat]};
                console.log(ret);
            });
        }

// geoCode('295 E 7800 S 84047');

        function reverseGeoCode(latlng) {
            $http({
                method: 'GET',
                params: {
                    latlng: latlng,
                    result_type: "locality",
                    language: "en",
                    location_type: "APPROXIMATE",
                    key: "AIzaSyDfbbD0QS-Ez9fLWI3lR8l6UkZ1VGWDLgQ"
                },
                url: 'https://maps.googleapis.com/maps/api/geocode/json'
            }).then(function (result) {
                var ret = result.data.results[0].formatted_address.split(",").slice(0, -1).join(',');
                console.log(ret);
            });
        }

    });
