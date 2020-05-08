import {RenderPosition, createSomeElement, render} from "./utils.js";
import {generateAdverts} from "./randomdata.js";
import {load as backendLoad} from "./backend.js";

let adverts = [];

const createEorrorMessageTemplate = (errorMessage) => {
  return (
    `<div class="error-data-load">
        ${errorMessage} Мы сгенерировали случайные объявления
      </div>`
  );
};

const filData = (data)=> {
  data.forEach((item, index)=> {
    adverts[index] = item;
  });
};

// const onSuccess = (data)=> {
//
//   // window.filterform.enable();
// };

const onError = (errorMessage) => {
  let randomdata = generateAdverts(8);

  const erorMessageElement = createSomeElement(createEorrorMessageTemplate(errorMessage));

  render(document.body, erorMessageElement, RenderPosition.BEFOREEND);

  filData(randomdata);

  // window.filterform.enable();
  window.map.renderPins(adverts);

  const hideError = ()=> {
    erorMessageElement.remove();
  };

  setTimeout(hideError, 5000);
};

export const saveData = (data) => {
  filData(data);
};

export const loadData = (map) => {

  backendLoad((data) => {
    filData(data);
    map.render(data);
  }, (errorMessage) => {

    let randomdata = generateAdverts(8);

    const erorMessageElement = createSomeElement(createEorrorMessageTemplate(errorMessage));

    render(document.body, erorMessageElement, RenderPosition.BEFOREEND);

    filData(randomdata);

    // window.filterform.enable();
    map.render(adverts);

    const hideError = ()=> {
      erorMessageElement.remove();
    };

    setTimeout(hideError, 5000);

  });
};

export const getAdverts = ()=> {
  return adverts;
};
