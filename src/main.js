// Неактивное состояние странице на загрузке


// Функция активации страницы
const activatePage = () => {
  window.adform.enable();
  window.map.enable();
};

// Функция деактивации старинцы
const deactivatePage = () =>{
  window.adform.disable();
  window.map.disable();
};

deactivatePage();
window.main = {
  activatePage,
  deactivatePage
};
