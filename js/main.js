'use strict';

/*
  ПЛАН ДЕЙСТВИЙ:

  [+] Написать функцию для создания массива из 8 сгенерированных объектов
  [+] У блока .map убрать класс .map--faded
  [+] Создать DOM-элементы наоснове данных из массива объектов, соответствующие меткам на карте, и заполнить данными
  [+] Отрисовать сгенерированные DOM-элементы в блок .map__pins, Использовать DocumentFragment

  [+] Функция генерации случайных данных
  [+] Функция создания DOM-элемента на основе объекта
  [+] Функция заполнения блока DOM-элементами на основе массива объектов
*/

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');

document.querySelector('.map').classList.remove('map--faded');

var getLocationX = function () {
  // от ширины контенера .map__pins
  return Math.floor(Math.random() * mapPins.offsetWidth);
};

var getLocationY = function () {
  // от 130 до 630
  return Math.floor(Math.random() * 500) + 130;
};

var getOfferType = function () {
  var offerTypeArr = ['palace', 'flat', 'house', 'bungalo'];

  return offerTypeArr[Math.floor(Math.random() * 4)];
};

var getOfferTime = function () {
  return (Math.floor(Math.random() * 2) * 12) + ':00';
};

var getOfferFeatures = function () {
  var offerFeaturesArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var offerFeatures = [];
  for (var i = 0; i < Math.floor(Math.random() * offerFeaturesArr.length); i++) {
    offerFeatures[i] = offerFeaturesArr[i];
  }

  return offerFeatures;
};

var getOfferPhotos = function () {
  var offerPhotosArr = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var offerPhotos = [];
  for (var i = 0; i < Math.floor(Math.random() * offerPhotosArr.length); i++) {
    offerPhotos[i] = offerPhotosArr[i];
  }

  return offerPhotos;
};

// Функция генерации массива
var generatePins = function (count) {
  var pinsArr = [];
  var locationX;
  var locationY;
  var pinObj = {};
  for (var i = 0; i < count; i++) {
    locationX = getLocationX();
    locationY = getLocationY();
    // Структура объекта
    pinObj = {
      'author': {
        'avatar': 'img/avatars/user0' + (1 + i) + '.png'
      },
      'offer': {
        'title': 'заголовок предложения', // (оставил увсех одинаково)
        'address': locationX + ', ' + locationY + '',
        'price': 12345, // стоимость проживания (оставил увсех одинаково)
        'type': getOfferType(),
        'rooms': 2, // количество комнат. (оставил увсех одинаково)
        'guests': 5, // Количество гостей (оставил увсех одинаково)
        'checkin': getOfferTime(), // Время заезда
        'checkout': getOfferTime(), // Время выезда
        'features': getOfferFeatures(),
        'description': 'Строка с описанием', // (оставил увсех одинаково)
        'photos': getOfferPhotos()
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    };
    pinsArr[i] = pinObj;
    pinObj = null;
  }

  return pinsArr;
};

// Функция создания DOM-элемента на основе объекта
var renderPinElement = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  // координаты (x - половина ширины пина), (y - высота пина) чтобы указатель быт острым концом. НО РАБОТАЕТ СТРАННО
  pinElement.style = 'left: ' + (pin.location.x - 25) + 'px; top: ' + (pin.location.y - 70) + 'px;';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;

  return pinElement;
};

// Функция заполнения блока элементами
var setPinElements = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < arr.length; j++) {
    fragment.appendChild(renderPinElement(arr[j]));
  }

  return fragment;
};

// Вызов генерации массиваобъекта с данными
var pins = generatePins(8);

// Отрисовка обектов в контенер на страницу
mapPins.appendChild(setPinElements(pins));
