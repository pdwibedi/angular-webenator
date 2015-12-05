angular.module('angularTest')
  .directive('overlayComponent', function ($compile) {
  	var linker = function(scope, element, attrs) {
  		
  		// Position the overlay component to center by default
  		scope.position();
  	};
  	var controller = function($scope, $element) {
		
		

  		$scope.position = function() {
  			var left = Math.ceil((window.innerWidth - $($element).width())/2)+"px",
	  			top = Math.ceil((window.innerHeight - $($element).height())/2)+"px";
	  		$($element).css({"left": left, "top": top});	
  		};

  		var anc = document.createElement("a");
  		anc.href = "#";
  		anc.innerHTML = "<i class=\"fa fa-times\"></i>";
  		anc.className = "btn closeOverlay";
  	// 	anc.onclick = function(ev, el) {
  	// 		debugger;
  	// 		$(ev.target.parentNode.parentNode).hide();
			// $(".overlayScreen").remove();
  	// 	};
  		// $($element).append(anc);
		$(window).resize($.proxy($scope.position, $scope));

  	};

  	return {
        restrict: "AE",
        link: linker,
        controller: controller,
        scope: true,
        templateUrl: function(el, attrs) {
        	return "src/app/directive/renderTemplate/"+attrs.ngTemplate;
        }
    };
  })
;  