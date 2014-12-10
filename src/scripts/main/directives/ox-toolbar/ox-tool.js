;(function() {
  'use strict';
  angular
    .module('oxford.directives.toolbar.tool', [])
    .directive('oxTool', oxTool)
    .directive('oxLink', oxLink);
    function oxTool($rootScope) {
      return {
        transclude: true,
        // replace: true,
        restrict: 'E',
        scope: true,
        template: '<button class="tool button-{{color}}">' +
                  '<i ng-if="icon" class="ox-icon fa fa-{{icon}}"></i>' +
                  '<span class="title">{{title}}</span>' +
                  '<paper-ripple fit></paper-ripple>'+
                  '</button>',
        link: function($scope, $element, $attr, navController) {

          $scope.icon = $attr.icon;
          $scope.color = $attr.color;
          $scope.title = $attr.title;
          if($attr.oxToggle){
            console.log($rootScope.app.settings[$attr.oxToggle]);
            // $element.on('click', function(){
            //   $rootScope.$apply(function(){
            //     $rootScope.app.settings[$attr.oxToggle] = !$rootScope.app.settings[$attr.oxToggle]
            //   })
            //   console.log($rootScope.app.settings[$attr.oxToggle]);
            // })
          }

        }
      };
    }
    function oxLink($rootScope) {
      return {
        transclude: true,
        // replace: true,
        restrict: 'E',
        scope: {
          // color: '=color',
          // icon: '=',
          // link: '=link',
          // title: '=title'
        },
        template: '<a ui-sref="{{link}}" class="tool button-{{color}}">' +
                  '<i ng-if="icon" class="ox-icon fa fa-{{icon}}"></i>' +
                  '<span class="title">{{title}}</span>' +
                  '<paper-ripple fit></paper-ripple>'+
                  '</a>',
        link: function($scope, $element, $attr, navController) {

          $scope.icon = $attr.icon;
          $scope.color = $attr.color;
          $scope.title = $attr.title;
          $scope.link = $attr.link;

        }
      };
    }
}());