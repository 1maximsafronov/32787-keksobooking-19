'use strict';

(function () {
  var formElements = ['select', 'input', 'button', 'fieldset'];
  // Функция включения/отключения элементов формы
  function changeElementsStatus(elements, value) {
    elements.forEach(function (element) {
      element.disabled = value;
    });
  }
  // Функция включения формы
  function enable(form) {
    formElements.forEach(function (element) {
      changeElementsStatus(form.querySelectorAll(element), false);
    });
  }
  // Функция отключения формы
  function disable(form) {
    formElements.forEach(function (element) {
      changeElementsStatus(form.querySelectorAll(element), true);
    });
  }

  window.formsactions = {
    disable: disable,
    enable: enable
  };
})();
