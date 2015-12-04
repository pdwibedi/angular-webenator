angular.module('angularTest')
  .directive('accordionMenu', function($compile, DIRECTIVE_URI){
  	
  	var linker = function(scope, element, attrs) {
      var targetElement = $(element).find("span");
    	$(element).on("click", function() {
        if(targetElement.hasClass("fa-chevron-right")) {
          targetElement.removeClass("fa-chevron-right");
          targetElement.addClass("fa-chevron-down");
          targetElement.parent().next().slideDown("fast");
        } else {
          targetElement.addClass("fa-chevron-right");
          targetElement.removeClass("fa-chevron-down");
          targetElement.parent().next().slideUp("fast");
        }
        
      });
  	};
    return {
      restrict : 'A',
      scope: true,  
      link : linker
    }
  })
;