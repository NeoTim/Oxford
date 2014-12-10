;(function(){

  'use strict';

  angular.module('oxford.directives.dashboard')

  .directive('oxAsideHeader', oxAsideHeader);

  function oxAsideHeader() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<header class="x-aside-header" data-ng-transclude>' +
              '</header>',
      controller: function($scope) {

      },
      link: function(scope, element, attrs) {

      }
    };
  }

}).call(this);