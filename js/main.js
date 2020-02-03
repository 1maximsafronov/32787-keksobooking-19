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

// Шаблон для маркеров
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
// карта маркеров
var mapPins = document.querySelector('.map__pins');

document.querySelector('.map').classList.remove('map--faded');

// Генерация положения маркера по горизонтали
var getLocationX = function () {
  // от ширины контенера .map__pins
  return Math.floor(Math.random() * mapPins.offsetWidth);
};

// Генерация положения маркера по вертикали
var getLocationY = function () {
  // от 130 до 630
  return Math.floor(Math.random() * 500) + 130;
};

// Генерация типа жилплощади
var getOfferType = function () {
  var offerTypeArr = ['palace', 'flat', 'house', 'bungalo'];

  return offerTypeArr[Math.floor(Math.random() * 4)];
};

// Генерация времени въезда/выезда
var getOfferTime = function () {
  return (Math.floor(Math.random() * 2) * 12) + ':00';
};

// Генерация имеющихся в квартире дополнительные особенности
var getOfferFeatures = function () {
  var offerFeaturesArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var offerFeatures = [];
  for (var i = 0; i < Math.floor(Math.random() * offerFeaturesArr.length); i++) {
    offerFeatures[i] = offerFeaturesArr[i];
  }

  return offerFeatures;
};

// Генерация массива с фотографиями объявления
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
var generateAdverts = function (count) {
  var advertsArr = [];
  var locationX;
  var locationY;
  var advertObj = {};
  for (var i = 0; i < count; i++) {
    locationX = getLocationX();
    locationY = getLocationY();
    // Структура объекта (объявление аренды)
    advertObj = {
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
    advertsArr[i] = advertObj;
    advertObj = null;
  }

  return advertsArr;
};

// Функция создания маркера, DOM-элемента на основе объекта
var renderPinElement = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  // координаты маркера (x - половина ширины пина), (y - высота пина) чтобы указатель быт острым концом. НО РАБОТАЕТ СТРАННО
  pinElement.style = 'left: ' + (pin.location.x - 25) + 'px; top: ' + (pin.location.y - 70) + 'px;';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;

  return pinElement;
};

// Функция заполнения блока элементами
var setAdvertElements = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < arr.length; j++) {
    fragment.appendChild(renderPinElement(arr[j]));
  }

  return fragment;
};

// Вызов генерации массива объявлений с данными
var adverts = generateAdverts(8);

// Отрисовка маркеров в контенер на на карту страницы
mapPins.appendChild(setAdvertElements(adverts));
