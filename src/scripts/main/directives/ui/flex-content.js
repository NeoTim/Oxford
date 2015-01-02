;(function(){

  'use strict';

  angular.module('ui-flex')

  .directive('flexContent', flexContent);

  function flexContent() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: {
        scroll:'='
      },
      template:'<div class="flex-content" data-ng-class="conditionalClasses" data-ng-transclude>' +
              '</div>',

      link: function(scope, element, attrs) {

        scope.hasHeader = attrs.hasHeader || false
        scope.hasPads = attrs.hasPads || false
        scope.conditionalClasses = {
          'hasHeader': scope.hasHeader,
          'hasPads': scope.hasPads,
          'content-scroll':scope.scroll
        }
      }
    };
  }

}).call(this);