'use strict';

/* Controllers */

/*TODO
Put all the code in controllers, I have loose functions
Add a timer and score keeper
  <table>
    <tr><th>Score: {{ score }}</th><th>Timer: {{ timer }}</th></tr>
  <table/>
Add in the other game levels
Need a win and lose
  */

var appControllers = angular.module('appControllers', []);

appControllers.controller('MinesweeperController',
 ['$scope', function ($scope) {
    $scope.gameStarted = false;

    var level = $scope.model.id;

    var minefield = {};
    minefield.rows = [];

    for(var i = 0; i < 9; i++) {
        var row = {};
        row.spots = [];

        for(var j = 0; j < 9; j++) {
            var spot = {};
            spot.isCovered = true;
            spot.content = "empty";
            spot.location = {"row": i, "col": j};
            row.spots.push(spot);
        }

        minefield.rows.push(row);
    }

    placeManyRandomMines(minefield);

    calculateAllNumbers(minefield);

    $scope.uncoverSpot = function(spot) {
      // Adding function to turn all the other empty tiles over
      spot.isCovered = false;
      if (spot.content === "empty") {
        checkGridForEmptys(spot, minefield);
      }
      if (spot.content === "mine") {
        // you lose
        console.log('you landed on a mine');
        $scope.isLoseMessageVisible = true;
        $scope.gameStarted = true;
      }
      if(hasWon($scope.minefield)) {
        $scope.isWinMessageVisible = true;
      }
    };

    $scope.minefield = minefield;
}]);

function checkGridForEmptys(spot, minefield) {
  var row = spot.location.row;
  var column = spot.location.col;

  if(spot.content === "empty") {
      spot.isCovered = false;
  }

  // Get square directly above
  if (row > 0) {
    spot = getSpot(minefield, row -1, column);
      if ((spot.content === "empty") && (spot.isCovered === true)) {
        checkGridForEmptys(spot, minefield);
      }
   }
   // Get square up and left
   if(column > 0 && row > 0) {
    spot = getSpot(minefield, row -1, column -1);
      if ((spot.content === "empty") && (spot.isCovered === true)) {
        checkGridForEmptys(spot, minefield);
    }
  }
  // Get square up and right
   if(column < 8 && row > 0) {
    spot = getSpot(minefield, row -1, column +1);
      if ((spot.content === "empty") && (spot.isCovered === true)) {
        checkGridForEmptys(spot, minefield);
    }
  }
  // Get square to the left
  if (column > 0) {
    spot = getSpot(minefield, row, column - 1);
    if ((spot.content === 'empty') && (spot.isCovered === true)) {
      checkGridForEmptys(spot, minefield);
    }
  }
  // Get square to the right
  if (column < 8) {
    spot = getSpot(minefield, row, column + 1);
    if ((spot.content === 'empty') && (spot.isCovered === true)) {
      checkGridForEmptys(spot, minefield);
    }
  }
  // Get square below and left
  if (row < 8 && column > 0) {
    spot = getSpot(minefield, row + 1, column - 1);
      if ((spot.content === 'empty') && (spot.isCovered === true)) {
        checkGridForEmptys(spot, minefield);
      }
    }
    // Get square below
    if (row < 8) {
      spot = getSpot(minefield, row + 1, column);
        if ((spot.content === 'empty') && (spot.isCovered === true)) {
          checkGridForEmptys(spot, minefield);
        }
    }
    // Get square below and right
    if (column < 8 && row < 8) {
      spot = getSpot(minefield, row + 1, column + 1);
      if ((spot.content === 'empty') && (spot.isCovered === true)) {
       checkGridForEmptys(spot, minefield);
      }
    }
  }

function calculateAllNumbers(minefield) {
    for(var i = 0; i < 9; i++) {
        for(var j = 0; j < 9; j++) {
            calculateNumber(minefield, j, i);
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

  // Check row above if not the first row
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
    for(var i = 0; i < 9; i++) {
        for(var j = 0; j < 9; j++) {
            var spot = getSpot(minefield, i, j);
            if(spot.isCovered && spot.content != "mine") {
                return false;
            }
        }
    }
    return true;
}








