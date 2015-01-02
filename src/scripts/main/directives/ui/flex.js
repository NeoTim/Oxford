;(function(){

  'use strict';

  angular.module('ui-flex')

  .directive('flex', flex);

  function flex() {
    return {
      transclude: true,
      replace: true,
      restrict: 'E',
      scope: true,
      template:'<div class="{{flexSize}} {{bg}} " style="{{flex}}" data-ng-transclude>' +
              '</div>',

      link: function(scope, element, attrs) {
        if(attrs.bg) scope.bg = 'bg-'+attrs.bg

        var flex = 'flex:'
        if(attrs.grow){
          flex+= attrs.grow + ' ';
        } else {
          flex+='';
        }
        if(attrs.shrink){
          if(!attrs.grow){
            flex +='0 '
          }
          flex+= attrs.shrink + ' ';
        }
        if(attrs.basis){
          flex+= attrs.basis + ' ';
        } else {
          flex+='';
        }
        if(flex !== 'flex:') scope.flex = flex;

        scope.flexSize = 'flex';

        if(attrs.size) scope.flexSize = 'flex-'+attrs.size;


      }
    };
  }

}).call(this);