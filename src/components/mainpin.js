const MOUS_LEFT_BUTTON_KEYCODE = 0;
const MIN_VERTICAL_POINT = 130;
const MAX_VERTICAL_POINT = 630;
const MIN_HORIZON_POINT = 0;
const MAX_HORIZON_POINT = 1200;
const MAIN_PIN_WIDTH = 65;
const MAIN_PIN_HEIGHT = 65;
const MAIN_PIN_HALF_WIDTH = Math.floor(MAIN_PIN_WIDTH / 2);
const MAIN_PIN_HEIGHT_POINTER = MAIN_PIN_HEIGHT + 25;
// Проерка координат главного маркера на выход за пределы карты
const checkMainPinCoords = (coords) =>{
  let yCoord = coords.y + MAIN_PIN_HEIGHT_POINTER;
  let xCoord = coords.x + MAIN_PIN_HALF_WIDTH;

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
    this._defaultPosition = {
      x: this._element.offsetLeft,
      y: this._element.offsetTop
    };
    this.coords = {
      x: this._defaultPosition.x,
      y: this._defaultPosition.y
    };
    this._mousedownHandlers = new Set();
    this._coordsListeners = new Set();
  }

  getElement() {
    return this._element;
  }

  getCoords() {
    return this.coords;
  }
  removeElement() {
    this._element = null;
  }

  reset() {
    this.coords = {
      x: this._defaultPosition.x,
      y: this._defaultPosition.y
    };
    this.notifyCoordListeners();
    this._element.style.left = this._defaultPosition.x + `px`;
    this._element.style.top = this._defaultPosition.y + `px`;
    this.removeMousedownHandler();
  }

  setFirstMousdownHandler(handler) {

    const onMouseDown = (evt)=> {
      evt.preventDefault();

      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      // Функция передвижения главного маркера
      const onMouseMove = (moveEvt) =>{
        moveEvt.preventDefault();

        let newPincoords = {
          x: this.getElement().offsetLeft - (startCoords.x - moveEvt.clientX),
          y: this.getElement().offsetTop - (startCoords.y - moveEvt.clientY)
        };

        startCoords.x = moveEvt.clientX;
        startCoords.y = moveEvt.clientY;

        if (checkMainPinCoords(newPincoords)) {
          this.getElement().style.left = newPincoords.x + `px`;
          this.getElement().style.top = newPincoords.y + `px`;
          this.coords = {
            x: newPincoords.x,
            y: newPincoords.y
          };
          this.notifyCoordListeners();
        }
      }; // --- onMouseMove(moveEvt) --- end

      // Функция при отпускании мыши на главном маркере
      const onMouseUp = (upEvt) =>{
        upEvt.preventDefault();
        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
      }; // --- onMainPinMouseUp(upEvt) --- end

      if (evt.button === MOUS_LEFT_BUTTON_KEYCODE) {
        document.addEventListener(`mousemove`, onMouseMove);
        document.addEventListener(`mouseup`, onMouseUp);
      }
    };// --- this.onMouseDown(evt) --- end

    this.getElement().addEventListener(`mousedown`, handler);
    this.setMousdownHandler(onMouseDown);
  }

  setMousdownHandler(handler) {
    this.getElement().addEventListener(`mousedown`, handler);
    this._mousedownHandlers.add(handler);
  }

  removeMousedownHandler() {
    for (const handler of this._mousedownHandlers) {
      this.getElement().removeEventListener(`mousedown`, handler);
      this._mousedownHandlers.delete(handler);
    }
  }

  notifyCoordListeners() {
    for (const listener of this._coordsListeners) {
      listener(this.coords.x + MAIN_PIN_HALF_WIDTH, this.coords.y + MAIN_PIN_HEIGHT_POINTER);
    }
  }

  setChangeCoordsHandler(handler) {
    this._coordsListeners.add(handler);
  }

}
