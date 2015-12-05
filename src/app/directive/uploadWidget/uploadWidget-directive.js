angular.module('angularTest')
  .directive('fileModel', function ($parse, USER_UPLOADS) {
    var createImgElem, setTarget;
    return {
        restrict: 'A',
        scope: {
          setTarget: '@',
          createImgElem: '@'
        },
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel),
                modelSetter = model.assign,
                filePath;
            // createImgElem = (Boolean(scope.createImgElem)) ? Boolean(scope.createImgElem) : false;
            // setTarget = (scope.setTarget) ? scope.setTarget : $(element).parent();

            element.on('change', function(){
                show_image_preview(element, scope.setTarget, JSON.parse(scope.createImgElem));
                scope.$apply(function(){
                  filePath = USER_UPLOADS + element[0].files[0].lastModified + element[0].files[0].name;
                  modelSetter(scope, filePath);
                });
            });
        },
        controller: function($scope, $element) {
          
          show_image_preview = function(file_selector, target, createImgElem) {
            var files = file_selector[0].files,
            imageContainer = $(target),
            imagePreview = $('<div class="imageReplace"><input type="button" value="Clear BG" title="Remove Image" class="removeImageButton" onclick="remove_selected_image(this)" /></div>');
            
            for (var i = 0; i < files.length; i++) {
              var file = files[i];

              var img = document.createElement("img");
              $(img).css({"width": $(imageContainer).width(), "height": $(imageContainer).height()});

              var reader = new FileReader();
              reader.onload = (function(imageContainer, createImgElem) { 
                return function(e) { 
                  if(createImgElem) {
                    img.src = e.target.result;
                    $(imageContainer).append(img);  
                  } else {
                    $(imageContainer).append(imagePreview);
                    imageContainer.css({
                      'background-image': 'url(' + e.target.result + ')',
                      'background-repeat': 'no-repeat',
                      'background-size': '100% auto',
                      'background-position': 'center center'
                    });
                  }
                }; 
              })(imageContainer, createImgElem);
              reader.readAsDataURL(file);
            }
            $(imageContainer).show();
          };

          remove_selected_image = function(close_button) {
            var imageIndex = $(close_button);
            $(close_button).parents("section").css("background","");
            $(close_button).parents('.imageReplace').remove();
          };

        }
    };
});