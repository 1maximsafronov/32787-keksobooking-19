'use strict';

(function () {

  var URL_SAVE = 'https://js.dump.academy/keksobooking';
  var statusCode = {
    OK: 200,
  };

  function save(data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
    });

    xhr.open('POST', URL_SAVE);
    xhr.send(data);
  }

  window.upload = {
    save: save
  };
})();
