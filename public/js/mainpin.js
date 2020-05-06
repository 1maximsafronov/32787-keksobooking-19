
(() => {
  const mapPins = document.querySelector(`.map__pins`);
  // Главный маркер на карте
  const mainPin = document.querySelector(`.map__pin--main`);

  const MAIN_PIN_WIDTH = mainPin.offsetWidth;
  const MAIN_PIN_HEIGHT = mainPin.offsetHeight;
  const MAIN_PIN_HEIGHT_POINTER = mainPin.offsetHeight + 25;
  const MIN_VERTICAL_POINT = 130;
  const MAX_VERTICAL_POINT = 630;
  const MAX_HORIZON_POINT = mapPins.offsetWidth;
  const MIN_HORIZON_POINT = 0;

  let defaultPinCoords = {
    x: mainPin.offsetLeft,
    y: mainPin.offsetTop
  };

  const activateMainPin = () => {
    window.main.activatePage();
    mainPin.removeEventListener(`mousedown`, onMainPinFirstMousedown);
    mainPin.removeEventListener(`keydown`, onMainPinFirstKeydown);
  };

  const onMainPinFirstMousedown = (evt) => {
    if (evt.button === 0) {
      evt.preventDefault();
      activateMainPin();
    }
  };

  const onMainPinFirstKeydown = (evt) => {
    if (evt.key === `Enter`) {
      evt.preventDefault();
      activateMainPin();
    }
  };

  // Проерка координат главного маркера на выход за пределы карты
  const checkMainPinCoords = (coords) =>{
    let yCoord = coords.y + MAIN_PIN_HEIGHT_POINTER;
    let xCoord = coords.x + MAIN_PIN_WIDTH / 2;

    let isYCoordMatch = (
      yCoord <= MAX_VERTICAL_POINT && yCoord >= MIN_VERTICAL_POINT
    );
    let isXCoordMatch = (
      xCoord <= MAX_HORIZON_POINT && xCoord >= MIN_HORIZON_POINT
    );

    return (isYCoordMatch && isXCoordMatch);
  };

  const onMainPinMousedown = (evt) =>{
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMainPinMove = (moveEvt) =>{
      moveEvt.preventDefault();

      let newPincoords = {
        x: mainPin.offsetLeft - (startCoords.x - moveEvt.clientX),
        y: mainPin.offsetTop - (startCoords.y - moveEvt.clientY)
      };

      startCoords.x = moveEvt.clientX;
      startCoords.y = moveEvt.clientY;

      if (checkMainPinCoords(newPincoords)) {
        mainPin.style.left = newPincoords.x + `px`;
        mainPin.style.top = newPincoords.y + `px`;

        // Задание адреса в форме объявления при активации страницы
        window.adform.setAddressValue(mainPin.offsetLeft + Math.floor(MAIN_PIN_WIDTH / 2), mainPin.offsetTop + MAIN_PIN_HEIGHT_POINTER);
      }
    };

    const onMainPinMouseUp = (upEvt) =>{
      upEvt.preventDefault();

      // Задание адреса в форме объявления при активации страницы
      window.adform.setAddressValue(mainPin.offsetLeft + Math.floor(MAIN_PIN_WIDTH / 2), mainPin.offsetTop + MAIN_PIN_HEIGHT_POINTER);
      document.removeEventListener(`mousemove`, onMainPinMove);
      document.removeEventListener(`mouseup`, onMainPinMouseUp);

    };
    if (evt.button === 0) {
      document.addEventListener(`mousemove`, onMainPinMove);
      document.addEventListener(`mouseup`, onMainPinMouseUp);
    }
  };

  const reset = () => {
    mainPin.style.left = defaultPinCoords.x + `px`;
    mainPin.style.top = defaultPinCoords.y + `px`;

    mainPin.addEventListener(`mousedown`, onMainPinFirstMousedown);
    mainPin.addEventListener(`keydown`, onMainPinFirstKeydown);

    // Задание адреса в форме объявления при первой загрузке страницы
    window.adform.setAddressValue((defaultPinCoords.x + Math.floor(MAIN_PIN_WIDTH / 2)), (defaultPinCoords.y + Math.floor(MAIN_PIN_HEIGHT / 2)));
  };

  // Обработчики собыитй при первом клике на главный маркер
  mainPin.addEventListener(`mousedown`, onMainPinFirstMousedown);
  mainPin.addEventListener(`keydown`, onMainPinFirstKeydown);
  // Обработчик событий при передвижении главного маркера
  mainPin.addEventListener(`mousedown`, onMainPinMousedown);

  window.mainpin = {
    reset
  };

})();
