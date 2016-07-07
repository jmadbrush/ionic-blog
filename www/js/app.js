(function() {

  var app = angular.module('myblog', ['ionic', 'angularMoment']);

  app.controller('BlogCtrl', function($http, $scope) {
    $scope.stories = [];

    function loadStories(params, callback) {
      $http.get('https://justspeaklife.org/?page_id=21&json=1', {params: params})
        .success(function(response) {
            callback(response.posts);
            angular.forEach(response.posts, function(post) {
              $scope.stories.push(item.slug);
          });
        });


    }


    $scope.loadOlderStories = function() {
      var params = {};
      if ($scope.stories.length > 0) {
        params['after'] = $scope.stories[$scope.stories.length - 1].name;
      }
      loadStories(params, function(olderStories) {
        $scope.stories = $scope.stories.concat(olderStories);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    };
    $scope.loadNewerStories = function() {
      var params = {'before': $scope.stories[0].name};
      loadStories(params, function(newerStories) {
        $scope.stories = newerStories.concat($scope.stories);
        $scope.$broadcast('scroll.refreshComplete');
      });
    };

    $scope.openLink = function(url) {
      window.open(url, '_blank');
    };

  });

  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.cordova && window.cordova.InAppBrowser) {
        window.open = window.cordova.InAppBrowser.open;
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });

}());
