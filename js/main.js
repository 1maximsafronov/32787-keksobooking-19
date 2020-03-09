'use strict';

(function () {

  // Главный маркер на карте
  var mapPinMain = document.querySelector('.map__pin--main');

  // Отключение форм при запуске страницы
  window.form.disableForms();

  // Задание адреса в форме объявления при мервой загрузке страницы
  window.form.setAddressValue((mapPinMain.offsetLeft + Math.floor(window.mainpin.MAP_PIN_MAIN_WIDTH / 2)), (mapPinMain.offsetTop + Math.floor(window.mainpin.MAP_PIN_MAIN_HEIGHT / 2)));

  // Функция активации страницы
  function activatePage() {
    window.form.enableForms();
    window.map.activateMap();
    window.form.validateRoomsCapacity();
  }
  // Функция деактивации старинцы
  function deactivatePage() {
    window.form.disableForms();
    window.map.disableMap();
    window.mainpin.disable();
  }

  window.main = {
    activatePage: activatePage,
    deactivatePage: deactivatePage
  };

})();
