angular.module('angularTest')
  .directive('renderTemplate', function ($compile) {
    var templateUrl = 'src/app/directive/renderTemplate/section1.tmpl.html';
    var template1 = '<div class="{{section.content.class}} {{section.textColor}}"><h2 editable-context ng-data-model="section.content.header" element-type="text">{{section.content.header}}</h2><p class="subTitle" editable-context ng-data-model="section.content.subtitle" element-type="text">{{section.content.subtitle}}</p><div class="description"><article flexible-section ng-data-model="section.content.description" ng-selected={{$index}} ng-repeat="article in section.content.description"><h5 editable-context ng-data-model="article.head" element-type="text">{{article.head}}</h5><p editable-context ng-data-model="article.paragraph" match-height="true" element-type="textarea">{{article.paragraph}}</p></article></div><button class="btn addBtn" ng-click="openOverlay(section.content.menuRef);"><i class="fa fa-plus"></i><span>Add Article</span></button><overlay-component ng-template="section1.tmpl.html"></overlay-component></div><bubbleInfo><input type="file" class="backgroundChooser" set-target="#section1" name="fileToUpload" create-img-elem=false file-model="myFile"/></bubbleInfo>';
    var template2 = '<div class="{{section.content.class}} {{section.textColor}}"><h2 editable-context ng-data-model="section.content.header" element-type="text">{{section.content.header}}</h2><p class="subTitle" editable-context ng-data-model="section.content.subtitle" element-type="text">{{section.content.subtitle}}</p><a href="#" class="productContainer"></a></div>';
    var template3 = '<div class="{{section.content.class}} {{section.textColor}}"><h2 editable-context ng-data-model="section.content.header" element-type="text">{{section.content.header}}</h2><p class="subTitle" editable-context ng-data-model="section.content.subtitle" element-type="text">{{section.content.subtitle}}</p><div class="teamMembers"><div  flexible-section ng-data-model="section.content.members" ng-selected={{$index}} ng-repeat="member in section.content.members"><span><h4 editable-context ng-data-model="member.name" element-type="text">{{member.name}}</h4><p editable-context ng-data-model="member.designation" element-type="text">{{member.designation}}</p></span></div></div></div>';
    var template4 = '<div class="{{section.content.class}} {{section.textColor}}"><h2 editable-context ng-data-model="section.content.header" element-type="text">{{section.content.header}}</h2><p class="subTitle" editable-context ng-data-model="section.content.subtitle" element-type="text">{{section.content.subtitle}}</p><div class="form editable-form"><form action="{{section.content.formElements.action}}" method="{{section.content.formElements.method}}"><div ng-repeat="field in section.content.formElements.fields.items" ng-if="field.isVisible"><label for="cUserName">{{field.label}}</label><input id="cUserName" type="{{field.attributes.type}}" name="{{field.attributes.name}}" value="{{field.attributes.value}}" placeholder="{{field.attributes.placeholder}}" /></div></form><span class="fileUploadScreen"></span><button class="btn editForm" ng-click="openOverlay(section.content.menuRef);"><span>Edit Form</span></button></div></div><overlay-component ng-template="section4.tmpl.html"></overlay-component><bubbleInfo></bubbleInfo>';
    var template5 = '<div class="{{section.content.class}} {{section.textColor}}"><h2 editable-context ng-data-model="section.content.header" element-type="text">{{section.content.header}}</h2><p class="subTitle" editable-context ng-data-model="section.content.subtitle" element-type="text">{{section.content.subtitle}}</p><div class="blogging"><div flexible-section ng-data-model="section.content.blogs" ng-selected={{$index}} ng-repeat="blog in section.content.blogs"><h3 editable-context ng-data-model="blog.author" element-type="text">{{blog.author}}</h3><span class="date" editable-context ng-data-model="blog.date" element-type="text">{{blog.date}}</span><div class="details"><h4 editable-context ng-data-model="blog.topic" element-type="text">{{blog.topic}}</h4><p editable-context ng-data-model="blog.description" element-type="textarea">{{blog.description}}</p></div></div></div><button class="btn addBtn" ng-click="openOverlay(section.content.menuRef);"><i class="fa fa-plus"></i><span>Add a post</span></button><overlay-component ng-template="section5.tmpl.html"></overlay-component></div>';
    var template6 = '<div class="{{section.content.class}} {{section.textColor}}"><div class="tile"><h2 editable-context ng-data-model="section.content.header" element-type="text">{{section.content.header}}</h2><p class="subTitle" editable-context ng-data-model="section.content.subtitle" element-type="text">{{section.content.subtitle}}</p><button><span>Buy</span></button></div><div class="heroImg heroProductImg userUploadable" ng-class=\'{{section.content.heroImage.image.src == "" ? "uploadImg" : ""}}\'><span class="fileUploadScreen"></span><label>Browse<input type="file" set-target=".heroProductImg" create-img-elem=true file-model="section.content.heroImage.image.src"/></label></div></div></div>';
    var template7 = '<div class="{{section.content.class}} {{section.textColor}}"><div class="heroImg userUploadable heroProductImgv2"><span class="fileUploadScreen"></span><label>Browse<input type="file" set-target=".heroProductImgv2" create-img-elem="true" file-model="section.content.heroImage.image.src"/></label></div><h2 editable-context ng-data-model="section.content.header" element-type="text">{{section.content.header}}</h2><p class="subTitle" editable-context ng-data-model="section.content.subtitle" element-type="text">{{section.content.subtitle}}</p></div></div></div>';
    var template8 = '<div class="{{section.content.class}} {{section.textColor}}"><h2 editable-context ng-data-model="section.content.header" element-type="text">{{section.content.header}}</h2><p class="subTitle" editable-context ng-data-model="section.content.subtitle" element-type="text">{{section.content.subtitle}}</p><div class="column"><div flexible-section ng-data-model="section.content.columns" ng-selected={{$index}} ng-repeat="item in section.content.columns"><div class="heroImg userUploadable columnContent{{$index}}"><span class="fileUploadScreen"></span><label>Browse<input type="file" set-target=".columnContent{{$index}}" restrict-height create-img-elem=true file-model="item.image.src"/></label></div><div class="wrap"><h3 editable-context ng-data-model="item.title" element-type="text">{{item.title}}</h3><span class="tagline" editable-context ng-data-model="item.title" element-type="text">{{item.description}}</span><p editable-context ng-data-model="item.description" element-type="textarea">{{item.description}}</p></div></div></div></div>';
    var template9 = '<div class="{{section.content.class}} {{section.textColor}}"><h2 editable-context ng-data-model="section.content.header" element-type="text">{{section.content.header}}</h2><p class="subTitle" editable-context ng-data-model="section.content.subtitle" element-type="text">{{section.content.subtitle}}</p><div class="row"><div flexible-section ng-data-model="section.content.rows" ng-selected={{$index}} ng-repeat="item in section.content.rows"><div class="heroImg userUploadable rowContent{{$index}}"><span class="fileUploadScreen"></span><label>Browse<input type="file" set-target=".rowContent{{$index}}" restrict-height create-img-elem=true file-model="item.image.src"/></label></div><div class="wrap"><h3 editable-context ng-data-model="item.title" element-type="text">{{item.title}}</h3><span class="tagline" editable-context ng-data-model="item.tagline" element-type="text">{{item.tagline}}</span><p editable-context ng-data-model="item.description" element-type="textarea">{{item.description}}</p></div></div></div></div>';
    var template10 = '<div class="{{section.content.class}} {{section.textColor}}"><h2 editable-context ng-data-model="section.content.header" element-type="text">{{section.content.header}}</h2><p class="subTitle" editable-context ng-data-model="section.content.subtitle" element-type="text">{{section.content.subtitle}}</p><ul class="imageStack"><li flexible-section ng-data-model="section.content.gallery" ng-selected={{$index}} ng-repeat="item in section.content.gallery" class="userUploadable gallery{{$index}}"><span class="fileUploadScreen"></span><label>Browse<input type="file" set-target=".gallery{{$index}}" restrict-height create-img-elem=true file-model="item.large.src"/></label></li></ul></div>';
    var template11 = '<div class="{{section.content.class}}" id="googleMapContact"></div><overlay-component ng-template="section11.tmpl.html"></overlay-component><bubbleInfo><button class="btn addBtn" ng-click="openOverlay(section.content.menuRef);"><span>New</span></button></bubbleInfo>';
    var template12 = '<div class="{{section.content.class}}"><ul class="carouselContainer slider"><li ng-repeat="slides in section.content.slides"><div class="wrapper"><div><h2 editable-context ng-data-model="slides.header" element-type="text">{{slides.header}}</h2><p  editable-context ng-data-model="slides.description" element-type="textarea" class="subTitle">{{slides.description}}</p></div><div class="img"><img src="{{slides.image.src}}" /></div></div></li></ul></div><script>setTimeout( function() { carousel(".carousel"); }, 100);</script>';

    var getTemplate = function(contentType) {
        var template = '';

        switch(contentType) {
            case 'section1': template = template1; break;
            case 'section2': template = template2; break;
            case 'section3': template = template3; break;
            case 'section4': template = template4; break;
            case 'section5': template = template5; break;
            case 'section6': template = template6; break;
            case 'section7': template = template7; break;
            case 'section8': template = template8; break;
            case 'section9': template = template9; break;
            case 'section10': template = template10; break;
            case 'section11': template = template11; break;
            case 'section12': template = template12; break;
        }

        return template;
    }

    var linker = function(scope, element, attrs) {
        // debugger;
        element.html(getTemplate(attrs.id)).show();
        $compile(element.contents())(scope);

        var isMapExists = getTemplate(attrs.id).indexOf("googleMapContact");
        if(isMapExists && isMapExists != -1) {
            var myLatLng = {lat: parseInt(scope.section.content.position.lat), lng: parseInt(scope.section.content.position.lng)};
            scope.initializeMap(document.getElementById("googleMapContact"), myLatLng);
        }
    }


    return {
        restrict: "A",
        link: linker,
        scope: true
    };
  });
;
  
