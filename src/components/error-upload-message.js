import {createSomeElement} from "../utils.js";

const createTemplate = () => {
  return (
    `<div class="error">
        <p class="error__message">Ошибка загрузки объявления</p>
        <button class="error__button">Попробовать снова</button>
      </div>`
  );
};

export default class ErrorUploadMessage {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createSomeElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
