angular.module('app')
    .service('adminService', function ($http, $q) {
        this.deleteDeal = function(dealId) {
         $http({
            method: "DELETE",
            url: "/api/deal/" + dealId
            
        })
        
    };
    
    this.aproveDeal = function(dealId, data) {
        console.log(data)
        $http({
            method: "PUT",
            url: "/api/deal/" + dealId,
            data: data
    })
        
    }
    });