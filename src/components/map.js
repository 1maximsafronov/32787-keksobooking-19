import PinComponent from "./pin.js";
import CardComponent from "./card.js";
import MainPinComponent from "./mainpin.js";
import {RenderPosition, render} from "../utils.js";
// import {loadData, getAdverts} from "../data.js";
import FilterComponent from "./filterform.js";

const NUMBER_PINS = 5;
let pinsCollection = new Set();
let cardsCollection = new Set();

const renderPinAndCard = (advert, pinsFragment, cardsFragment) => {
  const pin = new PinComponent(advert);
  const card = new CardComponent(advert);

  const onEscKeydown = (evt) => {
    evt.preventDefault();
    hideCard();
  };

  const hideCard = ()=> {
    pin.deselect();
    card.hide();
    document.removeEventListener(`keydown`, onEscKeydown);
  };

  const showCard = () => {
    PinComponent.removeSelectedPin();
    CardComponent.hideOpenedCard();
    pin.select();
    card.show();
    document.addEventListener(`keydown`, onEscKeydown);
    CardComponent.saveOpenedCard(card);
    PinComponent.saveSelectedPin(pin);
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
    } // --- if (advert.offer) --- end
  }); // --- adverts.foreEach() --- end

  // Отрисовка всех маркеров объявлений в контейнер
  render(pinsContainer, pinsFragment, RenderPosition.BEFOREEND);
  // Отрисовка всех карточек объявлений в контейнер
  render(cardsContainer, cardsFragment, RenderPosition.BEFORE);
};

// ----- Класс создания карты---------------------------------
//
export default class Map {
  constructor(mapElement, adverts) {
    this._element = mapElement;
    this._pinsContainer = this._element.querySelector(`.map__pins`);
    this.mainPin = new MainPinComponent(this._element.querySelector(`.map__pin--main`));
    this.filterForm = new FilterComponent(this._element.querySelector(`.map__filters`));
    this._adverts = adverts;
  }

  getElement() {
    return this._element;
  }

  getAdverts() {
    return this._adverts;
  }

  enable() {
    this.getElement().classList.remove(`map--faded`);
    this.render(this.getAdverts());
    this.filterForm.enable();
    // this.filterForm.setSubmitHandler(()=>{
    //   this.filterForm.filterAdverts(this.getAdverts());
    //   this.render(this.filterForm.getFilteredAdverts());
    // });
  }

  disable() {
    this.getElement().classList.add(`map--faded`);
    this.filterForm.disable();
    const onMainPinFirstMousedown = (evt) => {
      if (evt.button === 0) {
        evt.preventDefault();
        this.enable();
        this.mainPin.getElement().removeEventListener(`mousedown`, onMainPinFirstMousedown);
      }
    };

    this.mainPin.setFirstMousdownHandler(onMainPinFirstMousedown);
  }

  render(adverts) {
    renderMap(adverts, this._pinsContainer, this._element.querySelector(`.map__filters-container`));
  } // --- render(adverts) --- end
  //
  // clear() {
  //   pinsCollection.forEach((pin) => {
  //     pin.getElement().remove();
  //     // pin.removeElement();
  //     pinsCollection.delete(pin);
  //   });
  //
  //   cardsCollection.forEach((card) => {
  //     card.getElement().remove();
  //     // card.removeElement();
  //     cardsCollection.delete(card);
  //   });
  // }
} // --- class Map --- end
