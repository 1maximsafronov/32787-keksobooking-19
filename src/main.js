import MapComponent from "./components/map.js";
// import {generateAdverts} from "./randomdata.js";
import {getAdverts, loadData} from "./data.js";

// const TOTAL_NUMBER_ADVERTS = 8;

const mapOnPage = document.querySelector(`.map`);

loadData();
let adverts = getAdverts();
// let adverts = generateAdverts(TOTAL_NUMBER_ADVERTS);

const map = new MapComponent(mapOnPage, adverts);
map.disable();
