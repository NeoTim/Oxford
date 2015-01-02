;(function(){
  'use strict'
  angular
    .module('ui-flex')
    .constant('flexProgressConfig', {
      animate: true,
      max: 100
    })
    .controller('FlexProgressController', FlexProgressController)
    .directive('flexProgress', flexProgressDirective)
    .directive('flexProgressbar', flexProgressbar)
    .directive('flexBar', flexBar)
    .run(function (){
      console.log('running');
    })
    .run(flexBarTemplate)
    .run(flexProgressTemplate)
    .run(flexProgressbarTemplate)

  FlexProgressController.$inject = ['$scope', '$attrs', 'flexProgressConfig'];
  flexBarTemplate.$inject = ['$templateCache'];
  flexProgressTemplate.$inject = ['$templateCache'];
  flexProgressbarTemplate.$inject = ['$templateCache'];

  function FlexProgressController($scope, $attrs, flexProgressConfig) {

    var self = this,
      animate = angular.isDefined($attrs.animate) ? $scope.$parent.$eval($attrs.animate) : flexProgressConfig.animate;

    this.bars = [];
    $scope.max = angular.isDefined($attrs.max) ? $scope.$parent.$eval($attrs.max) : flexProgressConfig.max;

    this.addBar = function(bar, element) {
      if ( !animate ) {
        element.css({'transition': 'none'});
      }

      this.bars.push(bar);

      bar.$watch('value', function( value ) {
        bar.percent = +(100 * value / $scope.max).toFixed(2);
      });

      bar.$on('$destroy', function() {
        element = null;
        self.removeBar(bar);
      });
    };

    this.removeBar = function(bar) {
      this.bars.splice(this.bars.indexOf(bar), 1);
    };
  }

  /**
   * [flexProgress description]
   * @return {[type]} [description]
   */
  function flexProgressDirective() {
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      controller: 'FlexProgressController',
      require: 'progress',
      scope: {},
      templateUrl: 'template/flexProgressbar/flexProgress.html'
    };
  }

  /**
   * [flexBar description]
   * @return {[type]} [description]
   */
  function flexBar() {
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      require: '^flexProgress',
      scope: {
        value: '=',
        type: '@'
      },
      templateUrl: 'template/flexProgressbar/flexBar.html',
      link: function(scope, element, attrs, progressCtrl) {
        progressCtrl.addBar(scope, element);
      }
    };
  }

  /**
   * [flexProgressbar description]
   * @return {[type]} [description]
   */
  function flexProgressbar() {
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      controller: 'FlexProgressController',
      scope: {
        value: '=',
        type: '@'
      },
      templateUrl: 'template/flexProgressbar/flexProgressbar.html',
      link: function(scope, element, attrs, progressCtrl) {
        console.log('directive');
        progressCtrl.addBar(scope, angular.element(element.children()[0]));
      }
    };
  }

  function flexBarTemplate($templateCache) {
    $templateCache.put("template/flexProgressbar/flexBar.html",
      "<div class=\"flex-progress-bar\" ng-class=\"type && 'flex-progress-bar-' + type\" role=\"progressbar\" aria-valuenow=\"{{value}}\" aria-valuemin=\"0\" aria-valuemax=\"{{max}}\" ng-style=\"{width: percent + '%'}\" aria-valuetext=\"{{percent | number:0}}%\" ng-transclude></div>");
  }

  function flexProgressTemplate($templateCache) {
    $templateCache.put("template/flexProgressbar/flexProgress.html",
      "<div class=\"flex-progress\" ng-transclude></div>");
  }

  function flexProgressbarTemplate($templateCache) {
    $templateCache.put("template/flexProgressbar/flexProgressbar.html",
      "<div class=\"flex-progress\">\n" +
      "  <div class=\"flex-progress-bar\" ng-class=\"type && 'flex-progress-bar-' + type\" role=\"progressbar\" aria-valuenow=\"{{value}}\" aria-valuemin=\"0\" aria-valuemax=\"{{max}}\" ng-style=\"{width: percent + '%'}\" aria-valuetext=\"{{percent | number:0}}%\" ng-transclude></div>\n" +
      "</div>");
  }
})()