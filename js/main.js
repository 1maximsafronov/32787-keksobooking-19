'use strict';

/*

Задача
Напишите код для валидации формы добавления нового объявления. Список полей для валидации:

[+] Поле «Заголовок объявления».
[+] Поле «Тип жилья»
[+] Поле «Цена за ночь»
[+] Поле «Адрес»
[+] Поля «Время заезда», «Время выезда»
[+] Поля «Фотография пользователя» и «Фотография жилья»

*/

var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;

// Шаблон для маркеров
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
// карта маркеров
var mapPins = document.querySelector('.map__pins');

// Форма ввода данных объявления
var adForm = document.querySelector('.ad-form--disabled');
var adTitileInput = adForm.querySelector('input[id="title"]');
var adTypeSelect = adForm.querySelector('select[id="type"]');
var adPriceInput = adForm.querySelector('input[id="price"]');
var adRoomNumber = adForm.querySelector('select[id="room_number"]');
var adCapacity = adForm.querySelector('select[id="capacity"]');
var adTimeIn = adForm.querySelector('select[id="timein"]');
var adTimeOut = adForm.querySelector('select[id="timeout"]');
// Форма фильтра
var mapFilters = document.querySelector('.map__filters');
// Главный маркер на карте
var mapPinMain = document.querySelector('.map__pin--main');
var MAP_PIN_MAIN_WIDTH = mapPinMain.offsetWidth;
var MAP_PIN_MAIN_HEIGHT = mapPinMain.offsetHeight;
// Поле ввода адреса главного маркера
var advertAddressInput = adForm.querySelector('input[id="address"]');

// Вызов генерации массива объявлений с данными
var adverts = generateAdverts(8);

// // Шаблон для карточек объявлений
// var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
// // Контейнер куда встявлять карточки
// var mapContainer = document.querySelector('.map');


// Генерация положения маркера по горизонтали
function getLocationX() {
  // от ширины контенера .map__pins
  return Math.floor(Math.random() * mapPins.offsetWidth);
}

// Генерация положения маркера по вертикали
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

// Функция генерации массива
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

// Функция создания маркера, DOM-элемента на основе объекта
function renderPinElement(pin) {
  var pinElement = pinTemplate.cloneNode(true);
  // координаты маркера (x - половина ширины пина), (y - высота пина) чтобы указатель быт острым концом. НО РАБОТАЕТ СТРАННО
  pinElement.style = 'left: ' + (pin.location.x - MAP_PIN_WIDTH / 2) + 'px; top: ' + (pin.location.y - MAP_PIN_HEIGHT) + 'px;';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;

  return pinElement;
}

// Группировка и вывод отрисованных маркеров на карте
function setAdvertElements(arr) {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < arr.length; j++) {
    fragment.appendChild(renderPinElement(arr[j]));
  }
  return fragment;
}

