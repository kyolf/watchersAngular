var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$filter', '$timeout','$log', function($scope, $filter, $timeout, $log) {
    
  $scope.handle = '';
  
  $scope.lowercasehandle = function() {
    return $filter('lowercase')($scope.handle);
  };
  
  //This don't work
  $scope.lhandle = $filter('lowercase')($scope.handle);

  //Runs this function when handle changes
  $scope.$watch('handle', function(newValue, oldValue) {
    $log.log($scope.lhandle);
    console.info('Changed!');
    console.log('Old:' + oldValue);
    console.log('New:' + newValue);
  });


  // $scope.$watch('lhandle', function(newValue, oldValue) {
  //   console.info('Changed!');
  //   console.log('Old:' + oldValue);
  //   console.log('New:' + newValue);
  // });
    
  //Doesn't change the scope even though it ran because it is outside AngularJs context.
  //Never started the digest loop
  setTimeout(function(){

    //Solution 1: Use $apply function
    //Manual way to tell Angular context to start the digest loop
    $scope.$apply(function() {
      $scope.handle = 'hi';
      $log.log('Scope changed');
    });

  }, 3000);

    
}]);