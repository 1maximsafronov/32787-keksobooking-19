'use strict';

(function () {
  var adverts = window.data.adverts;
  var filterForm = document.querySelector('.map__filters');
  var typeFilter = filterForm.querySelector('#housing-type');
  var priceFilter = filterForm.querySelector('#housing-price');
  var roomsFilter = filterForm.querySelector('#housing-rooms');
  var guestsFilter = filterForm.querySelector('#housing-guests');
  var featuresFilter = filterForm.querySelector('#housing-features');

  function checkByType(advert) {
    if (typeFilter.value === 'any') {
      return true;
    }
    return advert.offer.type === typeFilter.value;
  }

  function checkByPrice(advert) {
    var isPriceMatch = false;
    if (priceFilter.value === 'any') {
      return true;
    }
    if (priceFilter.value === 'middle') {
      if (advert.offer.price >= 10000 && advert.offer.price <= 50000) {
        isPriceMatch = true;
      }
    }
    if (priceFilter.value === 'low') {
      if (advert.offer.price < 10000) {
        isPriceMatch = true;
      }
    }
    if (priceFilter.value === 'high') {
      if (advert.offer.price > 50000) {
        isPriceMatch = true;
      }
    }
    return isPriceMatch;
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

  filterForm.addEventListener('change', window.debounce(filterAdverts));

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
