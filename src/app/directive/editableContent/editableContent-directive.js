angular.module('angularTest')
  .directive('editableContext', function($http, DIRECTIVE_URI){
  	var ctrl = this,
    showEditOnHover,
    deleteBtn = "button.deleteRowBtn";

  	linker = function(scope, element, attrs) {
      var that = scope;
      // Dynamic Text change
      $(element).find("button").click(function() {
        $(this).text(function(i, text){
          return text === "Edit" ? "Rename" : "Edit";
        });
        showhideDeleteBtn($(element).siblings(deleteBtn));  
      });

      // Removes Editing visual on blur
      $(element).find("input, textarea").blur({currentScope: scope}, function(e) {
        $(this).parents("editable-context").removeClass("editor");
        e.data.currentScope.isReplyFormOpen = false;
      });

      function showhideDeleteBtn(el) {
        if(el.css("display") == "none") {
          el.css("display", "table-cell");  
        } else {
          el.css("display", "none");
        }  
      };
  	};
  	controller = function($scope, $element) {

      // Default actions
      $scope.editOnClick = true;
      $scope.isReplyFormOpen = false;
      $($element).find("button").hide();
  		return (function($scope) {
       
        // sets whether to show edit link on hover or static by default !!
        if($scope.showEditOnHover && $scope.showEditOnHover === "true") {
          $scope.editOnClick = false;
          $($element).hover(
            function() {
              $(this).addClass("hoverEdit");
              $(this).find("button").show();
            }, function() {
              $(this).removeClass("hoverEdit");
              $(this).find("button").hide();
            }
          );
        }
    
        // sets whether to show edit link on hover or static by default !!
        if($scope.showStaticEditLink && $scope.showStaticEditLink === "true") {  
          $scope.editOnClick = false;
          $($element[0]).find("button").show();
        }

        // Default with no Params
        if(!$scope.showStaticEditLink && $scope.editOnClick === "true") {
          $($element).find("button").hide();
          $scope.isReplyFormOpen = false;
        }

        // debugger;
        if($($element).attr("match-height") == "true") {
          var ht = $element.find(".dynamicModelText").height();
          $element.find("textarea").css("height", $($element).height()+15);
        }


  		})($scope);
  	};
    return {
      restrict : 'A',
      scope:{       
        showStaticEditLink: '@showStaticEditLink',
        showEditOnHover:'@showEditOnHover',         
    		elementType:'@elementType',
    		ngDataModel:'=ngDataModel',
        editOnClick: '@editOnClick'
  	  },  
      replace: false,
      templateUrl: function(elem,attrs) {
      	return DIRECTIVE_URI+'editableContent/editable-content-'+attrs.elementType+'.tmpl.html';
      },
      link : linker,
      controller: controller,
      controllerAs: ctrl
    }
  })
  .directive('ngEnter', function () {
    controller = function($scope, $element) {
      $scope.enableEdit= function(check) {
        if(check) {
          // Set dynamic height of textarea //
          if($element[0].nodeName === "TEXTAREA") {
            var dynamicHt = $($element).siblings(".dynamicModelText").height();
            $($element).parents("editable-context").css("height", dynamicHt+3);
            $($element).css("height", dynamicHt);
          }

          $scope.isReplyFormOpen = true;
          $($element).parents("editable-context").addClass("editor");
          setTimeout(function() {
            $($element).focus();
          }, 100);
        }
      };
      $scope.doneEditing = function() {
          $($element).parents("editable-context").removeClass("editor");
          $scope.isReplyFormOpen = false;
      }
    };
    return {
       controller: controller,
       link: function (scope, elements, attrs) {
          var element = elements;
          elements.bind('keydown keypress', function (event) {
            if (event.which === 13 || event.which === 9) {
              scope.$apply(function () {
                scope.$eval(attrs.ngEnter);
              });
              event.preventDefault();
            }
          });
       }
    };
  })
;