;(function(){

  'use strict';

  angular.module('ui-flex')

  .directive('flexView', flexView);

  function flexView() {
    return {
      // transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<section class="flex-view {{bg}}" ui-view={{name}}>' +
              '</section>',

      link: function(scope, element, attrs) {
        if(attrs.bg) scope.bg = 'bg-'+attrs.bg
        if(attrs.name) scope.name = attrs.name;

      }
    };
  }

}).call(this);