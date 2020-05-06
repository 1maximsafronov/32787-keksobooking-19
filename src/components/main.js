'use strict';

(function () {
  // Неактивное состояние странице на загрузке
  deactivatePage();

  // Функция активации страницы
  function activatePage() {
    window.adform.enable();
    window.map.enable();
  }
  // Функция деактивации старинцы
  function deactivatePage() {
    window.adform.disable();
    window.map.disable();
  }

  window.main = {
    activatePage: activatePage,
    deactivatePage: deactivatePage
  };

})();
