(() => {

  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;

  const createPinTemplate = (advert) => {
    // координаты маркера (x - половина ширины пина), (y - высота пина) чтобы указатель быт острым концом.
    return (
      `<button type="button" class="map__pin" style="
      left: ${(advert.location.x - PIN_WIDTH / 2)}px;
      top: ${(advert.location.y - PIN_HEIGHT)}px;" tabindex="0">
        <img src="${advert.author.avatar}" width="40" height="40" draggable="false" alt="${advert.offer.title}">
      </button>`
    );
  };

  // Функция создания маркера
  const createElement = (advert) => {
    return window.utils.createSomeElement(createPinTemplate(advert));
  };

  window.pin = {
    createElement
  };

})();

/*

 --- Метка объявления--

  <button type="button" class="map__pin" style="left: 200px; top: 400px;">
    <img src="img/avatars/user07.png" width="40" height="40" draggable="false" alt="Метка объявления">
  </button>

*/
