'use strict';

window.initSetup = (function () {
  var setup = document.querySelector('.overlay');
  var setupOpen = document.querySelector('.setup-open');
  var setupIcon = setupOpen.querySelector('.setup-open-icon');
  var setupSubmit = setup.querySelector('.setup-submit');
  var setupClose = setup.querySelector('.setup-close');
  var returnFocus = null;

  function callReturnFocus() {
    if (typeof returnFocus === 'function') {
      returnFocus();
    }
  }

  // Открыть/закрыть профиль волшебника
  function toggleSetupView() {
    var list = setup.classList;
    return list.contains('invisible') ? list.remove('invisible') : list.add('invisible');
  }

  function keyToggleSetupView(evt) {
    window.onKeys.enterPressHandler(evt, toggleSetupView);
    window.onKeys.toggleARIAPressed(evt, setupIcon);
  }

  function keyCloseSetup(evt) {
    keyToggleSetupView(evt);
    callReturnFocus();
  }

  // Закрытие по escape: скрываю оверлей, удалаяю обработчик по escape
  function closeByEscape(evt) {
    if (window.onKeys.pressedEscapeKey(evt)) {
      setup.classList.add('invisible');
      window.onKeys.toggleARIAPressed(evt, setupIcon);
      document.removeEventListener('keydown', closeByEscape);
      callReturnFocus();
    }
  }

  return function (cb) {
    returnFocus = cb;

    // Открытие и закрытие по клику
    setupOpen.addEventListener('keydown', function (evt) {
      keyToggleSetupView(evt);
      document.addEventListener('keydown', closeByEscape);
    });

    setupClose.addEventListener('keydown', function (evt) {
      keyCloseSetup(evt);
    });

    setupSubmit.addEventListener('click', function (evt) {
      window.ifValidDo(keyCloseSetup, evt);
    });

    // Открытие и закрытие по клику
    setupOpen.addEventListener('click', toggleSetupView);
    setupClose.addEventListener('click', toggleSetupView);
    setupSubmit.addEventListener('click', function () {
      window.ifValidDo(toggleSetupView);
    });
  };

})();
