;(function(){

  'use strict';

  angular.module('oxford.directives.dashboard')

  .directive('oxAsideNav', oxAsideNav);

  function oxAsideNav() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<nav class="x-aside-nav" data-ng-transclude>' +
              '</nav>',
      controller: function($scope) {

      },
      link: function(scope, element, attrs) {

      }
    };
  }

}).call(this);