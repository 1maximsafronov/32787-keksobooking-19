(() => {
  const formElements = [`select`, `input`, `button`, `fieldset`];

  // Функция включения/отключения элементов формы
  const changeElementsStatus = (elements, value) => {
    elements.forEach((element) => {
      element.disabled = value;
    });
  };

  // Функция включения формы
  const enable = (form) => {
    formElements.forEach((element) => {
      changeElementsStatus(form.querySelectorAll(element), false);
    });
  };

  // Функция отключения формы
  const disable = (form) => {
    formElements.forEach((element) => {
      changeElementsStatus(form.querySelectorAll(element), true);
    });
  };

  window.formsactions = {
    disable,
    enable
  };
})();
