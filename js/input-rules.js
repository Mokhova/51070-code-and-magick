'use strict';

window.ifValidDo = (function () {
  var gamerName = document.querySelector('.setup-user-name');
  gamerName.required = true;
  gamerName.max = 50;

  // Сообщение к невалидному полю
  function validateEmptyMessage() {
    if (gamerName.validity.valueMissing) {
      gamerName.setCustomValidity('Назовись, о великий маг!');
    } else {
      gamerName.setCustomValidity('');
    }
  }

  return function (action, evt) {
    if (!gamerName.validity.valid) {
      validateEmptyMessage();
    } else {
      action(evt);
    }
  };

})();
