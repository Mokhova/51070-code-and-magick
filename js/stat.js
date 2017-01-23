'use strict';

 // ОБЛАКО
function drawCloud(ctx, x, y, width, height, needText) {
  var stepHor = width / 6;
  var stepVer = height / 4;

  ctx.beginPath();

  // верх
  ctx.bezierCurveTo(x, y + 10, x + stepHor, y - 20, x + stepHor * 2, y + 10);
  ctx.bezierCurveTo(x + stepHor * 2, y + 10, x + stepHor * 3, y - 30, x + stepHor * 4, y + 10);
  ctx.bezierCurveTo(x + stepHor * 4, y + 10, x + stepHor * 5, y - 20, x + width, y + 10);

  // право
  ctx.bezierCurveTo(x + width, y + 10, x + width + 100, y + stepVer * 2, x + width, y + height - 10);
  // ctx.bezierCurveTo(x + width, y + 10, x + width + 50, y + stepVer , x + width + 30, y + stepVer * 2);
  // ctx.bezierCurveTo(x + width + 30, y + stepVer * 2, x + width + 50, y + stepVer * 3, x + width, y + height - 10);

  // низ
  ctx.bezierCurveTo(x + width, y + height - 10, x + stepHor * 5, y + 35 + height, x + stepHor * 4, y + height - 5);
  ctx.bezierCurveTo(x + stepHor * 4, y + height, x + stepHor * 3, y + 35 + height, x + stepHor * 2, y + height - 5);
  ctx.bezierCurveTo(x + stepHor * 2, y + height - 5, x + stepHor, y + 35 + height, x, y + height - 10);

  // лево
  ctx.bezierCurveTo(x, y + height - 10, x - 100, y + stepVer * 2, x, y + 10);

  // заливка
  ctx.fill();

  if (needText) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура вы победили!', x + 40, y + 32);
    ctx.fillText('Список результатов:', x + 40, y + 52);
  }
}

// РАНДОМНАЯ ЯРКОСТЬ
function randomBrightness() {
  var brightness = Math.random().toFixed(1);
  if (brightness <= 0.1) {
    brightness = 0.2;
  }
  var rgba = [0, 152, 239, brightness];
  return 'rgba(' + rgba.join(', ') + ')';
}

// КРАСИТ СТАТИСТИКУ ИГРАЮЩЕГО
function whatColor(iName) {
  if (iName == 'Вы') {
    return 'rgba(242, 53, 87, 1)';
  } else {
    return randomBrightness();
  }
}

window.renderStatistics = function (ctx, names, times) {
  var x = 100, y = 10;
  var gap = 90, width = 420, height = 270, statHeight = 140;  // Вычла 10 из высоты, чтобы шрифты не прилипали

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  drawCloud(ctx, x + 45, y + 5, width, height, 0);

  ctx.fillStyle = '#fff';
  drawCloud(ctx, x + 40, y, width, height, 1);


  var maxTime = times[0];
  for (var i = 1; i < times.length; i++) {
    if (maxTime < times[i]) {
      maxTime = times[i];
    }
  }

  var stepForGraph = statHeight / maxTime;

  for (var i = 0; i < times.length; i++) {
    var iTime = Math.round(times[i]);
    var iName = names[i];
    var oneBarHeight = stepForGraph * iTime;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillText(iTime, x + 80 + gap * i, y + 80 + statHeight - oneBarHeight);

    ctx.fillStyle = whatColor(iName);
    ctx.fillRect(x + 80 + gap * i, y + 90 + statHeight - oneBarHeight, 40, oneBarHeight);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillText(names[i], x + 80 + gap * i, 260);
  }
};

var canvas = document.querySelector('canvas');
window.renderStatistics(canvas.getContext('2d'), NAMES, times);
