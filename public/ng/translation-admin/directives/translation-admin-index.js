// Generated by CoffeeScript 1.6.2
angular.module("translation-admin").directive("translationAdminIndex", function() {
  return {
    restrict: "A",
    replace: true,
    templateUrl: '/packages/werkzeugh/translation-admin/ng/translation-admin/partials/translation-admin-index.html',
    scope: true,
    link: function(scope, element, attrs) {},
    controller: [
      "$scope", "$element", "$attrs", "$timeout", "$filter", "$http", "$q", function($scope, $element, $attrs, $timeout, $filter, $http, $q) {
        $scope.items = {};
        $scope.ngBaseUrl = $attrs.ngBaseUrl;
        $scope.listmode = 'loading';
        $scope.items = [];
        $scope.available_languages = [];
        $scope.query = {
          'lang1': 'de',
          'lang2': 'en'
        };
        $scope.getItemForId = function(id) {
          var filterFilter, res;

          filterFilter = $filter('filter');
          res = filterFilter($scope.items, {
            lang1_id: id
          });
          if (res.length) {
            return res[0];
          } else {
            return null;
          }
        };
        $scope.refreshListing = function() {
          $scope.updateUrl();
          return $http.post($scope.settings.baseUrl + "/ng-items", {
            query: $scope.query
          }).then(function(response) {
            $scope.items = response.data.items;
            $scope.available_languages = response.data.available_languages;
            if (window.console && console.log) {
              console.log("items loaded", $scope.items);
            }
            $scope.listmode = "loaded";
            if ($scope.items.length === 0) {
              $scope.listmode = "empty";
            }
            return $scope.updateQueryFromUrl();
          });
        };
        return $scope.refreshListing();
      }
    ]
  };
});

/*
//@ sourceMappingURL=translation-admin-index.map
*/
