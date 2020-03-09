'use strict';

(function () {

  var URL = 'https://js.dump.academy/keksobooking/data';
  var URL_SAVE = 'https://js.dump.academy/keksobooking';
  var statusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  function load(onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Ошибка при загрузке объявлени. Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Ошибка при загрузке объявлени. Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Ошибка при загрузке объявлени. Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URL);
    xhr.send();
  }

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

  window.backend = {
    load: load,
    save: save
  };
})();
