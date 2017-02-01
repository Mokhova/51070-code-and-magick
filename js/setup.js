'use strict';

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
  var list = document.querySelector('.setup').classList;
  return list.contains('invisible') ? list.remove('invisible') : list.add('invisible');
}

document.querySelector('.setup-open').addEventListener('click', toggleSetupView);
document.querySelector('.setup-close').addEventListener('click', toggleSetupView);

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

document.querySelector('.setup-submit').addEventListener('click', validateEmpty);
