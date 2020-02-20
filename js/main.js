'use strict';

/*

  Просто чтобы закрыть 5 главу первое задание.
  В прошлый раз уже разделил на модули

*/

(function () {

  // Главный маркер на карте
  var mapPinMain = document.querySelector('.map__pin--main');

  var MAP_PIN_MAIN_WIDTH = mapPinMain.offsetWidth;
  var MAP_PIN_MAIN_HEIGHT = mapPinMain.offsetHeight;

  var adForm = document.querySelector('.ad-form--disabled');
  var mapFilters = document.querySelector('.map__filters');

  // Функция отключения элемента
  function disableElement(elements) {
    elements.forEach(function (element) {
      element.disabled = true;
    });
  }

  // Функция включения элемента
  function enableElement(elements) {
    elements.forEach(function (element) {
      element.disabled = false;
    });
  }

  // Функция отключения формы
  function disableForm(form) {
    var selects = form.querySelectorAll('select');
    var inputs = form.querySelectorAll('input');
    var buttons = form.querySelectorAll('button');
    var fieldsets = form.querySelectorAll('fieldset');
    disableElement(selects);
    disableElement(inputs);
    disableElement(buttons);
    disableElement(fieldsets);
  }

  // Функция включения формы
  function enableForm(form) {
    var selects = form.querySelectorAll('select');
    var inputs = form.querySelectorAll('input');
    var buttons = form.querySelectorAll('button');
    var fieldsets = form.querySelectorAll('fieldset');
    enableElement(selects);
    enableElement(inputs);
    enableElement(buttons);
    enableElement(fieldsets);
  }

  // Отключение форм при запуске страницы
  disableForm(adForm);
  disableForm(mapFilters);

  // Задание адреса в форме объявления при мервой загрузке страницы
  window.form.setAddressValue((mapPinMain.offsetLeft + Math.floor(MAP_PIN_MAIN_WIDTH / 2)), (mapPinMain.offsetTop + Math.floor(MAP_PIN_MAIN_HEIGHT / 2)));

  // Функция активации страницы
  function activationPage() {
    enableForm(adForm);
    enableForm(mapFilters);
    window.map.drawPins();
    window.form.validateRoomsCapacity();
    adForm.classList.remove('ad-form--disabled');
    document.querySelector('.map').classList.remove('map--faded');
  }

  // Функция обработчик нажатия на главный маркер
  function onPinMainFirstClick(evt) {
    if (evt.button === 0 || evt.key === 'Enter') {
      evt.preventDefault();
      activationPage();
      mapPinMain.removeEventListener('mousedown', onPinMainFirstClick);
      mapPinMain.removeEventListener('keydown', onPinMainFirstClick);
      // Задание адреса в форме объявления при активации страницы
      window.form.setAddressValue(mapPinMain.offsetLeft + Math.floor(MAP_PIN_MAIN_WIDTH / 2), mapPinMain.offsetTop + MAP_PIN_MAIN_HEIGHT + 25);
    }
  }

  mapPinMain.addEventListener('mousedown', onPinMainFirstClick);
  mapPinMain.addEventListener('keydown', onPinMainFirstClick);

})();
