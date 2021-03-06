angular.module('mean', [
  'ngCookies',
  'ngResource',
  'ui.bootstrap',
  'ui.route',
  'mean.system',
  'mean.directives'
])
  .config(['$routeProvider',
    ($routeProvider) => {
      $routeProvider
      .when('/', {
        templateUrl: 'views/index.html'
      })
      .when('/app', {
        templateUrl: '/views/app.html',
      })
      .when('/privacy', {
        templateUrl: '/views/privacy.html',
      })
      .when('/bottom', {
        templateUrl: '/views/bottom.html'
      })
      .when('/signin', {
        templateUrl: '/views/signin.html'
      })
      .when('/signup', {
        templateUrl: '/views/signup.html'
      })
      .when('/choose-avatar', {
        templateUrl: '/views/choose-avatar.html'
      })
      .when('/gametour', {
        templateUrl: '/views/game-tour.html',
        controller: 'OnboardController'
      })
      .otherwise({
        redirectTo: '/'
      });
    }
  ])
  .config(['$locationProvider',
    ($locationProvider) => {
      $locationProvider.hashPrefix('!');
    }
  ])
  .run(['$rootScope', function ($rootScope) {
    $rootScope.safeApply = function (fn) {
      const phase = this.$root.$$phase;
      if (phase === '$apply' || phase === '$digest') {
        if (fn && (typeof (fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };
  }])
  .run(['DonationService', function (DonationService) {
    window.userDonationCb = function (donationObject) {
      DonationService.userDonated(donationObject);
    };
  }]);

angular.module('mean.system', []);
angular.module('mean.directives', []);
