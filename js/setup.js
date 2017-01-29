'use strict';

// Открыть/закрыть лайтбокс профиля
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

function toggleView(element, property) {
  element.addEventListener('click', function () {
    setup.classList.toggle(property);
  });
}
toggleView(setupOpen, 'invisible');
toggleView(setupClose, 'invisible');

// Валидация поля
var gamerName = document.querySelector('.setup-user-name');
var submitSetup = setup.querySelector('.setup-submit');
gamerName.required = true;
gamerName.max = 50;

function validateEmpty() {
  if (!gamerName.validity.valid) {
    if (gamerName.validity.valueMissing) {
      gamerName.setCustomValidity('Назовись, о великий маг!');
    } else {
      gamerName.setCustomValidity('');
    }
  }
}
submitSetup.addEventListener('click', validateEmpty);

// Раскраска волшебника
function generateColor(element, property, colorsArray) {
  element.addEventListener('click', function () {
    var randomCounter = Math.floor(Math.random() * colorsArray.length);
    element.style[property] = colorsArray[randomCounter];
  });
}

// Красим пальто
var wizard = document.querySelector('#wizard');
var wizardCoat = wizard.querySelector('#wizard-coat');
var wizardCoatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
generateColor(wizardCoat, 'fill', wizardCoatColors);

// Красим глаза
var wizardEyes = wizard.querySelector('#wizard-eyes');
var wizardEyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
generateColor(wizardEyes, 'fill', wizardEyesColors);

// Красим фаербол
var fireball = setup.querySelector('.setup-fireball-wrap');
var fireballColors = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];
generateColor(fireball, 'backgroundColor', fireballColors);
