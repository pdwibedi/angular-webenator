'use strict';

angular.module('angularTest', [
  'ui.router'
])
  .constant('ENDPOINT_URI', './src/')
  .constant('DIRECTIVE_URI', './src/app/directive/')
  .constant('SITE_SECTION_URI', './src/app/edit/')
  .constant('USER_UPLOADS', './src/assets/userUploads/')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/edit');

    $stateProvider
      .state('home', {
        url:'/home',
        views: {
          '': { 
            templateUrl: 'src/app/home/home.tmpl.html',
            controller: 'HomeCtrl',
            controllerAs: 'home'
          },
          // the child views will be defined here (absolutely named)
          'menu@home': { 
            templateUrl: 'src/app/home/nav.tmpl.html' 
          }
        }
      })
      .state('edit', {
        url:'/edit',
        views: {
          '': { 
            templateUrl: 'src/app/edit/edit.tmpl.html',
            controller: 'EditCtrl',
            controllerAs: 'edit'
          },
          'sideNav@edit': { 
            templateUrl: 'src/app/edit/sideNav/sideNav.tmpl.html'
          },
          'topNav@edit': { 
            templateUrl: 'src/app/edit/topNav/topNav.tmpl.html'
          },
          'siteContent@edit': {
            templateUrl: 'src/app/edit/siteContent/siteContent.tmpl.html'
          }
        }
      })
    ;

  })
;
