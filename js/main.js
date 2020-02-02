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

// Функция генерации массива
var generatePins = function (count) {
  var pinsArr = [];
  var offerTypeArr = ['palace', 'flat', 'house', 'bungalo'];
  for (var i = 0; i < count; i++) {
    // от ширины контенера .map__pins
    var locationX = Math.floor(Math.random() * mapPins.offsetWidth);
    // от 130 до 630
    var locationY = Math.floor(Math.random() * 500) + 130;
    var offerType = offerTypeArr[Math.floor(Math.random() * 4)];
    // Структура объекта
    var pinObj = {
      'author': {
        'avatar': 'img/avatars/user0' + (1 + i) + '.png'
      },
      'offer': {
        'title': 'заголовок предложения', // (пока оставил увсех одинаково)
        'address': locationX + ', ' + locationY + '',
        'price': 12345, // стоимость проживания (пока оставил увсех одинаково)
        'type': offerType,
        'rooms': 2, // количество комнат. (пока оставил увсех одинаково)
        'guests': 5, // Количество гостей (пока оставил увсех одинаково)
        'checkin': '12:00', // (пока оставил увсех одинаково)
        'checkout': '14:00', // (пока оставил увсех одинаково)
        'features': [ // (пока оставил увсех одинаково)
          'wifi',
          'dishwasher',
          'parking',
          'washer',
          'elevator',
          'conditioner'
        ],
        'description': 'Строка с описанием', // (пока оставил увсех одинаково)
        'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
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

  pinElement.style = 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px;';
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
