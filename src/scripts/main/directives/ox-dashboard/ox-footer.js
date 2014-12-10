;(function(){

  'use strict';

  angular.module('oxford.directives.dashboard')

  .directive('oxFooter', oxFooter);

  function oxFooter() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<footer class="x-footer" data-ng-transclude>' +
              '</footer>',
      controller: function($scope) {

      },
      link: function(scope, element, attrs) {
        scope.side = attrs.side
      }
    };
  }

}).call(this);