'use strict';

// // Получаем элементы с классом map__pin. Используем селектор.
// var pins = document.querySelectorAll('.map__pin');
//
// // Получаем элемент с идентификатором "housing-price". Используем селектор.
// var housePriceField = document.querySelector('#housing-price');
//
// // Добавляем элементу housePriceField класс hidden
// housePriceField.classList.add('hidden');
//
// // Удаляем класс hidden у элемента housePriceField
// housePriceField.classList.remove('hidden');


var pitTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

document.querySelector('.map').classList.remove('map--faded');

var pinObj = {
  'author': {
    'avatar': 'img/avatars/user0' + (Math.floor(Math.random() * 8) + 1) + '.png'
  },
  'offer': {
    'title': 'заголовок предложения',
    'address': '{{location.x}}, {{location.y}}',
    'price': 12345,
    'type': 'house',
    'rooms': 2,
    'guests': 5,
    'checkin': '12:00',
    'checkout': '14:00',
    'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    'description': '',
    'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  },
  'location': {
    'x': 100,
    'y': 150
  }
};


var pinElement = pitTemplate.cloneNode(true);


pinElement.style = 'left: ' + pinObj.location.x + 'px; top: ' + pinObj.location.y + 'px;';
pinElement.querySelector('img').src = pinObj.author.avatar;
pinElement.querySelector('img').alt = pinObj.offer.title;


var mapPins = document.querySelector('.map__pins');
mapPins.appendChild(pinElement);
