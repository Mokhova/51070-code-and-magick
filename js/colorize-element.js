'use strict';

window.colorizeElement = function (element, colors, cssProperty) {
  var elementStyles = getComputedStyle(element);
  var currentColor = elementStyles[cssProperty]; // Сохраняет текущее состояние, цвет в rgb
  function generateColor() {
    var newColor = window.utils.getRandomElementExcept(colors, currentColor);
    element.style[cssProperty] = newColor;
    currentColor = newColor; // сохраняю новое состояние
  }

  element.addEventListener('click', generateColor);
  window.enterPressHandler(element, generateColor);
};
