var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$filter', '$timeout','$log', function($scope, $filter, $timeout, $log) {
  //Lessons to takeaway:
  //Caveat of AngularJS : Stay in the AngularJS Architecture
  
  //You need to go all in or nothing in AngularJS framework
  //because if you use things that are outside of AngularJS
  //framework, you need to make sure you put $apply.
  
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
    
    //Implicitly Angular use $apply on the functions inside Angular context
    
    //If the function you are using is outside of Angular context such as 
    //third party libraries (jQuery) or vanilla JS (setTimeout), then you need
    //to explicitly state $apply function.
    $scope.$apply(function() {
      $scope.handle = 'hi';
      $log.log('Scope changed');
    });

  }, 3000);

   
  //Second solution
  //Use Angular built-in services 
  //$timeout replaces setTimeout
  $timeout(function(){
    $scope.handle = 'bye';
  }, 4000);

}]);