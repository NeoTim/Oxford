;(function(){

  'use strict';

  angular.module('ui-flex')

  .directive('flexRow', flexRow);

  function flexRow() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: {
        gutters: '=gutters'
      },
      template:'<div class="flex-row {{pads}} {{bg}}" ng-class="{\'gutters\':gutters}" data-ng-transclude>' +
              '</div>',

      link: function(scope, element, attrs, controller, transclude) {
        if(attrs.bg) scope.bg = 'bg-'+attrs.bg
        if(attrs.pads) scope.pads = 'pads';

      }
    };
  }

}).call(this);