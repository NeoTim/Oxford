;(function() {
  'use strict';

  angular
    .module('oxford.directives.toolbar.top', [])
    .directive('oxToolbarTop', oxToolbarTop);
    function oxToolbarTop() {
      return {
        transclude: true,
        replace: true,
        restrict: 'EA',
        scope: true,
        template: '<div class="ox-toolbar ox-toolbar-top bg-{{color}}" ng-class="{\'ox-toolbar-has-title\': title }">' +
          '<ox-toolbar-header ng-if="title">'+
            '<ox-brand>{{title}}</ox-brand>'+
          '</ox-toolbar-header>'+
        '</div>',
        link: function($scope, $element, $attr, navController, transclude) {
          // if( $attr.fixed === "true" ){
          //   $element.addClass('fixed-top')
          // }
          $scope.color = $attr.color || 'default';

          $scope.title = $attr.title;

          transclude(function (clone){
            $element.append(clone)
          })
        }
      };
    }
}());