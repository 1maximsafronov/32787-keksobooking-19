'use strict';
(function () {
  var mapPins = document.querySelector('.map__pins');
  // Главный маркер на карте
  var mapPinMain = document.querySelector('.map__pin--main');

  var MAP_PIN_MAIN_WIDTH = window.pin.MAP_PIN_MAIN_WIDTH;
  var MAP_PIN_MAIN_HEIGHT_POINTER = window.pin.MAP_PIN_MAIN_HEIGHT_POINTER;

  // Обработчики собыитй при первом клике на главный маркер
  mapPinMain.addEventListener('mousedown', onPinMainFirstClick);
  mapPinMain.addEventListener('keydown', onPinMainFirstClick);

  // Функция обработчик нажатия на главный маркер
  function onPinMainFirstClick(evt) {
    if (evt.button === 0 || evt.key === 'Enter') {
      evt.preventDefault();
      window.main.activationPage();
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

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newPincoords = {
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y
      };

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
})();
