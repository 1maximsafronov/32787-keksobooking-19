const formElements = [`select`, `input`, `button`, `fieldset`];

// Функция включения/отключения элементов формы
const changeElementsStatus = (elements, value) => {
  elements.forEach((element) => {
    element.disabled = value;
  });
};

// Функция включения формы
export const enableForm = (form) => {
  formElements.forEach((element) => {
    changeElementsStatus(form.querySelectorAll(element), false);
  });
};

// Функция отключения формы
export const disableForm = (form) => {
  formElements.forEach((element) => {
    changeElementsStatus(form.querySelectorAll(element), true);
  });
};

// Функция выделения невалидных полей
export const setInvalidOutline = (target) => {
  target.style.outline = `2px solid red`;
};

// функция оцистки выделения невалидных полей
export const clearInvalidOutline = (target) => {
  target.style.outline = `none`;
};
