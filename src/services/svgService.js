angular.module('app')
    .service('svgService', function ($q) {

// startinject
var svg = ["sprite.svg#icon-airplane",
"sprite.svg#icon-beer",
"sprite.svg#icon-birthday",
"sprite.svg#icon-bowling",
"sprite.svg#icon-burger",
"sprite.svg#icon-cake",
"sprite.svg#icon-camera",
"sprite.svg#icon-chicken",
"sprite.svg#icon-christmas",
"sprite.svg#icon-couple",
"sprite.svg#icon-dancing",
"sprite.svg#icon-donut",
"sprite.svg#icon-easel",
"sprite.svg#icon-egg",
"sprite.svg#icon-family",
"sprite.svg#icon-fish",
"sprite.svg#icon-flowers",
"sprite.svg#icon-gun",
"sprite.svg#icon-haircut",
"sprite.svg#icon-icecream",
"sprite.svg#icon-kebab",
"sprite.svg#icon-microphone",
"sprite.svg#icon-muscle",
"sprite.svg#icon-nails",
"sprite.svg#icon-pho",
"sprite.svg#icon-pizza",
"sprite.svg#icon-pumpkin",
"sprite.svg#icon-sax",
"sprite.svg#icon-shapes",
"sprite.svg#icon-signs",
"sprite.svg#icon-spaghetti",
"sprite.svg#icon-sushi",
"sprite.svg#icon-theater",
"sprite.svg#icon-tiger",
"sprite.svg#icon-tool",
"sprite.svg#icon-train"];
// endinject

        this.getSvg = function () {
            var deferred = $q.defer();
            deferred.resolve(svg);
            return deferred.promise;
        }

    });
