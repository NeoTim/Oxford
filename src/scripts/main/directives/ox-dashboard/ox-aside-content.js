;(function(){

  'use strict';

  angular.module('oxford.directives.dashboard')

  .directive('oxAsideContent', oxAsideContent);

  function oxAsideContent() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<header class="x-aside-content" data-ng-transclude>' +
              '</header>',
      controller: function($scope) {

      },
      link: function(scope, element, attrs) {

      }
    };
  }

}).call(this);