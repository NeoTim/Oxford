;(function() {
  'use strict';
  angular
    .module('oxford.directives.toolbar.brand', [])
    .directive('oxBrand', oxBrand);
  function oxBrand() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template: '<div class="ox-brand">' +
        '<a class="toolbar-toggle-left"><i class="fa fa-bars"></i></a>' +
        '<div ng-transclude></div>' +
        '<a class="toolbar-toggle-left"><i class="fa fa-bars"></i></a>' +
      '</div>',
      link: function($scope, $element, $attr, navController) {

      }
    };
  }
}());