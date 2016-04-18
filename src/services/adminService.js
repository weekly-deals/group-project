angular.module('app')
    .service('adminService', function ($http, $q) {
        this.deleteDeal = function(dealId) {
         $http({
            method: "DELETE",
            url: "/api/deal/" + dealId
            
        })
        
    };
        
    })