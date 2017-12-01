var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$filter', '$timeout', function($scope, $filter, $timeout) {
    
  $scope.handle = '';
  
  $scope.lowercasehandle = function() {
    return $filter('lowercase')($scope.handle);
  };
  
  //Runs this function when handle changes
  $scope.$watch('handle', function(newValue, oldValue) {
    console.info('Changed!');
    console.log('Old:' + oldValue);
    console.log('New:' + newValue);
  });
    
    
}]);