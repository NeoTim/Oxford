;(function(){

  'use strict';

  angular.module('ui-flex')

  .directive('flexColumn', flexColumn);

  function flexColumn() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<div class="flex-column {{bg}} " data-ng-transclude>' +
              '</div>',

      link: function(scope, element, attrs) {
        if(attrs.bg) scope.bg = 'bg-'+attrs.bg

      }
    };
  }

}).call(this);