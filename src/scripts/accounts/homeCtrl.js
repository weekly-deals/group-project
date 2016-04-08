angular.module('app')
    .controller('homeCtrl', function($scope, $auth) {

        $scope.isAuthenticated = function() {
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
            var crd = pos.coords;
            console.log('Latitude : ' + crd.latitude);
            console.log('Longitude: ' + crd.longitude);
            //here we will probably want to convert crds to city name
            //in the backend we will need endpoints for lat/lng to address, and the reverse
        };

        function error(err) {
            //here we can get location via ip if the user doesn't have geolocation
            console.warn('ERROR(' + err.code + '): ' + err.message);
        };

        navigator.geolocation.getCurrentPosition(success, error, options);

    });
