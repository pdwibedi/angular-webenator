angular.module('angularTest')
  .directive('bubbleinfo', function ($compile) {
  	var html = $('<div><span class="bubbleInfo"><div class="info"></div></span></div>'),
  		link = $('<a href="#">More</a>');
  	html.find(".bubbleInfo").prepend(link);
    return {
        restrict: 'EA',
        replace: true,
        link: function(scope, element, attrs) {
        	$(element).find("a").click(function() {
            var isVisible = $(this).siblings("div").css("display");
            if(isVisible == "none") {
              $(this).siblings("div").css("display","block");
            } else {
              $(this).siblings("div").css("display","none");
            }
          });
        },
        controller: function($scope, $element) {
        	toggleSection = function(el) {
        		debugger;
        	};
        },
        template: function() {
        	return html.html();
        }
    }
  })
;
