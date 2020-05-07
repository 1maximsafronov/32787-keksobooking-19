(() => {
  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
  // Форма ввода данных объявления
  const adForm = document.querySelector(`.ad-form`);
  const adType = adForm.querySelector(`select[id="type"]`);
  const adTitle = adForm.querySelector(`input[id="title"]`);
  const adPrice = adForm.querySelector(`input[id="price"]`);
  const adTimeIn = adForm.querySelector(`select[id="timein"]`);
  const adTimeOut = adForm.querySelector(`select[id="timeout"]`);
  const adAddress = adForm.querySelector(`input[id="address"]`);
  const adCapacity = adForm.querySelector(`select[id="capacity"]`);
  const adRoomNumber = adForm.querySelector(`select[id="room_number"]`);
  const avatarChooser = adForm.querySelector(`input[id="avatar"]`);
  const avatarPreview = adForm.querySelector(`.ad-form-header__preview img`);
  const imagesChooser = adForm.querySelector(`input[id="images"]`);
  const adResetButton = adForm.querySelector(`.ad-form__reset`);
  const adImagesContainer = adForm.querySelector(`.ad-form__photo`);
  adAddress.tabIndex = -1;

  const createSuccessTemplate = () => {
    return (
      `<div class="success">
        <p class="success__message">Ваше объявление<br>успешно размещено!</p>
      </div>`
    );
  };

  const createErrorTemplate = () => {
    return (
      `<div class="error">
        <p class="error__message">Ошибка загрузки объявления</p>
        <button class="error__button">Попробовать снова</button>
      </div>`
    );
  };

  // Функция задания значения поля адреса
  const setAddressValue = (x, y) => {
    adAddress.value = x + `, ` + y + ``;
  };

  // Функция выделения невалидных полей
  const setInvalidOutline = (target) => {
    target.style.outline = `2px solid red`;
  };

  // функция оцистки выделения невалидных полей
  const clearInvalidOutline = (target) => {
    target.style.outline = `none`;
  };

  // Функция валидации типа выбраного жилья
  const validateAdType = () => {
    let placeholderPrice = {
      'bungalo': 0,
      'flat': 1000,
      'house': 5000,
      'palace': 10000
    };
    adPrice.placeholder = placeholderPrice[adType.value];
    adPrice.min = placeholderPrice[adType.value];
  };

  const getErrorCapacity = (rooms, capacity) => {
    if (rooms === 1 && capacity !== 1) {
      return `В таком количестве комнат может быть от 1 гость`;
    } else if (rooms === 2 && (capacity < 1 || capacity > 2)) {
      return `В таком количестве комнат может быть от 1 до 2-х гостей`;
    } else if (rooms === 3 && (capacity < 1 || capacity > 3)) {
      return `В таком количестве комнат может быть от 1 до 3-х гостей`;
    } else if (rooms === 100 && capacity !== 0) {
      return `Такое количество комнат не для гостей`;
    }
    return ``;
  };

  // Валидация вместимости жилья
  const validateRoomsCapacity = () => {
    let rooms = parseInt(adRoomNumber.value, 10);
    let capacity = parseInt(adCapacity.value, 10);
    let errorMessage = getErrorCapacity(rooms, capacity);
    adCapacity.setCustomValidity(errorMessage);
  };

  // Очистка выбранных фотографий
  const removeImages = () => {
    while (adImagesContainer.firstChild) {
      adImagesContainer.removeChild(adImagesContainer.firstChild);
    }
  };

  // При успешной отправке формы
  const onFormSuccess = () => {
    const successMessage = window.utils.createSomeElement(createSuccessTemplate());

    const hideSuccessMessage = () => {
      successMessage.remove();
      document.removeEventListener(`click`, onSuccessMessageClick);
      document.removeEventListener(`keydown`, onSuccessMessageEscKeydown);
    };

    const onSuccessMessageClick = (evtMsg) => {
      evtMsg.preventDefault();
      hideSuccessMessage();
    };

    const onSuccessMessageEscKeydown = (evtMsg) => {
      if (evtMsg.key === `Escape`) {
        evtMsg.preventDefault();
        hideSuccessMessage();
      }
    };

    document.addEventListener(`click`, onSuccessMessageClick);
    document.addEventListener(`keydown`, onSuccessMessageEscKeydown);
    document.querySelector(`main`).appendChild(successMessage);
    // window.main.deactivatePage();
    disable();
    window.map.disable();
  };

  // При ошибке отправки формы
  const onFormError = () => {
    const errorMessage = window.utils.createSomeElement(createErrorTemplate());
    const errorButton = errorMessage.querySelector(`.error__button`);


    const onErrorButtonClick = (evtMsg) => {
      evtMsg.preventDefault();
      hideErrorMessage();
    };
    const onErrorMessageEscKeydown = (evtMsg) => {
      if (evtMsg.key === `Escape`) {
        evtMsg.preventDefault();
        hideErrorMessage();
      }
    };
    const hideErrorMessage = () => {
      errorMessage.remove();
      errorButton.removeEventListener(`click`, onErrorButtonClick);
      document.removeEventListener(`click`, onErrorMessageClick);
      document.removeEventListener(`keydown`, onErrorMessageEscKeydown);
    };


    const onErrorMessageClick = (evtMsg) => {
      evtMsg.preventDefault();
      hideErrorMessage();
    };

    errorButton.addEventListener(`click`, onErrorButtonClick);
    document.addEventListener(`click`, onErrorMessageClick);
    document.addEventListener(`keydown`, onErrorMessageEscKeydown);
    document.querySelector(`main`).appendChild(errorMessage);

  };


  // При вводе текста в поле загаловка
  adTitle.addEventListener(`input`, (evt) =>{
    let target = evt.target;
    if (target.value.length < 30) {
      target.setCustomValidity(`Имя должно состоять минимум из ` + 30 + `-x символов`);
    } else {
      target.setCustomValidity(``);
    }
  });

  // При невалидном после ввода загаловка
  adTitle.addEventListener(`invalid`, () => {
    let errorMessage = ``;
    if (adTitle.validity.tooShort) {
      errorMessage = `Заголовок должен состоять минимум из 30-ти символов`;
    } else if (adTitle.validity.tooLong) {
      errorMessage = `Заголовок не должен привышать 100 символов`;
    } else if (adTitle.validity.valueMissing) {
      errorMessage = `Обязательное поле`;
    }
    adTitle.setCustomValidity(errorMessage);
    setInvalidOutline(adTitle);
  });

  // При изменении типа жилья
  adType.addEventListener(`change`, () => {
    validateAdType();
  });

  // при невалидной цене
  adPrice.addEventListener(`invalid`, () => {
    setInvalidOutline(adPrice);
  });

  // При изменении времени въезда в квартиру
  adTimeIn.addEventListener(`change`, () => {
    adTimeOut.value = adTimeIn.value;
  });

  // При изменении времени выезда из квартиры
  adTimeOut.addEventListener(`change`, () => {
    adTimeIn.value = adTimeOut.value;
  });

  // При изменении количества комнат
  adRoomNumber.addEventListener(`change`, () => {
    validateRoomsCapacity();
  });

  // При изменении элемента вместимости комнат
  adCapacity.addEventListener(`change`, () => {
    validateRoomsCapacity();
  });

  // При невалидной вместимости комнат
  adCapacity.addEventListener(`invalid`, () => {
    setInvalidOutline(adCapacity);
  });

  // при изменении элемента загрузки аватара
  avatarChooser.addEventListener(`change`, () => {
    let file = avatarChooser.files[0];
    let fileName = file.name.toLowerCase();
    let matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      let reader = new FileReader();

      reader.addEventListener(`load`, () => {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  // при изменении элемента выбора изображения
  imagesChooser.addEventListener(`change`, () => {
    let file = imagesChooser.files[0];
    let fileName = file.name.toLowerCase();
    let matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });
    if (matches) {
      let reader = new FileReader();

      reader.addEventListener(`load`, () => {
        const img = document.createElement(`img`);
        img.src = reader.result;
        img.style.width = 70 + `px`;
        img.style.height = 70 + `px`;
        adImagesContainer.appendChild(img);
      });

      reader.readAsDataURL(file);
    }
  });

  // Функция при отправке формы объявления
  adForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    window.backend.upload(new FormData(adForm), onFormSuccess, onFormError);
  });

  // При нажатии на кномку сброса формы
  adResetButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    // window.main.deactivatePage();
    disable();
    window.map.disable();
  });

  // Функция включения формы объявления
  const enable = () => {
    adForm.classList.remove(`ad-form--disabled`);
    window.utils.enableForm(adForm);
    validateRoomsCapacity();
  };

  // Функция отключения формы объявления
  const disable = () => {
    adForm.classList.add(`ad-form--disabled`);
    window.utils.disableForm(adForm);
    avatarPreview.src = `img/muffin-grey.svg`;
    removeImages();
    clearInvalidOutline(adPrice);
    clearInvalidOutline(adCapacity);
    clearInvalidOutline(adTitle);
    adForm.reset();
    validateAdType();
  };

  window.adform = {
    setAddressValue,
    enable,
    disable
  };
})();


/*
onAdFormSubmit
onImagesChooserChange
onAvatarChooserChange
onCapacityChange
onRoomNumberChange
onAdTypeChange
onAdTitleInput
onAdTitleInvalid
*/
