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
  //Load a website into the content div
  $scope.loadContent = function(webpageName) {
    $http.get("includes/".concat(webpageName)).
    success(function(data, status, headers, config) {
      $scope.content = $sce.trustAsHtml(data);
      //$compile($scope.content)($scope);
    });
  };
});

app.directive('compile', ['$compile', function ($compile) {
    return function(scope, element, attrs) {
        var ensureCompileRunsOnce = scope.$watch(function(scope) {
            return $sce.parseAsHtml(attrs.compile)(scope);
        },
        function(value) {
            // when the parsed expression changes assign it into the current DOM
            element.html(value);

            // compile the new DOM and link it to the current scope.
            $compile(element.contents())(scope);

            // Use un-watch feature to ensure compilation happens only once.
            ensureCompileRunsOnce();
        });
    };
}])