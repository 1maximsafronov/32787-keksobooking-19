'use strict';

(function () {
  var adverts = window.data.adverts;
  var mapFilters = document.querySelector('.map__filters');
  var typeFilter = mapFilters.querySelector('select[id="housing-type"]');
  mapFilters.addEventListener('change', function (evt) {
    evt.preventDefault();
    window.map.closeOpenedCard();
    var filteredAdverts = adverts.filter(function (advert) {
      if (typeFilter.value === 'any') {
        return true;
      }
      return advert.offer.type === typeFilter.value;
    });
    window.map.renderPins(filteredAdverts);
  });
})();
