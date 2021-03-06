'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  // Форма ввода данных объявления
  var adForm = document.querySelector('.ad-form');
  var adTitle = adForm.querySelector('input[id="title"]');
  var adType = adForm.querySelector('select[id="type"]');
  var adPrice = adForm.querySelector('input[id="price"]');
  var adRoomNumber = adForm.querySelector('select[id="room_number"]');
  var adCapacity = adForm.querySelector('select[id="capacity"]');
  var adTimeIn = adForm.querySelector('select[id="timein"]');
  var adTimeOut = adForm.querySelector('select[id="timeout"]');
  var adAddress = adForm.querySelector('input[id="address"]');
  adAddress.tabIndex = -1;
  var avatarChooser = adForm.querySelector('input[id="avatar"]');
  var avatarPreview = adForm.querySelector('.ad-form-header__preview img');
  var imagesChooser = adForm.querySelector('input[id="images"]');
  var adImagesContainer = adForm.querySelector('.ad-form__photo');
  var adResetButton = adForm.querySelector('.ad-form__reset');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  function setAddressValue(x, y) {
    adAddress.value = x + ', ' + y + '';
  }

  function setInvalidOutline(target) {
    target.style.outline = '2px solid red';
  }

  function clearInvalidOutline(target) {
    target.style.outline = 'none';
  }

  function onAdTitleInvalid() {
    var errorMessage = '';
    if (adTitle.validity.tooShort) {
      errorMessage = 'Заголовок должен состоять минимум из 30-ти символов';
    } else if (adTitle.validity.tooLong) {
      errorMessage = 'Заголовок не должен привышать 100 символов';
    } else if (adTitle.validity.valueMissing) {
      errorMessage = 'Обязательное поле';
    }
    adTitle.setCustomValidity(errorMessage);
    setInvalidOutline(adTitle);
  }

  function onAdTitleInput(evt) {
    var target = evt.target;
    if (target.value.length < 30) {
      target.setCustomValidity('Имя должно состоять минимум из ' + 30 + '-x символов');
    } else {
      target.setCustomValidity('');
    }
  }
  function validateAdType() {
    var placeholderPrice = {
      'bungalo': 0,
      'flat': 1000,
      'house': 5000,
      'palace': 10000
    };
    adPrice.placeholder = placeholderPrice[adType.value];
    adPrice.min = placeholderPrice[adType.value];
  }

  function onAdTypeChange() {
    validateAdType();
  }

  function getErrorCapacity(rooms, capacity) {
    if (rooms === 1 && capacity !== 1) {
      return 'В таком количестве комнат может быть от 1 гость';
    } else if (rooms === 2 && (capacity < 1 || capacity > 2)) {
      return 'В таком количестве комнат может быть от 1 до 2-х гостей';
    } else if (rooms === 3 && (capacity < 1 || capacity > 3)) {
      return 'В таком количестве комнат может быть от 1 до 3-х гостей';
    } else if (rooms === 100 && capacity !== 0) {
      return 'Такое количество комнат не для гостей';
    }
    return '';
  }

  function validateRoomsCapacity() {
    var rooms = parseInt(adRoomNumber.value, 10);
    var capacity = parseInt(adCapacity.value, 10);
    var errorMessage = getErrorCapacity(rooms, capacity);
    adCapacity.setCustomValidity(errorMessage);
  }

  function onCapacityChange() {
    validateRoomsCapacity();
  }

  function onRoomNumberChange() {
    validateRoomsCapacity();
  }

  function onAvatarChooserChange() {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  }

  function onImagesChooserChange() {
    var file = imagesChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var img = document.createElement('img');
        img.src = reader.result;
        img.style.width = 70 + 'px';
        img.style.height = 70 + 'px';
        adImagesContainer.appendChild(img);
      });

      reader.readAsDataURL(file);
    }
  }
  // Очистка выбранных фотографий
  function removeImages() {
    while (adImagesContainer.firstChild) {
      adImagesContainer.removeChild(adImagesContainer.firstChild);
    }
  }
  // При успешной отправке формы
  function onFormSuccess() {
    var successMessage = successTemplate.cloneNode(true);
    document.addEventListener('click', onSuccessMessageClick);
    document.addEventListener('keydown', onSuccessMessageEscKeydown);
    document.querySelector('main').appendChild(successMessage);
    window.main.deactivatePage();

    function hideSuccessMessage() {
      successMessage.remove();
      document.removeEventListener('click', onSuccessMessageClick);
      document.removeEventListener('keydown', onSuccessMessageEscKeydown);
    }

    function onSuccessMessageClick(evtMsg) {
      evtMsg.preventDefault();
      hideSuccessMessage();
    }

    function onSuccessMessageEscKeydown(evtMsg) {
      if (evtMsg.key === 'Escape') {
        evtMsg.preventDefault();
        hideSuccessMessage();
      }
    }
  }

  // При ошибке отправки формы
  function onFormError() {
    var errorMessage = errorTemplate.cloneNode(true);
    var errorButton = errorMessage.querySelector('.error__button');

    errorButton.addEventListener('click', onErrorButtonClick);
    document.addEventListener('click', onErrorMessageClick);
    document.addEventListener('keydown', onErrorMessageEscKeydown);
    document.querySelector('main').appendChild(errorMessage);

    function hideErrorMessage() {
      errorMessage.remove();
      errorButton.removeEventListener('click', onErrorButtonClick);
      document.removeEventListener('click', onErrorMessageClick);
      document.removeEventListener('keydown', onErrorMessageEscKeydown);
    }

    function onErrorButtonClick(evtMsg) {
      evtMsg.preventDefault();
      hideErrorMessage();
    }

    function onErrorMessageClick(evtMsg) {
      evtMsg.preventDefault();
      hideErrorMessage();
    }

    function onErrorMessageEscKeydown(evtMsg) {
      if (evtMsg.key === 'Escape') {
        evtMsg.preventDefault();
        hideErrorMessage();
      }
    }
  }

  // Функция при отправке формы объявления
  function onAdFormSubmit(evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(adForm), onFormSuccess, onFormError);
  }

  adTitle.addEventListener('invalid', onAdTitleInvalid);
  adTitle.addEventListener('input', onAdTitleInput);
  adType.addEventListener('change', onAdTypeChange);
  adPrice.addEventListener('invalid', function () {
    setInvalidOutline(adPrice);
  });
  adTimeIn.addEventListener('change', function () {
    adTimeOut.value = adTimeIn.value;
  });
  adTimeOut.addEventListener('change', function () {
    adTimeIn.value = adTimeOut.value;
  });
  adRoomNumber.addEventListener('change', onRoomNumberChange);
  adCapacity.addEventListener('change', onCapacityChange);
  adCapacity.addEventListener('invalid', function () {
    setInvalidOutline(adCapacity);
  });
  avatarChooser.addEventListener('change', onAvatarChooserChange);
  imagesChooser.addEventListener('change', onImagesChooserChange);
  adForm.addEventListener('submit', onAdFormSubmit);
  adResetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.main.deactivatePage();
  });

  function enable() {
    adForm.classList.remove('ad-form--disabled');
    window.formsactions.enable(adForm);
    validateRoomsCapacity();
  }

  function disable() {
    adForm.classList.add('ad-form--disabled');
    window.formsactions.disable(adForm);
    avatarPreview.src = 'img/muffin-grey.svg';
    removeImages();
    clearInvalidOutline(adPrice);
    clearInvalidOutline(adCapacity);
    clearInvalidOutline(adTitle);
    adForm.reset();
    validateAdType();
  }

  window.adform = {
    setAddressValue: setAddressValue,
    enable: enable,
    disable: disable
  };
})();
