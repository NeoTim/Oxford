;(function(){

  'use strict';

  angular.module('ui-flex')

  .directive('flexBody', flexBody);

  function flexBody() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<section class="flex-body {{bg}} " data-ng-transclude>' +
              '</section>',

      link: function(scope, element, attrs) {
        if(attrs.bg) scope.bg = 'bg-'+attrs.bg


      }
    };
  }

}).call(this);