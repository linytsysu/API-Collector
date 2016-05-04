angular.module("apiCollector", [])
    .controller("simpleCtrl", function($scope) {
        $scope.viewFile = function () {
            return "../html/content.html"
        }
    });