;(function(){
  'use strict';
  angular
    .module('oxford.directives.toolbar.left', [])
    .directive('oxToolbarLeft', oxToolbarLeft);
    function oxToolbarLeft($window) {
      return {
        transclude: true,
        replace: true,
        scope: true,
        restrict: 'E',
        template: '<div class="ox-toolbar ox-toolbar-left bg-{{color}}">' +
          '<div ng-transclude></div>' +
        '</div>',
        link: function($scope, $element, $attr, navController) {
          document.querySelector('body').classList.add('has-ox-toolbar-left')
          $scope.color = $attr.color || 'default'
        }
      };
    }
}).call(this);