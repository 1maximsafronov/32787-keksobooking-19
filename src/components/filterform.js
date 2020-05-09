import {enableForm, disableForm} from "../utils.js";

const NUMBER_PINS = 5;
const PRICE_HIGH = 50000;
const PRICE_LOW = 10000;
const ANY_VALUE = `any`;
const PriceType = {
  ANY: `any`,
  MIDDLE: `middle`,
  LOW: `low`,
  HIGH: `high`
};
let filteredAdverts = [];
//
const filterAdverts = (adverts, formFilter) => {
  const typeFilter = formFilter.querySelector(`#housing-type`);
  const priceFilter = formFilter.querySelector(`#housing-price`);
  const roomsFilter = formFilter.querySelector(`#housing-rooms`);
  const guestsFilter = formFilter.querySelector(`#housing-guests`);
  const featuresFilter = formFilter.querySelector(`#housing-features`);

  filteredAdverts = [];

  // let typeValue = this._typeFilter.value;
  // let priceValue = this._priceFilter.value;
  // let roomsValue = this._roomsFilter.value;
  // let guestsValue = this._guestsFilter.value;
  // let featuresValues = this._featuresFilter.querySelectorAll(`input:checked`);

  const checkByType = (advert)=> {
    return (advert.offer.type === typeFilter.value || typeFilter.value === ANY_VALUE);
  };

  const checkByPrice = (advert)=> {
    let price;
    if (advert.offer.price < PRICE_LOW) {
      price = PriceType.LOW;
    } else if (advert.offer.price > PRICE_HIGH) {
      price = PriceType.HIGH;
    } else {
      price = PriceType.MIDDLE;
    }

    return (priceFilter.value === price || priceFilter.value === PriceType.ANY);
  };

  const checkByRooms = (advert)=> {
    return (advert.offer.rooms.toString() === roomsFilter.value || roomsFilter.value === ANY_VALUE);
  };

  const checkByGuests = (advert)=> {
    return (advert.offer.guests.toString() === guestsFilter.value || guestsFilter.value === ANY_VALUE);
  };

  const checkByFeatures = (advert)=> {
    const featuresCheckbox = featuresFilter.querySelectorAll(`input:checked`);

    for (let i = 0; i < featuresCheckbox.length; i++) {
      if (!advert.offer.features.includes(featuresCheckbox[i].value)) {
        return false;
      }
    }

    return true;
  };

  const checkAdvert = (advert) => {
    let isTypeConform = checkByType(advert);
    let isPriceConform = checkByPrice(advert);
    let isRoomsConform = checkByRooms(advert);
    let isGuestsConform = checkByGuests(advert);
    let isFeaturesConform = checkByFeatures(advert);

    if (isTypeConform && isPriceConform && isRoomsConform && isGuestsConform && isFeaturesConform) {
      return true;
    }
    return false;
  };

  for (let i = 0; i < adverts.length; i++) {
    if (checkAdvert(adverts[i])) {
      filteredAdverts.push(adverts[i]);
    }
    if (filteredAdverts.length >= NUMBER_PINS) {
      break;
    }
  }
};

export default class Filter {
  constructor(filterForm) {
    this._element = filterForm;
  }

  getElement() {
    return this._element;
  }

  enable() {
    enableForm(this.getElement());
  }

  disable() {
    disableForm(this.getElement());
  }

  reset() {
    this.getElement().reset();
  }

  setChangeHandler(handler) {
    this.getElement().addEventListener(`change`, handler);
  }

  filterAdverts(adverts) {
    filterAdverts(adverts, this.getElement());
  }

  getFilteredAdverts() {
    return filteredAdverts;
  }
}
