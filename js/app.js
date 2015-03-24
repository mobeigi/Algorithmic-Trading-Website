var app = angular.module("revitpoWeb", []);

app.controller("VersionController", function($scope, $sce, $http, $window, $document) {

  //Used to store deployment info, descriptions in scope
  $scope.deployments = [];
  $scope.descriptions = [];
  
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
          
          $scope.descriptions.push({
          link: item2.link,
          changes: item1.changes,
          description: item1.description,
          date: item1.date
        });
      });
    });
  });
  
  //Function used to trigger file download by means of redirection (window.location)
  $scope.downloadFile = function(deploymentURL) {
    if(typeof deploymentURL === 'undefined' || deploymentURL=="") {
      alert("Please select a deployment version and operating system.");
    }
    else {
      $window.location.href = "/".concat(deploymentURL);
    }
  };
  
  //Function used to display build info once program version is selected
  $scope.showBuildInfo = function(deploymentURL) {
      if(typeof deploymentURL === 'undefined' || deploymentURL=="") {
          $scope.info_description =  $sce.trustAsHtml("Please select a version.");
          $scope.info_changes =  $sce.trustAsHtml("Please select a version.");
      }
      
      $scope.descriptions.forEach(function(data) {
         if (data.link == deploymentURL) {
             $scope.info_description =  $sce.trustAsHtml("<strong>Date: </strong>" + data.date + "<br />" + data.description);
             $
             $scope.info_changes =  $sce.trustAsHtml("<li>" + data.changes.replace('|', '</li><li>') + "</li>");
         }
      });
  };
  
  //Set default description and change box values
  $scope.info_description =  $sce.trustAsHtml("Please select a version.");
  $scope.info_changes =  $sce.trustAsHtml("Please select a version.");
    
});

//Viewer controller is used to dynamically load each page
app.controller("ViewerController", ['$scope','$sce', '$http', '$compile', function ViewerController($scope, $sce, $http, $compile) {
  
  //Load a website into the content div
  $scope.loadContent = function(webpageName) {
    $http.get("includes/".concat(webpageName)).
    success(function(data, status, headers, config) {
      $scope.content =  $sce.trustAsHtml(data);
    });
  };
}]).directive('compile', function($compile, $parse) {
  return {
    link: function(scope, element, attr) {
      var parsed = $parse(attr.ngBindHtml);

      function getStringValue() {
        return (parsed(scope) || '').toString();
      }

      //Recompile if the template changes
      scope.$watch(getStringValue, function() {
        $compile(element, null, -9999)(scope); //The -9999 makes it skip directives so that we do not recompile ourselves
      });
    }
  };
});