/* ----------------------
function translateOfferType(type) {
  var cardOfferType = {
    'house': 'Дом',
    'flat': 'Квартира',
    'palace': 'Дворец',
    'bungalo': 'Бунгало'
  };
  return cardOfferType[type];
}

// Получаем список особенностей
function changeCardFeatures(cardFeatures, cardOfferFeatures) {
  var cardElementFeatures = cardFeatures.querySelectorAll('.popup__feature');
  cardElementFeatures.forEach(function (item) {
    item.style.display = 'none';
  });
  cardOfferFeatures.forEach(function (item) {
    cardFeatures.querySelector('.popup__feature--' + item).style.display = 'inline-block';
  });
}


// Получаем набор фотографий объявления
function getCardPhotos(cardOfferPhotos) {
  var photoTemplate = cardTemplate.querySelector('.popup__photos .popup__photo');
  var photoElement;
  var photosFragment = document.createDocumentFragment();
  cardOfferPhotos.forEach(function (photo) {
    photoElement = photoTemplate.cloneNode(true);
    photoElement.src = photo;
    photosFragment.appendChild(photoElement);
  });

  return photosFragment;
}


// Функция создания DOM-элемента на основе объекта
function renderCardElement(card) {
  var cardElement = cardTemplate.cloneNode(true);
  var cardElemetnType = cardElement.querySelector('.popup__type');
  var cardElementTime = cardElement.querySelector('.popup__text--time');
  var cardElementTitle = cardElement.querySelector('.popup__title');
  var cardElementPrice = cardElement.querySelector('.popup__text--price');
  var cardElementPhotos = cardElement.querySelector('.popup__photos');
  var cardElementAvatar = cardElement.querySelector('.popup__avatar');
  var cardElementAddress = cardElement.querySelector('.popup__text--address');
  var cardElementCapacity = cardElement.querySelector('.popup__text--capacity');
  var cardElementFeatures = cardElement.querySelector('.popup__features');
  var cardElementDescription = cardElement.querySelector('.popup__description');

  // Заголовок
  if (card.offer.title) {
    cardElementTitle.textContent = card.offer.title;
  } else {
    cardElementTitle.style.display = 'none';
  }
  // Адресс
  if (card.offer.address) {
    cardElementAddress.textContent = card.offer.address;
  } else {
    cardElementAddress.style.display = 'none';
  }
  // Цена
  if (card.offer.price) {
    cardElementPrice.textContent = card.offer.price + '₽/ночь';
  } else {
    cardElementPrice.style.display = 'none';
  }
  // Тип жилья
  if (card.offer.type) {
    cardElemetnType.textContent = translateOfferType(card.offer.type);
  } else {
    cardElemetnType.style.display = 'none';
  }
  // Количество комнат и гостей
  if (card.offer.rooms && card.offer.guests) {
    cardElementCapacity.textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  } else {
    cardElementCapacity.style.display = 'none';
  }
  // Время въезда/выезда
  if (card.offer.checkin && card.offer.checkout) {
    cardElementTime.textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  } else {
    cardElementTime.style.display = 'none';
  }
  // Наличие дополнительных особенностей
  if (card.offer.features.length) {
    changeCardFeatures(cardElementFeatures, card.offer.features);
  } else {
    cardElementFeatures.style.display = 'none';
  }
  // Описание объявления
  if (card.offer.description) {
    cardElementDescription.textContent = card.offer.description;
  } else {
    cardElementDescription.style.display = 'none';
  }
  // Фотографии объявления
  while (cardElementPhotos.firstChild) {
    cardElementPhotos.removeChild(cardElementPhotos.firstChild);
  }
  if (card.offer.photos.length) {
    cardElementPhotos.appendChild(getCardPhotos(card.offer.photos));
  } else {
    cardElementPhotos.style.display = 'none';
  }
  // Аватарка автора
  if (card.author.avatar) {
    cardElementAvatar.src = card.author.avatar;
  } else {
    cardElementAvatar.style.display = 'none';
  }
  return cardElement;
}

------------------------------------ */

// Отрисовка карточки объявления перед .map__filters-container
// mapContainer.insertBefore(renderCardElement(adverts[0]), mapContainer.querySelector('.map__filters-container'));

// Отключение форм при запуске страницы
disableForm(adForm);
disableForm(mapFilters);

function disableElement(elements) {
  elements.forEach(function (element) {
    element.disabled = true;
  });
}

function enableElement(elements) {
  elements.forEach(function (element) {
    element.disabled = false;
  });
}

// Функция отключения формы
function disableForm(form) {
  var selects = form.querySelectorAll('select');
  var inputs = form.querySelectorAll('input');
  var buttons = form.querySelectorAll('button');
  var fieldsets = form.querySelectorAll('fieldset');
  disableElement(selects);
  disableElement(inputs);
  disableElement(buttons);
  disableElement(fieldsets);
}

// Функция включения формы
function enableForm(form) {
  var selects = form.querySelectorAll('select');
  var inputs = form.querySelectorAll('input');
  var buttons = form.querySelectorAll('button');
  var fieldsets = form.querySelectorAll('fieldset');
  enableElement(selects);
  enableElement(inputs);
  enableElement(buttons);
  enableElement(fieldsets);
}


// Функция активации страницы
function activationPage() {
  enableForm(adForm);
  enableForm(mapFilters);
  validateRoomsCapacity();
  // Отрисовка маркеров в контенер на на карту страницы
  mapPins.appendChild(setAdvertElements(adverts));
  adForm.classList.remove('ad-form--disabled');
  document.querySelector('.map').classList.remove('map--faded');
}

