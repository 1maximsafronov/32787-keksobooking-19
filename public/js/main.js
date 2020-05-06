(() => {

  // Функция активации страницы
  const activatePage = () =>{
    window.adform.enable();
    window.map.enable();
  };
  // Функция деактивации старинцы
  const deactivatePage = () =>{
    window.adform.disable();
    window.map.disable();
  };

  // Неактивное состояние странице на загрузке
  deactivatePage();

  window.main = {
    activatePage,
    deactivatePage
  };

})();
