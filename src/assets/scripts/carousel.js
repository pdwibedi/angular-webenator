carousel = function(el) {
      var elem = $(el).find(".carouselContainer"),
        child = elem.children(),
        containerWidth = elem.css("width"),
        counter = 0;
        init = function() {
          if($(el).find(".next, .prev").length == 0) {
            $(el).append('<button class="prev fa fa-chevron-left">prev</button><button class="next fa fa-chevron-right">next</button>');
            $(el).append('<ul class="page"></ul>');  
          }
          $(".next").click(nextSlide);
          $(".prev").click(prevSlide);
          arrangeElements();
          elem.css("opacity", 1);
          updatePage();
        };
        arrangeElements = function() {
          if(counter < 0) {
            counter = 0;
          } 
          if(counter >= child.length) {
            counter = child.length-1;
            // counter = Math.ceil(counter/child.length)-1;
          }
          elem.children().each(function(key) {
            if(counter == key && counter == 0) {
              key = key;
            } else {
              key-= counter
            }
            $(this).css("opacity", 0);
            var left = parseInt($(this).parent().width()) * key;
            $(this).css("left", left).animate({
              opacity: 1,
            }, 270);
          });
        };
        updatePage = function(){
          elem.children().each(function(key) {
            
          });
        };
        nextSlide = function() {
          counter++;
          arrangeElements();
        };
        prevSlide = function() {
          counter--;
          arrangeElements();
        };
        init();
    };

    // carousel(".carousel");