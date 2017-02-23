angular.module('mean.system')
  .controller(
  'HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
      title: 'Articles',
      link: 'articles'
    }, {
      title: 'create New Article',
      link: 'articles/create'
    }];
  }]);
