'use strict';

(function () {
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

  window.formsactions = {
    disableForm: disableForm,
    enableForm: enableForm
  };
})();
