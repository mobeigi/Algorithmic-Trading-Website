var app = angular.module("revitpoWeb", []);

app.controller("VersionController", function($scope, $http, $window, $document) {

  $scope.deployments = [];
  
  //Retrieve all build versions
  $http.get('json/versions.json').
  success(function(data, status, headers, config) {
    //Push required fields onto array
    data.forEach(function(item1) {
      item1.links.forEach(function(item2) {
        $scope.deployments.push({
          short_descr: item1.short_descr,
          link: item2.link,
          os: item2.os
        });
      });
    });
  });
  
  $scope.downloadFile = function(deploymentURL) {
    if(typeof deploymentURL === 'undefined') {
      alert("Please select a deployment version and operating system.");
    }
    else {
      $window.location.href = "/".concat(deploymentURL);
    }
  };
  
});

app.controller("ViewerController", ['$scope','$sce', '$http', function ViewerController($scope, $sce, $http) {
  $scope.rawHTML = "test";
  
  //Load a website into the content div
  $scope.loadContent = function(webpageName) {
    $http.get("includes/".concat(webpageName)).
    success(function(data, status, headers, config) {
      $scope.rawHTML = data;
      console.log(data);
    });
  };
  
  $scope.test = function() {
    console.log('test');
  }
}]).directive('compile', function($compile) {
	'use strict';
	return {
		restrict: 'A',
    replace: true,
		link: function (scope, element, attrs) {
        console.log("TEST");
        console.log(scope.rawHTML);
				element.html(scope.rawHTML);
        $compile(element.contents())(scope);
		}
	}
});