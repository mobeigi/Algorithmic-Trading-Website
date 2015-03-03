var app = angular.module("appDownload", []);

app.controller("VersionController", function($scope, $http) {

  $scope.deployments = [];
  
  //Retrieve all build versions
  var data = $http.get('json/versions.json');

  //Push required fields onto array
  data.forEach(function(item1) {
    item1.links.forEach(function(item2) {
      $scope.deployments.push({
        short_descr: item1.short_descr,
        link: item2.link,
        os: item2.os
      });
    });
  })
  
});
