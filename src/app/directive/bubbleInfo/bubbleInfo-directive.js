angular.module('angularTest')
  .directive('bubbleinfo', function ($compile) {
    var html = $('<div><span class="bubbleInfo"><div class="info"><div class="wrapper"><ul class="text-color"><li><a href="javascript:void(0);" class="light-text fa fa-font" data-class="light-text"></a></li><li><a href="javascript:void(0);" class="dark-text fa fa-font" data-class="dark-text"></a></li></ul><div ng-transclude></div></div></div></span></div>'),
  		  link = $('<a href="javascript:void(0);">More</a>');
  	html.find(".bubbleInfo").prepend(link);
    return {
        restrict: 'EA',
        replace: true,
        link: function(scope, element, attrs) {

          // Font Color Functionality
          $(element).find(".text-color a").click(function() {
            if($(this).attr("data-class") === "text-overlay") {
              $(element).parent().append("<div class='containerScreen'></div>");  
            } else {
              $(element).parent().remove(".containerScreen");
            }
            $(element).prev().removeClass("light-text dark-text text-overlay").addClass($(this).attr("data-class"));
          });

          // Slider Functionality
        	$(element).find("a").click(function() {
            var isVisible = $(this).siblings("div").css("display");
            if(isVisible == "none") {
              $(this).siblings("div").slideDown();
            } else {
              $(this).siblings("div").slideUp()
            }
          });
          $("body").click(function(ev) {
            if(ev.target.nodeType === 1 && $(ev.target).parents(".bubbleInfo").length == 0) {
              $("body").find(".bubbleInfo > div").slideUp();
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
