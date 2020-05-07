(() => {

  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const PIN_HALF_WIDTH = PIN_WIDTH / 2;

  const createPinTemplate = (advert) => {
    // координаты маркера (x - половина ширины пина), (y - высота пина) чтобы указатель быт острым концом.
    let pinLeftPossition = advert.location.x - PIN_HALF_WIDTH;
    let pinTopPosition = advert.location.y - PIN_HEIGHT;
    let imgUrl = advert.author.avatar;
    let imgAltText = advert.offer.title;

    return (
      `<button type="button" class="map__pin" style="left: ${pinLeftPossition}px; top: ${pinTopPosition}px;" tabindex="0">
        <img src="${imgUrl}" width="40" height="40" draggable="false" alt="${imgAltText}">
      </button>`
    );
  };

  class Pin {
    constructor(advert) {
      this._advert = advert;
      this._element = null;
    }

    getTemplate() {
      return createPinTemplate(this._advert);
    }

    getElement() {
      if (!this._element) {
        this._element = window.utils.createSomeElement(this.getTemplate());
      }

      return this._element;
    }

    removeElement() {
      this._element = null;
    }
    //
    // select(){
    //
    // }
    //
    // deselect(){
    //
    // }
  }

  window.Pin = Pin;
})();

/*

 --- Метка объявления--

  <button type="button" class="map__pin" style="left: 200px; top: 400px;">
    <img src="img/avatars/user07.png" width="40" height="40" draggable="false" alt="Метка объявления">
  </button>

*/