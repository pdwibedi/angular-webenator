angular.module('angularTest')
  .directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel),
                modelSetter = model.assign;
            element.bind('change', function(){  

                show_image_preview(element, attrs.setTarget);
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });

        },
        controller: function($scope, $element) {
          
          show_image_preview = function(file_selector, target) {
            var files = file_selector[0].files,
            imageContainer,
            imagePreview = $('<div class="imageReplace"><input type="button" value="Clear BG" title="Remove Image" class="removeImageButton" onclick="remove_selected_image(this)" /></div>');
            
            if(target === undefined) {
              imageContainer = $($element).parents("section");
            }
            $(imageContainer).append(imagePreview);

            for (var i = 0; i < files.length; i++) {
              var file = files[i];

              // var img = document.createElement("img");
              // var preview = $(imageContainer).find(".imageReplace");
              // preview.prepend(img);
              // preview.find('img').addClass('previewImage').css({'max-width': '500px', 'max-height': '500px'});

              var reader = new FileReader();
              reader.onload = (function(imageContainer) { 
                return function(e) { 
                  // aImg.src = e.target.result;
                  imageContainer.css({
                    'background-image': 'url(' + e.target.result + ')',
                    'background-repeat': 'no-repeat',
                    'background-size': '100% auto',
                    'background-position': 'center center'
                  });
                }; 
              })(imageContainer);
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
}]);