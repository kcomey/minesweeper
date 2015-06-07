'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', []);

appControllers.controller('MinesweeperController', ['$scope', function ($scope) {
  var minefield = {};
  minefield.rows = [];

  for(var i = 0; i < 9; i++) {
      var row = {};
      row.spots = [];

      for(var j = 0; j < 9; j++) {
          var spot = {};
          spot.isCovered = true;
          row.spots.push(spot);
      }

      minefield.rows.push(row);
  }

  $scope.minefield = minefield;
}]);




