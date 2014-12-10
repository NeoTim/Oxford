;(function(){
  'use strict';

  angular.module('oxford', [
    'oxford.directives'
  ]);
}());

;(function(){
  'use strict';

  angular.module('oxford.directives.card', [])

  .directive('oxCard', function() {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      template: '<div class="card-material" draggable>' +
        '<div ng-transclude></div>' +
      '</div>',
      link: function(scope, element, attr) {
      }
    };
  });
}());
;(function(c3){
  'use strict';

  angular.module('oxford.directives.chart', [])

  .directive('oxChart', [function() {

    //color patterns for chart coloring
    var patterns = {
      light: ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896'],
      dark: ['#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7'],
      material: ['#e51c23', '#673ab7', '#5677fc', '#03a9f4', '#00bcd4', '#259b24', '#ffeb3b', '#ff9800']
    };

    //random number to attach to the chart id
    var chartIdCounter = Math.floor((Math.random()*1000)+1);

    return {
      restrict: 'EA',
      scope: {
        data: '=',
        options: '=',
        axis: '=',
        chart: '='
      },
      template: '<div draggable class="chart"></div>',
      replace: true,
      link: function(scope, element, attrs) {
        var chartId;
        var options = element.attr('options');

        //available option to show gridlines for chart
        if(attrs.grid === 'true') {
          scope.grid = {
            x: { show: true },
            y: { show: true}
          };
        }
        //option to view subchart
        if(attrs.subchart === 'true') {
          scope.subchart = {
            show: true
          };
        }
        //ability to change the color pattern
        if(attrs.pattern) {
          scope.color = {};
          scope.color.pattern = patterns[attrs.pattern];
        } else {
          scope.color = {};
          scope.color.pattern = patterns.dark ;
        }

        if(element.attr('id')) {
          chartId = element.attr('id');
        }
        else {
          chartId = 'c3-chart-' + chartIdCounter;
          element.attr('id', chartId);
          chartIdCounter += 1;
        }

        //generate c3 chart data
        var chartData = {
          bindto: '#' + element.attr('id'),
          data: scope[options],
          axis: scope.axis,
          grid: scope.grid,
          subchart: scope.subchart,
          zoom: scope.zoom,
          color: scope.color,
          x: scope.x,
          size: {
            height: 300,
            width: 950
          }
        };


        if(!options) {
          throw 'You must have an options attribute on your chart directive!';
        }

        //Reload the chart if the data changes
        scope.$watch('options', function(data, prevData) {
          if(chart) {
            chart.load(data);
            if(data.columns) {
              if(data.columns.length < prevData.columns.length) {
                chart.unload(['options' + prevData.columns.length]);
              }
            }
            if(data.rows) {
              if(data.rows.length < prevData.rows.length) {
                chart.unload(['options' + prevData.rows.length]);
              }
            }
          }
        });

        //run if there are changes to the chart
        var onChartChanged = function(chart) {
          if(chart) {
            scope.data.type = chart;
            chart.load(data);
          }
        };

        //watch the chart for any changes
        scope.$watch(function() {
          return attrs.chart;
        }, onChartChanged);

        //Generating the chart
        var chart = c3.generate(chartData);
        scope.$parent.chart = chart;
      }
    };
  }]);
}(c3));

;(function(){
  'use strict';

  angular.module('oxford.directives.drag', [])

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

  angular.module('oxford.directives', [
    'oxford.directives.chart',
    'oxford.directives.dashboard',
    'oxford.directives.toolbar',
    'oxford.directives.list',
    'oxford.directives.card',
    'oxford.directives.drag',
    'oxford.directives.ripple'
  ]);

}());

