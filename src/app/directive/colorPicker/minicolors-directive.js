'use strict';

angular.module('minicolors', []);

angular.module('minicolors').provider('minicolors', function () {
  this.defaults = {
    theme: 'bootstrap',
    position: 'bottom left',
    defaultValue: '',
    animationSpeed: 50,
    animationEasing: 'swing',
    change: null,
    changeDelay: 0,
    control: 'hue',
    hide: null,
    hideSpeed: 100,
    inline: false,
    letterCase: 'lowercase',
    opacity: false,
    show: null,
    showSpeed: 100
  };

  this.$get = function() {
    return this;
  };

});

angular.module('minicolors').directive('minicolors', ['minicolors', '$timeout', function (minicolors, $timeout) {
  return {
    require: '?ngModel',
    restrict: 'A',
    link: function(scope, element, attrs, ngModel) {

      var inititalized = false;

      //gets the settings object
      var getSettings = function () {
        var config = angular.extend({}, minicolors.defaults, scope.$eval(attrs.minicolors));
        return config;
      };

      //what to do if the value changed
      ngModel.$render = function () {

        //we are in digest or apply, and therefore call a timeout function
        $timeout(function() {
          var color = ngModel.$viewValue;
          element.minicolors('value', color);
        }, 0, false);
      };

      //init method
      var initMinicolors = function () {

        if(!ngModel) {
          return;
        }
        var settings = getSettings();
        settings.change = function (hex) {
          var parentScope = scope.$parent,
              getJSONIndex = function(sectionRef) {
                var currentJSONList = parentScope.data.menuList;
                var row;
                $.each(currentJSONList, function(key, value) {
                    if(value.menuId == sectionRef) {
                        row = key;
                    }
                });
                return row;
              },
              rowIndex = getJSONIndex(attrs.row);
          parentScope.data.menuList[rowIndex][attrs.ngModel] = hex;
          // parentScope.$apply();
        };

        //destroy the old colorpicker if one already exists
        if(element.hasClass('minicolors-input')) {
          element.minicolors('destroy');
        }

        // Create the new minicolors widget
        element.minicolors(settings);

      };

      initMinicolors();
      //initital call

      // Watch for changes to the directives options and then call init method again
      scope.$watch(getSettings, initMinicolors, true);
    }
  };
}]);
