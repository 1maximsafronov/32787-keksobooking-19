(() => {
  const offerTypeArr = [`palace`, `flat`, `house`, `bungalo`];

  const offerFeaturesArr = [
    `wifi`,
    `dishwasher`,
    `parking`,
    `washer`,
    `elevator`,
    `conditioner`
  ];

  const offerPhotosArr = [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
  ];

  // карта маркеров
  const mapPins = document.querySelector(`.map__pins`);

  // Генерация адерса по горизонтали
  const getLocationX = () => {
    // от ширины контенера .map__pins
    return Math.floor(Math.random() * mapPins.offsetWidth);
  };

  // Генерация адреса по вертикали
  const getLocationY = () => {
    // от 130 до 630
    return Math.floor(Math.random() * 500) + 130;
  };

  // Генерация типа жилплощади
  const getOfferType = () => {
    return offerTypeArr[Math.floor(Math.random() * 4)];
  };

  // Генерация времени въезда/выезда
  const getOfferTime = () => {
    return (Math.floor(Math.random() * 3) + 12) + `:00`;
  };

  // Генерация имеющихся в квартире дополнительные особенности
  const getOfferFeatures = () => {
    let offerFeatures = [];
    for (let i = 0; i < Math.floor(Math.random() * (offerFeaturesArr.length + 1)); i++) {
      offerFeatures[i] = offerFeaturesArr[i];
    }

    return offerFeatures;
  };

  // Генерация массива с фотографиями объявления
  const getOfferPhotos = () => {

    let offerPhotos = [];
    for (let i = 0; i < Math.floor(Math.random() * (offerPhotosArr.length + 1)); i++) {
      offerPhotos[i] = offerPhotosArr[i];
    }

    return offerPhotos;
  };

  const getRandomAdvert = (numberPhoto) => {
    let locationX = getLocationX();
    let locationY = getLocationY();
    // Структура объекта (объявление аренды)
    return {
      'author': {
        'avatar': `img/avatars/user0${(1 + numberPhoto)}.png`
      },
      'offer': {
        'title': `заголовок предложения`, // (оставил увсех одинаково)
        'address': `${locationX} , ${locationY}`,
        'price': 12345, // стоимость проживания (оставил увсех одинаково)
        'type': getOfferType(),
        'rooms': 2, // количество комнат. (оставил увсех одинаково)
        'guests': 5, // Количество гостей (оставил увсех одинаково)
        'checkin': getOfferTime(), // Время заезда
        'checkout': getOfferTime(), // Время выезда
        'features': getOfferFeatures(),
        'description': `Строка с описанием`, // (оставил увсех одинаково)
        'photos': getOfferPhotos()
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    };
  };

  // Функция генерации массива объявлений
  const generateAdverts = (count) => {
    let advertsArr = [];
    for (let i = 0; i < count; i++) {
      advertsArr[i] = getRandomAdvert(i);
    }

    return advertsArr;
  };

  window.randomdata = generateAdverts;
})();
