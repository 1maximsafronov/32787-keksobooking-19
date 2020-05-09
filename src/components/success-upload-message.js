import {createSomeElement} from "../utils.js";

const createTemplate = () => {
  return (
    `<div class="success">
        <p class="success__message">Ваше объявление<br>успешно размещено!</p>
      </div>`
  );
};

export default class SuccessUploadMessage {
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
