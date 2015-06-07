'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', []);

appControllers.controller('MinesweeperController',
 ['$scope', function ($scope) {
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

    placeManyRandomMines(minefield);

    calculateAllNumbers(minefield);

    $scope.uncoverSpot = function(spot) {
      spot.isCovered = false;
      if(hasWon($scope.minefield)) {
        $scope.isWinMessageVisible = true;
      }
    };

    $scope.minefield = minefield;
}]);

function calculateAllNumbers(minefield) {
    for(var y = 0; y < 9; y++) {
        for(var x = 0; x < 9; x++) {
            calculateNumber(minefield, x, y);
        }
    }
}

function placeManyRandomMines(minefield) {
    for(var i = 0; i < 10; i++) {
        placeRandomMine(minefield);
    }
}

function getSpot(minefield, row, column) {
    return minefield.rows[row].spots[column];
}

function placeRandomMine(minefield) {
    var row = Math.round(Math.random() * 8);
    var column = Math.round(Math.random() * 8);
    var spot = getSpot(minefield, row, column);
    spot.content = "mine";
}

function calculateNumber(minefield, row, column) {
  var spot = getSpot(minefield, row,column);
  var otherSpots;

  if(spot.content === 'mine') {
    return;
  }

  var mineCount = 0;

  // Check row above if not the frst row
  if (row > 0) {
    // check column to left if not the first column
    if (column > 0) {
      // get spot above and to the left
      otherSpots = getSpot(minefield, row -1, column -1);
      if (otherSpots.content === 'mine') {
        mineCount++;
      }
    }
    // get spot directly above
    otherSpots = getSpot(minefield, row -1, column);
    if (otherSpots.content === 'mine') {
      mineCount++;
    }

    // get column to right if not the last column
    if (column < 8) {
      // get spot above and to the right
      otherSpots = getSpot(minefield, row -1, column + 1);
      if (otherSpots.content === 'mine') {
        mineCount++;
      }
    }
  }
  // get column to the left if not the first column
  if (column > 0) {
    // get the spot to the left
    otherSpots = getSpot(minefield, row, column - 1);
    if (otherSpots.content === 'mine') {
      mineCount++;
    }
  }
  // get column to the right if not the last column
  if (column < 8) {
    // get spot to the right
    otherSpots = getSpot(minefield, row, column + 1);
    if (otherSpots.content === 'mine') {
      mineCount++;
    }
  }
  // get row below if not the last row
  if (row < 8) {
    // get column to the left if not the first column
    if (column > 0) {
      // get spot below and to the left
      otherSpots = getSpot(minefield, row + 1, column - 1);
      if (otherSpots.content === 'mine') {
        mineCount++;
      }
    }
    // get spot directly below
    otherSpots = getSpot(minefield, row + 1, column);
    if (otherSpots.content === 'mine') {
      mineCount++;
    }
    // get column to the right if not last column
    if (column < 8) {
      otherSpots = getSpot(minefield, row + 1, column + 1);
      if (otherSpots.content === 'mine') {
        mineCount++;
      }
    }
  }

  if (mineCount > 0) {
    spot.content = mineCount;
  }
}

function hasWon(minefield) {
    for(var y = 0; y < 9; y++) {
        for(var x = 0; x < 9; x++) {
            var spot = getSpot(minefield, y, x);
            if(spot.isCovered && spot.content != "mine") {
                return false;
            }
        }
    }

    return true;
}






