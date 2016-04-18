angular.module('app')
    .factory('Account', function ($http) {

        var userPic = null;

        return {
            getProfile: function () {
                return $http.get('/api/me');
            },
            updateProfile: function (profileData) {
                return $http.put('/api/me', profileData);
            }
        };
    });
