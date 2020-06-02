'use strict';

var CLOUD_X = 150;
var CLOUD_Y = 10;
var CLOUD_HEIGHT = 270;
var CLOUD_WIDTH = 420;
var SHIFT = 10;

var BAR_MAX_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_SHIFT = 50;

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

var getColor = function(element) {
  if (element == 'Вы') {
    return 'rgba(255, 0, 0, 1)';
  } else {
    var randomShadeOfBlue = 'hsl(240, ' + Math.round(Math.random()*100) + '%, 50%)';
    return randomShadeOfBlue;
  }
}

var getMaxValue = function(array) {
  var maxValue = array[0];
  for (var i = 1; i < array.length; i++)
    if (array[i] > maxValue) {
      maxValue = array[i]
    }
  return Math.round(maxValue);
}

var getBarHeight = function(i, array) {
  var currentTime = Math.round(array[i])
  var maxTime = getMaxValue(array)
  var currentBarHeight =  Math.round(BAR_MAX_HEIGHT * currentTime / maxTime);
  return currentBarHeight;
}

window.renderStatistics = function(ctx, players, times) {
  renderCloud(ctx, CLOUD_X + SHIFT, CLOUD_Y + SHIFT, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000000';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + SHIFT, CLOUD_Y + SHIFT);
  ctx.fillText('Список результатов:', CLOUD_X + SHIFT, CLOUD_Y + SHIFT*3);

  for (var i = 0; i < players.length; i++) {
   ctx.fillStyle = '#000000';
   ctx.fillText(players[i], CLOUD_X + BAR_SHIFT*(i+1) + BAR_WIDTH*i, CLOUD_HEIGHT - SHIFT);
   ctx.fillStyle = getColor(players[i]);
   ctx.fillRect(CLOUD_X + BAR_SHIFT*(i+1) + BAR_WIDTH*i, CLOUD_HEIGHT - SHIFT*3, BAR_WIDTH, -(getBarHeight(i, times)));
  }
}
