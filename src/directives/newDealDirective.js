angular.module('app')
.directive('dealDir', function(){
  return {
    retrict: 'E',
    templateUrl: '/partials/maps.html',
    controller: 'ModalCtrl',
    controllerAs: 'vm'

  }
})
