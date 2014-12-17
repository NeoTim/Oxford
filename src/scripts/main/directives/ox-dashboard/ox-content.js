;(function(){

  'use strict';

  angular.module('oxford.directives.dashboard')

  .directive('oxContent', oxContent);

  function oxContent() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<section class="x-content" data-ng-transclude>' +
              '</section>',
      controller: function($scope) {

      },
      link: function(scope, element, attrs) {
        scope.side = attrs.side
      }
    };
  }

}).call(this);