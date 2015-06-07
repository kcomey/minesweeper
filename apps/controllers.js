'use strict';

/* Controllers */
/*
appControllers.controller('MinesweeperController', ['$scope',
  'placeRandomMineService',
  function ($scope, placeRandomMineService) {*/

var appControllers = angular.module('appControllers', []);

appControllers.controller('MinesweeperController', ['$scope',
  function ($scope) {
    var minefield = {};
    minefield.rows = [];

    for(var i = 0; i < 9; i++) {
        var row = {};
        row.spots = [];

        for(var j = 0; j < 9; j++) {
            var spot = {};
            spot.isCovered = true;
            spot.content = "empty";
            row.spots.push(spot);
        }

        minefield.rows.push(row);
    }


    //placeRandomMineService(minefield);

    $scope.minefield = minefield;
}]);




