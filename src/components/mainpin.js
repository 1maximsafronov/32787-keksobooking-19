
// const MOUS_LEFT_BUTTON_KEYCODE = 0;
// // const mapPins = document.querySelector(`.map__pins`);
// // Главный маркер на карте
// // const mainPin = document.querySelector(`.map__pin--main`);
//
// const MAIN_PIN_WIDTH = mainPin.offsetWidth;
// // const MAIN_PIN_HEIGHT = mainPin.offsetHeight;
// const MAIN_PIN_HEIGHT_POINTER = mainPin.offsetHeight + 25;
// const MIN_VERTICAL_POINT = 130;
// const MAX_VERTICAL_POINT = 630;
// const MIN_HORIZON_POINT = 0;
// const MAX_HORIZON_POINT = mapPins.offsetWidth;


// Проерка координат главного маркера на выход за пределы карты
// const checkMainPinCoords = (coords) =>{
//   let yCoord = coords.y + MAIN_PIN_HEIGHT_POINTER;
//   let xCoord = coords.x + MAIN_PIN_WIDTH / 2;
//
//   let isYCoordMatch = (
//     yCoord <= MAX_VERTICAL_POINT && yCoord >= MIN_VERTICAL_POINT
//   );
//   let isXCoordMatch = (
//     xCoord <= MAX_HORIZON_POINT && xCoord >= MIN_HORIZON_POINT
//   );
//
//   return (isYCoordMatch && isXCoordMatch);
// }; // --- checkMainPinCoords(coords) --- end


// let defaultPinCoords = {
//   x: mainPin.offsetLeft,
//   y: mainPin.offsetTop
// };

// const activateMainPin = () => {
//   // window.main.activatePage();
//
//   // window.adform.enable();
//   window.map.enable();
//   mainPin.removeEventListener(`mousedown`, onMainPinFirstMousedown);
//   mainPin.removeEventListener(`keydown`, onMainPinFirstKeydown);
// };

// Функция при первом нажатии на главный маркер
// const onMainPinFirstMousedown = (evt) => {
//   if (evt.button === MOUS_LEFT_BUTTON_KEYCODE) {
//     evt.preventDefault();
//     activateMainPin();
//   }
// };
//
// const onMainPinFirstKeydown = (evt) => {
//   if (evt.key === `Enter`) {
//     evt.preventDefault();
//     activateMainPin();
//   }
// };


// const onMainPinMousedown = (evt) =>{
//   evt.preventDefault();
//
//   let startCoords = {
//     x: evt.clientX,
//     y: evt.clientY
//   };
//
//   // Функция передвижения главного маркера
//   const onMainPinMove = (moveEvt) =>{
//     moveEvt.preventDefault();
//
//     let newPincoords = {
//       x: mainPin.offsetLeft - (startCoords.x - moveEvt.clientX),
//       y: mainPin.offsetTop - (startCoords.y - moveEvt.clientY)
//     };
//
//     startCoords.x = moveEvt.clientX;
//     startCoords.y = moveEvt.clientY;
//
//     if (checkMainPinCoords(newPincoords)) {
//       mainPin.style.left = newPincoords.x + `px`;
//       mainPin.style.top = newPincoords.y + `px`;
//
//       // Задание адреса в форме объявления при активации страницы
//       // window.adform.setAddressValue(mainPin.offsetLeft + Math.floor(MAIN_PIN_WIDTH / 2), mainPin.offsetTop + MAIN_PIN_HEIGHT_POINTER);
//     }
//   }; // --- onMainPinMove(moveEvt) --- end
//
//   // Функция при отпускании мыши на главном маркере
//   const onMainPinMouseUp = (upEvt) =>{
//     upEvt.preventDefault();
//
//     // Задание адреса в форме объявления при активации страницы
//     // window.adform.setAddressValue(mainPin.offsetLeft + Math.floor(MAIN_PIN_WIDTH / 2), mainPin.offsetTop + MAIN_PIN_HEIGHT_POINTER);
//     document.removeEventListener(`mousemove`, onMainPinMove);
//     document.removeEventListener(`mouseup`, onMainPinMouseUp);
//   }; // --- onMainPinMouseUp(upEvt) --- end
//
//   if (evt.button === MOUS_LEFT_BUTTON_KEYCODE) {
//     document.addEventListener(`mousemove`, onMainPinMove);
//     document.addEventListener(`mouseup`, onMainPinMouseUp);
//   }
// }; // --- onMainPinMousedown(evt) --- end

// Функция сброса положения главного маркера
// const reset = () => {
//   // mainPin.style.left = defaultPinCoords.x + `px`;
//   // mainPin.style.top = defaultPinCoords.y + `px`;
//
//   mainPin.addEventListener(`mousedown`, onMainPinFirstMousedown);
//   mainPin.addEventListener(`keydown`, onMainPinFirstKeydown);
//
//   // Задание адреса в форме объявления при первой загрузке страницы
//   // window.adform.setAddressValue((defaultPinCoords.x + Math.floor(MAIN_PIN_WIDTH / 2)), (defaultPinCoords.y + Math.floor(MAIN_PIN_HEIGHT / 2)));
// }; // --- reset() --- end

// Обработчики собыитй при первом клике на главный маркер
// mainPin.addEventListener(`mousedown`, onMainPinFirstMousedown);
// mainPin.addEventListener(`keydown`, onMainPinFirstKeydown);

// Обработчик событий при передвижении главного маркера
// mainPin.addEventListener(`mousedown`, onMainPinMousedown);

// window.mainpin = {
//   reset
// };

//
//
//
//
//
//  ------- НОВЫЙ КОД ----------

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
          x: this._element.offsetLeft - (startCoords.x - moveEvt.clientX),
          y: this._element.offsetTop - (startCoords.y - moveEvt.clientY)
        };

        startCoords.x = moveEvt.clientX;
        startCoords.y = moveEvt.clientY;

        if (checkMainPinCoords(newPincoords)) {
          this._element.style.left = newPincoords.x + `px`;
          this._element.style.top = newPincoords.y + `px`;
          this.coords.x = newPincoords.x;
          this.coords.y = newPincoords.x;
        }
      }; // --- onMainPinMove(moveEvt) --- end

      // Функция при отпускании мыши на главном маркере
      const onMainPinMouseUp = (upEvt) =>{
        upEvt.preventDefault();

        document.removeEventListener(`mousemove`, onMainPinMove);
        document.removeEventListener(`mouseup`, onMainPinMouseUp);
      }; // --- onMainPinMouseUp(upEvt) --- end

      if (evt.button === MOUS_LEFT_BUTTON_KEYCODE) {
        document.addEventListener(`mousemove`, onMainPinMove);
        document.addEventListener(`mouseup`, onMainPinMouseUp);
      }
    }; // --- onMainPinMousedown(evt) --- end

    this._element.addEventListener(`mousedown`, onMainPinMousedown);
  } // --- constructor(mainPinElement) --- end

  getElement() {
    return this._element;
  }

  getCoords() {
    return this.coords;
  }

  reset() {
    this.coords.x = this._defaultPinCoords.x;
    this.coords.y = this._defaultPinCoords.y;
    this._element.style.left = this._defaultPinCoords.x + `px`;
    this._element.style.top = this._defaultPinCoords.y + `px`;
  }
}
