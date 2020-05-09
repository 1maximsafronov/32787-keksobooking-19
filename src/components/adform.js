import {enableForm, disableForm, createSomeElement, setInvalidOutline, clearInvalidOutline} from "../utils.js";
import {upload as backendUpload} from "../backend.js";

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

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

const onFormSuccess = (form) => {
  const successMessage = createSomeElement(createSuccessTemplate());

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
  form.disable();
}; // --- onFormSuccess() --- end

// При ошибке отправки формы
const onFormError = () => {
  const errorMessage = createSomeElement(createErrorTemplate());
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

}; // --- onFormError() --- end

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


// Очистка выбранных фотографий
const removeImages = (imagesContainer) => {
  while (imagesContainer.firstChild) {
    imagesContainer.removeChild(imagesContainer.firstChild);
  }
};

const clearInvalidOutlines = (form) =>{
  const adPrice = form.querySelector(`input[id="price"]`);
  const adCapacity = form.querySelector(`select[id="capacity"]`);
  const adTitle = form.querySelector(`input[id="title"]`);
  clearInvalidOutline(adPrice);
  clearInvalidOutline(adCapacity);
  clearInvalidOutline(adTitle);
};

const setFormHandlers = (form) =>{
  const adType = form.querySelector(`select[id="type"]`);
  const adTitle = form.querySelector(`input[id="title"]`);
  const adPrice = form.querySelector(`input[id="price"]`);
  const adTimeIn = form.querySelector(`select[id="timein"]`);
  const adTimeOut = form.querySelector(`select[id="timeout"]`);
  const adCapacity = form.querySelector(`select[id="capacity"]`);
  const adRoomNumber = form.querySelector(`select[id="room_number"]`);
  const avatarChooser = form.querySelector(`input[id="avatar"]`);
  const avatarPreview = form.querySelector(`.ad-form-header__preview img`);
  const imagesChooser = form.querySelector(`input[id="images"]`);
  const adImagesContainer = form.querySelector(`.ad-form__photo`);

  // _________________ Хендлеры _______________________________
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
    let placeholderPrice = {
      'bungalo': 0,
      'flat': 1000,
      'house': 5000,
      'palace': 10000
    };
    adPrice.placeholder = placeholderPrice[adType.value];
    adPrice.min = placeholderPrice[adType.value];
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

  const validateRoomsCapacity = ()=>{
    let rooms = parseInt(adRoomNumber.value, 10);
    let capacity = parseInt(adCapacity.value, 10);
    let errorMessage = getErrorCapacity(rooms, capacity);
    adCapacity.setCustomValidity(errorMessage);
  };
  validateRoomsCapacity();
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
  }); // -- emagesChoserHandler --- end
};

export default class AdForm {
  constructor(adFormElement) {
    this._element = adFormElement;
    this._resetBtn = this._element.querySelector(`.ad-form__reset`);
  }
  getElement() {
    return this._element;
  }

  enable() {
    this.getElement().classList.remove(`ad-form--disabled`);
    enableForm(this.getElement());
    this.initHandlers();
  }

  disable() {
    this.getElement().classList.add(`ad-form--disabled`);
    const avatarPreview = this.getElement().querySelector(`.ad-form-header__preview img`);
    avatarPreview.src = `img/muffin-grey.svg`;
    const adImagesContainer = this.getElement().querySelector(`.ad-form__photo`);
    removeImages(adImagesContainer);
    this.clearInvalid();
    this.reset();
    disableForm(this.getElement());
  }

  reset() {
    this.getElement().reset();
  }

  setAddressValue(x, y) {
    const adAddress = this.getElement().querySelector(`input[id="address"]`);
    adAddress.value = x + `, ` + y + ``;
    adAddress.tabIndex = -1;
  }

  uploadData() {
    const success = ()=>{
      onFormSuccess(this);
    };
    backendUpload(new FormData(this.getElement()), success, onFormError);
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
  }

  setResetBtnClickHandler(handler) {
    this._resetBtn.addEventListener(`click`, handler);
  }

  initHandlers() {
    setFormHandlers(this.getElement());
  }

  clearInvalid() {
    clearInvalidOutlines(this.getElement());
  }
}

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
