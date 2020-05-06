'use strict';

(function () {

  var adverts = [];

  function filData(data) {
    data.forEach(function (item, index) {
      adverts[index] = item;
    });
  }

  function onSuccess(data) {
    filData(data);
    window.filterform.enable();
    window.map.renderPins(adverts);
  }

  function onError(errorMessage) {
    var randomdata = window.randomdata(8);
    var node = document.createElement('div');
    node.classList.add('error-data-load');
    node.textContent = errorMessage + ' Мы сгенерировали случайные объявления';
    document.body.appendChild(node);

    filData(randomdata);

    window.filterform.enable();
    window.map.renderPins(adverts);

    function hideError() {
      node.remove();
    }

    setTimeout(hideError, 5000);
  }

  function load() {
    window.backend.load(onSuccess, onError);
  }

  function getAdverts() {
    return adverts;
  }

  window.data = {
    load: load,
    getAdverts: getAdverts
  };
})();
