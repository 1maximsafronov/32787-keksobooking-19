'use strict';

(function () {

  var MAP_PIN_WIDTH = 50;
  var MAP_PIN_HEIGHT = 70;

  var mapPinMain = document.querySelector('.map__pin--main');
  var MAP_PIN_MAIN_WIDTH = mapPinMain.offsetWidth;
  var MAP_PIN_MAIN_HEIGHT = mapPinMain.offsetHeight;
  var MAP_PIN_MAIN_HEIGHT_POINTER = mapPinMain.offsetHeight + 25;
  // Шаблон для маркеров
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  // Функция создания маркера, DOM-элемента на основе объекта
  function renderPinElement(pin) {
    var pinElement = pinTemplate.cloneNode(true);

    // координаты маркера (x - половина ширины пина), (y - высота пина) чтобы указатель быт острым концом. НО РАБОТАЕТ СТРАННО
    pinElement.tabIndex = 0;
    pinElement.style = 'left: ' + (pin.location.x - MAP_PIN_WIDTH / 2) + 'px; top: ' + (pin.location.y - MAP_PIN_HEIGHT) + 'px;';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;

    return pinElement;
  }

  window.pin = {
    renderPinElement: renderPinElement,
    MAP_PIN_MAIN_WIDTH: MAP_PIN_MAIN_WIDTH,
    MAP_PIN_MAIN_HEIGHT: MAP_PIN_MAIN_HEIGHT,
    MAP_PIN_MAIN_HEIGHT_POINTER: MAP_PIN_MAIN_HEIGHT_POINTER
  };
})();
