'use strict';

/* App Module */

var app = angular.module('app', ['appControllers']);

app.service('placeRandomMineService', function(minefield) {
  var row = Math.round(Math.random() * 8);
  var column = Math.round(Math.random() * 8);
  var spot = minefield.rows[row].spots[column];
  return spot.content = "mine";
})

