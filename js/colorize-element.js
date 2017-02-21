'use strict';

window.setNewColor = (function () {

  // Конвертация цвтеа, полученного из css-свойства в rgb
  function rgbToHex(color) {
    var nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(color);
    if (!nums) {
      return color;
    }
    var r = parseInt(nums[2], 10).toString(16);
    var g = parseInt(nums[3], 10).toString(16);
    var b = parseInt(nums[4], 10).toString(16);

    return '#' + (
          (r.length === 1 ? '0' + r : r) +
          (g.length === 1 ? '0' + g : g) +
          (b.length === 1 ? '0' + b : b)
        );
  }

  return {
    colorizeElement: function (element, colors, cb1, cb2) {
      var currentColor = rgbToHex(cb1);

      function generateColor() {
        var newColor = window.utils.getRandomElementExcept(colors, currentColor);
        cb2(element, newColor);
        currentColor = newColor; // сохраняю новое состояние
      }

      element.addEventListener('click', generateColor);

      element.addEventListener('keydown', function (evt) {
        window.onKeys.enterPressHandler(evt, generateColor);
      });
    }
  };
})();
