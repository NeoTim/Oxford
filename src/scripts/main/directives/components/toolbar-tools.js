;(function(){

  'use strict';

  angular.module('ui-flex')

  .directive('toolbarTools', toolbarTools);

  function toolbarTools() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<div class="toolbar-tools {{side}}" data-ng-transclude>' +
              '</div>',

      link: function(scope, element, attrs) {
        var side = attrs.side || 'right';
        scope.side = 'side-' + side;
      }
    };
  }

}).call(this);