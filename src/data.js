import {RenderPosition, createSomeElement, render} from "./utils.js";
import {load as backendLoad} from "./backend.js";

let adverts = [];
// let isDataLoaded = false;

const createEorrorMessageTemplate = (errorMessage) => {
  return (
    `<div class="error-data-load">
        ${errorMessage} Мы сгенерировали случайные объявления
      </div>`
  );
};

const onSuccess = (data)=> {
  data.forEach((item, index)=> {
    adverts[index] = item;
  });

  // isDataLoaded = true;
};

const onError = (errorMessage) => {
  const erorMessageElement = createSomeElement(createEorrorMessageTemplate(errorMessage));

  render(document.body, erorMessageElement, RenderPosition.BEFOREEND);


  const hideError = ()=> {
    erorMessageElement.remove();
  };

  setTimeout(hideError, 5000);

  // isDataLoaded = false;
};

export const loadData = () => {
  backendLoad(onSuccess, onError);
};

export const updateDate = () => {
  backendLoad(onSuccess, onError);
};

export const getAdverts = ()=> {
  return adverts;
};
