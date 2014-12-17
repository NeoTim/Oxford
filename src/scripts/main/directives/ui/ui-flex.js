;(function(){

  'use strict';

  angular.module('oxford.directives.dashboard')

  .directive('uiFlex', uiFlex);

  function uiFlex() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<main class="ui-flex {{bg}} " data-ng-transclude>' +
              '</main>',

      link: function(scope, element, attrs) {
        if(attrs.bg) scope.bg = 'bg-'+attrs.bg


      }
    };
  }

}).call(this);