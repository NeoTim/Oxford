;(function() {
  'use strict';

  angular.module('ui-flex')
  .directive('oxList', function() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template: '<ul class="ox-list">' +
        '<div ng-transclude></div>' +
      '</ul>',
      link: function($scope, $element, $attr, navController) {
      }
    };
  })
  .directive('oxItem', function() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template: '<li class="ox-item">' +
        '<div ng-transclude></div>' +
      '</li>',
      link: function($scope, $element, $attr, navController) {

      }
    };
  });
}());