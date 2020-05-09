import {RenderPosition, createSomeElement, render} from "./utils/render.js";
import {load as backendLoad} from "./backend.js";
import {generateAdverts} from "./randomdata.js";

const TOTAL_NUMBER_ADVERTS = 8;
const createEorrorMessageTemplate = (errorMessage) => {
  return (
    `<div class="error-data-load">
        ${errorMessage} Мы сгенерировали случайные объявления
      </div>`
  );
};
export default class DataModel {
  constructor() {
    this._adverts = [];
    this._isDataLoaded = false;
  }

  _loadAdverts() {
    this._adverts = [];

    const onSuccess = (data)=> {
      data.forEach((item, index)=> {
        this._adverts[index] = item;
      });

      this._isDataLoaded = true;
    };

    const onError = (errorMessage) => {
      const erorMessageElement = createSomeElement(createEorrorMessageTemplate(errorMessage));

      render(document.body, erorMessageElement, RenderPosition.BEFOREEND);


      const hideError = ()=> {
        erorMessageElement.remove();
      };

      setTimeout(hideError, 3000);

      this._isDataLoaded = false;
    };

    backendLoad(onSuccess, onError);
  }


  getAdverts() {
    if (!this._isDataLoaded) {
      this._loadAdverts();
    }
    return this._adverts;
  }

  updateAdverts() {
    this._loadAdverts();
  }
  generateAdverts() {
    this._adverts = [];
    this._adverts = generateAdverts(TOTAL_NUMBER_ADVERTS);
    this._isDataLoaded = true;
  }

  removeAdverts() {
    this._isDataLoaded = false;
    this._adverts = [];
  }
}