;(function() {
  'use strict';

  angular.module('oxford.directives.list', [

  ])
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
    .module('oxford.directives.ripple', [])
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
;(function() {
  'use strict';

  angular.module('oxford.directives.dashboard', [

  ])
  .directive('oxDashboard', function($rootScope) {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<div class="x-dashboard" ng-transclude>' +
      '</div>',
      controller: function($scope, $rootScope) {
        $rootScope.app = {
          settings: {
            foldLeft: true,
            foldRight: true,
            foldInnerLeft: true,
            foldInnerRight: true,
          }
        }
        $rootScope.$toggleLeft = function(){
          $rootScope.app.settings.foldLeft = !$rootScope.app.settings.foldLeft
          $scope.$digest()
        }
        $rootScope.$toggleInnerLeft = function(){
          $rootScope.app.settings.foldInnerLeft = !$rootScope.app.settings.foldInnerLeft
          $scope.$digest()
        }
        $rootScope.$toggleRight = function(){
          $rootScope.app.settings.foldRight = !$rootScope.app.settings.foldRight
          $scope.$digest()
        }
        $rootScope.$toggleInnerRight = function(){
          $rootScope.app.settings.foldInnerRight = !$rootScope.app.settings.foldInnerRight
          $scope.$digest()
        }
      },
      link: function(scope, element, attrs, ctrl, transclude) {

        // $rootScope.$watch('app.settings', function(){

        // })
      }
    };
  })
  .directive('oxDashboardHeader', function() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<header class="x-dashboard-header" ng-transclude>' +
      '</header>',
      controller: function($scope) {

      },
      link: function() {
      }
    };
  })
  .directive('oxDashboardContainer', function() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<section class="x-dashboard-container" ng-transclude>' +
      '</section>',
      controller: function($scope) {

      },
      link: function() {
      }
    };
  })

  .directive('oxDashboardView', function() {
    return {
      replace: true,
      require: '^oxDashboard',
      restrict: 'EA',
      template: '<div class="dashboard-view">' +
        '<div ui-view></div>' +
      '</div>',
      link: function($scope, $element, $attr, navController) {

      }
    };
  });
}());
;(function(){

  'use strict';

  angular.module('oxford.directives.dashboard')

  .directive('oxAsideContent', oxAsideContent);

  function oxAsideContent() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<header class="x-aside-content" data-ng-transclude>' +
              '</header>',
      controller: function($scope) {

      },
      link: function(scope, element, attrs) {

      }
    };
  }

}).call(this);
;(function(){

  'use strict';

  angular.module('oxford.directives.dashboard')

  .directive('oxAsideFooter', oxAsideFooter);

  function oxAsideFooter() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<header class="x-aside-footer" data-ng-transclude>' +
              '</header>',
      controller: function($scope) {

      },
      link: function(scope, element, attrs) {

      }
    };
  }

}).call(this);
;(function(){

  'use strict';

  angular.module('oxford.directives.dashboard')

  .directive('oxAsideHeader', oxAsideHeader);

  function oxAsideHeader() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<header class="x-aside-header" data-ng-transclude>' +
              '</header>',
      controller: function($scope) {

      },
      link: function(scope, element, attrs) {

      }
    };
  }

}).call(this);
;(function(){

  'use strict';

  angular.module('oxford.directives.dashboard')

  .directive('oxAsideNav', oxAsideNav);

  function oxAsideNav() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<nav class="x-aside-nav" data-ng-transclude>' +
              '</nav>',
      controller: function($scope) {

      },
      link: function(scope, element, attrs) {

      }
    };
  }

}).call(this);
;(function(){

  'use strict';

  angular.module('oxford.directives.dashboard')

  .directive('oxAside', oxAside);

  function oxAside() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<aside class="x-aside x-aside-{{side}}" data-ng-transclude>' +
              '</aside>',
      controller: function($scope) {

      },
      link: function(scope, element, attrs) {
        scope.side = attrs.side
      }
    };
  }

}).call(this);
;(function(){

  'use strict';

  angular.module('oxford.directives.dashboard')

  .directive('oxContainer', oxContainer);

  function oxContainer() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<section class="x-container" data-ng-transclude>' +
              '</section>',
      controller: function($scope) {

      },
      link: function(scope, element, attrs) {
        scope.side = attrs.side
      }
    };
  }

}).call(this);
;(function(){

  'use strict';

  angular.module('oxford.directives.dashboard')

  .directive('oxContent', oxContent);

  function oxContent() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<section class="x-content" data-ng-transclude>' +
              '</section>',
      controller: function($scope) {

      },
      link: function(scope, element, attrs) {
        scope.side = attrs.side
      }
    };
  }

}).call(this);
;(function(){

  'use strict';

  angular.module('oxford.directives.dashboard')

  .directive('oxDashboardAside', oxDashboardAside);

  function oxDashboardAside() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<aside class="x-dashboard-aside x-aside-{{side}}" data-ng-transclude>' +
              '</aside>',
      controller: function($scope) {

      },
      link: function(scope, element, attrs) {
        scope.side = attrs.side
      }
    };
  }

}).call(this);
;(function(){

  'use strict';

  angular.module('oxford.directives.dashboard')

  .directive('oxDashboardContent', oxDashboardContent);

  function oxDashboardContent() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<section class="x-dashboard-content" data-ng-transclude>' +
              '</section>',
      controller: function($scope) {

      },
      link: function(scope, element, attrs) {
        scope.side = attrs.side
      }
    };
  }

}).call(this);
;(function(){

  'use strict';

  angular.module('oxford.directives.dashboard')

  .directive('oxFooter', oxFooter);

  function oxFooter() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<footer class="x-footer" data-ng-transclude>' +
              '</footer>',
      controller: function($scope) {

      },
      link: function(scope, element, attrs) {
        scope.side = attrs.side
      }
    };
  }

}).call(this);
;(function(){

  'use strict';

  angular.module('oxford.directives.dashboard')

  .directive('oxHeader', oxHeader);

  function oxHeader() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<section class="x-header" data-ng-transclude>' +
              '</section>',
      controller: function($scope) {

      },
      link: function(scope, element, attrs) {
        scope.side = attrs.side
      }
    };
  }

}).call(this);
;(function() {
  'use strict';
  angular
    .module('oxford.directives.toolbar.brand', [])
    .directive('oxBrand', oxBrand);
  function oxBrand() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template: '<div class="ox-brand">' +
        // '<a class="toolbar-toggle-left"><i class="fa fa-bars"></i></a>' +
        '<div ng-transclude></div>' +
        // '<a class="toolbar-toggle-left"><i class="fa fa-bars"></i></a>' +
      '</div>',
      link: function($scope, $element, $attr, navController) {

      }
    };
  }
}());
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
;(function(){
  'use strict';
  angular
    .module('oxford.directives.toolbar.right.toggle', [])
    .directive('oxToggleToolbarRight', oxToggleToolbarRight)
    .directive('oxToggleToolbarInnerRight', oxToggleToolbarInnerRight);
    function oxToggleToolbarRight($window, $rootScope) {
      return {
        replace: true,
        restrict: 'EA',
        link: function($scope, $element, $attr, navController) {
          $element.addClass('toggle-toolbar-right');

          var current_icon = $attr.icon;
          var next_icon = $attr.next;

          $element.on('click', function(){
            $rootScope.$toggleRight()
            console.log($rootScope.app);
            angular.element($element).find('i').toggleClass('fa-'+current_icon)
            angular.element($element).find('i').toggleClass('fa-'+next_icon)
          });

        }
      };
    }
    function oxToggleToolbarInnerRight($window, $rootScope) {
      return {
        replace: true,
        restrict: 'EA',
        link: function($scope, $element, $attr, navController) {
          $element.addClass('toggle-toolbar-inner-right');

          var current_icon = $attr.icon;
          var next_icon = $attr.next;

          $element.on('click', function(){
            $rootScope.$toggleInnerRight()
            console.log($rootScope.app);
            angular.element($element).find('i').toggleClass('fa-'+current_icon)
            angular.element($element).find('i').toggleClass('fa-'+next_icon)
          });

        }
      };
    }
}).call(this);
;(function() {
  'use strict';
  angular
    .module('oxford.directives.toolbar.toolbox',[])
    .directive('oxToolBox', oxToolBox);
    function oxToolBox() {
      return {
        transclude: true,
        replace: true,
        restrict: 'EA',
        scope: {
          side: '=side'
        },
        template: '<div class="ox-tool-box">' +
        '</div>',
        link: function($scope, $element, $attr, navController) {
          $element.addClass('ox-tool-box')
        }
      };
    }
}());
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
;(function() {
  'use strict';

  angular
    .module('oxford.directives.toolbar.bottom', [])
    .directive('oxToolbarBottom', oxToolbarBottom);
    function oxToolbarBottom() {
      return {
        transclude: true,
        replace: true,
        restrict: 'EA',
        scope: true,
        template: '<div class="ox-toolbar ox-toolbar-bottom bg-{{color}}" ng-class="{\'ox-toolbar-has-title\': title }">' +
          '<ox-toolbar-header ng-if="title">'+
            '<ox-brand>{{title}}</ox-brand>'+
          '</ox-toolbar-header>'+
          '<ox-toolbox ng-if="title" ng-transclude></ox-toolbox>' +
          '<ox-toolbox ng-if="!title" ng-transclude></ox-toolbox>' +
        '</div>',
        link: function($scope, $element, $attr, navController) {
          if( $attr.fixed === "true" ){
            $element.addClass('fixed-bottom')
          }
          $scope.color = $attr.color || 'default';

          $scope.title = $attr.title;
        }
      };
    }
}());
;(function() {
  'use strict';
  angular
    .module('oxford.directives.toolbar.header',[])
    .directive('oxToolbarHeader', oxToolbarHeader);
    function oxToolbarHeader() {
      return {
        transclude: true,
        replace: true,
        restrict: 'EA',
        scope: true,
        template: '<div class="ox-toolbar-header">' +
          '<div ng-transclude></div>' +
        '</div>',
        link: function($scope, $element, $attr, navController) {

        }
      };
    }
}());
;(function(){
  'use strict';
  angular
    .module('oxford.directives.toolbar.left', [])
    .directive('oxToolbarLeft', oxToolbarLeft);
    function oxToolbarLeft($window) {
      return {
        transclude: true,
        replace: true,
        scope: true,
        restrict: 'E',
        template: '<div class="ox-toolbar ox-toolbar-left bg-{{color}}">' +
          '<div ng-transclude></div>' +
        '</div>',
        link: function($scope, $element, $attr, navController) {
          document.querySelector('body').classList.add('has-ox-toolbar-left')
          $scope.color = $attr.color || 'default'
        }
      };
    }
}).call(this);
;(function(){
  'use strict';
  angular
    .module('oxford.directives.toolbar.right', [])
    .directive('oxToolbarRight', oxToolbarRight);
    function oxToolbarRight($window) {
      return {
        transclude: true,
        replace: true,
        scope: true,
        restrict: 'E',
        template: '<div class="ox-toolbar ox-toolbar-right bg-{{color}}">' +
          '<div ng-transclude></div>' +
        '</div>',
        link: function($scope, $element, $attr, navController) {
          document.querySelector('body').classList.add('has-ox-toolbar-right')
          $scope.color = $attr.color || 'default'
        }
      };
    }
}).call(this);
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
;(function() {
  'use strict';

  angular.module('oxford.directives.toolbar', [
    'oxford.directives.toolbar.header',
    'oxford.directives.toolbar.brand',
    'oxford.directives.toolbar.toolbox',
    'oxford.directives.toolbar.tools',
    'oxford.directives.toolbar.tool',
    'oxford.directives.toolbar.top',
    'oxford.directives.toolbar.bottom',
    'oxford.directives.toolbar.left',
    'oxford.directives.toolbar.left.toggle',
    'oxford.directives.toolbar.right',
    'oxford.directives.toolbar.right.toggle',
  ])
}());
;(function() {
  'use strict';
  angular
    .module('oxford.directives.toolbar.tools',[])
    .directive('oxTools', oxTools);
    function oxTools() {
      return {
        transclude: true,
        replace: true,
        restrict: 'EA',
        scope: {
          side: '=side'
        },
        template: '<div class="tools tools-{{side}}">' +
          '<div ng-transclude></div>' +
        '</div>',
        link: function($scope, $element, $attr, navController) {
          $scope.side = $attr.side;
        }
      };
    }
}());