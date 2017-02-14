'use strict';

window.utils = {
  getRandomElement: function (array) {
    var randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  },

  getRandomElementExcept: function (array, currentArrayElement) {
    var randomElement = window.utils.getRandomElement(array);
    while (currentArrayElement === randomElement) {
      randomElement = window.utils.getRandomElement(array);
    }
    return randomElement;
  },
};
