'use strict';

(function () {

  function returnFocusToIcon() {
    document.querySelector('.setup-open-icon').focus();
  }

  returnFocusToIcon();

  window.initSetup(returnFocusToIcon);

  function fillElement(element, color) {
    element.style.fill = color;
  }

  function changeElementBackground(element, color) {
    element.style.backgroundColor = color;
  }

  function getCurrentFill(element) {
    var elementStyles = getComputedStyle(element);
    return elementStyles.fill;
  }

  function getCurrentBgColor(element) {
    var elementStyles = getComputedStyle(element);
    return elementStyles.backgroundColor;
  }

  // Раскрашивание волшебника: по клику и клавиатуре
  window.setNewColor.colorizeElement(document.querySelector('#wizard-coat'), [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ], getCurrentFill, fillElement);

  window.setNewColor.colorizeElement(document.querySelector('#wizard-eyes'), [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ], getCurrentFill, fillElement);

  window.setNewColor.colorizeElement(document.querySelector('.setup-fireball-wrap'), [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ], getCurrentBgColor, changeElementBackground);

})();
