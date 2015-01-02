;(function(){

  'use strict';

  angular.module('ui-flex')

  .directive('flexHeader', flexHeader);

  function flexHeader() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: {
        sub: '='
      },
      template:'<header class="flex-header {{size}} {{bg}} " data-ng-transclude>' +
              '</header>',

      link: function(scope, element, attrs) {

        var size = 'header-'
        if(attrs.bg) scope.bg = 'bg-'+attrs.bg
        if(attrs.size) scope.size = size + attrs.size;

        scope.ngClasses = {
          'sub-header':scope.sub
        }

      }
    };
  }

}).call(this);