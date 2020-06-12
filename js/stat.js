'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_HEIGHT = 270;
var CLOUD_WIDTH = 420;
var SHIFT = 10;

var BAR_MAX_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_SHIFT = 50;

var colorsList = {
  RED: 'rgba(255, 0, 0, 1)',
  GRAY: 'rgba(0, 0, 0, 0.7)',
  WHITE: '#fff',
  BLACK: '#000000'
};

var fonts = {
  REGULAR: '16px PT Mono'
};

var messages = {
  VICTORY: 'Ура вы победили!',
  RESULTS: 'Список результатов:'
};


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getRandomNumber = function () {
  return Math.round(Math.random() * 100);
};

var getColor = function (element) {
  if (element === 'Вы') {
    return colorsList.RED;
  } else {
    var randomShadeOfBlue = 'hsl(240, ' + getRandomNumber() + '%, 50%)';
    return randomShadeOfBlue;
  }
};

var getMaxValue = function (array) {
  var maxValue = array[0];
  for (var i = 1; i < array.length; i++) {
    if (array[i] > maxValue) {
      maxValue = array[i];
    }
  }
  return maxValue;
};

var getIntegerArray = function (array) {
  for (var i = 0; i < array.length; i++) {
    array[i] = Math.round(array[i]);
  }
  return array;
};

var getBarHeight = function (i, array) {
  var currentTime = array[i];
  var maxTime = getMaxValue(array);
  var currentBarHeight = BAR_MAX_HEIGHT * currentTime / maxTime;
  return currentBarHeight;
};

var renderSingleScore = function (ctx, players, times, playerNum) {
  ctx.fillStyle = colorsList.BLACK;
  ctx.fillText(players[playerNum], CLOUD_X + BAR_SHIFT * (playerNum + 1) + BAR_WIDTH * playerNum, CLOUD_HEIGHT - SHIFT);
  ctx.fillText(times[playerNum].toString(), CLOUD_X + BAR_SHIFT * (playerNum + 1) + BAR_WIDTH * playerNum, CLOUD_HEIGHT - (getBarHeight(playerNum, times) + BAR_SHIFT));
  ctx.fillStyle = getColor(players[playerNum]);
  ctx.fillRect(CLOUD_X + BAR_SHIFT * (playerNum + 1) + BAR_WIDTH * playerNum, CLOUD_HEIGHT - SHIFT * 3, BAR_WIDTH, -(getBarHeight(playerNum, times)));
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + SHIFT, CLOUD_Y + SHIFT, colorsList.GRAY);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, colorsList.WHITE);

  ctx.font = fonts.REGULAR;
  ctx.fillStyle = colorsList.BLACK;
  ctx.textBaseline = 'hanging';
  ctx.fillText(messages.VICTORY, CLOUD_X + BAR_SHIFT, CLOUD_Y + SHIFT);
  ctx.fillText(messages.RESULTS, CLOUD_X + BAR_SHIFT, CLOUD_Y + SHIFT * 3);

  getIntegerArray(times);

  for (var i = 0; i < players.length; i++) {
    renderSingleScore(ctx, players, times, i);
  }
};
