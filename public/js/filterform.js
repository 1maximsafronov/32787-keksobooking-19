(() => {
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

  const filterForm = document.querySelector(`.map__filters`);
  const typeFilter = filterForm.querySelector(`#housing-type`);
  const priceFilter = filterForm.querySelector(`#housing-price`);
  const roomsFilter = filterForm.querySelector(`#housing-rooms`);
  const guestsFilter = filterForm.querySelector(`#housing-guests`);
  const featuresFilter = filterForm.querySelector(`#housing-features`);


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

  const checkAdvert = (advert)=> {
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

  const filterAdverts = () => {
    let adverts = window.data.getAdverts();
    let filteredAdverts = [];
    // window.map.closeOpenedCard();

    for (let i = 0; i < adverts.length; i++) {
      if (checkAdvert(adverts[i])) {
        filteredAdverts.push(adverts[i]);
      }
      if (filteredAdverts.length >= NUMBER_PINS) {
        break;
      }
    }

    window.map.renderPins(filteredAdverts);
  };

  const reset = ()=> {
    filterForm.reset();
  };

  const enable = ()=> {
    window.utils.enableForm(filterForm);
  };

  const disable = ()=> {
    window.utils.disableForm(filterForm);
  };


  filterForm.addEventListener(`change`, window.utils.debounce(filterAdverts));

  window.filterform = {
    reset,
    enable,
    disable
  };
})();
