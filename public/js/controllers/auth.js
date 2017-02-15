/**
 * @param {object} $scope for holding data that bind view
 * @param {object} $location angularjs wrapper around window.location
 * @param {object} Auth service for authentications
 * @param {object} localStorageService accessing local data storage
 * @return {object} returns an object
 */

angular.module('auth.controllers', [])
  .controller('signinController', [
    '$scope', '$location', 'Auth', 'localStorageService',
    ($scope, $location, Auth, localStorageService) => {
      $scope.userInfo = {
        email: '',
        password: '',
      };

      $scope.error = {
        msg: '',
        show: false
      };

      $scope.signin = (userInfo) => {
        $scope.processing = true;
        Auth.signin(userInfo).then(
          (data) => {
            localStorageService.set('token', data.token);
            $scope.processing = false;
            $location.path('/app');
          },
          (err) => {
            $scope.error.msg = 'Invalid username or password';
            $scope.error.show = true;
            $scope.processing = false;
          }
        );
      };
    }])

.controller('signupController', [
  '$scope', '$location', 'Auth',
  ($scope, $location, Auth) => {
    $scope.userInfo = {
      fullname: '',
      email: '',
      password: '',

    };

    $scope.error = {
      msg: '',
      show: false
    };

    $scope.signup = (userInfo) => {
      $scope.processing = true;
      Auth.signup(userInfo).then(
        (data) => {
          $scope.processing = false;
          $location.path('/signin');
        },
        (err) => {
          $scope.error.msg = 'Invalid username or password';
          $scope.error.show = true;
          $scope.processing = false;
        }
      );
    };
  }]);
