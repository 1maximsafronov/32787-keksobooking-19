'use strict';

(function () {
  var formElements = ['select', 'input', 'button', 'fieldset'];
  // Функция отключения элемента формы
  function disableElements(elements) {
    elements.forEach(function (element) {
      element.disabled = true;
    });
  }
  // Функция включения элемента формы
  function enableElements(elements) {
    elements.forEach(function (element) {
      element.disabled = false;
    });
  }
  // Функция включения формы
  function enableForm(form) {
    formElements.forEach(function (element) {
      enableElements(form.querySelectorAll(element));
    });
  }
  // Функция отключения формы
  function disableForm(form) {
    formElements.forEach(function (element) {
      disableElements(form.querySelectorAll(element));
    });
  }

  window.formsactions = {
    disableForm: disableForm,
    enableForm: enableForm
  };
})();
