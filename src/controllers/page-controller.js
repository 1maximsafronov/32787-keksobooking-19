import MapComponent from "../components/map.js";
import MainPinComponent from "../components/mainpin.js";
import FilterComponent from "../components/filterform.js";
import AdFormComponent from "../components/adform.js";

export default class PageController {
  constructor(model) {
    this._model = model;
    this.map = new MapComponent(this._model.getAdverts());
    this.mainPin = new MainPinComponent();
    this.filter = new FilterComponent();
    this.adForm = new AdFormComponent();
  }

  activatePage() {
    this.map.enable();
    this.filter.enable();
    this.adForm.enable();
    this._setFilterHandler();
    this._setAdFormHandlers();
    this._setMainPinHandler();
  }

  deactivate() {
    this.map.disable();
    this.mainPin.reset();
    this.filter.disable();
    this.adForm.disable();
    this._setOnStartAction();
  }

  renderMap(data) {
    this.map.render(data);
  }

  _setOnStartAction() {
    const onMainPinFirstMousedown = (evt) => {
      if (evt.button === 0) {
        evt.preventDefault();
        this.activatePage();
        this.mainPin.getElement().removeEventListener(`mousedown`, onMainPinFirstMousedown);
      }
    };
    this.mainPin.setFirstMousdownHandler(onMainPinFirstMousedown);
  }

  _setFilterHandler() {
    this.filter.setChangeHandler((evt)=>{
      evt.preventDefault();
      this.filter.filterAdverts(this._model.getAdverts());
      this.renderMap(this.filter.getFilteredAdverts());
    });
  }

  _setAdFormHandlers() {
    this.adForm.setResetBtnClickHandler((evt)=>{
      evt.preventDefault();
      this.deactivate();
    });
    this.adForm.setSubmitHandler((evt)=>{
      evt.preventDefault();
      this.adForm.uploadData();
      this.deactivate();
    });
  }

  _setMainPinHandler() {
    this.mainPin.setChangeCoordsHandler((x, y)=>{
      this.adForm.setAddressValue(x, y);
    });
  }
}
