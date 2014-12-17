;(function(){

  'use strict';

  angular.module('oxford.directives.dashboard')

  .directive('flexHeader', flexHeader);

  function flexHeader() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<header class="flex-header {{bg}} " data-ng-transclude>' +
              '</header>',

      link: function(scope, element, attrs) {
        if(attrs.bg) scope.bg = 'bg-'+attrs.bg


      }
    };
  }

}).call(this);