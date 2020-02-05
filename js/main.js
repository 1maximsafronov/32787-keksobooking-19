'use strict';
/*
[+] Выведите заголовок объявления offer.title в заголовок .popup__title.

[+] Выведите адрес offer.address в блок .popup__text--address.

[+] Выведите цену offer.price в блок .popup__text--price строкой вида {{offer.price}}₽/ночь. Например, 5200₽/ночь.

[+] В блок .popup__type выведите тип жилья offer.type: Квартира для flat, Бунгало для bungalo, Дом для house, Дворец для palace.

[+] Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, 2 комнаты для 3 гостей.

[+] Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, заезд после 14:00, выезд до 12:00.

[ ] В список .popup__features выведите все доступные удобства в объявлении.

[+] В блок .popup__description выведите описание объекта недвижимости offer.description.

[ ] В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как src соответствующего изображения.

[+] Замените src у аватарки пользователя — изображения, которое записано в .popup__avatar — на значения поля author.avatar отрисовываемого объекта.
*/

// Шаблон для маркеров
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
// карта маркеров
var mapPins = document.querySelector('.map__pins');

// Шаблон для карточек объявлений
var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
// Контейнер куда встявлять карточки
var mapContainer = document.querySelector('.map');

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
  return (Math.floor(Math.random() * 3) + 12) + ':00';
};

// Генерация имеющихся в квартире дополнительные особенности
var getOfferFeatures = function () {
  var offerFeaturesArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var offerFeatures = [];
  for (var i = 0; i < Math.floor(Math.random() * (offerFeaturesArr.length + 1)); i++) {
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

var translateOfferType = function (type) {
  var cardOfferType = '';
  if (type === 'flat') {
    cardOfferType = 'Квартира';
  }
  if (type === 'bungalo') {
    cardOfferType = 'Бунгало';
  }
  if (type === 'house') {
    cardOfferType = 'Дом';
  }
  if (type === 'palace') {
    cardOfferType = 'Дворец';
  }
  return cardOfferType;
};

var getCardFeatures = function (cardElement, card) {
  var cardElementFeatures = cardElement.querySelectorAll('.popup__features .popup__feature');
  for (var i = 0; i < cardElementFeatures.length; i++) {
    cardElementFeatures[i].style.display = 'none';
  }

  for (var j = 0; j < card.offer.features.length; j++) {
    cardElement.querySelector('.popup__features .popup__feature--' + card.offer.features[j]).style.display = 'inline-block';
  }
};
//
// var getCardPhotos = function (cardPhotos, card) {
//
// };

// Функция создания DOM-элемента на основе объекта
var renderCardElement = function (card) {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = translateOfferType(card.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = card.offer.description;

  if (!card.offer.features.length) {
    getCardFeatures(cardElement, card);
  } else {
    cardElement.querySelector('.popup__features').style.display = 'none';
  }

  if (card.offer.photos.length) {
    cardElement.querySelector('.popup__photos .popup__photo').src = card.offer.photos[0];
  } else {
    cardElement.querySelector('.popup__photos').style.display = 'none';
  }


  return cardElement;
};

mapContainer.insertBefore(renderCardElement(adverts[0]), mapContainer.querySelector('.map__filters-container'));
