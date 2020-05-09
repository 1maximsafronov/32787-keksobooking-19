import {createSomeElement} from "../utils/render.js";

const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const PIN_HALF_WIDTH = PIN_WIDTH / 2;
let selectedPin = null;

const createPinTemplate = (advert) => {
  // координаты маркера (x - половина ширины пина), (y - высота пина) чтобы указатель быт острым концом.
  let pinLeftPossition = advert.location.x - PIN_HALF_WIDTH;
  let pinTopPosition = advert.location.y - PIN_HEIGHT;
  let imgUrl = advert.author.avatar;
  let imgAltText = advert.offer.title;

  return (
    `<button type="button" class="map__pin" style="left: ${pinLeftPossition}px; top: ${pinTopPosition}px;" tabindex="0">
        <img src="${imgUrl}" width="40" height="40" draggable="false" alt="${imgAltText}">
      </button>`
  );
};

export default class Pin {
  constructor(advert) {
    this._advert = advert;
    this._element = null;
    this._isSelected = false;
  }

  getTemplate() {
    return createPinTemplate(this._advert);
  }

  getElement() {
    if (!this._element) {
      this._element = createSomeElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
  //
  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
  //
  select() {
    this._isSelected = true;
    this.getElement().classList.add(`map__pin--active`);
  }
  //
  deselect() {
    this._isSelected = false;
    this.getElement().classList.remove(`map__pin--active`);
  }

  static saveSelectedPin(pin) {
    if (selectedPin !== pin) {
      selectedPin = pin;
    }
  }

  static removeSelectedPin() {
    if (selectedPin !== null) {
      selectedPin.deselect();
    }
    selectedPin = null;
  }
}
