(() => {
  const NUMBER_PINS = 5;
  // карта маркеров
  const mapPins = document.querySelector(`.map__pins`);
  // Контейнер куда встявлять карточки
  const map = document.querySelector(`.map`);

  const closeOpenedCard = () => {
    // Проверка и закрытие других открытых карточек при открытии новой
    const activePopup = document.querySelector(`.map__card--active`);
    const activePin = document.querySelector(`.map__pin--active`);
    if (activePopup) {
      activePopup.classList.add(`hidden`);
      activePopup.classList.remove(`map__card--active`);
      const activePopupClose = activePopup.querySelector(`.popup__close`);
      activePopupClose.removeEventListener(`click`, onCardCloseClick);
      document.removeEventListener(`keydown`, onCardEscPress);
    }
    if (activePin) {
      activePin.classList.remove(`map__pin--active`);
    }
  };

  // Функция открытия карточки
  const openCardPopup = (pin, card) => {
    closeOpenedCard();
    card.classList.remove(`hidden`);
    card.classList.add(`map__card--active`);
    pin.classList.add(`map__pin--active`);

    const cardClose = card.querySelector(`.popup__close`);
    cardClose.addEventListener(`click`, onCardCloseClick);
    document.addEventListener(`keydown`, onCardEscPress);
  };

  // Функция закрытия карточки при клике на крестик
  const onCardCloseClick = (evt) => {
    evt.preventDefault();
    closeOpenedCard();
  };

  // Функция закрытия карточки при нажатии Esc
  const onCardEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closeOpenedCard();
    }
  };

  // Функция задания обработчиков событий карточки и метки
  const setClickOnPin = (pin, card) => {
    // Открытие карточки по клику на метке
    pin.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      openCardPopup(pin, card);
    });

    // Открытие карточки по клавише Enter на метке
    pin.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter`) {
        evt.preventDefault();
        openCardPopup(pin, card);
      }
    });
  };

  // Функция отрисовки всех всех маркеров и карточек объявлений
  const renderPins = (advertsArr) => {
    removePinsCards();
    const pinsFragment = document.createDocumentFragment();
    const cardsFragment = document.createDocumentFragment();
    if (advertsArr.length > NUMBER_PINS) {
      advertsArr = advertsArr.slice(0, NUMBER_PINS);
    }

    advertsArr.forEach((advert) => {
      if (advert.offer) {
        let pinElement = window.pin.createElement(advert);
        let cardPopup = window.card.createElement(advert);
        setClickOnPin(pinElement, cardPopup);
        pinsFragment.appendChild(pinElement);
        cardsFragment.appendChild(cardPopup);
      }
    });
    // Отрисовка маркеров в контенер на на карту страницы
    mapPins.appendChild(pinsFragment);
    // Отрисовка и добавление карточки объявления
    map.insertBefore(cardsFragment, map.querySelector(`.map__filters-container`));
  };

  const removePinsCards = () => {
    const pins = map.querySelectorAll(`.map__pin`);
    const cards = map.querySelectorAll(`.map__card`);
    pins.forEach((pin) => {
      if (!pin.classList.contains(`map__pin--main`)) {
        pin.remove();
      }
    });
    cards.forEach((card) => {
      card.remove();
    });
  };

  const enable = () => {
    window.data.load();
    map.classList.remove(`map--faded`);
  };

  const disable = () => {
    map.classList.add(`map--faded`);
    removePinsCards();
    window.mainpin.reset();
    window.filterform.reset();
    window.filterform.disable();
  };

  window.map = {
    closeOpenedCard,
    renderPins,
    enable,
    disable
  };
})();
