'use strict';

(function () {
  // Отключение форм при запуске страницы
  deactivatePage();

  // Функция активации страницы
  function activatePage() {
    window.map.enable();
    window.adform.enable();
  }
  // Функция деактивации старинцы
  function deactivatePage() {
    window.map.disable();
    window.adform.disable();
  }

  window.main = {
    activatePage: activatePage,
    deactivatePage: deactivatePage
  };

})();
