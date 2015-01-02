;(function(){

  'use strict';

  angular.module('ui-flex')

  .directive('flexCard', flexCard);

  function flexCard() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<div class="flex-card {{bg}}">' +
                '<div data-ng-if="title" class="card-heading">{{title}}</div>'+

                // '<div ng class="flex-footer"></div>'+
              '</div>',

      link: function(scope, element, attrs, controller, transclude) {
        if(attrs.bg) scope.bg = 'bg-'+attrs.bg
        scope.title = attrs.title;
        // scope.body = attrs.body;
        transclude(function (clone){
          element.append(clone)
        })

      }
    };
  }

}).call(this);