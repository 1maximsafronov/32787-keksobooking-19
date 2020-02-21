'use strict';
(function () {
  // карта маркеров
  var mapPins = document.querySelector('.map__pins');

  // Генерация адерса по горизонтали
  function getLocationX() {
    // от ширины контенера .map__pins
    return Math.floor(Math.random() * mapPins.offsetWidth);
  }

  // Генерация адреса по вертикали
  function getLocationY() {
    // от 130 до 630
    return Math.floor(Math.random() * 500) + 130;
  }

  // Генерация типа жилплощади
  function getOfferType() {
    var offerTypeArr = ['palace', 'flat', 'house', 'bungalo'];

    return offerTypeArr[Math.floor(Math.random() * 4)];
  }

  // Генерация времени въезда/выезда
  function getOfferTime() {
    return (Math.floor(Math.random() * 3) + 12) + ':00';
  }

  // Генерация имеющихся в квартире дополнительные особенности
  function getOfferFeatures() {
    var offerFeaturesArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    var offerFeatures = [];
    for (var i = 0; i < Math.floor(Math.random() * (offerFeaturesArr.length + 1)); i++) {
      offerFeatures[i] = offerFeaturesArr[i];
    }

    return offerFeatures;
  }

  // Генерация массива с фотографиями объявления
  function getOfferPhotos() {
    var offerPhotosArr = [
      'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
    ];
    var offerPhotos = [];
    for (var i = 0; i < Math.floor(Math.random() * (offerPhotosArr.length + 1)); i++) {
      offerPhotos[i] = offerPhotosArr[i];
    }

    return offerPhotos;
  }

  // Функция генерации массива объявлений
  function generateAdverts(count) {
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
  }

  function getAdverts() {
    var adverts = [];

    function onSuccess(advertsArr) {
      for (var i = 0; i < advertsArr.length; i++) {
        adverts[i] = advertsArr[i];
      }
    }

    function onError(errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);

      function hideError() {
        node.remove();
      }

      setTimeout(hideError, 5000);
    }

    window.load(onSuccess, onError);

    return adverts;
  }

  window.data = {
    generateAdverts: generateAdverts,
    // adverts: adverts
    adverts: getAdverts()
  };
})();
