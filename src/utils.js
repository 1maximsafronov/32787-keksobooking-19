
export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  BEFORE: `before`,
  AFTER: `after`
};

const TIME_DELAY = 500;

export const createSomeElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export function debounce(cb) {
  let lastTimeout = null;

  return function () {
    let parameters = arguments;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      cb.apply(null, parameters);
    }, TIME_DELAY);
  };
}

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

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.BEFORE:
      container.before(element);
      break;
    case RenderPosition.AFTER:
      container.after(element);
      break;
  }
};
