angular.module('app')
.directive('fileread', function (geoService) {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      elem.bind("change", function (changeEvent) {

        var reader = new FileReader();
        reader.onload = function (loadEvent) {
          var fileread = loadEvent.target.result;

          var tempArray = elem[0].value.split('\\');
          var fileName = tempArray[tempArray.length - 1];
          geoService.storeImage(fileread, fileName)
          .then(function(result){
            geoService.busPic = result.data.Location;
          })
          .catch(function(err) {
            console.error(err);
          });
        };

        reader.readAsDataURL(changeEvent.target.files[0]);
      });
    }
  };
});
