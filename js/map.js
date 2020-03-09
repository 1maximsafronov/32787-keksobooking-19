'use strict';

(function () {
  // карта маркеров
  var mapPins = document.querySelector('.map__pins');
  // Контейнер куда встявлять карточки
  var map = document.querySelector('.map');

  // Функция задания обработчиков событий карточки и метки
  function setClickOnPin(pin, card) {
    var cardClose = card.querySelector('.popup__close');

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

      card.classList.remove('hidden');
      card.classList.add('map__card--active');
      pin.classList.add('map__pin--active');
      cardClose.addEventListener('click', onCardCloseClick);
      document.addEventListener('keydown', onPopupEscPress);
    }

    // Функция закрытия карточки
    function closeCardPopup() {
      card.classList.add('hidden');
      card.classList.remove('map__card--active');
      pin.classList.remove('map__pin--active');
      cardClose.removeEventListener('click', onCardCloseClick);
      document.removeEventListener('keydown', onPopupEscPress);
    }

    // Функция закрытия карточки при клике на крестик
    function onCardCloseClick(evt) {
      evt.preventDefault();
      closeCardPopup();
    }

    // Функция закрытия карточки при нажатии Esc
    function onPopupEscPress(evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeCardPopup();
      }
    }

    // Открытие карточки по клику на метке
    pin.addEventListener('click', function (evt) {
      evt.preventDefault();
      openCardPopup();
    });

    // Открытие карточки по клавише Enter на метке
    pin.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        openCardPopup();
      }
    });
  }

  // Функция отрисовки всех всех маркеров и карточек объявлений
  function renderPins() {
    var advertsArr = window.data.getAdverts;

    var pinsFragment = document.createDocumentFragment();
    var cardsFragment = document.createDocumentFragment();
    for (var j = 0; j < advertsArr.length; j++) {
      var pinElement = window.pin.createPinElement(advertsArr[j]);
      var cardPopup = window.card.createCardElement(advertsArr[j]);
      setClickOnPin(pinElement, cardPopup);
      pinsFragment.appendChild(pinElement);
      cardsFragment.appendChild(cardPopup);
    }
    // Отрисовка маркеров в контенер на на карту страницы
    mapPins.appendChild(pinsFragment);
    // Отрисовка и добавление карточки объявления
    map.insertBefore(cardsFragment, map.querySelector('.map__filters-container'));
  }

  function activateMap() {
    renderPins();
    map.classList.remove('map--faded');
  }

  function disableMap() {
    var pins = map.querySelectorAll('.map__pin');
    var cards = mapPins.querySelectorAll('.popup');
    map.classList.add('map--faded');
    pins.forEach(function (element) {
      if (!element.classList.contains('map__pin--main')) {
        element.remove();
      }
    });
    cards.forEach(function (element) {
      element.remove();
    });
  }

  window.map = {
    renderPins: renderPins,
    activateMap: activateMap,
    disableMap: disableMap
  };
})();
