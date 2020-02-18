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

Разбиение на модули:

[+] data.js — модуль, который создаёт данные;
[ ] map.js — модуль, который управляет карточками объявлений и метками: добавляет на страницу нужную карточку, отрисовывает метки и осуществляет взаимодействие карточки и метки на карте;
[+] card.js — модуль, который отвечает за создание карточки объявлений;
[ ] pin.js — модуль, который отвечает за создание метки на карте;
[+] form.js — модуль, который работает с формой объявления.

*/

(function () {


  // Главный маркер на карте
  var mapPinMain = document.querySelector('.map__pin--main');

  var MAP_PIN_MAIN_WIDTH = mapPinMain.offsetWidth;
  var MAP_PIN_MAIN_HEIGHT = mapPinMain.offsetHeight;
  var MAP_PIN_WIDTH = 50;
  var MAP_PIN_HEIGHT = 70;

  // Шаблон для маркеров
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  // карта маркеров
  var mapPins = document.querySelector('.map__pins');

  // Форма ввода данных объявления
  var adForm = document.querySelector('.ad-form--disabled');

  // Форма фильтра
  var mapFilters = document.querySelector('.map__filters');

  // Контейнер куда встявлять карточки
  var mapContainer = document.querySelector('.map');

  // Задание адреса при мервой загрузке страницы
  window.form.setAddressValue((mapPinMain.offsetLeft + Math.floor(MAP_PIN_MAIN_WIDTH / 2)), (mapPinMain.offsetTop + Math.floor(MAP_PIN_MAIN_HEIGHT / 2)));

  // Функция создания маркера, DOM-элемента на основе объекта
  function renderPinElement(pin) {
    var pinElement = pinTemplate.cloneNode(true);
    var cardPopup = window.card.renderCardElement(pin);
    var cardClose = cardPopup.querySelector('.popup__close');
    // координаты маркера (x - половина ширины пина), (y - высота пина) чтобы указатель быт острым концом. НО РАБОТАЕТ СТРАННО
    pinElement.tabIndex = 0;
    pinElement.style = 'left: ' + (pin.location.x - MAP_PIN_WIDTH / 2) + 'px; top: ' + (pin.location.y - MAP_PIN_HEIGHT) + 'px;';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;

    // Отрисовка и добавление карточки объявления
    mapContainer.insertBefore(cardPopup, mapContainer.querySelector('.map__filters-container'));

    // Функция закрытия карточки при нажатии Esc
    function onPopupEscPress(evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeCardPopup();
      }
    }

    // Функция открытия карточки
    function openCardPopup() {
      // Проверка и закрытие других открытых карточек при открытии новой
      var activePopup = document.querySelector('.map__card--active');
      var activePin = document.querySelector('.map__pin--active');
      if (activePopup) {
        activePopup.classList.add('hidden');
        activePopup.classList.remove('map__card--active');
      }
      if (activePin) {
        activePin.classList.remove('map__pin--active');
      }

      cardPopup.classList.remove('hidden');
      cardPopup.classList.add('map__card--active');
      cardClose.addEventListener('click', onCardCloseClick);
      pinElement.classList.add('map__pin--active');
      document.addEventListener('keydown', onPopupEscPress);
    }

    // Функция закрытия карточки
    function closeCardPopup() {
      cardPopup.classList.add('hidden');
      cardPopup.classList.remove('map__card--active');
      pinElement.classList.remove('map__pin--active');
      cardClose.removeEventListener('click', onCardCloseClick);
      document.removeEventListener('keydown', onPopupEscPress);
    }

    // Функция закрытия карточки при клике на крестик
    function onCardCloseClick(evt) {
      evt.preventDefault();
      closeCardPopup();
    }

    // Открытие карточки по клику на метке
    pinElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      openCardPopup();
    });

    // Открытие карточки по клавише Enter на метке
    pinElement.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        openCardPopup();
      }
    });

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
    window.form.validateRoomsCapacity();
    // Отрисовка маркеров в контенер на на карту страницы
    mapPins.appendChild(setAdvertElements(window.data.adverts));
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
      window.form.setAddressValue(mapPinMain.offsetLeft + Math.floor(MAP_PIN_MAIN_WIDTH / 2), mapPinMain.offsetTop + MAP_PIN_MAIN_HEIGHT + 25);
    }
  }

  mapPinMain.addEventListener('mousedown', onPinMainFirstClick);
  mapPinMain.addEventListener('keydown', onPinMainFirstClick);

})();
