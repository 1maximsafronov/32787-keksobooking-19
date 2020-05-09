// import {generateAdverts} from "./randomdata.js";
import {getAdverts, loadData} from "./data.js";
import DataModel from "./data-model.js";
import PageController from "./controllers/page-controller.js";
// const TOTAL_NUMBER_ADVERTS = 8;
loadData();
let adverts = getAdverts();
// let adverts = generateAdverts(TOTAL_NUMBER_ADVERTS);

const newModel = new DataModel(adverts);
const page = new PageController(newModel);
page.deactivate();
