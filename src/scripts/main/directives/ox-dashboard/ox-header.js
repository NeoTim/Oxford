;(function(){

  'use strict';

  angular.module('oxford.directives.dashboard')

  .directive('oxHeader', oxHeader);

  function oxHeader() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<section class="x-header" data-ng-transclude>' +
              '</section>',
      controller: function($scope) {

      },
      link: function(scope, element, attrs) {
        scope.side = attrs.side
      }
    };
  }

}).call(this);