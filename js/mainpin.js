'use strict';
(function () {
  var mapPins = document.querySelector('.map__pins');
  // Главный маркер на карте
  var mapPinMain = document.querySelector('.map__pin--main');

  var MAP_PIN_MAIN_WIDTH = mapPinMain.offsetWidth;
  var MAP_PIN_MAIN_HEIGHT = mapPinMain.offsetHeight;
  var MAP_PIN_MAIN_HEIGHT_POINTER = mapPinMain.offsetHeight + 25;

  var startMainPinCoords = {
    x: mapPinMain.offsetLeft,
    y: mapPinMain.offsetTop
  };

  // Обработчики собыитй при первом клике на главный маркер
  mapPinMain.addEventListener('mousedown', onPinMainFirstClick);
  mapPinMain.addEventListener('keydown', onPinMainFirstClick);

  // Функция обработчик нажатия на главный маркер
  function onPinMainFirstClick(evt) {
    if (evt.button === 0 || evt.key === 'Enter') {
      evt.preventDefault();
      window.main.activatePage();
      mapPinMain.removeEventListener('mousedown', onPinMainFirstClick);
      mapPinMain.removeEventListener('keydown', onPinMainFirstClick);
    }
  }

  // Проерка координат главного маркера на выход за пределы карты
  function checkMainPinCoords(coords) {
    if ((coords.y + MAP_PIN_MAIN_HEIGHT_POINTER) >= 130) {
      if ((coords.y + MAP_PIN_MAIN_HEIGHT_POINTER) <= 630) {
        if ((coords.x + MAP_PIN_MAIN_WIDTH) <= mapPins.offsetWidth) {
          if (coords.x >= 0) {
            return true;
          }
        }
      }
    }

    return false;
  }

  // Обработчик событий при передвижении главного маркера
  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onPinMainMove(moveEvt) {
      moveEvt.preventDefault();

      var newPincoords = {
        x: mapPinMain.offsetLeft - (startCoords.x - moveEvt.clientX),
        y: mapPinMain.offsetTop - (startCoords.y - moveEvt.clientY)
      };

      startCoords.x = moveEvt.clientX;
      startCoords.y = moveEvt.clientY;

      if (checkMainPinCoords(newPincoords)) {
        mapPinMain.style.left = newPincoords.x + 'px';
        mapPinMain.style.top = newPincoords.y + 'px';

        // Задание адреса в форме объявления при активации страницы
        window.form.setAddressValue(mapPinMain.offsetLeft + Math.floor(MAP_PIN_MAIN_WIDTH / 2), mapPinMain.offsetTop + MAP_PIN_MAIN_HEIGHT_POINTER);
      }
    }

    function onPinMainMouseUp(upEvt) {
      upEvt.preventDefault();

      // Задание адреса в форме объявления при активации страницы
      window.form.setAddressValue(mapPinMain.offsetLeft + Math.floor(MAP_PIN_MAIN_WIDTH / 2), mapPinMain.offsetTop + MAP_PIN_MAIN_HEIGHT_POINTER);
      document.removeEventListener('mousemove', onPinMainMove);
      document.removeEventListener('mouseup', onPinMainMouseUp);

    }

    document.addEventListener('mousemove', onPinMainMove);
    document.addEventListener('mouseup', onPinMainMouseUp);
  });

  function disable() {
    mapPinMain.style.left = startMainPinCoords.x;
    mapPinMain.style.top = startMainPinCoords.y;

    // Задание адреса в форме объявления при мервой загрузке страницы
    window.form.setAddressValue((startMainPinCoords.x + Math.floor(MAP_PIN_MAIN_WIDTH / 2)), (startMainPinCoords.y + Math.floor(MAP_PIN_MAIN_HEIGHT / 2)));

    mapPinMain.addEventListener('mousedown', onPinMainFirstClick);
    mapPinMain.addEventListener('keydown', onPinMainFirstClick);
  }

  window.mainpin = {
    disable: disable,
    MAP_PIN_MAIN_WIDTH: MAP_PIN_MAIN_WIDTH,
    MAP_PIN_MAIN_HEIGHT: MAP_PIN_MAIN_HEIGHT,
    MAP_PIN_MAIN_HEIGHT_POINTER: MAP_PIN_MAIN_HEIGHT_POINTER
  };
})();
