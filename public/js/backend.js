(() => {
  const URL_LOAD = `https://javascript.pages.academy/keksobooking/data`;
  //   const URL_LOAD = `https://js.dump.academy/keksobooking/data`;
  const URL_UPLOAD = `https://javascript.pages.academy/keksobooking`;
  //  const URL_UPLOAD = `https://js.dump.academy/keksobooking`;
  const STATUS_CODE_OK = 200;
  const TIMEOUT_IN_MS = 10000;

  const load = (onSuccess, onError) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === STATUS_CODE_OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Ошибка при загрузке объявлени. Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });
    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения при загрузке объявлени. `);
    });
    xhr.addEventListener(`timeout`, () => {
      onError(`Ошибка при загрузке объявлени. Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.open(`GET`, URL_LOAD);
    xhr.send();
  };

  const upload = (data, onLoad, onError) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === STATUS_CODE_OK) {
        onLoad(xhr.response);
      } else {
        onError();
      }
    });
    xhr.addEventListener(`error`, () => {
      onError();
    });
    xhr.addEventListener(`timeout`, () => {
      onError();
    });

    xhr.open(`POST`, URL_UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    load,
    upload
  };
})();
