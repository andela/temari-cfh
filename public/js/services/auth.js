/**
 * Created by chiamakanwosu on 15/02/2017.
 */
angular.module('auth.service', [])
  .factory('Auth', ['$q', '$http', '$timeout', ($q, $http, $timeout) => {
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
      console.log('signup called');
    };

    return {
      signin,
      signup,
      signout,
    };
  }]);