// Функция обработчик нажатия на главный маркер
function onPinMainFirstClick(evt) {
  if (evt.button === 0 || evt.key === 'Enter') {
    evt.preventDefault();
    activationPage();
    mapPinMain.removeEventListener('mousedown', onPinMainFirstClick);
    mapPinMain.removeEventListener('keydown', onPinMainFirstClick);
    // Задание адреса при активации страницы
    setAddressValue(mapPinMain.offsetLeft + Math.floor(MAP_PIN_MAIN_WIDTH / 2), mapPinMain.offsetTop + MAP_PIN_MAIN_HEIGHT + 25);
  }
}

mapPinMain.addEventListener('mousedown', onPinMainFirstClick);
mapPinMain.addEventListener('keydown', onPinMainFirstClick);


// ---- Здесь ббудет валидация формы объявления --------------------
// Функция задания поля адреса
function setAddressValue(x, y) {
  advertAddressInput.value = x + ', ' + y + '';
}

// Задание адреса при мервой загрузке страницы
setAddressValue((mapPinMain.offsetLeft + Math.floor(MAP_PIN_MAIN_WIDTH / 2)), (mapPinMain.offsetTop + Math.floor(MAP_PIN_MAIN_HEIGHT / 2)));

// Обработчик невалидного поля заголовка
adTitileInput.addEventListener('invalid', function () {
  var errorMessage = '';
  if (adTitileInput.validity.tooShort) {
    errorMessage = 'Заголовок должен состоять минимум из 30-ти символов';
  } else if (adTitileInput.validity.tooLong) {
    errorMessage = 'Заголовок не должен привышать 100 символов';
  } else if (adTitileInput.validity.valueMissing) {
    errorMessage = 'Обязательное поле';
  }
  adTitileInput.setCustomValidity(errorMessage);
});

// Обработчик введения текста в поле заголовка
adTitileInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 30) {
    target.setCustomValidity('Имя должно состоять минимум из ' + 30 + '-x символов');
  } else {
    target.setCustomValidity('');
  }
});

// Задание минимальной цены на аренду в зависимости от типа
adTypeSelect.addEventListener('change', function () {
  var placeholderPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  adPriceInput.placeholder = placeholderPrice[adTypeSelect.value];
  adPriceInput.min = placeholderPrice[adTypeSelect.value];
});

function checkRooms1(rooms, capacity) {
  var bool = false;
  if (rooms === 1 && capacity !== 1) {
    bool = true;
  }
  return bool;
}

function checkRooms2(rooms, capacity) {
  var bool = false;
  if (rooms === 2 && (capacity < 1 || capacity > 2)) {
    bool = true;
  }
  return bool;
}

function checkRooms3(rooms, capacity) {
  var bool = false;
  if (rooms === 3 && (capacity < 1 || capacity > 3)) {
    bool = true;
  }
  return bool;
}

function checkRooms4(rooms, capacity) {
  var bool = false;
  if (rooms === 100 && capacity !== 0) {
    bool = true;
  }
  return bool;
}
// Функция проверки количества комнат и количества гостей
function validateRoomsCapacity() {
  var rooms = Number(adRoomNumber.value);
  var capacity = Number(adCapacity.value);
  var errorMessage = '';
  if (checkRooms1(rooms, capacity)) {
    errorMessage = 'В таком количестве комнат может быть от 1 гость';
  } else if (checkRooms2(rooms, capacity)) {
    errorMessage = 'В таком количестве комнат может быть от 1 до 2-х гостей';
  } else if (checkRooms3(rooms, capacity)) {
    errorMessage = 'В таком количестве комнат может быть от 1 до 3-х гостей';
  } else if (checkRooms4(rooms, capacity)) {
    errorMessage = 'Такое количество комнат не для гостей';
  }
  adCapacity.setCustomValidity(errorMessage);
}

// Функция при выборе количества комнат
function onCapacityChange() {
  validateRoomsCapacity();
}

// Функция при выборе количества гостей
function onRoomNumberChange() {
  validateRoomsCapacity();
}

// Валидация времени заезда и выезда
adTimeIn.addEventListener('change', function () {
  adTimeOut.value = adTimeIn.value;
});

adTimeOut.addEventListener('change', function () {
  adTimeIn.value = adTimeOut.value;
});

adRoomNumber.addEventListener('change', onRoomNumberChange);
adCapacity.addEventListener('change', onCapacityChange);
