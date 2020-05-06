(() => {

  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.popup`);

  const translateOfferType = (type) => {
    let houseType = {
      'house': `Дом`,
      'flat': `Квартира`,
      'palace': `Дворец`,
      'bungalo': `Бунгало`
    };

    return houseType[type];
  };
  // Получаем список особенностей
  const changeCardFeatures = (cardFeatures, advertFeatures) => {
    const cardElementFeatures = cardFeatures.querySelectorAll(`.popup__feature`);
    cardElementFeatures.forEach((item) => {
      item.style.display = `none`;
    });
    advertFeatures.forEach((item) => {
      cardFeatures.querySelector(`.popup__feature--` + item).style.display = `inline-block`;
    });
  };
  // Получаем набор фотографий объявления
  const getCardPhotos = (advertPhotos) => {
    const photoTemplate = cardTemplate.querySelector(`.popup__photos .popup__photo`);
    let photoElement;
    const photosFragment = document.createDocumentFragment();
    advertPhotos.forEach((photo)=> {
      photoElement = photoTemplate.cloneNode(true);
      photoElement.src = photo;
      photosFragment.appendChild(photoElement);
    });

    return photosFragment;
  };
  // Функция создания карточи объявления
  const createElement = (advert)=> {
    const cardElement = cardTemplate.cloneNode(true);
    const cardElemetnType = cardElement.querySelector(`.popup__type`);
    const cardElementTime = cardElement.querySelector(`.popup__text--time`);
    const cardElementTitle = cardElement.querySelector(`.popup__title`);
    const cardElementPrice = cardElement.querySelector(`.popup__text--price`);
    const cardElementPhotos = cardElement.querySelector(`.popup__photos`);
    const cardElementAvatar = cardElement.querySelector(`.popup__avatar`);
    const cardElementAddress = cardElement.querySelector(`.popup__text--address`);
    const cardElementCapacity = cardElement.querySelector(`.popup__text--capacity`);
    const cardElementFeatures = cardElement.querySelector(`.popup__features`);
    const cardElementDescription = cardElement.querySelector(`.popup__description`);

    // Заголовок
    if (advert.offer.title) {
      cardElementTitle.textContent = advert.offer.title;
    } else {
      cardElementTitle.style.display = `none`;
    }
    // Адресс
    if (advert.offer.address) {
      cardElementAddress.textContent = advert.offer.address;
    } else {
      cardElementAddress.style.display = `none`;
    }
    // Цена
    if (advert.offer.price) {
      cardElementPrice.textContent = advert.offer.price + `₽/ночь`;
    } else {
      cardElementPrice.style.display = `none`;
    }
    // Тип жилья
    if (advert.offer.type) {
      cardElemetnType.textContent = translateOfferType(advert.offer.type);
    } else {
      cardElemetnType.style.display = `none`;
    }
    // Количество комнат и гостей
    if (advert.offer.rooms && advert.offer.guests) {
      cardElementCapacity.textContent = advert.offer.rooms + ` комнаты для ` + advert.offer.guests + ` гостей`;
    } else {
      cardElementCapacity.style.display = `none`;
    }
    // Время въезда/выезда
    if (advert.offer.checkin && advert.offer.checkout) {
      cardElementTime.textContent = `Заезд после ` + advert.offer.checkin + `, выезд до ` + advert.offer.checkout;
    } else {
      cardElementTime.style.display = `none`;
    }
    // Наличие дополнительных особенностей
    if (advert.offer.features.length) {
      changeCardFeatures(cardElementFeatures, advert.offer.features);
    } else {
      cardElementFeatures.style.display = `none`;
    }
    // Описание объявления
    if (advert.offer.description) {
      cardElementDescription.textContent = advert.offer.description;
    } else {
      cardElementDescription.style.display = `none`;
    }
    // Фотографии объявления
    while (cardElementPhotos.firstChild) {
      cardElementPhotos.removeChild(cardElementPhotos.firstChild);
    }
    if (advert.offer.photos.length) {
      cardElementPhotos.appendChild(getCardPhotos(advert.offer.photos));
    } else {
      cardElementPhotos.style.display = `none`;
    }
    // Аватарка автора
    if (advert.author.avatar) {
      cardElementAvatar.src = advert.author.avatar;
    } else {
      cardElementAvatar.style.display = `none`;
    }
    cardElement.classList.add(`hidden`);

    return cardElement;
  };

  window.card = {
    createElement
  };
})();
