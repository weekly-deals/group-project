angular.module('app')
.directive('dealDir', function(){
  return {
    retrict: 'E',
    templateUrl: '/maps.html',
    controller: 'ModalCtrl',
    controllerAs: 'vm'

  }
});
