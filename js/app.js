var app = angular.module("appDownload", []);

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

app.controller("ViewerController", function($scope, $http, $sce, $compile) {
  $scope.rawHTML;
  
  //Load a website into the content div
  $scope.loadContent = function(webpageName) {
    $http.get("includes/".concat(webpageName)).
    success(function(data, status, headers, config) {
      $scope.content = $sce.trustAsHtml(data);
    });
  };
});

app.directive('compile', function ($compile) {
	  return {
	    restrict: 'A',
	    replace: true,
	    link: function (scope, ele, attrs) {
	      scope.$watch(attrs.dynamic, function(html) {
	        ele.html(html);
	        $compile(ele.contents())(scope);
	      });
	    }
	  };
	});
}])