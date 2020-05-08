import MapComponent from "./components/map.js";

const mapOnPage = document.querySelector(`.map`);

const map = new MapComponent(mapOnPage);

map.disable();

// ------ СТАРЫЙ КОД ---------
//
// window.adform.disable();
// window.map.disable();

// // Функция активации страницы
// const activatePage = () =>{
//   window.adform.enable();
//   window.map.enable();
// };
// // Функция деактивации старинцы
// const deactivatePage = () =>{
//   window.adform.disable();
//   window.map.disable();
// };
//
// // Неактивное состояние странице на загрузке
// deactivatePage();

// window.main = {
//   activatePage,
//   deactivatePage
// };
