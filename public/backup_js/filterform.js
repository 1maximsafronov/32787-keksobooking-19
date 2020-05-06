'use strict';

(function () {
  var NUMBER_PINS = 5;
  var PRICE_HIGH = 50000;
  var PRICE_LOW = 10000;
  var ANY_VALUE = 'any';
  var PriceType = {
    ANY: 'any',
    MIDDLE: 'middle',
    LOW: 'low',
    HIGH: 'high'
  };

  var filterForm = document.querySelector('.map__filters');
  var typeFilter = filterForm.querySelector('#housing-type');
  var priceFilter = filterForm.querySelector('#housing-price');
  var roomsFilter = filterForm.querySelector('#housing-rooms');
  var guestsFilter = filterForm.querySelector('#housing-guests');
  var featuresFilter = filterForm.querySelector('#housing-features');

  filterForm.addEventListener('change', window.debounce(filterAdverts));

  function filterAdverts() {
    var adverts = window.data.getAdverts();
    var filteredAdverts = [];
    window.map.closeOpenedCard();

    for (var i = 0; i < adverts.length; i++) {
      if (checkAdvert(adverts[i])) {
        filteredAdverts.push(adverts[i]);
      }
      if (filteredAdverts.length >= NUMBER_PINS) {
        break;
      }
    }

    window.map.renderPins(filteredAdverts);
  }

  function checkAdvert(advert) {
    var isTypeConform = checkByType(advert);
    var isPriceConform = checkByPrice(advert);
    var isRoomsConform = checkByRooms(advert);
    var isGuestsConform = checkByGuests(advert);
    var isFeaturesConform = checkByFeatures(advert);

    if (isTypeConform && isPriceConform && isRoomsConform && isGuestsConform && isFeaturesConform) {
      return true;
    }
    return false;
  }

  function checkByType(advert) {
    return (advert.offer.type === typeFilter.value || typeFilter.value === ANY_VALUE);
  }

  function checkByPrice(advert) {
    var price;
    if (advert.offer.price < PRICE_LOW) {
      price = PriceType.LOW;
    } else if (advert.offer.price > PRICE_HIGH) {
      price = PriceType.HIGH;
    } else {
      price = PriceType.MIDDLE;
    }

    return (priceFilter.value === price || priceFilter.value === PriceType.ANY);
  }

  function checkByRooms(advert) {
    return (advert.offer.rooms.toString() === roomsFilter.value || roomsFilter.value === ANY_VALUE);
  }

  function checkByGuests(advert) {
    return (advert.offer.guests.toString() === guestsFilter.value || guestsFilter.value === ANY_VALUE);
  }

  function checkByFeatures(advert) {
    var featuresCheckbox = featuresFilter.querySelectorAll('input:checked');

    for (var i = 0; i < featuresCheckbox.length; i++) {
      if (!advert.offer.features.includes(featuresCheckbox[i].value)) {
        return false;
      }
    }

    return true;
  }

  function reset() {
    filterForm.reset();
  }

  function enable() {
    window.formsactions.enable(filterForm);
  }

  function disable() {
    window.formsactions.disable(filterForm);
  }

  window.filterform = {
    reset: reset,
    enable: enable,
    disable: disable
  };
})();
