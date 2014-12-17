;(function(){

  'use strict';

  angular.module('oxford.directives.dashboard')

  .directive('flex', flex);

  function flex() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<div class="{{flexSize}} {{bg}} " data-ng-transclude>' +
              '</div>',

      link: function(scope, element, attrs) {
        if(attrs.bg) scope.bg = 'bg-'+attrs.bg

        scope.flexSize = 'flex';

        if(attrs.size) scope.flexSize = 'flex-'+attrs.size;


      }
    };
  }

}).call(this);