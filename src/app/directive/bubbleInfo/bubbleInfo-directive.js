angular.module('angularTest')
  .directive('bubbleinfo', function ($compile) {
  	var html = $('<div><span class="bubbleInfo"><div class="info"></div></span></div>'),
  		link = document.createElement("a");
  		link.href = "#";
  		link.innerHTML = "More";
  		link.onclick = function() {
  			alert("dfasfd");
  		};
  	html.find(".bubbleInfo").prepend(link);
    return {
        restrict: 'EA',
        replace: true,
        link: function(scope, element, attrs) {
        	debugger;
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
