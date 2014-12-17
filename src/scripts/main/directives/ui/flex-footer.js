;(function(){

  'use strict';

  angular.module('oxford.directives.dashboard')

  .directive('flexFooter', flexFooter);

  function flexFooter() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<footer class="flex-footer {{bg}} " data-ng-transclude>' +
              '</footer>',

      link: function(scope, element, attrs) {
        if(attrs.bg) scope.bg = 'bg-'+attrs.bg


      }
    };
  }

}).call(this);