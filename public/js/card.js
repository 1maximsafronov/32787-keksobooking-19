(() => {

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

  const createSomeElement = (template) => {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;

    return newElement.firstChild;
  };

  const createCardTemplate = (advert) => {
    const hideElement = (condition) => {
      return condition ? `` : `style="display: none;"`;
    };

    return (
      `<article class="map__card popup hidden">
        <img src="${advert.author.avatar}" ${hideElement(advert.author.avatar)} class="popup__avatar" width="70" height="70" alt="Аватар пользователя">
        <button type="button" class="popup__close">Закрыть</button>
        <h3 class="popup__title" ${hideElement(advert.offer.title)}>
          ${advert.offer.title}
        </h3>
        <p class="popup__text popup__text--address" ${hideElement(advert.offer.address)}>
          ${advert.offer.address}
        </p>
        <p class="popup__text popup__text--price" ${hideElement(advert.offer.price)}>
          ${advert.offer.price}&#x20bd;<span>/ночь</span>
        </p>
        <h4 class="popup__type" ${hideElement(advert.offer.type)}>
          ${translateOfferType(advert.offer.type)}
        </h4>
        <p class="popup__text popup__text--capacity" ${hideElement(advert.offer.rooms && advert.offer.guests)}>
          ${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей
        </p>
        <p class="popup__text popup__text--time" ${hideElement(advert.offer.checkin && advert.offer.checkout)}>
          Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}
        </p>
        <ul class="popup__features" ${hideElement(advert.offer.features.length)}>
          ${createFeatureslistTemplate(advert.offer.features)}
        </ul>
        <p class="popup__description" ${hideElement(advert.offer.description)}>
          ${advert.offer.description}.
        </p>
        <div class="popup__photos" ${hideElement(advert.offer.photos.length)}>
          ${createListPhotoTemplate(advert.offer.photos)}
        </div>
      </article>`
    );
  };

  // Функция создания карточи объявления
  const createElement = (advert)=> {
    return createSomeElement(createCardTemplate(advert));
  };

  window.card = {
    createElement
  };


})();

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
