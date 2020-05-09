import PinComponent from "./pin.js";
import CardComponent from "./card.js";
import {RenderPosition, render} from "../utils.js";

const NUMBER_PINS = 5;
let pinsCollection = new Set();
let cardsCollection = new Set();

const renderPinAndCard = (advert, pinsFragment, cardsFragment) => {
  const pin = new PinComponent(advert);
  const card = new CardComponent(advert);

  const onEscKeydown = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      hideCard();
    }
  };

  const hideCard = ()=> {
    pin.deselect();
    card.hide();
    document.removeEventListener(`keydown`, onEscKeydown);
  };

  const showCard = () => {
    PinComponent.removeSelectedPin();
    CardComponent.hideOpenedCard();
    CardComponent.saveOpenedCard(card);
    PinComponent.saveSelectedPin(pin);
    pin.select();
    card.show();
    document.addEventListener(`keydown`, onEscKeydown);
  };

  pin.setClickHandler((evt) => {
    evt.preventDefault();
    showCard();
  });

  card.setClickCloseBtnHandler((evt)=>{
    evt.preventDefault();
    hideCard();
  });

  // Отрисовка одного маркера объявления и добавление её в хранилище
  render(pinsFragment, pin.getElement(), RenderPosition.BEFOREEND);
  // Отрисовка одной карточки объявления и добавление её в хранилище
  render(cardsFragment, card.getElement(), RenderPosition.BEFOREEND);

  pinsCollection.add(pin);
  cardsCollection.add(card);
};

const renderMap = (adverts, pinsContainer, cardsContainer)=> {

  const pinsFragment = document.createDocumentFragment();
  const cardsFragment = document.createDocumentFragment();

  if (adverts.length > NUMBER_PINS) {
    adverts = adverts.slice(0, NUMBER_PINS);
  }

  adverts.forEach((advert) => {
    if (advert.offer) {
      renderPinAndCard(advert, pinsFragment, cardsFragment);
    }
  }); // --- adverts.foreEach() --- end

  // Отрисовка всех маркеров объявлений в контейнер
  render(pinsContainer, pinsFragment, RenderPosition.BEFOREEND);
  // Отрисовка всех карточек объявлений в контейнер
  render(cardsContainer, cardsFragment, RenderPosition.BEFORE);
};

// ----- Класс создания карты---------------------------------
//
export default class Map {
  constructor(adverts) {
    this._element = document.querySelector(`.map`);
    this._adverts = adverts;
    this._pinsContainer = this._element.querySelector(`.map__pins`);
    this._cardsContainer = this._element.querySelector(`.map__filters-container`);

    this._enableListeners = new Set();
    this._disableListeners = new Set();
  }
  setElement() {
    this._element = document.querySelector(`.map`);
  }
  getElement() {
    if (!this._element) {
      this.setElement();
    }
    return this._element;
  }

  getAdverts() {
    return this._adverts;
  }

  setEnableHandler(handler) {
    this._enableListeners.add(handler);
  }

  notifyEnableListeners() {
    for (const listener of this._enableListeners) {
      listener();
    }
  }
  setDisableHandler(handler) {
    this._disableListeners(handler);
  }

  notifyDisableListeners() {
    for (const listener of this._disableListeners) {
      listener();
    }
  }
  enable() {
    this.getElement().classList.remove(`map--faded`);
    this.render(this.getAdverts());
    this.notifyEnableListeners();
  }

  disable() {
    this.getElement().classList.add(`map--faded`);
    this.clear();
    this.notifyDisableListeners();
  }

  render(adverts) {
    this.clear();
    renderMap(adverts, this._pinsContainer, this._cardsContainer);
  } // --- render(adverts) --- end

  clear() {
    for (const pin of pinsCollection) {
      pin.getElement().remove();
      pin.removeElement();
      pinsCollection.delete(pin);
    }
    for (const card of cardsCollection) {
      card.getElement().remove();
      card.removeElement();
      cardsCollection.delete(card);
    }
  }
} // --- class Map --- end
