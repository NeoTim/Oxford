;(function(){

  'use strict';

  angular
    .module('ui-flex')
    .directive('flexAside', flexAside)
    .directive('flexAsideLeft', flexAsideLeft)
    .directive('flexAsideRight', flexAsideRight)
    .run( runConfig );

  function runConfig($rootScope){
    $rootScope.$flex = $rootScope.$flex || {};

    $rootScope.$flex = $rootScope.$flex || {};

    $rootScope.$flex.foldLeft = false;
    $rootScope.$flex.closeLeft = false;
    $rootScope.$flex.foldRight = false;
    $rootScope.$flex.closeRight = false;


    $rootScope.$toggleLeft = function(){
      $rootScope.$flex.closeLeft = !$rootScope.$flex.closeLeft;
    }
    $rootScope.$toggleLeftFold = function(){
      $rootScope.$flex.foldLeft = !$rootScope.$flex.foldLeft;
    }
    $rootScope.$closeLeft = function(){
      $rootScope.$flex.closeLeft = true;
    }
    $rootScope.$openLeft = function(){
      $rootScope.$flex.closeLeft = false;
    }
    $rootScope.$toggleRight = function(){
      $rootScope.$flex.closeRight = !$rootScope.$flex.closeRight;
    }
    $rootScope.$toggleRightFold = function(){
      $rootScope.$flex.foldRight = !$rootScope.$flex.foldRight;
    }
    $rootScope.$closeRight = function(){
      $rootScope.$flex.closeRight = true;
    }
    $rootScope.$openRight = function(){
      $rootScope.$flex.closeRight = false;
    }
  }

  function flexAside() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<aside class="{{class}} {{bg}} " data-ng-transclude>' +
              '</aside>',

      link: function(scope, element, attrs) {
        scope.class="flex-aside"
        if(attrs.side) scope.class="flex-aside-"+attrs.side
        if(attrs.bg) scope.bg = 'bg-'+attrs.bg

      }
    };
  }
  function flexAsideLeft() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<aside class="flex-aside-left {{bg}}"' +
                'data-ng-class="{'  +
                  '\'close-aside\': $flex.closeLeft,'+
                  '\'fold-aside\': $flex.foldLeft'+
                '}"' +
                'data-ng-transclude>' +
              '</aside>',

      link: function(scope, element, attrs) {
        if(attrs.bg) scope.bg = 'bg-'+attrs.bg

      }
    };
  }
  function flexAsideRight() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<aside class="flex-aside-right {{bg}}"' +
                'data-ng-class="{'  +
                  '\'close-aside\': $flex.closeRight,'+
                  '\'fold-aside\': $flex.foldRight'+
                '}"' +
                'data-ng-transclude>' +
              '</aside>',

      link: function(scope, element, attrs) {
        if(attrs.bg) scope.bg = 'bg-'+attrs.bg

      }
    };
  }

}).call(this);