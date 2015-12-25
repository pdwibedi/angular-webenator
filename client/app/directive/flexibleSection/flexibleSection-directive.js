angular.module('angularTest')
  .directive('flexibleSection', function(DIRECTIVE_URI){
  	var flex = this;

  	var linker = function(scope, element, attrs) {
  		// debugger;
  		var deleteBtn = document.createElement("button");
  		deleteBtn.className = "deleteRowBtn btn";
  		deleteBtn.title = "Delete this section";
  		deleteBtn.innerHTML = "<i class='fa fa-times'></i>";
  		$(deleteBtn).on('click', function() {
  			var conf = confirm("Do you want to delete this section ?");
  			if(conf) {
  				scope.ngDataModel.splice(scope.ngSelected, 1);
  				scope.$apply();
  			}
  		});
  		$(element).append(deleteBtn);
  		$(element).hover(
  			function() { 
  				$(this).addClass("flexible-section");
  			}, function() {
  				$(this).removeClass("flexible-section");
  			}
  		);
  	};

  	return {
      restrict : 'A',
      scope:{       
        ngDataModel: "=",
        ngSelected:'@'
  	  },  
      replace: false,
      link : linker
    }

  })
;
