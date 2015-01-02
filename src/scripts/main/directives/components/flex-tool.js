;(function(){

  'use strict';

  angular.module('ui-flex')

  .directive('flexTool', flexTool);

  function flexTool() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<button class="tool {{bg}}">' +
              '<i data-ng-if="icon" class="{{icon}}"></i>' +
              '</button>',

      link: function(scope, element, attrs) {
        if(attrs.bg) scope.bg = 'bg-' + attrs.bg;

        scope.icon = attrs.icon;

        if(scope.icon.split('-')[0] === 'fa'){
          scope.icon = 'fa ' + scope.icon
        }
      }
    };
  }

}).call(this);