import {createSomeElement} from "../utils.js";

let openedCard = null;

const translateOfferType = (type) => {
  let houseType = {
    'house': `Дом`,
    'flat': `Квартира`,
    'palace': `Дворец`,
    'bungalo': `Бунгало`
  };

  return houseType[type];
};

// Получает шаблон списка особенностей
const createFeatureslistTemplate = (advertFeatures) => {
  let tmp = ``;

  advertFeatures.forEach((item) => {
    tmp += `<li class="popup__feature popup__feature--${item}"></li>`;
  });

  return tmp;
};

// Получаем шаблон списка фотографий объявления
const createListPhotoTemplate = (advertPhotos) => {
  let tmp = ``;

  advertPhotos.forEach((item) => {
    tmp += `<img src="${item}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
  });

  return tmp;
};

const createCardTemplate = (advert) => {
  const hideElement = (condition) => {
    return condition ? `` : `style="display: none;"`;
  };

  const avatar = advert.author.avatar;
  const title = advert.offer.title;
  const address = advert.offer.address;
  const price = advert.offer.price;
  const flatType = translateOfferType(advert.offer.type);
  const rooms = advert.offer.rooms;
  const guests = advert.offer.guests;
  const timeCheckin = advert.offer.checkin;
  const timeCheckout = advert.offer.checkout;
  const features = createFeatureslistTemplate(advert.offer.features);
  const description = advert.offer.description;
  const photos = createListPhotoTemplate(advert.offer.photos);

  return (
    `<article class="map__card popup hidden">
      <img src="${avatar}" ${hideElement(avatar)} class="popup__avatar" width="70" height="70" alt="Аватар пользователя">
      <button type="button" class="popup__close">Закрыть</button>
      <h3 class="popup__title" ${hideElement(title)}>${title}</h3>
      <p class="popup__text popup__text--address" ${hideElement(address)}>${address}</p>
      <p class="popup__text popup__text--price" ${hideElement(price)}>${price}&#x20bd;<span>/ночь</span></p>
      <h4 class="popup__type" ${hideElement(flatType)}>${flatType}</h4>
      <p class="popup__text popup__text--capacity" ${hideElement(rooms && guests)}>${rooms} комнаты для ${guests} гостей</p>
      <p class="popup__text popup__text--time" ${hideElement(timeCheckin && timeCheckout)}>Заезд после ${timeCheckin}, выезд до ${timeCheckout}</p>
      <ul class="popup__features" ${hideElement(features)}>
        ${features}
      </ul>
      <p class="popup__description" ${hideElement(description)}>${description}</p>
      <div class="popup__photos" ${hideElement(photos)}>
        ${photos}
      </div>
    </article>`
  );
};


export default class Card {
  constructor(advert) {
    this._advert = advert;
    this._element = null;
    this._isShown = false;
  }

  getTemplate() {
    return createCardTemplate(this._advert);
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

  setClickCloseBtnHandler(handler) {
    this.getElement().querySelector(`.popup__close`).addEventListener(`click`, handler);
  }

  show() {
    this._isShown = true;
    this.getElement().classList.remove(`hidden`);
  }

  hide() {
    this._isShown = false;
    this.getElement().classList.add(`hidden`);
  }

  static saveOpenedCard(card) {
    if (openedCard !== card) {
      openedCard = card;
    }
  }

  static hideOpenedCard() {
    if (openedCard !== null) {
      openedCard.hide();
    }
    openedCard = null;
  }
}


/*

<!-- Модальное окно с информацией об объявлении -->

  <article class="map__card popup">
    <img src="img/avatars/user01.png" class="popup__avatar" width="70" height="70" alt="Аватар пользователя">
    <button type="button" class="popup__close">Закрыть</button>
    <h3 class="popup__title">Уютное гнездышко для молодоженов</h3>
    <p class="popup__text popup__text--address">102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3</p>
    <p class="popup__text popup__text--price">5200&#x20bd;<span>/ночь</span></p>
    <h4 class="popup__type">Квартира</h4>
    <p class="popup__text popup__text--capacity">2 комнаты для 3 гостей</p>
    <p class="popup__text popup__text--time">Заезд после 14:00, выезд до 10:00</p>
    <ul class="popup__features">
      <li class="popup__feature popup__feature--wifi"></li>
      <li class="popup__feature popup__feature--dishwasher"></li>
      <li class="popup__feature popup__feature--parking"></li>
      <li class="popup__feature popup__feature--washer"></li>
      <li class="popup__feature popup__feature--elevator"></li>
      <li class="popup__feature popup__feature--conditioner"></li>
    </ul>
    <p class="popup__description">Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.</p>
    <div class="popup__photos">
      <img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья">
    </div>
  </article>

*/
