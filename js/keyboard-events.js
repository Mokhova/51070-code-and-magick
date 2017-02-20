'use strict';

window.onKeys = (function () {
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;

  return {
    // Ловим нажатие на enter
    pressedEnterKey: function (evt) {
      return evt.target && evt.keyCode === ENTER_KEY_CODE;
    },
    // Ловим нажатие на escape
    pressedEscapeKey: function (evt) {
      return evt.target && evt.keyCode === ESCAPE_KEY_CODE;
    },

    // По нажатие на enter совершаем переданное действие
    enterPressHandler: function (evt, action) {
      if (window.onKeys.pressedEnterKey(evt)) {
        action();
      }
    },

    // Меняем атбрибут aria-pressed для роли «кнопка»
    toggleARIAPressed: function (evt, element) {
      if (window.onKeys.pressedEnterKey(evt)) {
        var pressed = (element.getAttribute('aria-pressed') === 'true');
        element.setAttribute('aria-pressed', !pressed);
      }
    }
  };
})();
