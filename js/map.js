'use strict';

(function () {
  // карта маркеров
  var mapPins = document.querySelector('.map__pins');
  // Контейнер куда встявлять карточки
  var map = document.querySelector('.map');

  function closeOpenedCard() {
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
  }
  // Функция задания обработчиков событий карточки и метки
  function setClickOnPin(pin, card) {
    var cardClose = card.querySelector('.popup__close');

    // Функция открытия карточки
    function openCardPopup() {
      closeOpenedCard();
      card.classList.remove('hidden');
      card.classList.add('map__card--active');
      pin.classList.add('map__pin--active');
      cardClose.addEventListener('click', onCardCloseClick);
      document.addEventListener('keydown', onCardEscPress);
    }

    // Функция закрытия карточки
    function closeCardPopup() {
      card.classList.add('hidden');
      card.classList.remove('map__card--active');
      pin.classList.remove('map__pin--active');
      cardClose.removeEventListener('click', onCardCloseClick);
      document.removeEventListener('keydown', onCardEscPress);
    }

    // Функция закрытия карточки при клике на крестик
    function onCardCloseClick(evt) {
      evt.preventDefault();
      closeCardPopup();
    }

    // Функция закрытия карточки при нажатии Esc
    function onCardEscPress(evt) {
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
  function renderPins(advertsArr) {
    removePinsCards();
    var pinsFragment = document.createDocumentFragment();
    var cardsFragment = document.createDocumentFragment();
    var counter = 5;
    if (advertsArr.length < 5) {
      counter = advertsArr.length;
    }
    for (var i = 0; i < counter; i++) {
      if (advertsArr[i].offer) {
        var pinElement = window.pin.createElement(advertsArr[i]);
        var cardPopup = window.card.createElement(advertsArr[i]);
        setClickOnPin(pinElement, cardPopup);
        pinsFragment.appendChild(pinElement);
        cardsFragment.appendChild(cardPopup);
      }
    }
    // Отрисовка маркеров в контенер на на карту страницы
    mapPins.appendChild(pinsFragment);
    // Отрисовка и добавление карточки объявления
    map.insertBefore(cardsFragment, map.querySelector('.map__filters-container'));
  }

  function removePinsCards() {
    var pins = map.querySelectorAll('.map__pin');
    var cards = map.querySelectorAll('.map__card');
    pins.forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        pin.remove();
      }
    });
    cards.forEach(function (card) {
      card.remove();
    });
  }

  function enable() {
    map.classList.remove('map--faded');
    window.filterform.enable();
    renderPins(window.data.adverts);
  }

  function disable() {
    map.classList.add('map--faded');
    removePinsCards();
    window.mainpin.reset();
    window.filterform.reset();
    window.filterform.disable();
  }

  window.map = {
    closeOpenedCard: closeOpenedCard,
    renderPins: renderPins,
    enable: enable,
    disable: disable
  };
})();
