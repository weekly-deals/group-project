angular.module('app')
.directive('profileDir', function(){
  return {
    retrict: 'E',
    templateUrl: '/profile.html',
    controller: 'profileCtrl',
    // controllerAs: 'vm'
  }
});
