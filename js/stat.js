'use strict';

// Облако
function drawCloud(ctx, x, y, width, height) {
    var stepHor = width / 6,
        yMiddle = y + height / 2,
        yTop = y + 10,
        yBottom = y + height - 5,
        xRight = x + width,
        xOneThird = x + width / 3,
        xTwoThird = x + width / 3 * 2,
        yBottom35 = y + height + 35;

    ctx.beginPath();

    // Верх
    ctx.bezierCurveTo(x, yTop, x + stepHor, y - 20, xOneThird, yTop);
    ctx.bezierCurveTo(xOneThird, yTop, x + stepHor * 3, y - 30, xTwoThird, yTop);
    ctx.bezierCurveTo(xTwoThird, yTop, x + stepHor * 5, y - 20, xRight, yTop);

    // Право
    ctx.bezierCurveTo(xRight, yTop, xRight + 100, yMiddle, xRight, yBottom - 5);

    // Низ
    ctx.bezierCurveTo(xRight, yBottom - 5, x + stepHor * 5, yBottom35, xTwoThird, yBottom);
    ctx.bezierCurveTo(xTwoThird, y + height, x + stepHor * 3, yBottom35, xOneThird, yBottom);
    ctx.bezierCurveTo(xOneThird, yBottom, x + stepHor, yBottom35, x, yBottom - 5);

    // лево
    ctx.bezierCurveTo(x, yBottom - 5, x - 100, yMiddle, x, yTop);

    // заливка
    ctx.fill();
}

// Рисует текст
function drawText(ctx, x, y) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура вы победили!', x + 80, y + 32);
    ctx.fillText('Список результатов:', x + 80, y + 52);
}

// Рандомная яркость с красивым синим
function randomBrightness() {
    var brightness = Math.random().toFixed(1);
    if (brightness < 0.1) return 'rgba(0, 125, 239, 0.2)';
    return 'rgba(0, 125, 239, ' + brightness + ')';
}

// Красит статистику играющего в красный
function whatColor(iName) {
    return iName === 'Вы' ? 'rgba(242, 52, 0, 1)' : randomBrightness();
}

// Нахождение максимума
function findMaximum(times) {
    var maxTime = times[0];
    for (var i = 1; i < times.length; i++) {
        if (maxTime < times[i]) {
            maxTime = times[i];
        }
    }
    return maxTime;
}

window.renderStatistics = function (ctx, names, times) {
    var x = 100,
        y = 10,
        width = 420,
        height = 270,
        gap = 90,
        statHeight = 140; // вычла 10 из высоты, чтобы текст не прилипал к столбцам

    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    drawCloud(ctx, x + 45, y + 5, width, height);

    ctx.fillStyle = '#fff';
    drawCloud(ctx, x + 40, y, width, height);

    drawText(ctx, x, y);

    var stepForGraph = statHeight / findMaximum(times);

    for (var i = 0; i < times.length; i++) {
        var iTime = Math.round(times[i]),
            iName = names[i],
            oneBarHeight = stepForGraph * iTime,
            xMargin = x + 80 + gap * i,
            bottomAlign = y + statHeight - oneBarHeight;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillText(iTime, xMargin, bottomAlign + 80);

        ctx.fillStyle = whatColor(iName);
        ctx.fillRect(xMargin, bottomAlign + 90, 40, oneBarHeight);

        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillText(iName, xMargin, 260);
    }
};
