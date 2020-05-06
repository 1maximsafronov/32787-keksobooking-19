(() => {

  let adverts = [];

  const filData = (data)=> {
    data.forEach((item, index)=> {
      adverts[index] = item;
    });
  };

  const onSuccess = (data)=> {
    filData(data);
    window.filterform.enable();
    window.map.renderPins(adverts);
  };

  const onError = (errorMessage) => {
    let randomdata = window.randomdata(8);
    const node = document.createElement(`div`);
    node.classList.add(`error-data-load`);
    node.textContent = errorMessage + ` Мы сгенерировали случайные объявления`;
    document.body.appendChild(node);

    filData(randomdata);

    window.filterform.enable();
    window.map.renderPins(adverts);

    const hideError = ()=> {
      node.remove();
    };

    setTimeout(hideError, 5000);
  };

  const load = () => {
    window.backend.load(onSuccess, onError);
  };

  const getAdverts = ()=> {
    return adverts;
  };

  window.data = {
    load,
    getAdverts
  };
})();
