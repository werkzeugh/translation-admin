// Generated by CoffeeScript 1.6.2
var app;

app = angular.module("translation-admin", ['ui.tinymce']);

app.controller('MainCtrl', [
  '$scope', '$location', '$http', '$filter', '$sce', '$timeout', function($scope, $location, $http, $filter, $sce, $timeout) {
    $scope.app = {};
    $scope.query = {};
    $scope.settings = {};
    $scope.app.currentExpandedItem = null;
    $scope.updateUrl = function(args) {
      var q;

      if (args == null) {
        args = {};
      }
      q = $scope.getQueryParams();
      if (window.console && console.log) {
        console.log("updateUrl", args, q);
      }
      if (args.path != null) {
        if (!$scope.startsWith($location.path(), args.path)) {
          $location.path(args.path);
        }
        if (args.path === 'empty') {
          $location.path('');
        }
      }
      return $location.search(q);
    };
    $scope.$watch((function() {
      return $location.url();
    }), function(url) {
      if (url) {
        return $scope.updateQueryFromUrl();
      }
    });
    $scope.getQueryParams = function() {
      var key, params, value, _ref;

      params = {};
      _ref = $scope.query;
      for (key in _ref) {
        value = _ref[key];
        if (key !== 'daterange' && key !== 'datestr') {
          params[key] = value;
        }
      }
      return params;
    };
    $scope.updateQueryFromUrl = function() {
      var currentQuerystring, itemid, key, newquery, pathparts, val;

      if (window.console && console.log) {
        console.log("updateQueryFromUrl", $location.search());
      }
      newquery = $location.search();
      for (key in newquery) {
        val = newquery[key];
        $scope.query[key] = (val === "null" ? null : val);
      }
      currentQuerystring = JSON.stringify($scope.getQueryParams());
      if ($scope.oldQueryString !== currentQuerystring) {
        $scope.$broadcast('update_listing');
      }
      $scope.oldQueryString = currentQuerystring;
      pathparts = $location.path().split('/');
      if (pathparts.length) {
        itemid = pathparts[1];
      }
      return $timeout(function() {
        if (!$scope.app.currentExpandedItem) {
          if (window.console && console.log && itemid) {
            console.log('expand_item', itemid);
          }
          if (itemid) {
            return $scope.$broadcast('expand_item', itemid);
          }
        }
      }, 1000);
    };
    $scope.startsWith = function(str1, str2) {
      var ret;

      ret = str1.slice(0, str2.length) === str2;
      return ret;
    };
    return $scope.init = function(settings) {
      $scope.settings = settings;
      if (window.console && console.log) {
        return console.log("inited", $scope.settings);
      }
    };
  }
]);

app.config([
  '$locationProvider', function($locationProvider) {
    return $locationProvider.html5Mode(false);
  }
]);

/*
//@ sourceMappingURL=translation-admin.map
*/
