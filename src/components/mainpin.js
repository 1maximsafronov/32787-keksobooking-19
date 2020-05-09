const MOUS_LEFT_BUTTON_KEYCODE = 0;
const MIN_VERTICAL_POINT = 130;
const MAX_VERTICAL_POINT = 630;
const MIN_HORIZON_POINT = 0;
const MAX_HORIZON_POINT = 1200;
const MAIN_PIN_WIDTH = 65;
const MAIN_PIN_HEIGHT = 65;
const MAIN_PIN_HEIGHT_POINTER = MAIN_PIN_HEIGHT + 25;

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
}; // --- checkMainPinCoords(coords) --- end

// ---- Задание класса главного маркера
export default class MainPin {
  constructor(mainPinElement) {
    this._element = mainPinElement;
    this._defaultPinCoords = {
      x: this._element.offsetLeft,
      y: this._element.offsetTop
    };
    this.coords = {
      x: this._defaultPinCoords.x,
      y: this._defaultPinCoords.y
    };
  }

  getElement() {
    return this._element;
  }

  getCoords() {
    return this.coords;
  }

  reset() {
    this.coords = {
      x: this._defaultPinCoords.x,
      y: this._defaultPinCoords.y
    };
    this.getElement().style.left = this.coords.x + `px`;
    this.getElement().style.top = this.coords.y + `px`;
  }

  setFirstMousdownHandler(handler) {
    this.getElement().addEventListener(`mousedown`, handler);
    const onMainPinMousedown = (evt) =>{
      evt.preventDefault();

      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      // Функция передвижения главного маркера
      const onMainPinMove = (moveEvt) =>{
        moveEvt.preventDefault();
        let newPincoords = {
          x: this.getElement().offsetLeft - (startCoords.x - moveEvt.clientX),
          y: this.getElement().offsetTop - (startCoords.y - moveEvt.clientY)
        };
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        if (checkMainPinCoords(newPincoords)) {
          this.getElement().style.left = newPincoords.x + `px`;
          this.getElement().style.top = newPincoords.y + `px`;
          this.coords = {
            x: newPincoords.x,
            y: newPincoords.y
          };
        }
      }; // --- onMainPinMove(moveEvt) --- end

      // Функция при отпускании мыши на главном маркере
      const onMouseUp = (upEvt) =>{
        upEvt.preventDefault();
        document.removeEventListener(`mousemove`, onMainPinMove);
        document.removeEventListener(`mouseup`, onMouseUp);
      }; // --- onMainPinMouseUp(upEvt) --- end

      if (evt.button === MOUS_LEFT_BUTTON_KEYCODE) {
        document.addEventListener(`mousemove`, onMainPinMove);
        document.addEventListener(`mouseup`, onMouseUp);
      }
    }; // --- onMainPinMousedown(evt) --- end

    this.setMousdownHandler(onMainPinMousedown);
  }

  setMousdownHandler(handler) {
    this.getElement().addEventListener(`mousedown`, handler);
  }

  removeElement() {
    this._element = null;
  }
}
