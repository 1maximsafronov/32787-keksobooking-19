'use strict';

(function () {

  // Главный маркер на карте
  var mapPinMain = document.querySelector('.map__pin--main');

  // Отключение форм при запуске страницы
  deactivatePage();

  // Функция активации страницы
  function activatePage() {
    window.adform.enableForms();
    window.map.activateMap();
    window.adform.validateRoomsCapacity();
  }
  // Функция деактивации старинцы
  function deactivatePage() {
    window.adform.disableForms();
    window.map.disableMap();
    window.mainpin.disable();
    // Задание адреса в форме объявления при первой загрузке страницы
    window.adform.setAddressValue((mapPinMain.offsetLeft + Math.floor(window.mainpin.MAP_PIN_MAIN_WIDTH / 2)), (mapPinMain.offsetTop + Math.floor(window.mainpin.MAP_PIN_MAIN_HEIGHT / 2)));
  }

  window.main = {
    activatePage: activatePage,
    deactivatePage: deactivatePage
  };

})();
