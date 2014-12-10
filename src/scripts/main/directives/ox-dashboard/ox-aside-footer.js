;(function(){

  'use strict';

  angular.module('oxford.directives.dashboard')

  .directive('oxAsideFooter', oxAsideFooter);

  function oxAsideFooter() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<header class="x-aside-footer" data-ng-transclude>' +
              '</header>',
      controller: function($scope) {

      },
      link: function(scope, element, attrs) {

      }
    };
  }

}).call(this);