'use strict';

window.setNewColor = (function () {
  return {
    colorizeElement: function (element, cssProperty, colors) {
      var elementStyles = getComputedStyle(element);
      var currentColor = elementStyles[cssProperty]; // Сохраняет текущее состояние, цвет в rgb

      function generateColor() {
        var newColor = window.utils.getRandomElementExcept(colors, currentColor);
        element.style[cssProperty] = newColor;
        currentColor = newColor; // сохраняю новое состояние
      }

      element.addEventListener('click', generateColor);

      element.addEventListener('keydown', function (evt) {
        window.keyHandler.enterPressHandler(evt, generateColor);
      });
    },
  };
})();
