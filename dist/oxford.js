;(function(){
  'use strict';

  angular.module('ui-flex', [
    'ui-flex.progressbar'
  ])
  .run( rootConfig )

  function rootConfig($rootScope, $state){
    $rootScope.$isActive = function(val){
      if(val === $state.current.name){
        return 'active'
      }
    }
  }

}());

;(function(){
  'use strict';

  angular.module('ui-flex', [])

  .directive('draggable', function() {
    var gridWidth = 200;
    var gridHeight = 100;
    var startX, startY;
    var bounds = document.getElementsByClassName('dashboard-content');
    return function(scope, element, attr) {
      if(attr.draggable !== 'false') {
        Draggable.create(element, {
          bounds: bounds,
          type: 'x,y',
          edgeResistance: 0.90,
          throwProps: true,
          onPress: function() {
            startX = this.x;
            startY = this.y;
          },
          snap: {
            x: function(endValue) {
              return Math.round(endValue / gridWidth) * gridWidth;
            },
            y: function(endValue) {
              return Math.round(endValue / gridHeight) * gridHeight;
            }
          },
          onDrag: function(e) {
            if(this.hitTest(element)) {
              console.log(this, ' this');
            }
          },
          onDragEnd: function() {
            if(this.hitTest(element, 20)) {
              console.log('hit');
              TweenLite.to(element, 0.5, {x: startX, y: startY, ease: Power2.easeInOut});
            }
          }
        });
      }
    };
  });
}());
;(function(){
  'use strict';

  angular.module('ui-flex');

}());

