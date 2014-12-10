;(function(){

  'use strict';

  angular.module('oxford.directives.dashboard')

  .directive('oxContainer', oxContainer);

  function oxContainer() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<section class="x-container" data-ng-transclude>' +
              '</section>',
      controller: function($scope) {

      },
      link: function(scope, element, attrs) {
        scope.side = attrs.side
      }
    };
  }

}).call(this);