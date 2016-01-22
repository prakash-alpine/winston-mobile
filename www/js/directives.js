appDirectives = angular.module('starter.directives', []);

appDirectives.directive('wn-click', function() {

  return function($scope, $element, $attrs) {

    $element.bind('touchstart click', function(event) {

      event.preventDefault();
      event.stopPropagation();

      $scope.$apply($attrs['wn-click']);
    });
  };
});
