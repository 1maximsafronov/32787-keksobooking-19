'use strict';

(function () {
  var PriceType = {
    ANY: 'any',
    MIDDLE: 'middle',
    LOW: 'low',
    HIGH: 'high'
  };

  var adverts = window.data.adverts;
  var filterForm = document.querySelector('.map__filters');
  var typeFilter = filterForm.querySelector('#housing-type');
  var priceFilter = filterForm.querySelector('#housing-price');
  var roomsFilter = filterForm.querySelector('#housing-rooms');
  var guestsFilter = filterForm.querySelector('#housing-guests');
  var featuresFilter = filterForm.querySelector('#housing-features');

  filterForm.addEventListener('change', window.debounce(filterAdverts));

  function filterAdverts() {
    window.map.closeOpenedCard();
    var filteredAdverts = adverts
      .filter(checkByType)
      .filter(checkByPrice)
      .filter(checkByRooms)
      .filter(checkByGuests)
      .filter(checkByFeatures);
    window.map.renderPins(filteredAdverts);
  }

  function checkByType(advert) {
    if (typeFilter.value === 'any') {
      return true;
    }
    return advert.offer.type === typeFilter.value;
  }

  function checkByPrice(advert) {
    var price;
    if (advert.offer.price < 10000) {
      price = PriceType.LOW;
    } else if (advert.offer.price > 50000) {
      price = PriceType.HIGH;
    } else {
      price = PriceType.MIDDLE;
    }

    return (priceFilter.value === price || priceFilter.value === PriceType.ANY);
  }

  function checkByRooms(advert) {
    if (roomsFilter.value === 'any') {
      return true;
    }
    return advert.offer.rooms.toString() === roomsFilter.value;
  }

  function checkByGuests(advert) {
    if (guestsFilter.value === 'any') {
      return true;
    }
    return advert.offer.guests.toString() === guestsFilter.value;
  }

  function checkByFeatures(advert) {
    var isFeatureMatch = true;
    var featuresCheckbox = featuresFilter.querySelectorAll('input:checked');

    featuresCheckbox.forEach(function (feature) {
      if (!advert.offer.features.includes(feature.value)) {
        isFeatureMatch = false;
      }
    });

    return isFeatureMatch;
  }

  function reset() {
    filterForm.reset();
  }

  function enable() {
    window.formsactions.enableForm(filterForm);
  }

  function disable() {
    window.formsactions.disableForm(filterForm);
  }

  window.filterform = {
    reset: reset,
    enable: enable,
    disable: disable
  };
})();
