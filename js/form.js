'use strict';
(function () {
  // Форма ввода данных объявления
  var adForm = document.querySelector('.ad-form--disabled');
  var adTitileInput = adForm.querySelector('input[id="title"]');
  var adTypeSelect = adForm.querySelector('select[id="type"]');
  var adPriceInput = adForm.querySelector('input[id="price"]');
  var adRoomNumber = adForm.querySelector('select[id="room_number"]');
  var adCapacity = adForm.querySelector('select[id="capacity"]');
  var adTimeIn = adForm.querySelector('select[id="timein"]');
  var adTimeOut = adForm.querySelector('select[id="timeout"]');
  // Поле ввода адреса главного маркера
  var adAddress = adForm.querySelector('input[id="address"]');

  // Обработчик невалидного поля заголовка
  adTitileInput.addEventListener('invalid', function () {
    var errorMessage = '';
    if (adTitileInput.validity.tooShort) {
      errorMessage = 'Заголовок должен состоять минимум из 30-ти символов';
    } else if (adTitileInput.validity.tooLong) {
      errorMessage = 'Заголовок не должен привышать 100 символов';
    } else if (adTitileInput.validity.valueMissing) {
      errorMessage = 'Обязательное поле';
    }
    adTitileInput.setCustomValidity(errorMessage);
  });

  // Обработчик введения текста в поле заголовка
  adTitileInput.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < 30) {
      target.setCustomValidity('Имя должно состоять минимум из ' + 30 + '-x символов');
    } else {
      target.setCustomValidity('');
    }
  });

  // Задание минимальной цены на аренду в зависимости от типа
  adTypeSelect.addEventListener('change', function () {
    var placeholderPrice = {
      'bungalo': 0,
      'flat': 1000,
      'house': 5000,
      'palace': 10000
    };
    adPriceInput.placeholder = placeholderPrice[adTypeSelect.value];
    adPriceInput.min = placeholderPrice[adTypeSelect.value];
  });

  // Функция задания поля адреса
  function setAddressValue(x, y) {
    adAddress.value = x + ', ' + y + '';
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

  // Валидация времени заезда и выезда
  adTimeIn.addEventListener('change', function () {
    adTimeOut.value = adTimeIn.value;
  });

  adTimeOut.addEventListener('change', function () {
    adTimeIn.value = adTimeOut.value;
  });

  adRoomNumber.addEventListener('change', onRoomNumberChange);
  adCapacity.addEventListener('change', onCapacityChange);

  window.form = {
    adAddress: adAddress,
    validateRoomsCapacity: validateRoomsCapacity,
    setAddressValue: setAddressValue
  };
})();
