(() => {
  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
  // Форма ввода данных объявления
  const adForm = document.querySelector(`.ad-form`);
  const adTitle = adForm.querySelector(`input[id="title"]`);
  const adType = adForm.querySelector(`select[id="type"]`);
  const adPrice = adForm.querySelector(`input[id="price"]`);
  const adRoomNumber = adForm.querySelector(`select[id="room_number"]`);
  const adCapacity = adForm.querySelector(`select[id="capacity"]`);
  const adTimeIn = adForm.querySelector(`select[id="timein"]`);
  const adTimeOut = adForm.querySelector(`select[id="timeout"]`);
  const adAddress = adForm.querySelector(`input[id="address"]`);
  adAddress.tabIndex = -1;
  const avatarChooser = adForm.querySelector(`input[id="avatar"]`);
  const avatarPreview = adForm.querySelector(`.ad-form-header__preview img`);
  const imagesChooser = adForm.querySelector(`input[id="images"]`);
  const adImagesContainer = adForm.querySelector(`.ad-form__photo`);
  const adResetButton = adForm.querySelector(`.ad-form__reset`);
  const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

  const setAddressValue = (x, y) => {
    adAddress.value = x + `, ` + y + ``;
  };

  const setInvalidOutline = (target) => {
    target.style.outline = `2px solid red`;
  };

  const clearInvalidOutline = (target) => {
    target.style.outline = `none`;
  };

  const onAdTitleInvalid = () => {
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
  };

  const onAdTitleInput = (evt) =>{
    let target = evt.target;
    if (target.value.length < 30) {
      target.setCustomValidity(`Имя должно состоять минимум из ` + 30 + `-x символов`);
    } else {
      target.setCustomValidity(``);
    }
  };
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

  const onAdTypeChange = () => {
    validateAdType();
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

  const validateRoomsCapacity = () => {
    let rooms = parseInt(adRoomNumber.value, 10);
    let capacity = parseInt(adCapacity.value, 10);
    let errorMessage = getErrorCapacity(rooms, capacity);
    adCapacity.setCustomValidity(errorMessage);
  };

  const onCapacityChange = () => {
    validateRoomsCapacity();
  };

  const onRoomNumberChange = () => {
    validateRoomsCapacity();
  };

  const onAvatarChooserChange = () => {
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
  };

  const onImagesChooserChange = () => {
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
  };
  // Очистка выбранных фотографий
  const removeImages = () => {
    while (adImagesContainer.firstChild) {
      adImagesContainer.removeChild(adImagesContainer.firstChild);
    }
  };
  // При успешной отправке формы
  const onFormSuccess = () => {
    const successMessage = successTemplate.cloneNode(true);
    document.addEventListener(`click`, onSuccessMessageClick);
    document.addEventListener(`keydown`, onSuccessMessageEscKeydown);
    document.querySelector(`main`).appendChild(successMessage);
    window.main.deactivatePage();

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
  };

  // При ошибке отправки формы
  const onFormError = () => {
    const errorMessage = errorTemplate.cloneNode(true);
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

  // Функция при отправке формы объявления
  const onAdFormSubmit = (evt) => {
    evt.preventDefault();
    window.backend.upload(new FormData(adForm), onFormSuccess, onFormError);
  };

  adTitle.addEventListener(`invalid`, onAdTitleInvalid);
  adTitle.addEventListener(`input`, onAdTitleInput);
  adType.addEventListener(`change`, onAdTypeChange);
  adPrice.addEventListener(`invalid`, () => {
    setInvalidOutline(adPrice);
  });
  adTimeIn.addEventListener(`change`, () => {
    adTimeOut.value = adTimeIn.value;
  });
  adTimeOut.addEventListener(`change`, () => {
    adTimeIn.value = adTimeOut.value;
  });
  adRoomNumber.addEventListener(`change`, onRoomNumberChange);
  adCapacity.addEventListener(`change`, onCapacityChange);
  adCapacity.addEventListener(`invalid`, () => {
    setInvalidOutline(adCapacity);
  });
  avatarChooser.addEventListener(`change`, onAvatarChooserChange);
  imagesChooser.addEventListener(`change`, onImagesChooserChange);
  adForm.addEventListener(`submit`, onAdFormSubmit);
  adResetButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    window.main.deactivatePage();
  });

  const enable = () => {
    adForm.classList.remove(`ad-form--disabled`);
    window.formsactions.enable(adForm);
    validateRoomsCapacity();
  };

  const disable = () => {
    adForm.classList.add(`ad-form--disabled`);
    window.formsactions.disable(adForm);
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
