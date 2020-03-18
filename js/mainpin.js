'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  // Главный маркер на карте
  var mainPin = document.querySelector('.map__pin--main');

  var MAIN_PIN_WIDTH = mainPin.offsetWidth;
  var MAIN_PIN_HEIGHT = mainPin.offsetHeight;
  var MAIN_PIN_HEIGHT_POINTER = mainPin.offsetHeight + 25;
  var MAX_VERTICAL_POINT = 130;
  var MIN_VERTICAL_POINT = 630;
  var defaultPinCoords = {
    x: mainPin.offsetLeft,
    y: mainPin.offsetTop
  };

  // Обработчики собыитй при первом клике на главный маркер
  mainPin.addEventListener('mousedown', onMainPinFirstClick);
  mainPin.addEventListener('keydown', onMainPinFirstClick);
  // Обработчик событий при передвижении главного маркера
  mainPin.addEventListener('mousedown', onMainPinMousedown);

  function onMainPinFirstClick(evt) {
    if (evt.button === 0 || evt.key === 'Enter') {
      evt.preventDefault();
      window.main.activatePage();
      mainPin.removeEventListener('mousedown', onMainPinFirstClick);
      mainPin.removeEventListener('keydown', onMainPinFirstClick);
    }
  }

  // Проерка координат главного маркера на выход за пределы карты
  function checkMainPinCoords(coords) {
    if ((coords.y + MAIN_PIN_HEIGHT_POINTER) >= MAX_VERTICAL_POINT) {
      if ((coords.y + MAIN_PIN_HEIGHT_POINTER) <= MIN_VERTICAL_POINT) {
        if ((coords.x + MAIN_PIN_WIDTH / 2) <= mapPins.offsetWidth) {
          if (coords.x >= (0 - MAIN_PIN_WIDTH / 2)) {
            return true;
          }
        }
      }
    }

    return false;
  }

  function onMainPinMousedown(evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMainPinMove(moveEvt) {
      moveEvt.preventDefault();

      var newPincoords = {
        x: mainPin.offsetLeft - (startCoords.x - moveEvt.clientX),
        y: mainPin.offsetTop - (startCoords.y - moveEvt.clientY)
      };

      startCoords.x = moveEvt.clientX;
      startCoords.y = moveEvt.clientY;

      if (checkMainPinCoords(newPincoords)) {
        mainPin.style.left = newPincoords.x + 'px';
        mainPin.style.top = newPincoords.y + 'px';

        // Задание адреса в форме объявления при активации страницы
        window.adform.setAddressValue(mainPin.offsetLeft + Math.floor(MAIN_PIN_WIDTH / 2), mainPin.offsetTop + MAIN_PIN_HEIGHT_POINTER);
      }
    }

    function onMainPinMouseUp(upEvt) {
      upEvt.preventDefault();

      // Задание адреса в форме объявления при активации страницы
      window.adform.setAddressValue(mainPin.offsetLeft + Math.floor(MAIN_PIN_WIDTH / 2), mainPin.offsetTop + MAIN_PIN_HEIGHT_POINTER);
      document.removeEventListener('mousemove', onMainPinMove);
      document.removeEventListener('mouseup', onMainPinMouseUp);

    }
    if (evt.button === 0) {
      document.addEventListener('mousemove', onMainPinMove);
      document.addEventListener('mouseup', onMainPinMouseUp);
    }
  }

  function reset() {
    mainPin.style.left = defaultPinCoords.x + 'px';
    mainPin.style.top = defaultPinCoords.y + 'px';

    mainPin.addEventListener('mousedown', onMainPinFirstClick);
    mainPin.addEventListener('keydown', onMainPinFirstClick);

    // Задание адреса в форме объявления при первой загрузке страницы
    window.adform.setAddressValue((defaultPinCoords.x + Math.floor(MAIN_PIN_WIDTH / 2)), (defaultPinCoords.y + Math.floor(MAIN_PIN_HEIGHT / 2)));
  }

  window.mainpin = {
    reset: reset
  };
})();
