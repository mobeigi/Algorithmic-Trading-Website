var app = angular.module("appDownload", []);

app.controller("VersionController", function($scope, $http) {
  $http.get('json/versions.json').
    success(function(data, status, headers, config) {
      $scope.deployments = data;
    });
});