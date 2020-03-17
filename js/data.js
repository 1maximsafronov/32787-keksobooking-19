'use strict';

(function () {

  var adverts = [];

  function onSuccess(data) {
    data.forEach(function (item, index) {
      adverts[index] = item;
    });
  }

  function onError(errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-data-load');
    node.textContent = errorMessage;
    document.body.appendChild(node);

    function hideError() {
      node.remove();
    }

    setTimeout(hideError, 5000);
  }

  window.backend.load(onSuccess, onError);

  window.data = {
    adverts: adverts
  };
})();
