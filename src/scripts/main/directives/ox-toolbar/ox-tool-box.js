;(function() {
  'use strict';
  angular
    .module('oxford.directives.toolbar.toolbox',[])
    .directive('oxToolBox', oxToolBox);
    function oxToolBox() {
      return {
        transclude: true,
        replace: true,
        restrict: 'EA',
        scope: {
          side: '=side'
        },
        template: '<div class="ox-tool-box">' +
        '</div>',
        link: function($scope, $element, $attr, navController) {
          $element.addClass('ox-tool-box')
        }
      };
    }
}());