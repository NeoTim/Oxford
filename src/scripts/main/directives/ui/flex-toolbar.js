;(function(){

  'use strict';

  angular.module('ui-flex')

  .directive('flexToolbar', flexToolbar);

  function flexToolbar() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: {
        shadow:'=shadow',
        sud: '='
      },
      template:'<div class="flex-toolbar {{size}} {{bg}}" data-ng-class="ngClasses">' +
              '<flex-aside side="left" ng-if="brand"><toolbar-brand>{{brand}}</toolbar-brand></flex-aside>'+
              '</div>',

      link: function(scope, element, attrs, ctrl, transclude) {
        scope.brand = attrs.brand || false;
        if(attrs.size) scope.size = 'toolbar-' + attrs.size

        scope.bg="bg-"+attrs.bg

        scope.ngClasses={
          'has-shadow': scope.shadow,
          'sub-toolbar':scope.sub,
        };

        transclude(function (clone){
          element.append(clone);
        })
      }
    };
  }

}).call(this);