'use strict';

angular.module('angularTest.common')
  .factory('Auth', function ($firebaseAuth, LOGIN_URI) {
    var ref = new Firebase(LOGIN_URI);
    return $firebaseAuth(ref);
  })
;