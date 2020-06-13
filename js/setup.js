'use strict';

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var CHARACTERS_NUMBER = 4;

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

var charactersDisplay = userDialog.querySelector('.setup-similar-list');

var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};

var getRandomArrayElement = function (array) {
  return array[getRandomNumber(0, array.length)];
};

var getFullName = function (names, surnames) {
  return (getRandomArrayElement(names) + ' ' + getRandomArrayElement(surnames));
};

var makeMeAWizard = function (names, surnames, coats, eyes) {
  var randomWizard = {
    name: getFullName(names, surnames),
    coatColor: getRandomArrayElement(coats),
    eyesColor: getRandomArrayElement(eyes)
  };

  return randomWizard;
};

var generateWizardsArray = function (quantity) {
  var array = [];

  for (var i = 0; i < quantity; i++) {
    array.push(makeMeAWizard(FIRST_NAMES, LAST_NAMES, COAT_COLORS, EYE_COLORS));
  }

  return array;
};

var similarWizardsTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var singleWizard = similarWizardsTemplate.cloneNode(true);
  singleWizard.querySelector('.setup-similar-label').textContent = wizard['name'];
  singleWizard.querySelector('.wizard-coat').style.fill = wizard['coatColor'];
  singleWizard.querySelector('.wizard-eyes').style.fill = wizard['eyesColor'];

  return singleWizard;
};

var renderWizards = function (array) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderWizard(array[i]));
  }

  return fragment;
};


var wizards = generateWizardsArray(CHARACTERS_NUMBER);
charactersDisplay.appendChild(renderWizards(wizards));
