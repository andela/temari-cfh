/**
 * @param {string} $q for handling promises
 * @param {string} $http for making ajax requests
 * @return {object} returns an object
 */
angular.module('auth.service', [])
  .factory('Auth', ['$q', '$http', ($q, $http) => {
    const signup = (userInfo) => {
      const promise = $q.defer();

      $http({
        method: 'POST',
        url: '/api/auth/signup',
        data: userInfo
      })
        .success((data) => {
          promise.resolve(data);
        })
        .error((err) => {
          promise.reject(err);
        });
      return promise.promise;
    };

    const signin = (userInfo) => {
      const promise = $q.defer();

      $http({
        method: 'POST',
        url: '/api/auth/login',
        data: userInfo
      })
        .success((data) => {
          promise.resolve(data);
        })
        .error((err) => {
          promise.reject(err);
        });
      return promise.promise;
    };

    const signout = () => {
    };

    return {
      signin,
      signup,
      signout,
    };
  }]);
