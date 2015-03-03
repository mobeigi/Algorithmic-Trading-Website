(function(angular) {
  'use strict';

var app = angular.module('appDownload', []);

app.controller("VersionController", function($scope, $http) {
    $http.get('http://www.w3schools.com/website/Customers_JSON.php').success(function(data, status, headers, config) {$scope.test = data;});
});