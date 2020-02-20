'use strict';

(function () {
  // Шаблон для карточек объявлений
  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');

  function translateOfferType(type) {
    var cardOfferType = {
      'house': 'Дом',
      'flat': 'Квартира',
      'palace': 'Дворец',
      'bungalo': 'Бунгало'
    };
    return cardOfferType[type];
  }

  // Получаем список особенностей
  function changeCardFeatures(cardFeatures, cardOfferFeatures) {
    var cardElementFeatures = cardFeatures.querySelectorAll('.popup__feature');
    cardElementFeatures.forEach(function (item) {
      item.style.display = 'none';
    });
    cardOfferFeatures.forEach(function (item) {
      cardFeatures.querySelector('.popup__feature--' + item).style.display = 'inline-block';
    });
  }


  // Получаем набор фотографий объявления
  function getCardPhotos(cardOfferPhotos) {
    var photoTemplate = cardTemplate.querySelector('.popup__photos .popup__photo');
    var photoElement;
    var photosFragment = document.createDocumentFragment();
    cardOfferPhotos.forEach(function (photo) {
      photoElement = photoTemplate.cloneNode(true);
      photoElement.src = photo;
      photosFragment.appendChild(photoElement);
    });

    return photosFragment;
  }

  // Функция создания карточи объявления
  function renderCardElement(card) {
    var cardElement = cardTemplate.cloneNode(true);
    var cardElemetnType = cardElement.querySelector('.popup__type');
    var cardElementTime = cardElement.querySelector('.popup__text--time');
    var cardElementTitle = cardElement.querySelector('.popup__title');
    var cardElementPrice = cardElement.querySelector('.popup__text--price');
    var cardElementPhotos = cardElement.querySelector('.popup__photos');
    var cardElementAvatar = cardElement.querySelector('.popup__avatar');
    var cardElementAddress = cardElement.querySelector('.popup__text--address');
    var cardElementCapacity = cardElement.querySelector('.popup__text--capacity');
    var cardElementFeatures = cardElement.querySelector('.popup__features');
    var cardElementDescription = cardElement.querySelector('.popup__description');

    // Заголовок
    if (card.offer.title) {
      cardElementTitle.textContent = card.offer.title;
    } else {
      cardElementTitle.style.display = 'none';
    }
    // Адресс
    if (card.offer.address) {
      cardElementAddress.textContent = card.offer.address;
    } else {
      cardElementAddress.style.display = 'none';
    }
    // Цена
    if (card.offer.price) {
      cardElementPrice.textContent = card.offer.price + '₽/ночь';
    } else {
      cardElementPrice.style.display = 'none';
    }
    // Тип жилья
    if (card.offer.type) {
      cardElemetnType.textContent = translateOfferType(card.offer.type);
    } else {
      cardElemetnType.style.display = 'none';
    }
    // Количество комнат и гостей
    if (card.offer.rooms && card.offer.guests) {
      cardElementCapacity.textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    } else {
      cardElementCapacity.style.display = 'none';
    }
    // Время въезда/выезда
    if (card.offer.checkin && card.offer.checkout) {
      cardElementTime.textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    } else {
      cardElementTime.style.display = 'none';
    }
    // Наличие дополнительных особенностей
    if (card.offer.features.length) {
      changeCardFeatures(cardElementFeatures, card.offer.features);
    } else {
      cardElementFeatures.style.display = 'none';
    }
    // Описание объявления
    if (card.offer.description) {
      cardElementDescription.textContent = card.offer.description;
    } else {
      cardElementDescription.style.display = 'none';
    }
    // Фотографии объявления
    while (cardElementPhotos.firstChild) {
      cardElementPhotos.removeChild(cardElementPhotos.firstChild);
    }
    if (card.offer.photos.length) {
      cardElementPhotos.appendChild(getCardPhotos(card.offer.photos));
    } else {
      cardElementPhotos.style.display = 'none';
    }
    // Аватарка автора
    if (card.author.avatar) {
      cardElementAvatar.src = card.author.avatar;
    } else {
      cardElementAvatar.style.display = 'none';
    }
    cardElement.classList.add('hidden');
    return cardElement;
  }

  window.card = {
    renderCardElement: renderCardElement
  };
})();
