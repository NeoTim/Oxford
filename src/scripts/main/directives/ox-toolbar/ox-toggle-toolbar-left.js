;(function(){
  'use strict';
  angular
    .module('oxford.directives.toolbar.left.toggle', [])
    .directive('oxToggleToolbarLeft', oxToggleToolbarLeft)
    .directive('oxToggleToolbarInnerLeft', oxToggleToolbarInnerLeft);

    function oxToggleToolbarLeft($window, $rootScope) {
      return {
        replace: true,
        restrict: 'EA',
        link: function($scope, $element, $attr, navController) {
          $element.addClass('toggle-toolbar-left');
          // $element.prop('ng-click', '$toggleLeft()');
          var current_icon = $attr.icon;
          var next_icon = $attr.next;

          $element.on('click', function(){
            $rootScope.$toggleLeft()
            angular.element($element).find('i').toggleClass('fa-'+current_icon)
            angular.element($element).find('i').toggleClass('fa-'+next_icon)
          });


          // function toggleNav(){
          //   $scope.app.settings.foldLeft = !$rootScope.app.settings.foldLeft;
          //   console.log($rootScope.app.settings);
          //   document.querySelector('.x-dashboard').classList.toggle('fold-left')
          //   // document.querySelector('x-dashboard').classList.toggle('has-ox-toolbar-left')
          // }


        }
      };
    }
    function oxToggleToolbarInnerLeft($window, $rootScope) {
      return {
        replace: true,
        restrict: 'EA',
        link: function($scope, $element, $attr, navController) {
          $element.addClass('toggle-toolbar-inner-left');
          // $element.prop('ng-click', '$toggleLeft()');
          var current_icon = $attr.icon;
          var next_icon = $attr.next;

          $element.on('click', function(){
            $rootScope.$toggleInnerLeft()
            angular.element($element).find('i').toggleClass('fa-'+current_icon)
            angular.element($element).find('i').toggleClass('fa-'+next_icon)
          });


          // function toggleNav(){
          //   $scope.app.settings.foldLeft = !$rootScope.app.settings.foldLeft;
          //   console.log($rootScope.app.settings);
          //   document.querySelector('.x-dashboard').classList.toggle('fold-left')
          //   // document.querySelector('x-dashboard').classList.toggle('has-ox-toolbar-left')
          // }


        }
      };
    }
}).call(this);