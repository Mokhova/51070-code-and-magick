'use strict';

var setup = document.querySelector('.overlay');
var setupOpen = document.querySelector('.setup-open');
var setupIcon = setupOpen.querySelector('.setup-open-icon');
var setupSubmit = setup.querySelector('.setup-submit');
var setupClose = setup.querySelector('.setup-close');
var ENTER_KEY_CODE = 13;
var ESCAPE_KEY_CODE = 27;

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

// Открыть/закрыть профиль волшебника
function toggleSetupView() {
  var list = setup.classList;
  return list.contains('invisible') ? list.remove('invisible') : list.add('invisible');
}

setupOpen.addEventListener('click', toggleSetupView);
setupClose.addEventListener('click', toggleSetupView);
setupSubmit.addEventListener('click', toggleSetupView);

// Открыть/закрыть профиль волшебника с КЛАВИАТУРЫ
function pressedEnterKey(evt) {
  return evt.target && evt.keyCode === ENTER_KEY_CODE;
}

// Если нажали на escape, скрываю оверлей, удалаяю обработчик по escape
function closeByEscape(evt) {
  if (evt.keyCode === ESCAPE_KEY_CODE) {
    setup.classList.add('invisible');
    toggleARIAPressed();
    document.removeEventListener('keydown', closeByEscape);
  }
}

function toggleARIAPressed() {
  var pressed = (setupIcon.getAttribute('aria-pressed') === 'true');
  setupIcon.setAttribute('aria-pressed', !pressed);
}

function keyToggleSetupView(evt) {
  if (pressedEnterKey(evt)) {
    toggleSetupView();
    toggleARIAPressed();
  }
}

setupOpen.addEventListener('keydown', function (evt) {
  keyToggleSetupView(evt);
  document.addEventListener('keydown', closeByEscape);
});

setupClose.addEventListener('keydown', function (evt) {
  keyToggleSetupView(evt);
});

setupSubmit.addEventListener('keydown', function (evt) {
  if (pressedEnterKey(evt)) {
    keyToggleSetupView(evt);
  }
});

// Определение цвета
function generateColor(evt, property, colorsArray) {
  var randomCounter = Math.floor(Math.random() * colorsArray.length);
  evt.currentTarget.style[property] = colorsArray[randomCounter];
}

document.querySelector('#wizard-coat').addEventListener('click', function (evt) {
  generateColor(evt, 'fill', wizardCoatColors);
});

document.querySelector('#wizard-eyes').addEventListener('click', function (evt) {
  generateColor(evt, 'fill', wizardEyesColors);
});

document.querySelector('.setup-fireball-wrap').addEventListener('click', function (evt) {
  generateColor(evt, 'backgroundColor', fireballColors);
});

// Валидация поля
var gamerName = document.querySelector('.setup-user-name');
gamerName.required = true;
gamerName.max = 50;

function validateEmpty() {
  if (gamerName.validity.valueMissing) {
    gamerName.setCustomValidity('Назовись, о великий маг!');
  } else {
    gamerName.setCustomValidity('');
  }
}

setupSubmit.addEventListener('click', validateEmpty);
