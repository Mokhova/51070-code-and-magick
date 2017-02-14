'use strict';

var ENTER_KEY_CODE = 13;

// По нажатие на enter совершаем переданное действие
window.enterPressHandler = function (evt, action) {
  if (window.pressedEnterKey(evt)) {
    action(evt);
  }
};

// Ловим нажатие на enter
window.pressedEnterKey = function (evt) {
  return evt.target && evt.keyCode === ENTER_KEY_CODE;
};

// Меняем атбрибут aria-pressed для роли «кнопка»
window.toggleARIAPressed = function (element) {
  var pressed = (element.getAttribute('aria-pressed') === 'true');
  element.setAttribute('aria-pressed', !pressed);
};
