'use strict';

var setup = document.querySelector('.overlay');
var setupOpen = document.querySelector('.setup-open');
var setupIcon = setupOpen.querySelector('.setup-open-icon');
var setupSubmit = setup.querySelector('.setup-submit');
var setupClose = setup.querySelector('.setup-close');
var ESCAPE_KEY_CODE = 27;
var gamerName = document.querySelector('.setup-user-name');
gamerName.required = true;
gamerName.max = 50;

// Цвета волшебника
var wizardCoatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var wizardEyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
var fireballColors = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

// Открыть/закрыть профиль волшебника по клику
function toggleSetupView() {
  var list = setup.classList;
  return list.contains('invisible') ? list.remove('invisible') : list.add('invisible');
}

setupOpen.addEventListener('click', toggleSetupView);
setupClose.addEventListener('click', toggleSetupView);
setupSubmit.addEventListener('click', toggleSetupView);

// Если нажали на escape, скрываю оверлей, удалаяю обработчик по escape
function closeByEscape(evt) {
  if (evt.keyCode === ESCAPE_KEY_CODE) {
    setup.classList.add('invisible');
    window.toggleARIAPressed(setupIcon);
    document.removeEventListener('keydown', closeByEscape);
  }
}

function keyToggleSetupView(evt) {
  toggleSetupView();
  window.toggleARIAPressed(setupIcon);
}

setupOpen.addEventListener('keydown', function (evt) {
  if (window.pressedEnterKey(evt)) {
    keyToggleSetupView(evt);
  }
  document.addEventListener('keydown', closeByEscape);
});

window.enterPressHandler(setupClose, keyToggleSetupView);
window.enterPressHandler(setupSubmit, keyToggleSetupView);

// Раскрашивание волшебника: по клику и клавиатуре
window.colorizeElement(document.querySelector('#wizard-coat'), wizardCoatColors, 'fill');
window.colorizeElement(document.querySelector('#wizard-eyes'), wizardEyesColors, 'fill');
window.colorizeElement(document.querySelector('.setup-fireball-wrap'), fireballColors, 'backgroundColor');

// Валидация поля
function validateEmpty() {
  if (gamerName.validity.valueMissing) {
    gamerName.setCustomValidity('Назовись, о великий маг!');
  } else {
    gamerName.setCustomValidity('');
  }
}

setupSubmit.addEventListener('click', validateEmpty);
