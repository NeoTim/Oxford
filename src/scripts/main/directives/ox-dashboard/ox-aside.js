;(function(){

  'use strict';

  angular.module('oxford.directives.dashboard')

  .directive('oxAside', oxAside);

  function oxAside() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<aside class="x-aside x-aside-{{side}}" data-ng-transclude>' +
              '</aside>',
      controller: function($scope) {

      },
      link: function(scope, element, attrs) {
        scope.side = attrs.side
      }
    };
  }

}).call(this);