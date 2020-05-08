import PinComponent from "./pin.js";
import CardComponent from "./card.js";
import MainPinComponent from "./mainpin.js";
import {RenderPosition, render} from "../utils.js";
import {loadData, getAdverts} from "../data.js";
import FilterComponent from "./filterform.js";

const NUMBER_PINS = 5;

const clearMap = (colection) => {

  // const pins = this._mapElement.querySelectorAll(`.map__pin`);
  // const cards = this._mapElement.querySelectorAll(`.map__card`);

  colection.forEach((item) => {
    item.removeElement();
    colection.delete(item);
  });

  // cards.forEach((card) => {
  //   card.remove();
  // });

  // const pins = map.querySelectorAll(`.map__pin`);
  // const cards = map.querySelectorAll(`.map__card`);
  //
  // pins.forEach((pin) => {
  //   if (!pin.classList.contains(`map__pin--main`)) {
  //     pin.remove();
  //   }
  // });
  //
  // cards.forEach((card) => {
  //   card.remove();
  // });
};
// ----- Класс создания карты---------------------------------
//
export default class Map {
  constructor(mapElement) {
    this._mapElement = mapElement;
    this._pinsContainer = this._mapElement.querySelector(`.map__pins`);
    this._pinColectiron = new Set();
    this._cardColection = new Set();
    this.mainPin = new MainPinComponent(this._mapElement.querySelector(`.map__pin--main`));
    this.filter = new FilterComponent(this._mapElement.querySelector(`.map__filters`), this);
    this._adverts = [];
  }

  getElement() {
    return this._mapElement;
  }
  getAdverts() {
    if (!this._adverts) {
      this._adverts = getAdverts();
    }
    return this._adverts;
  }
  enable() {
    loadData(this, this.render);
    this._adverts = getAdverts();
    this._mapElement.classList.remove(`map--faded`);
    this.filter.enable();
  }

  disable() {
    this._mapElement.classList.add(`map--faded`);
    clearMap(this._pinColectiron);
    clearMap(this._cardColection);
    this.filter.disable();
    const onMainPinFirstMousedown = (evt) => {
      if (evt.button === 0) {
        evt.preventDefault();
        this.enable();
        this.mainPin.getElement().removeEventListener(`mousedown`, onMainPinFirstMousedown);
      }
    };

    this.mainPin.getElement().addEventListener(`mousedown`, onMainPinFirstMousedown);
  }

  // removePinsCards() {
  //   const pins = this._mapElement.querySelectorAll(`.map__pin`);
  //   const cards = this._mapElement.querySelectorAll(`.map__card`);
  //
  //   pins.forEach((pin) => {
  //     if (!pin.classList.contains(`map__pin--main`)) {
  //       pin.remove();
  //     }
  //   });
  //
  //   cards.forEach((card) => {
  //     card.remove();
  //   });
  // }

  render(data) {
    clearMap(this._pinColectiron);
    clearMap(this._cardColection);
    const pinsFragment = document.createDocumentFragment();
    const cardsFragment = document.createDocumentFragment();

    if (data.length > NUMBER_PINS) {
      data = data.slice(0, NUMBER_PINS);
    }

    data.forEach((advert) => {
      if (advert.offer) {
        const pin = new PinComponent(advert);
        const card = new CardComponent(advert);

        const hideCard = () => {
          pin.deselect();
          card.hide();

          document.removeEventListener(`keydown`, onEscPress);
        };

        const showCard = () => {
          PinComponent.deselectAll(this._pinColectiron);
          CardComponent.hideOpened(this._cardColection);
          card.show();
          document.addEventListener(`keydown`, onEscPress);
        };

        const onEscPress = (evt) => {
          if (evt.key === `Escape`) {
            evt.preventDefault();
            hideCard();
          }
        };

        pin.onClick(showCard);
        card.onCloseBtnClick(hideCard);

        // setClickOnPin(pin.getElement(), card.getElement());

        render(cardsFragment, card.getElement(), RenderPosition.BEFOREEND);
        render(pinsFragment, pin.getElement(), RenderPosition.BEFOREEND);

        this._pinColectiron.add(pin);
        this._cardColection.add(card);
      } // --- if (advert.offer) --- end
    }); // --- data.foreEach() --- end

    // Отрисовка маркеров в контенер на на карту страницы
    render(this._pinsContainer, pinsFragment, RenderPosition.BEFOREEND);
    // Отрисовка и добавление карточки объявления
    render(this._mapElement.querySelector(`.map__filters-container`), cardsFragment, RenderPosition.BEFORE);

  } // --- render(data) --- end
} // --- class Map --- end

//
//
//
//
// ----------- СТАРЫЙ КОД ------------------
// Контейнер куда встявлять карточки
// const map = document.querySelector(`.map`);
// карта маркеров
// const mapPins = map.querySelector(`.map__pins`);


// let pinColectiron = new Set();
// let cardColection = new Set();


// Функция отрисовки всех всех маркеров и карточек объявлений
// const renderPins = (advertsArr) => {
//   removePinsCards();
//   const pinsFragment = document.createDocumentFragment();
//   const cardsFragment = document.createDocumentFragment();
//
//   if (advertsArr.length > NUMBER_PINS) {
//     advertsArr = advertsArr.slice(0, NUMBER_PINS);
//   }
//
//   advertsArr.forEach((advert) => {
//     if (advert.offer) {
//       const pin = new PinComponent(advert);
//       const card = new CardComponent(advert);
//       pinColectiron.add(pin);
//       cardColection.add(card);
//
//       const hideCard = () => {
//         pin.deselect();
//         card.hide();
//
//         document.removeEventListener(`keydown`, onEscPress);
//       };
//
//       const showCard = () => {
//         PinComponent.deselectAll(pinColectiron);
//         CardComponent.hideOpened(cardColection);
//         card.show();
//         document.addEventListener(`keydown`, onEscPress);
//       };
//
//       const onEscPress = (evt) => {
//         if (evt.key === `Escape`) {
//           evt.preventDefault();
//           hideCard();
//         }
//       };
//
//       pin.onClick(showCard);
//       card.onCloseBtnClick(hideCard);
//
//       // setClickOnPin(pin.getElement(), card.getElement());
//
//       render(cardsFragment, card.getElement(), RenderPosition.BEFOREEND);
//       render(pinsFragment, pin.getElement(), RenderPosition.BEFOREEND);
//     }
//   });
//
//   // Отрисовка маркеров в контенер на на карту страницы
//   render(mapPins, pinsFragment, RenderPosition.BEFOREEND);
//   // Отрисовка и добавление карточки объявления
//   render(map.querySelector(`.map__filters-container`), cardsFragment, RenderPosition.BEFORE);
// };

// const removePinsCards = () => {
//   const pins = map.querySelectorAll(`.map__pin`);
//   const cards = map.querySelectorAll(`.map__card`);
//
//   pins.forEach((pin) => {
//     if (!pin.classList.contains(`map__pin--main`)) {
//       pin.remove();
//     }
//   });
//   cards.forEach((card) => {
//     card.remove();
//   });
// };

// const enableMap = () => {
//   loadData();
//   map.classList.remove(`map--faded`);
// };

// const disableMap = () => {
//   map.classList.add(`map--faded`);
//   removePinsCards();
//   window.mainpin.reset();
//   // window.filterform.reset();
//   // window.filterform.disable();
// };
// -----------------------------------

// window.map = {
//   renderPins,
//   enable,
//   disable
// };

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
