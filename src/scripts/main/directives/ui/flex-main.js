;(function(){

  'use strict';

  angular.module('oxford.directives.dashboard')

  .directive('flexMain', flexMain);

  function flexMain() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<header class="flex-main {{bg}} " data-ng-transclude>' +
              '</header>',

      link: function(scope, element, attrs) {
        if(attrs.bg) scope.bg = 'bg-'+attrs.bg


      }
    };
  }

}).call(this);