;(function() {
  'use strict';

  angular.module('ui-flex')
  .directive('oxList', function() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template: '<ul class="ox-list">' +
        '<div ng-transclude></div>' +
      '</ul>',
      link: function($scope, $element, $attr, navController) {
      }
    };
  })
  .directive('oxItem', function() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template: '<li class="ox-item">' +
        '<div ng-transclude></div>' +
      '</li>',
      link: function($scope, $element, $attr, navController) {

      }
    };
  });
}());
;(function(){
'use strict';
  angular
    .module('ui-flex')
    .directive('oxRipple', oxRipple);

    function oxRipple(){
      return {
        // transclude: true,
        // replace: true,
        restrict: 'A',
        scope: true,
        link: function($scope, $element, $attr, navController) {
          var withRipple = ".withripple";


          function matchesSelector(dom_element, selector) {

              var matches = dom_element.matches || dom_element.matchesSelector || dom_element.webkitMatchesSelector || dom_element.mozMatchesSelector || dom_element.msMatchesSelector || dom_element.oMatchesSelector;
              return matches.call(dom_element, selector);
          }

          // animations time
          var rippleOutTime = 100,
              rippleStartTime = 500;

          // Helper to bind events on dynamically created elements
          var bind = function(event, selector, callback) {
              document.addEventListener(event, function(e) {
                  var target = (typeof e.detail !== "number") ? e.detail : e.target;

                  if (matchesSelector(target, selector)) {
                      callback(e, target);
                  }
              });
          };

          var rippleStart = function(e, target) {

              // Init variables
              var $rippleWrapper  = (matchesSelector(target, ".ripple-wrapper")) ? target : target.parentNode,
                  $el             = $rippleWrapper.parentNode,
                  $ripple         = document.createElement("div"),
                  elPos           = $el.getBoundingClientRect(),
                  mousePos        = {x: e.clientX - elPos.left, y: e.clientY - elPos.top},
                  scale           = "transform:scale(" + Math.round($rippleWrapper.offsetWidth / 5) + ")",
                  rippleEnd       = new CustomEvent("rippleEnd", {detail: $ripple}),
                  refreshElementStyle;

              // Set ripple class
              $ripple.className = "ripple";

              // Move ripple to the mouse position
              $ripple.setAttribute("style", "left:" + mousePos.x + "px; top:" + mousePos.y + "px;");

              // Insert new ripple into ripple wrapper
              $rippleWrapper.appendChild($ripple);

              // Make sure the ripple has the class applied (ugly hack but it works)
              refreshElementStyle = window.getComputedStyle($ripple).opacity;

              // Let other funtions know that this element is animating
              $ripple.dataset.animating = 1;

              // Set scale value to ripple and animate it
              $ripple.className = "ripple ripple-on";
              $ripple.setAttribute("style", $ripple.getAttribute("style") + ["-ms-" + scale,"-moz-" + scale,"-webkit-" + scale,scale].join(";"));

              // Dirty fix for Firefox... seems like absolute elements inside <A> tags do not trigger the "click" event
              if (/firefox|crios|(^(?!.*chrome).*safari)|ip(ad|hone|od)/i.test(navigator.userAgent)) {
                  $el.click();
              }

              // This function is called when the animation is finished
              setTimeout(function() {

                  // Let know to other functions that this element has finished the animation
                  $ripple.dataset.animating = 0;
                  document.dispatchEvent(rippleEnd);

              }, rippleStartTime);
          };

          var rippleOut = function($ripple) {
              // Clear previous animation
              $ripple.className = "ripple ripple-on ripple-out";
              // Let ripple fade out (with CSS)
              setTimeout(function() {
                  $('.ripple').remove()

                  // $ripple.remove()
              }, rippleOutTime);
          };

          // Helper, need to know if mouse is up or down
          var mouseDown = false;
          document.body.onmousedown = function() {

              mouseDown = true;
          };
          document.body.onmouseup = function() {

              mouseDown = false;
          };

          // Append ripple wrapper if not exists already
          var rippleInit = function(e, target) {

              if (target.getElementsByClassName("ripple-wrapper").length === 0) {
                  target.className += " withripple";
                  var $rippleWrapper = document.createElement("div");
                  $rippleWrapper.className = "ripple-wrapper";
                  target.appendChild($rippleWrapper);
                  rippleStart(e, $rippleWrapper);
              }
          };

          // Events handler
          // init RippleJS and start ripple effect on mousedown
          bind("mousedown", withRipple, rippleInit);

          // start ripple effect on mousedown
          bind("mousedown", ".ripple-wrapper, .ripple-wrapper .ripple", rippleStart);
          // if animation ends and user is not holding mouse then destroy the ripple
          bind("rippleEnd", ".ripple-wrapper, .ripple-wrapper .ripple", function(e, $ripple) {
              if (!mouseDown) {
                  rippleOut($ripple);
              }
          });
          // Destroy ripple when mouse is not holded anymore if the ripple still exists
          bind("mouseup", ".ripple-wrapper, .ripple-wrapper .ripple", function(e, $ripple) {
              if ($ripple.dataset.animating != 1) {
                  rippleOut($ripple);
              }
          });


        }

      };
    }

}).call(this);
;(function(){

  'use strict';

  angular.module('ui-flex')
  .directive('flexActionGroup', flexActionGroup)
  .animation('.display-group', function(){
    return {
      addClass:addClass,
      removeClass:removeClass
    }
    function addClass (element, className) {
      var $btn = jQuery(element).find('.action-btn > button');
      var $actions = jQuery(element).find('.actions > button');
      var $icon = $btn.find('i');
      // var $iconBefore = $btn.find('i:before');

      TweenMax.to($icon, 0.05, {rotation:'0',  ease:Bounce.easeOut})
      TweenMax.to($icon, 0.05, {className:'gcon-pencil', delay:0.18,  ease:Bounce.easeOut})
      // TweenMax.staggerTo($actions, 0.2, {minHeight: '50px', minWidth:'50px',padding: '5px 12px',opacity: 1}, 0.05)
    }
    function removeClass (element, className) {
      var $btn = jQuery(element).find('.action-btn > button');
      var $actions = jQuery(element).find('.actions > button');
      var $icon = $btn.find('i');

      TweenMax.to($icon, 0.08, {rotation:'-180', ease:Bounce.easeOut})
      TweenMax.to($icon, 0.08, {className:'gcon-plus', ease:Bounce.easeOut}, 0.18)
      // TweenMax.staggerTo($actions, 0.2, {minHeight: '0', minWidth:'0',padding: '0',opacity: 0}, 0.05)
    }
  });

  function flexActionGroup($animate) {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: {
        switch:'&onSwitch',
        next:'@',
        icon:'@',
        round:'@',
        raised:'@',
        rotate:'@'
      },
      template:  '<div class="action-group" '+
                    'ng-mouseenter="showActions()"'+
                    'ng-mouseleave="showActions()"'+
                    '>'+
                    '<div class="actions" data-ng-transclude>' +
                    '</div>' +
                    '<div class="action-btn">'+
                      '<button id="main-btn" class="flex-btn text-white {{bg}}" '+
                        'data-ng-class="elementClasses">'+
                      '<i data-ng-if="icon" next="{{next}}" class="{{icon}}"></i>' +
                      '</button>'+
                    '</div>'+
                 '</div>',
      controller: function($scope, $timeout){
        $scope.displayActions = false;
        $scope.showActions = function () {
          $scope.displayActions = !$scope.displayActions;
        };
      },
      link: function(scope, element, attrs) {
        var activeClass = 'display-group';

        scope.$watch('displayActions', function (bool) {
          bool ?
            ( $animate.addClass(element, activeClass) ) :
            ( $animate.removeClass(element, activeClass) )
        })

        if(attrs.bg) scope.bg = 'bg-' + attrs.bg;
        // element.addClass('btn-rotate-'+scope.rotate);
        // scope.rotateIcon = 'btn-rotate-' + scope.rotate;
        // scope.showNext = false;
        scope.elementClasses = {
          'btn-round':true,
          'btn-raised':true,
          'has-next':scope.next
        };
      }
    };
  }

}).call(this);
;(function(){

  'use strict';

  angular.module('ui-flex')

  .directive('flexAnimate', flexAnimate)
  .animation('.round-square', function(){
    return {
      addClass: function (element, className){
        console.log('addClass');
        TweenMax.to(element, 1, {width:'100px', height:'100px', borderRadius:'5px', ease:'Cubic.easeOut'})
        TweenMax.to(element, 1, {width:'200px', height:'200px', borderRadius:'0px', ease:'Cubic.easeOut', delay:1})

      },
      removeClass:function(element, className){
        TweenMax.to(element, 1, {width:'50px', height:'50px', borderRadius:'100%', ease:'Cubic.easeOut'})
      }
    }
  })
  function flexAnimate($animate, $timeout, $interval) {
    return function (scope, element, attrs) {

      $interval(function(){

        if(!scope[attrs.flexAnimate]){

          scope[attrs.flexAnimate] = 'round-square'

        } else if (scope[attrs.flexAnimate] === 'round-square'){

          scope[attrs.flexAnimate] = 'square'

        } else if(scope[attrs.flexAnimate] === 'square'){
          scope[attrs.flexAnimate] = false
        } else {
          scope[attrs.flexAnimate] = false
        }

        console.log(scope[attrs.flexAnimate]);
      }, 2000);
      // $timeout(function(){
      //   scope[attrs.flexAnimate] = 'square';
      // }, 2000)

      scope.$watch(attrs.flexAnimate, function (value){
        if (value === 'round-square'){

          $animate.addClass(element, value)

        } else {

          $animate.removeClass(element, 'round-square')
        }

      })
    }
  }

}).call(this);
;(function(tmax){

  'use strict';

  angular.module('ui-flex')

  .directive('flexBtn', flexBtn)
  .directive('nextIcon', nextIcon)
  .controller('nextIconController', nextIconController)
  .animation('.next-icon-active', function(){
    return {
      addClass:addClass,
      removeClass:removeClass
    }

    function addClass(element, className){
      tmax.to(element, 0.1, {transform:'rotate(90deg)'});

    }
    function removeClass(element, className){
      tmax.to(element, 0.1, {transform:'rotate(0)', content: "\e6fb"});
    }
  });

  function nextIconController(){
    this.isRotated = false;
    this.startRotation = function(){
      this.isRotated = !this.isRotated
      console.log('isRotated = ', this.isRotated);
    }
  }
  function nextIcon($animate,$timeout){
    return function (scope, element, attrs){
      // element.addClass('has-next')
      scope.$watch(attrs.nextIcon, function (bool){
        if(bool){
          $animate.addClass(element, 'next-icon-active');
          $timeout(function(){
            element.addClass(scope.next)
          }, 100)
        } else {
          $animate.removeClass(element, 'next-icon-active');
          $timeout(function(){
            element.removeClass(scope.next)
          }, 100)
        }
      });

    }
  }

  function flexBtn($animate) {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: {
        switch:'&onSwitch',
        next:'@',
        icon:'@',
        round:'@',
        raised:'@',
        rotate:'@'
      },
      template:'<button class="flex-btn {{bg}}"' +
                'data-ng-mouseenter="vm.startRotation()"' +
                'data-ng-mouseleave="vm.startRotation()"' +
                'data-ng-class="elementClasses">'+
              '<i data-ng-if="icon" next="{{next}}" next-icon="vm.isRotated" class="{{icon}}" ></i>' +
              '</button>',
      controller: 'nextIconController as vm',
      link: function(scope, element, attrs, ctrl, transclude) {

        if(attrs.bg) scope.bg = 'bg-' + attrs.bg;
        var rotate = 'btn-rotate-' + scope.rotate;
        scope.rotateIcon = 'btn-rotate-' + scope.rotate;
        scope.showNext = false;
        scope.elementClasses = {
          'btn-round':scope.round,
          'btn-raised':scope.raised,
          'has-next':scope.next,
          'active':scope.startRotate
        };
        if(!scope.icon){
          transclude(function (clone){
            element.append(clone)
          })
        }
      }
    };
  }

}).call(this, TweenMax);
;(function(){

  'use strict';

  angular.module('ui-flex')

  .directive('flexTool', flexTool);

  function flexTool() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<button class="tool {{bg}}">' +
              '<i data-ng-if="icon" class="{{icon}}"></i>' +
              '</button>',

      link: function(scope, element, attrs) {
        if(attrs.bg) scope.bg = 'bg-' + attrs.bg;

        scope.icon = attrs.icon;

        if(scope.icon.split('-')[0] === 'fa'){
          scope.icon = 'fa ' + scope.icon
        }
      }
    };
  }

}).call(this);
;(function(){

  'use strict';

  angular.module('ui-flex')

  .directive('toolbarBrand', toolbarBrand);

  function toolbarBrand() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<div class="toolbar-brand" data-ng-transclude>' +
              '</div>',

      link: function(scope, element, attrs) {

      }
    };
  }

}).call(this);
;(function(){

  'use strict';

  angular.module('ui-flex')

  .directive('toolbarTools', toolbarTools);

  function toolbarTools() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<div class="toolbar-tools {{side}}" data-ng-transclude>' +
              '</div>',

      link: function(scope, element, attrs) {
        var side = attrs.side || 'right';
        scope.side = 'side-' + side;
      }
    };
  }

}).call(this);
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
;(function(){

  'use strict';

  angular.module('ui-flex')

  .directive('flexBody', flexBody);

  function flexBody() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<section class="flex-body {{bg}} " data-ng-transclude>' +
              '</section>',

      link: function(scope, element, attrs) {
        if(attrs.bg) scope.bg = 'bg-'+attrs.bg


      }
    };
  }

}).call(this);
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
;(function(){

  'use strict';

  angular.module('ui-flex')

  .directive('flexColumn', flexColumn);

  function flexColumn() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<div class="flex-column {{bg}} " data-ng-transclude>' +
              '</div>',

      link: function(scope, element, attrs) {
        if(attrs.bg) scope.bg = 'bg-'+attrs.bg

      }
    };
  }

}).call(this);
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
;(function(){

  'use strict';

  angular.module('ui-flex')

  .directive('flexFooter', flexFooter);

  function flexFooter() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<footer class="flex-footer {{bg}} " data-ng-transclude>' +
              '</footer>',

      link: function(scope, element, attrs) {
        if(attrs.bg) scope.bg = 'bg-'+attrs.bg


      }
    };
  }

}).call(this);
;(function(){

  'use strict';

  angular.module('ui-flex')

  .directive('flexHeader', flexHeader);

  function flexHeader() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: {
        sub: '='
      },
      template:'<header class="flex-header {{size}} {{bg}} " data-ng-transclude>' +
              '</header>',

      link: function(scope, element, attrs) {

        var size = 'header-'
        if(attrs.bg) scope.bg = 'bg-'+attrs.bg
        if(attrs.size) scope.size = size + attrs.size;

        scope.ngClasses = {
          'sub-header':scope.sub
        }

      }
    };
  }

}).call(this);
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
;(function(){

  'use strict';

  angular.module('ui-flex')

  .directive('flexRow', flexRow);

  function flexRow() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: {
        gutters: '=gutters'
      },
      template:'<div class="flex-row {{pads}} {{bg}}" ng-class="{\'gutters\':gutters}" data-ng-transclude>' +
              '</div>',

      link: function(scope, element, attrs, controller, transclude) {
        if(attrs.bg) scope.bg = 'bg-'+attrs.bg
        if(attrs.pads) scope.pads = 'pads';

      }
    };
  }

}).call(this);
;(function(){

  'use strict';

  angular
    .module('ui-flex')

    .directive('flexFull', flexFull)
    .directive('flexHalfs', flexHalfs)
    .directive('flexThirds', flexThirds)
    .directive('flexFourths', flexFourths);

  function flexFull() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<div class="flex-full {{gutters}}" data-ng-transclude>' +
              '</div>',

      link: function(scope, element, attrs) {
        if(attrs.gutters) scope.gutters = 'gutters-'+attrs.gutters;
        if(attrs.gutters === 'none') scope.gutters = 'no-gutters';

      }
    };
  }
  function flexHalfs() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<div class="flex-halfs {{gutters}}" data-ng-transclude>' +
              '</div>',

      link: function(scope, element, attrs) {
        if(attrs.gutters) scope.gutters = 'gutters-'+attrs.gutters;
        if(attrs.gutters === 'none') scope.gutters = 'no-gutters';

      }
    };
  }
  function flexThirds() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<div class="flex-thirds {{gutters}}" data-ng-transclude>' +
              '</div>',

      link: function(scope, element, attrs) {
        if(attrs.gutters) scope.gutters = 'gutters-'+attrs.gutters;
        if(attrs.gutters === 'none') scope.gutters = 'no-gutters';

      }
    };
  }
  function flexFourths() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<div class="flex-fourths {{gutters}}" data-ng-transclude>' +
              '</div>',

      link: function(scope, element, attrs) {
        if(attrs.gutters) scope.gutters = 'gutters-'+attrs.gutters;
        if(attrs.gutters === 'none') scope.gutters = 'no-gutters';

      }
    };
  }

}).call(this);
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
;(function(){

  'use strict';

  angular.module('ui-flex')

  .directive('flexUseColumn', flexUseColumn)
  .directive('flexUseRow', flexUseRow)
  .directive('flexUse', flexUse);

  function flexUseColumn() {
    return {
      // transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<section class="flex-column {{bg}}" data-ng-include="file">' +
              '</section>',

      link: function(scope, element, attrs) {
        if(attrs.bg) scope.bg = 'bg-'+attrs.bg
        if(attrs.file) scope.file = attrs.file;
      }
    };
  }
  function flexUseRow() {
    return {
      // transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<section class="flex-row {{bg}}" data-ng-include="file">' +
              '</section>',

      link: function(scope, element, attrs) {
        if(attrs.bg) scope.bg = 'bg-'+attrs.bg
        if(attrs.file) scope.file = attrs.file;

      }
    };
  }
  function flexUse() {
    return {
      // transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template: '<div style="{{flex}}" class="{{type}} {{bg}}" data-ng-include="file"></div>',

      link: function(scope, element, attrs) {
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

        if(attrs.bg) scope.bg = 'bg-'+attrs.bg
        if(attrs.file) scope.file = attrs.file;
        if(attrs.type) scope.type = 'flex-' + attrs.type

      }
    };
  }

}).call(this);
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
;(function(){

  'use strict';

  angular.module('ui-flex')

  .directive('uiFlex', uiFlex);

  function uiFlex() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<main class="ui-flex {{bg}} " data-ng-transclude>' +
              '</main>',

      link: function(scope, element, attrs) {
        if(attrs.bg) scope.bg = 'bg-'+attrs.bg


      }
    };
  }

}).call(this);