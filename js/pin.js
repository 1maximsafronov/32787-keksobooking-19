'use strict';

(function () {

  var MAP_PIN_WIDTH = 50;
  var MAP_PIN_HEIGHT = 70;

  // Шаблон для маркеров
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  // Функция создания маркера, DOM-элемента на основе объекта
  function createElement(pin) {
    var pinElement = pinTemplate.cloneNode(true);

    // координаты маркера (x - половина ширины пина), (y - высота пина) чтобы указатель быт острым концом.
    pinElement.tabIndex = 0;
    pinElement.style = 'left: ' + (pin.location.x - MAP_PIN_WIDTH / 2) + 'px; top: ' + (pin.location.y - MAP_PIN_HEIGHT) + 'px;';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;

    return pinElement;
  }

  window.pin = {
    createElement: createElement
  };
})();
