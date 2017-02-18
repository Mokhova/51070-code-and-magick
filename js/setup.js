'use strict';

var setup = document.querySelector('.overlay');
var setupOpen = document.querySelector('.setup-open');
var setupIcon = setupOpen.querySelector('.setup-open-icon');
var setupSubmit = setup.querySelector('.setup-submit');
var setupClose = setup.querySelector('.setup-close');
var gamerName = document.querySelector('.setup-user-name');
gamerName.required = true;
gamerName.max = 50;

// Открыть/закрыть профиль волшебника
function toggleSetupView() {
  var list = setup.classList;
  return list.contains('invisible') ? list.remove('invisible') : list.add('invisible');
}

function keyToggleSetupView(evt) {
  toggleSetupView();
  window.keyHandler.toggleARIAPressed(setupIcon);
}

// Закрытие по escape: скрываю оверлей, удалаяю обработчик по escape
function closeByEscape(evt) {
  if (window.keyHandler.pressedEscapeKey(evt)) {
    setup.classList.add('invisible');
    window.keyHandler.toggleARIAPressed(setupIcon);
    document.removeEventListener('keydown', closeByEscape);
  }
}

// Сообщение к невалидному полю
function validateEmptyMessage() {
  if (gamerName.validity.valueMissing) {
    gamerName.setCustomValidity('Назовись, о великий маг!');
  } else {
    gamerName.setCustomValidity('');
  }
}

// Открытие/закрытие по клику
setupOpen.addEventListener('click', toggleSetupView);
setupClose.addEventListener('click', toggleSetupView);
setupSubmit.addEventListener('click', function () {
  return !gamerName.validity.valid ? validateEmptyMessage() : toggleSetupView;
});

// Открытие/закрытие по enter
setupOpen.addEventListener('keydown', function (evt) {
  window.keyHandler.enterPressHandler(evt, keyToggleSetupView);
  document.addEventListener('keydown', closeByEscape);
});

setupSubmit.addEventListener('keydown', function (evt) {
  return !gamerName.validity.valid ? validateEmptyMessage() : window.keyHandler.enterPressHandler(evt, keyToggleSetupView);
});

setupClose.addEventListener('keydown', function (evt) {
  window.keyHandler.enterPressHandler(evt, keyToggleSetupView);
});

// Раскрашивание волшебника: по клику и клавиатуре
window.setNewColor.colorizeElement(document.querySelector('#wizard-coat'), 'fill', [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
]);

window.setNewColor.colorizeElement(document.querySelector('#wizard-eyes'), 'fill', [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
]);

window.setNewColor.colorizeElement(document.querySelector('.setup-fireball-wrap'), 'backgroundColor', [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
]);
