angular.module('angularTest')
  .directive('bubbleinfo', function ($compile) {
    var html = $('<div><span class="bubbleInfo"><div class="info"><div class="wrapper"><ul class="style-color"><li class="fa fa-font"><div><input minicolors="customSettings" id="color-input" type="text" ng-model="textColor" data-row="{{row}}"></div></li><li><div><input minicolors="customSettings" id="background-color" type="text" ng-model="backgroundColor" data-row="{{row}}"></div></li></ul><div ng-transclude class="user-defined-container"></div></div></div></span></div>'),
  		  link = $('<a href="javascript:void(0);">More</a>');
  	html.find(".bubbleInfo").prepend(link);
    return {
        restrict: 'EA',
        replace: true,
        scope: {
          row: '@'
        },
        link: function(scope, element, attrs) {

          // Slider Functionality
        	$(element).find("a").click(function() {
            var isVisible = parseInt($(this).siblings("div").css("height"), 10);
            if(isVisible == 0) {
              $(this).siblings("div").css("overflow","inherit");
              $(this).siblings("div").find(".wrapper").css("height", "auto");
            } else {
              $(this).siblings("div").css("overflow","auto");
              $(this).siblings("div").find(".wrapper").css("height", "0px");
            }
          });
          $("body").click(function(ev) {
            if(ev.target.nodeType === 1 && $(ev.target).parents(".bubbleInfo").length == 0) {
              $("body").find(".bubbleInfo > div").css("overflow","auto");
              $("body").find(".bubbleInfo > div").find(".wrapper").css("height", "1px");
            }
          });

          //**********//
          // Set default color codes to colorpicker
          var getJSONIndex = function(sectionRef) {
            var currentJSONList = scope.$parent.data.menuList,
              row;
            $.each(currentJSONList, function(key, value) {
                if(value.menuId == sectionRef) {
                    row = key;
                }
            });
            return row;
          };
          var index = getJSONIndex(attrs.row),
            textColor = scope.$parent.data.menuList[index][element.find("#color-input").attr("ng-model")],
            backgroundColor = scope.$parent.data.menuList[index][element.find("#background-color").attr("ng-model")];
          element.find("#color-input").val(textColor);
          element.find("#background-color").val(backgroundColor);


          //**********//
          // Font Color Functionality : Color Picker   
          //using for example these settings inside your controller
          scope.customSettings = {
            control: 'brightness',
            theme: 'bootstrap',
            position: '0 0'
          };          
        },
        template: function() {
        	return html.html();
        },
        transclude: true
    }
  })
;
