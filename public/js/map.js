(() => {
  const NUMBER_PINS = 5;
  // карта маркеров
  const mapPins = document.querySelector(`.map__pins`);
  // Контейнер куда встявлять карточки
  const map = document.querySelector(`.map`);

  // const closeOpenedCard = () => {
  //   // Проверка и закрытие других открытых карточек при открытии новой
  //   const activePopup = document.querySelector(`.map__card--active`);
  //   const activePin = document.querySelector(`.map__pin--active`);
  //   if (activePopup) {
  //     activePopup.classList.add(`hidden`);
  //     activePopup.classList.remove(`map__card--active`);
  //     const activePopupClose = activePopup.querySelector(`.popup__close`);
  //     activePopupClose.removeEventListener(`click`, onCardCloseClick);
  //     document.removeEventListener(`keydown`, onCardEscPress);
  //   }
  //   if (activePin) {
  //     activePin.classList.remove(`map__pin--active`);
  //   }
  // };

  // // Функция открытия карточки
  // const openCardPopup = (pin, card) => {
  //   closeOpenedCard();
  //   card.classList.remove(`hidden`);
  //   card.classList.add(`map__card--active`);
  //   pin.classList.add(`map__pin--active`);
  //
  //   const cardClose = card.querySelector(`.popup__close`);
  //   cardClose.addEventListener(`click`, onCardCloseClick);
  //   document.addEventListener(`keydown`, onCardEscPress);
  // };

  // // Функция закрытия карточки при клике на крестик
  // const onCardCloseClick = (evt) => {
  //   evt.preventDefault();
  //   closeOpenedCard();
  // };
  //
  // // Функция закрытия карточки при нажатии Esc
  // const onCardEscPress = (evt) => {
  //   if (evt.key === `Escape`) {
  //     evt.preventDefault();
  //     closeOpenedCard();
  //   }
  // };

  // // Функция задания обработчиков событий карточки и метки
  // const setClickOnPin = (pin, card) => {
  //   // Открытие карточки по клику на метке
  //   pin.addEventListener(`click`, (evt) => {
  //     evt.preventDefault();
  //     openCardPopup(pin, card);
  //   });
  //
  //   // Открытие карточки по клавише Enter на метке
  //   pin.addEventListener(`keydown`, (evt) => {
  //     if (evt.key === `Enter`) {
  //       evt.preventDefault();
  //       openCardPopup(pin, card);
  //     }
  //   });
  // };

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
        let pinElement = new window.Pin(advert);
        let cardPopup = new window.Card(advert);

        const hideCard = () => {
          cardPopup.hide();
          cartCloseBtn.removeEventListener(`click`, onCardCloseBtnClick);
          document.removeEventListener(`keydown`, onEscPress);
        };

        const showCard = () => {
          cardPopup.show();
          cartCloseBtn.addEventListener(`click`, onCardCloseBtnClick);
          document.addEventListener(`keydown`, onEscPress);
        };

        const onEscPress = (evt) => {
          if (evt.key === `Escape`) {
            evt.preventDefault();
            hideCard();
          }
        };

        const onPinClick = (evt) => {
          evt.preventDefault();
          showCard();
        };

        const onCardCloseBtnClick = (evt) => {
          evt.preventDefault();
          hideCard();
        };

        // setClickOnPin(pinElement.getElement(), cardPopup.getElement());
        pinElement.getElement().addEventListener(`click`, onPinClick);
        const cartCloseBtn = cardPopup.getCloseBtn();

        window.utils.render(cardsFragment, cardPopup.getElement(), window.utils.RenderPosition.BEFOREEND);
        window.utils.render(pinsFragment, pinElement.getElement(), window.utils.RenderPosition.BEFOREEND);
      }
    });
    // Отрисовка маркеров в контенер на на карту страницы
    window.utils.render(mapPins, pinsFragment, window.utils.RenderPosition.BEFOREEND);
    // Отрисовка и добавление карточки объявления
    window.utils.render(map.querySelector(`.map__filters-container`), cardsFragment, window.utils.RenderPosition.BEFORE);
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
    renderPins,
    enable,
    disable
  };
})();
