angular.module('angularTest')
  .directive('renderTemplateMiniature', function ($compile) {
    var template1 = '<div class="{{menuItem.content.class}}"><h2>{{menuItem.content.header}}</h2><p class="subTitle">{{menuItem.content.subtitle}}</p><div class="description"><article ng-repeat="article in menuItem.content.description"><h5 limit-character-render char-length="30" model-bind="article.head">{{article.head}}</h5><p limit-character-render char-length="80" model-bind="article.paragraph">{{article.paragraph}}</p></article></div></div>';
    var template2 = '<div class="{{menuItem.content.class}}"><h2>{{menuItem.content.header}}</h2><p class="subTitle">{{menuItem.content.subtitle}}</p><a href="#" class="productContainer"></a></div>';
    var template3 = '<div class="{{menuItem.content.class}}"><h2>{{menuItem.content.header}}</h2><p class="subTitle">{{menuItem.content.subtitle}}</p><div class="teamMembers"><div ng-repeat="member in menuItem.content.members"><span><h4>{{member.name}}</h4><p limit-character-render char-length="9" model-bind="member.designation">{{member.designation}}</p></span></div></div></div>';
    var template4 = '<div class="{{menuItem.content.class}}"><h2>{{menuItem.content.header}}</h2><p class="subTitle" limit-character-render char-length="40" model-bind="menuItem.content.subtitle">{{menuItem.content.subtitle}}</p><div class="form"><form action="{{menuItem.content.formElements.action}}" method="{{menuItem.content.formElements.method}}"><div ng-repeat="field in menuItem.content.formElements.fields.items"><input type="{{field.attributes.type}}" name="{{field.attributes.name}}" value="{{field.attributes.value}}" placeholder="{{field.attributes.placeholder}}" /></div></form></div></div>';
    var template5 = '<div class="{{menuItem.content.class}}"><h2>{{menuItem.content.header}}</h2><p class="subTitle">{{menuItem.content.subtitle}}</p><div class="blogging"><div ng-repeat="blog in menuItem.content.blogs"><h3>{{blog.author}}</h3><span class="date">{{blog.date}}</span><div class="details"><h4>{{blog.topic}}</h4><p limit-character-render char-length="80" model-bind="blog.description">{{blog.description}}</p></div></div></div></div>';
    var template6 = '<div class="{{menuItem.content.class}}"><div class="tile"><h2>{{menuItem.content.header}}</h2><p class="subTitle">{{menuItem.content.subtitle}}</p><button><span>Buy</span></button></div><div class="heroImg"></div></div></div>';
    var template7 = '<div class="{{menuItem.content.class}}"><div class="heroImg"></div><h2>{{menuItem.content.header}}</h2><p class="subTitle">{{menuItem.content.subtitle}}</p></div></div></div>';
    var template8 = '<div class="{{menuItem.content.class}}"><h2>{{menuItem.content.header}}</h2><p class="subTitle">{{menuItem.content.subtitle}}</p><div class="column"><div ng-repeat="item in menuItem.content.columns"><div class="heroImg"></div><div class="wrap"><h3>{{item.title}}</h3><span class="tagline" limit-character-render char-length="6" model-bind="item.tagline">{{item.tagline}}</span><p limit-character-render char-length="40" model-bind="item.description">{{item.description}}</p></div></div></div></div>';
    var template9 = '<div class="{{menuItem.content.class}}"><h2>{{menuItem.content.header}}</h2><p class="subTitle">{{menuItem.content.subtitle}}</p><div class="row"><div ng-repeat="item in menuItem.content.rows"><div class="heroImg"></div><div class="wrap"><h3>{{item.title}}</h3><span class="tagline" limit-character-render char-length="6" model-bind="item.tagline">{{item.tagline}}</span><p limit-character-render char-length="40" model-bind="item.description">{{item.description}}</p></div></div></div></div>';
    var template10 = '<div class="{{menuItem.content.class}}"><h2>{{menuItem.content.header}}</h2><p class="subTitle">{{menuItem.content.subtitle}}</p><ul class="imageStack"><li ng-repeat="item in menuItem.content.gallery"></li></ul></div>';
    var template11 = '<div class="{{menuItem.content.class}}" data-position="{{menuItem.content.position.lat}}" id="googleMap" style="height:100px;"></div>';

    var getTemplate = function(contentType, scope) {
        var template = '';

        switch(contentType) {
            case 'Item1': template = template1; break;
            case 'Item2': template = template2; break;
            case 'Item3': template = template3; break;
            case 'Item4': template = template4; break;
            case 'Item5': template = template5; break;
            case 'Item6': template = template6; break;
            case 'Item7': template = template7; break;
            case 'Item8': template = template8; break;
            case 'Item9': template = template9; break;
            case 'Item10': template = template10; break;
            case 'Item11': template = template11; break;
        }

        
        return template+'<div class="screen"></div><button class="addKey" ng-click="addTemplate(key);"><span>ADD</span></button>';
    }

    var linker = function(scope, element, attrs) {
        element.html(getTemplate(scope.menuItem.menuId, scope)).show();
        $compile(element.contents())(scope);
        
        $(element).hover(function() {
            $(this).addClass("hover");
        }, function() {
            $(this).removeClass("hover");
        });

        var isMapExists = document.getElementById("googleMap");
        if(isMapExists && isMapExists.innerHTML == "") {
            var myLatLng = {lat: parseInt(scope.menuItem.content.position.lat), lng: parseInt(scope.menuItem.content.position.lng)};
            scope.initializeMap(document.getElementById("googleMap"), myLatLng);
        }
    }

    return {
        restrict: 'A',
        link: linker,
        replace: true,
        scope: true
    };
  });
;
  
