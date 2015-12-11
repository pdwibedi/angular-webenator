'use strict';

angular.module('angularTest')
  .controller('EditCtrl', function ($http, $scope, EditService, staticTemplateService, fileUpload) {
    var edit = this;
    $scope.username = "situ";
    $scope.sampleText = 'f dasf asdfa dfadsf adsfad sfdas fasf dasfas dfdas fadsf adsfads fads fasdf asdfas df';
    $scope.default = {
        "balloonFlyOut": '.balloonFlyOut'
    };
    $scope.newArticle = {};
    $scope.newBlog = {};
    $scope.locationMap = {};

    // Get all the default menu items from template.json
    staticTemplateService.all().then(function(data) { $scope.menuStack = data; });
    // Get all the default menu items which needs to be added to user.json
    staticTemplateService.all().then(function(data) { $scope.originalmenuStack = data; });

    // Gets all the default settings of user.json
    EditService.all()
    	.then(function(data) {
            $scope.data = data;
            window.scopedData = $scope.data;
    	}).finally(function() {
            // Init Method Call
            $scope.onDataLoaded();   
        });

    $scope.onDataLoaded = function() {
        $scope.setMenuScroll();
    };

    $scope.showTemplateFlyOut = function() {
        if($($scope.default.balloonFlyOut).hasClass("fadeOut")) {
            $($scope.default.balloonFlyOut).addClass("fadeIn").removeClass("fadeOut");
        } else {
            $($scope.default.balloonFlyOut).removeClass("fadeIn").addClass("fadeOut");
        }
    };

    $scope.addTemplate = function(copy) {
        var copy = $scope.originalmenuStack.menuList[copy],
        checkPoint = false;
        $.each($scope.data.menuList, function(key, value) {
         if(value.menuId == copy.menuId) {
            checkPoint = true;
           return;
         }
        });
        $(".balloonFlyOut").removeClass("fadeIn").addClass("fadeOut");
        // Check for no-repeating sections in a page.
        (!checkPoint) ? $scope.data.menuList.push(copy) : '';
    };

    $scope.deleteTemplate = function(id) {
        $scope.data.menuList.splice(id,1);
    };

    $scope.setMenuScroll = function() {

        $(".topNav ul").delegate( "li", "click", function() {
            if($(this).find("a").attr("data")) {
                var top = $($(this).find("a").attr("data")).position().top - 58;
                $('html,body').animate({
                        scrollTop: top
                }, 1000);
                event.preventDefault();    
            }
        });
    };

    $scope.deleteRecordHandler = function(array, index){
        array.splice(index, 1);
    };

    $scope.openOverlay = function (elem) {
        $("#"+elem).find("overlay-component").show();
        $("body").append("<div class='overlayScreen'></div>");
    };

    $scope.closeOverlay = function(parentElem) {
        $("#"+parentElem).find("overlay-component").hide()
        $(".overlayScreen").remove();
    };

    $scope.saveArticle = function (isValid) {
        if($scope.newArticle && isValid) {
            $scope.data.menuList[0].content.description.push($scope.newArticle);
            $scope.closeOverlay('section1');
        }
        $scope.newArticle = {};
    };

    $scope.saveBlogPost = function (isValid, form) {
        var date = new Date(),
            days = ["January","February","March","April","Map","June","July","August","September","october","November","Deecmber"],
            today = days[date.getMonth()] + " " + date.getDay(),
            jsonindex = $("form[name='"+form+"']").find("input[name='JSONIndex']").val();
        if($scope.newBlog && isValid) {
            var blogIndexInJSON = getJSONIndex(jsonindex);
            $scope.newBlog["date"] = today;
            $scope.data.menuList[blogIndexInJSON].content.blogs.push($scope.newBlog);
            $scope.closeOverlay('section5');
        }

        //$scope.$apply();
        $scope.newBlog = {};
    };

    $scope.updateLocation = function(isValid, form) {
        var geocoder = new google.maps.Geocoder(),
            jsonindex = $("form[name='"+form+"']").find("input[name='JSONIndex']").val();
        if($scope.locationMap && isValid) {
            var blogIndexInJSON = getJSONIndex(jsonindex),
                address = $scope.locationMap.address;
            geocoder.geocode({'address': address}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    var updatedPosition = results[0].geometry.location;
                    $scope.data.menuList[blogIndexInJSON].content.position.lat = updatedPosition.lat();
                    $scope.data.menuList[blogIndexInJSON].content.position.lng = updatedPosition.lng();
                    $scope.initializeMap(document.getElementById('googleMapContact'), updatedPosition);
                } else {
                    alert('Address entered was not valid for the following reason: ' + status);
                }
            });
            $scope.closeOverlay('section11');
        }
        
        // Clearing the temp Obj
        $scope.locationMap = {};
    };


    var getJSONIndex = function(sectionRef) {
        var currentJSONList = $scope.data.menuList;
        var row;
        $.each(currentJSONList, function(key, value) {
            if(value.menuId == sectionRef) {
                row = key;
            }
        });
        return row;
    };

    $scope.uploadFile = function(){
        var file = $scope.myFile;
        console.log('file is ' );
        console.dir(file);
        var uploadUrl = "app/common/api/fileUpload.php";
        fileUpload.uploadFileToUrl(file, uploadUrl);

        // var file_data = $('#sortpicture').prop('files')[0];   
        // var form_data = new FormData();                  
        // form_data.append('file', file_data);
        // debugger;

        // $.ajax({
        //             url: 'app/common/api/fileUpload.php', // point to server-side PHP script 
        //             dataType: 'text',  // what to expect back from the PHP script, if anything
        //             cache: false,
        //             contentType: false,
        //             processData: false,
        //             data: form_data,                         
        //             type: 'post',
        //             success: function(php_script_response){
        //                 alert(php_script_response); // display response from the PHP script, if any
        //             }
        //  });

    };

    $scope.onFileSelect = function($files) {
        $scope.message = "";
        for (var i = 0; i < $files.length; i++) {
            var file = $files[i];
            console.log(file);
            $scope.upload = $upload.upload({
                url: 'app/common/api/fileUpload.php',
                method: 'POST',               
                file: file
            }).success(function(data, status, headers, config) {
                $scope.message = data;                
            }).error(function(data, status) {
                $scope.message = data;
            });
        }
    };

    $scope.initializeMap = function(elem, myLatLng) {
        // Create a map object and specify the DOM element for display.
        setTimeout(function() {
            // Specify features and elements to define styles.
            var styleArray = [{
              featureType: "all",
              stylers: [
               { saturation: 20 }
              ]
            },{
              featureType: "road.arterial",
              elementType: "geometry",
              stylers: [
                { hue: "#0061FF" },
                { saturation: 70 }
              ]
            },{
              featureType: "poi.business",
              elementType: "labels",
              stylers: [
                { visibility: "off" }
              ]
            }];

            // Create a map object and specify the DOM element for display.
            var map = new google.maps.Map(elem, {
                center: myLatLng,
                scrollwheel: false,
                // Apply the map style array to the map.
                styles: styleArray,
                zoom: 18
            });
            // Create a marker and set its position.
            var marker = new google.maps.Marker({
                map: map,
                position: myLatLng,
                title: 'Hello World!'
            });
        }, 100);
    };

    // JQUERY DOM EVENT BINDINGS 
    (function($) {

        $("body").delegate( ".sliderToggleBtn", "click", function() {
            
            if(parseInt($(".sideBar").css("width")) == 52) {
                $(".sideBar").css("width", "220px");
                $(".editArea").css("margin-left", "220px");
                $(".topNav .logo").css("width", "220px");
                $(".sideBar").removeClass("collapsed");
            } else {
                $(".sideBar").addClass("collapsed");
                $(".sideBar").css("width", "52px");
                $(".editArea").css("margin-left", "52px");
                $(".topNav .logo").css("width", "52px");
            }
        });

        $(".addBtnCombo").click(function() {
            $(this).siblings(".balloonFlyOut").toggle();
        });

        $(".themeOptions .themes input[type='radio'").change(function() {
            $scope.data.theme = $(this).val()
            $scope.$apply();
        });

        $(".themeOptions .textColor input[type='radio'").change(function() {
            $scope.data.textColor = $(this).val()
            $scope.$apply();
        });


    })($);

  })
;