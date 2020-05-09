import {loadData, getAdverts} from "./data.js";

export default class DataModel {
  constructor(adverts) {
    this._adverts = adverts;
  }
  loadAdverts() {
    loadData();
    this._adverts = getAdverts();
  }
  getAdverts() {
    return this._adverts;
  }

  updateAdverts() {
    this.loadAdverts();
  }

  removeAdverts() {
    this._adverts = null;
  }
}
