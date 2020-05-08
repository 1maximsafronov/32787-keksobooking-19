import {enableForm, disableForm} from "../utils.js";
// import {getAdverts} from "../data.js";

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

const checkByType = (advert, value)=> {
  return (advert.offer.type === value || value === ANY_VALUE);
};

const checkByPrice = (advert, priceFilter)=> {
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

const checkByRooms = (advert, roomsFilter)=> {
  return (advert.offer.rooms.toString() === roomsFilter.value || roomsFilter.value === ANY_VALUE);
};

const checkByGuests = (advert, guestsFilter)=> {
  return (advert.offer.guests.toString() === guestsFilter.value || guestsFilter.value === ANY_VALUE);
};

const checkByFeatures = (advert, featuresFilter)=> {
  const featuresCheckbox = featuresFilter.querySelectorAll(`input:checked`);

  for (let i = 0; i < featuresCheckbox.length; i++) {
    if (!advert.offer.features.includes(featuresCheckbox[i].value)) {
      return false;
    }
  }

  return true;
};

export default class Filter {
  constructor(filterForm, map) {
    this._map = map;
    this._filterForm = filterForm;
    this._typeFilter = this._filterForm.querySelector(`#housing-type`);
    this._priceFilter = this._filterForm.querySelector(`#housing-price`);
    this._roomsFilter = this._filterForm.querySelector(`#housing-rooms`);
    this._guestsFilter = filterForm.querySelector(`#housing-guests`);
    this._featuresFilter = filterForm.querySelector(`#housing-features`);
  }

  checkAdvert(advert) {
    let isTypeConform = checkByType(advert, this._typeFilter);
    let isPriceConform = checkByPrice(advert, this._priceFilter);
    let isRoomsConform = checkByRooms(advert, this._roomsFilter);
    let isGuestsConform = checkByGuests(advert, this._guestsFilter);
    let isFeaturesConform = checkByFeatures(advert, this._featuresFilter);

    if (isTypeConform && isPriceConform && isRoomsConform && isGuestsConform && isFeaturesConform) {
      return true;
    }
    return false;
  }

  filterAdverts() {
    let adverts = this._map.getAdverts();
    let filteredAdverts = [];


    for (let i = 0; i < adverts.length; i++) {
      if (this.checkAdvert(adverts[i])) {
        filteredAdverts.push(adverts[i]);
      }
      if (filteredAdverts.length >= NUMBER_PINS) {
        break;
      }
    }

    this._map.render(filteredAdverts);
  }

  enable() {
    enableForm(this._filterForm);
    // this._filterForm.addEventListener(`change`, debounce(this.filterAdverts()));
    this._filterForm.addEventListener(`change`, this.filterAdverts);
  }

  disable() {
    disableForm(this._filterForm);
  }

  reset() {
    this._filterForm.reset();
  }
}
