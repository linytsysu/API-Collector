angular.module("apiCollector", [])
    .controller("mainCtrl", function($scope) {
        
        $scope.view = "Content";
        
        $scope.data = {};
        
        $scope.shownTitle = "Used mostly";
        $scope.shownData = {};
        
        $scope.getData = function() {
            chrome.storage.sync.get("tags", function(data) {
                $scope.$apply(function() {
                    $scope.data.tags = data.tags;
                });
            });
            
            chrome.storage.sync.get("categories", function(data) {
                $scope.$apply(function() {
                    $scope.data.categories = data.categories;
                });
            });
            
            chrome.storage.sync.get("apis", function(data) {
                $scope.data.apis = angular.toJson(data.apis);
                $scope.$apply(function() {
                    $scope.shownData = angular.toJson(data.apis);
                });
            });
        }
        
        $scope.getUsedMostly = function() {
        }
        
        $scope.getDataByTag = function(tagName) {
            targetData = [];
            for(var i = 0; i < $scope.data.apis.length; i++) {
                for (var j = 0; j < $scope.data.apis[i].tags.length; j++) {
                    if ($scope.data.apis[i].tags[j] === tagName) {
                        targetData.push($scope.data.apis[i]);
                        break;
                    }
                }
            }
            $scope.shownData = targetData;
        }
        
        $scope.getDataByCategory = function(categoryName) {
            targetData = [];
            for (var i = 0; i < $scope.data.apis.length; i++) {
                if ($scope.data.apis[i].category === categoryName) {
                    targetData.push($scope.data.apis[i]);
                }
            }
            $scope.shownData = targetData;
        }
        
        $scope.changeView = function(view) {
            $scope.view = view;
        }
        
        $scope.changeShownContent = function(mode, data) {
            $scope.shownTitle = data; 
            if (mode == 'category') {
                $scope.getDataByCategory(data);
            } else if (mode == 'tag') {
                $scope.getDataByTag(data);
            }
        }
        
        $scope.addNewAPI = function(newAPI) {
            var tags = newAPI.tags;
            newAPI.tags = tags.split(',');
            $scope.data.apis.push(newAPI);
            // use angular.toJson instead of JSON.stringify
            chrome.storage.sync.set({"apis": $scope.data.apis}, function() {
                console.log("saved");
            });
            
        }
        
        $scope.getData();
        
    });
