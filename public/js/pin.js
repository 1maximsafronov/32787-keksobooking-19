(() => {

  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;

  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  // Функция создания маркера
  const createElement = (advert) => {
    const pinElement = pinTemplate.cloneNode(true);
    pinElement.tabIndex = 0;
    // координаты маркера (x - половина ширины пина), (y - высота пина) чтобы указатель быт острым концом.
    pinElement.style.left = (advert.location.x - PIN_WIDTH / 2) + `px`;
    pinElement.style.top = (advert.location.y - PIN_HEIGHT) + `px`;
    pinElement.querySelector(`img`).src = advert.author.avatar;
    pinElement.querySelector(`img`).alt = advert.offer.title;

    return pinElement;
  };

  window.pin = {
    createElement
  };
})();
