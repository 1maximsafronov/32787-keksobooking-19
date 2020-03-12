'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  // Форма ввода данных объявления
  var adForm = document.querySelector('.ad-form');
  var adTitileInput = adForm.querySelector('input[id="title"]');
  var adTypeSelect = adForm.querySelector('select[id="type"]');
  var adPriceInput = adForm.querySelector('input[id="price"]');
  var adRoomNumber = adForm.querySelector('select[id="room_number"]');
  var adCapacity = adForm.querySelector('select[id="capacity"]');
  var adTimeIn = adForm.querySelector('select[id="timein"]');
  var adTimeOut = adForm.querySelector('select[id="timeout"]');
  var adAddress = adForm.querySelector('input[id="address"]');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  // Функция задания поля адреса
  function setAddressValue(x, y) {
    adAddress.value = x + ', ' + y + '';
  }
  // Функция отключения элемента
  function disableElements(elements) {
    elements.forEach(function (element) {
      element.disabled = true;
    });
  }
  // Функция включения элемента
  function enableElements(elements) {
    elements.forEach(function (element) {
      element.disabled = false;
    });
  }
  // Функция включения формы
  function enableForm(form) {
    var selects = form.querySelectorAll('select');
    var inputs = form.querySelectorAll('input');
    var buttons = form.querySelectorAll('button');
    var fieldsets = form.querySelectorAll('fieldset');
    enableElements(selects);
    enableElements(inputs);
    enableElements(buttons);
    enableElements(fieldsets);
  }
  // Функция отключения формы
  function disableForm(form) {
    var selects = form.querySelectorAll('select');
    var inputs = form.querySelectorAll('input');
    var buttons = form.querySelectorAll('button');
    var fieldsets = form.querySelectorAll('fieldset');
    disableElements(selects);
    disableElements(inputs);
    disableElements(buttons);
    disableElements(fieldsets);
  }
  // функция Включение всех форм
  function enableForms() {
    enableForm(adForm);
    enableForm(mapFilters);
    adForm.classList.remove('ad-form--disabled');
  }
  // Функция Отключениявысез форм
  function disableForms() {
    disableForm(adForm);
    disableForm(mapFilters);
    adForm.classList.add('ad-form--disabled');
  }
  function onAdTitleInvalid() {
    var errorMessage = '';
    if (adTitileInput.validity.tooShort) {
      errorMessage = 'Заголовок должен состоять минимум из 30-ти символов';
    } else if (adTitileInput.validity.tooLong) {
      errorMessage = 'Заголовок не должен привышать 100 символов';
    } else if (adTitileInput.validity.valueMissing) {
      errorMessage = 'Обязательное поле';
    }
    adTitileInput.setCustomValidity(errorMessage);
  }
  // При вводе заголовка
  function onAdTitleInput(evt) {
    var target = evt.target;
    if (target.value.length < 30) {
      target.setCustomValidity('Имя должно состоять минимум из ' + 30 + '-x символов');
    } else {
      target.setCustomValidity('');
    }
  }
  // при изменении типа жилья
  function onAdTypeChange() {
    var placeholderPrice = {
      'bungalo': 0,
      'flat': 1000,
      'house': 5000,
      'palace': 10000
    };
    adPriceInput.placeholder = placeholderPrice[adTypeSelect.value];
    adPriceInput.min = placeholderPrice[adTypeSelect.value];
  }

  function checkRooms1(rooms, capacity) {
    var bool = false;
    if (rooms === 1 && capacity !== 1) {
      bool = true;
    }
    return bool;
  }

  function checkRooms2(rooms, capacity) {
    var bool = false;
    if (rooms === 2 && (capacity < 1 || capacity > 2)) {
      bool = true;
    }
    return bool;
  }

  function checkRooms3(rooms, capacity) {
    var bool = false;
    if (rooms === 3 && (capacity < 1 || capacity > 3)) {
      bool = true;
    }
    return bool;
  }
  function checkRooms4(rooms, capacity) {
    var bool = false;
    if (rooms === 100 && capacity !== 0) {
      bool = true;
    }
    return bool;
  }
  // Функция проверки количества комнат и количества гостей
  function validateRoomsCapacity() {
    var rooms = Number(adRoomNumber.value);
    var capacity = Number(adCapacity.value);
    var errorMessage = '';
    if (checkRooms1(rooms, capacity)) {
      errorMessage = 'В таком количестве комнат может быть от 1 гость';
    } else if (checkRooms2(rooms, capacity)) {
      errorMessage = 'В таком количестве комнат может быть от 1 до 2-х гостей';
    } else if (checkRooms3(rooms, capacity)) {
      errorMessage = 'В таком количестве комнат может быть от 1 до 3-х гостей';
    } else if (checkRooms4(rooms, capacity)) {
      errorMessage = 'Такое количество комнат не для гостей';
    }
    adCapacity.setCustomValidity(errorMessage);
  }
  // Функция при выборе количества комнат
  function onCapacityChange() {
    validateRoomsCapacity();
  }
  // Функция при выборе количества гостей
  function onRoomNumberChange() {
    validateRoomsCapacity();
  }
  // При успешной отправке формы
  function onFormSuccess() {
    var successMessage = successTemplate.cloneNode(true);

    function onMessageClick(evtMsg) {
      if (evtMsg.button === 0 || evtMsg.key === 'Escape') {
        evtMsg.preventDefault();
        successMessage.remove();
        document.removeEventListener('click', onMessageClick);
        document.removeEventListener('keydown', onMessageClick);
      }
    }
    document.addEventListener('click', onMessageClick);
    document.addEventListener('keydown', onMessageClick);
    document.body.appendChild(successMessage);
    adForm.reset();
  }
  // При ошибке отправки формы
  function onFormError() {
    var errorMessage = errorTemplate.cloneNode(true);
    var errorButton = errorMessage.querySelector('.error__button');

    function onMessageClick(evtMsg) {
      if (evtMsg.button === 0 || evtMsg.key === 'Escape') {
        evtMsg.preventDefault();
        errorMessage.remove();
        errorButton.removeEventListener('click', onMessageClick);
        document.removeEventListener('keydown', onMessageClick);
      }
    }
    errorButton.addEventListener('click', onMessageClick);
    document.addEventListener('keydown', onMessageClick);
    document.querySelector('main').appendChild(errorMessage);
  }

  // Функция при отправке формы объявления
  function onAdFormSubmit(evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(adForm), onFormSuccess, onFormError);
  }

  // Обработчик поля заголовка
  adTitileInput.addEventListener('invalid', onAdTitleInvalid);
  adTitileInput.addEventListener('input', onAdTitleInput);
  // Задание минимальной цены на аренду в зависимости от типа
  adTypeSelect.addEventListener('change', onAdTypeChange);
  // Валидация времени заезда и выезда
  adTimeIn.addEventListener('change', function () {
    adTimeOut.value = adTimeIn.value;
  });
  adTimeOut.addEventListener('change', function () {
    adTimeIn.value = adTimeOut.value;
  });
  adRoomNumber.addEventListener('change', onRoomNumberChange);
  adCapacity.addEventListener('change', onCapacityChange);
  adForm.addEventListener('submit', onAdFormSubmit);
  adForm.addEventListener('reset', function () {
    window.main.deactivatePage();
  });

  window.adform = {
    adAddress: adAddress,
    validateRoomsCapacity: validateRoomsCapacity,
    setAddressValue: setAddressValue,
    enableForms: enableForms,
    disableForms: disableForms
  };
})();
