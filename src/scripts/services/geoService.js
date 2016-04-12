angular.module('app')
    .service('geoService', function ($http, $q) {
        var busPic = null;
        var vm = this;

        function minuteToMs(min) {
            return min * 60000;
        }

        var options = {
            timeout: 4000,
            maximumAge: minuteToMs(60)
        };

        vm.getCurrentPosition = function () {
            var deferred = $q.defer();
            if (!navigator.geolocation) {
                deferred.reject('Geolocation not supported.');
            } else {
                navigator.geolocation.getCurrentPosition(
                    function (pos) {
                        var latlng = {lat: parseFloat(pos.coords.latitude), lng: parseFloat(pos.coords.longitude)};
                        deferred.resolve(latlng);
                    },
                    function (err) {
                        deferred.reject(err);
                    }, options);
            }
            return deferred.promise;
        };

        vm.reverseGeoCode = function (latlng) {
            var deferred = $q.defer();
            geocoder = new google.maps.Geocoder();
            geocoder.geocode({'location': latlng}, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        for (var i = 0, len = results[1].address_components.length; i < len; i++) {
                            if (results[1].address_components[i].types.indexOf("locality") !== -1) {
                                return deferred.resolve(results[1].address_components[i].long_name ? results[1].address_components[i].long_name : results[1].address_components[i].short_name)
                            }
                        }
                    } else {
                        window.alert('No results found');
                    }
                } else {
                    deferred.reject(status);
                }
            });
            return deferred.promise;
        };

        vm.newBusiness = function (business, busPic) {
            var newBusiness = {
                address: business.formatted_address,
                phone: business.formatted_phone_number,
                loc: {
                    coordinates: [Number(business.geometry.location.lng()), Number(business.geometry.location.lat())]
                },
                busName: business.name,
                busHours: business.opening_hours.weekday_text,
                placeId: business.place_id,
                website: business.website,
                picture: busPic
            };
            return $http({
                method: 'POST',
                data: newBusiness,
                url: '/api/bus'
            });
        };

        vm.storeImage = function (imageData, fileName) {
          var imageExtension = imageData.split(';')[0].split('/');
          imageExtension = imageExtension[imageExtension.length - 1];

          var newImage = {
            imageName: fileName,
            imageBody: imageData,
            imageExtension: imageExtension,
            userEmail: 'jakecorry123@gmail.com'
          };

          return $http.post('/api/newimage', newImage);
        };

    });
