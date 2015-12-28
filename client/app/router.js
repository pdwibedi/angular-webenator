
angular.module('angularTest', ['ui.router', 'ngCookies', 'ui.sortable', 'minicolors'])
  .constant('LOGIN_URI', 'https://intense-torch-8839.firebaseio.com/')
  .constant('ENDPOINT_URI', './')
  .constant('DIRECTIVE_URI', '/app/directive/')
  .constant('SITE_SECTION_URI', '/src/app/edit/')
  .constant('USER_UPLOADS', '/src/assets/userUploads/')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/edit');

    $stateProvider
      .state('login', {
        url:'/login',
        templateUrl: '/app/login/login.tmpl.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm'
      })
      .state('register', {
        url:'/register',
        templateUrl: '/app/register/register.tmpl.html',
        controller: 'RegisterCtrl',
        controllerAs: 'vm'
      })
      .state('home', {
        url:'/home',
        views: {
          '': { 
            templateUrl: '/app/home/home.tmpl.html',
            controller: 'HomeCtrl',
            controllerAs: 'home'
          },
          // the child views will be defined here (absolutely named)
          'menu@home': { 
            templateUrl: '/app/home/nav.tmpl.html'
          }
        }
      })
      .state('edit', {
        url:'/edit',
        views: {
          '': { 
            templateUrl: '/app/edit/edit.tmpl.html',
            controller: 'EditCtrl',
            controllerAs: 'edit'
          },
          // the child views will be defined here (absolutely named)
          'sideNav@edit': { 
            templateUrl: '/app/edit/sideNav/sideNav.tmpl.html'
          },
          'topNav@edit': { 
            templateUrl: '/app/edit/topNav/topNav.tmpl.html'
          },
          'siteContent@edit': {
            templateUrl: '/app/edit/siteContent/siteContent.tmpl.html'
          }
        }
      });
  })
  .run(function run($rootScope, $location, $cookies, $http) {
      // keep user logged in after page refresh
      $rootScope.globals = ($cookies.globals) ? JSON.parse($cookies.globals) || {} : {};
      if ($rootScope.globals.currentUser) {
          $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
      }

      $rootScope.$on('$locationChangeStart', function (event, next, current) {
          // redirect to login page if not logged in and trying to access a restricted page
          var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
          var loggedIn = $rootScope.globals.currentUser;
          if (restrictedPage && !loggedIn) {
              $location.path('/login');
          }
      });
  })
;
