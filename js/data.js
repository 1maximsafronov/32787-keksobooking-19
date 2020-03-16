'use strict';

(function () {

  var adverts = [];

  function onSuccess(data) {
    for (var i = 0; i < data.length; i++) {
      adverts[i] = data[i];
    }
  }

  function onError(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

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
