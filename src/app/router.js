'use strict';

angular.module('angularTest', [
  'ui.router'
])
  .constant('ENDPOINT_URI', './')
  .constant('DIRECTIVE_URI', './app/directive/')
  .constant('SITE_SECTION_URI', './app/edit/')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/edit');

    $stateProvider
      .state('home', {
        url:'/home',
        views: {
          '': { 
            templateUrl: 'app/home/home.tmpl.html',
            controller: 'HomeCtrl',
            controllerAs: 'home'
          },
          // the child views will be defined here (absolutely named)
          'menu@home': { 
            templateUrl: 'app/home/nav.tmpl.html' 
          }
        }
      })
      .state('edit', {
        url:'/edit',
        views: {
          '': { 
            templateUrl: 'app/edit/edit.tmpl.html',
            controller: 'EditCtrl',
            controllerAs: 'edit'
          },
          'sideNav@edit': { 
            templateUrl: 'app/edit/sideNav/sideNav.tmpl.html'
          },
          'topNav@edit': { 
            templateUrl: 'app/edit/topNav/topNav.tmpl.html'
          },
          'siteContent@edit': {
            templateUrl: 'app/edit/siteContent/siteContent.tmpl.html'
          }
        }
      })
    ;

  })
;
