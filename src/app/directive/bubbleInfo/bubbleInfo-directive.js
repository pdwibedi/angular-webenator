angular.module('angularTest')
  .directive('bubbleinfo', function ($compile) {
    var html = $('<div><span class="bubbleInfo"><div class="info"><div ng-transclude></div></div></span></div>'),
  		link = $('<a href="javascript:void(0);">More</a>');
  	html.find(".bubbleInfo").prepend(link);
    return {
        restrict: 'EA',
        replace: true,
        link: function(scope, element, attrs) {
        	$(element).find("a").click(function() {
            var isVisible = $(this).siblings("div").css("display");
            if(isVisible == "none") {
              $(this).siblings("div").slideDown(120, function() { $(this).css("display", "block"); });
            } else {
              $(this).siblings("div").slideUp(120, function() { $(this).css("display", "none"); })
            }
          });
          $("body").click(function(ev) {
            if(ev.target.nodeType === 1 && $(ev.target.parentElement).hasClass("bubbleInfo") == false) {
              $("body").find(".bubbleInfo > div").fadeOut().css("display","none");
            }
          });
        },
        template: function() {
        	return html.html();
        },
        transclude: true
    }
  })
;
